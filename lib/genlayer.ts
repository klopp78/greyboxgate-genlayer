import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";
import { TransactionStatus } from "genlayer-js/types";

export const GREYBOX_GATE_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_GREYBOX_GATE_CONTRACT_ADDRESS ?? "0x2ce99d31bf921f25bBbf09cd35be1044364590a5") as `0x${string}`;
export type WalletAddress = `0x${string}`;

function client(walletAddress?: WalletAddress) { return createClient({ chain: studionet, account: walletAddress }); }
function address(value?: `0x${string}`) { return value ?? GREYBOX_GATE_CONTRACT_ADDRESS; }
function strings(value: unknown): string[] { if (typeof value === "string") return [value]; if (!value || typeof value !== "object") return []; return Object.values(value as Record<string, unknown>).flatMap(strings); }
function resultId(receipt: unknown, pattern: RegExp, label: string) { const found = strings(receipt).map((item) => item.match(pattern)?.[0]).find(Boolean); if (!found) throw new Error(`Accepted ${label} transaction did not return its identifier.`); return found; }

export async function readRecord(method: "get_policy" | "get_action" | "get_execution", id: string, walletAddress?: WalletAddress, contractAddress?: `0x${string}`) {
  return client(walletAddress).readContract({ address: address(contractAddress), functionName: method, args: [id], jsonSafeReturn: true, leaderOnly: true });
}

export async function registerPolicy(walletAddress: WalletAddress, values: string[], contractAddress?: `0x${string}`) {
  const sdk = client(walletAddress); await sdk.connect("studionet");
  const hash = await sdk.writeContract({ address: address(contractAddress), functionName: "register_policy", args: values, value: BigInt(0), leaderOnly: false });
  const receipt = await sdk.waitForTransactionReceipt({ hash, status: TransactionStatus.ACCEPTED, fullTransaction: true });
  const id = resultId(receipt, /gbp_[a-f0-9]{20}/, "policy"); return { hash, id, record: await readRecord("get_policy", id, walletAddress, contractAddress) };
}

export async function assessAction(walletAddress: WalletAddress, values: string[], contractAddress?: `0x${string}`) {
  const sdk = client(walletAddress); await sdk.connect("studionet");
  const hash = await sdk.writeContract({ address: address(contractAddress), functionName: "assess_action", args: values, value: BigInt(0), leaderOnly: false });
  const receipt = await sdk.waitForTransactionReceipt({ hash, status: TransactionStatus.ACCEPTED, fullTransaction: true });
  const id = resultId(receipt, /gba_[a-f0-9]{20}/, "action"); return { hash, id, record: await readRecord("get_action", id, walletAddress, contractAddress) };
}

export async function executeAction(walletAddress: WalletAddress, actionId: string, contractAddress?: `0x${string}`) {
  const sdk = client(walletAddress); await sdk.connect("studionet");
  const action = await readRecord("get_action", actionId, walletAddress, contractAddress);
  const raw = typeof action === "string" ? action : JSON.stringify(action);
  const parsed = JSON.parse(raw) as { state?: string; execution_ready?: boolean; expires_at?: number; intent?: { bound_executor?: string; executor?: string; amount?: number | string } };
  const expectedExecutor = parsed.intent?.bound_executor ?? parsed.intent?.executor;
  if (parsed.state !== "approved" || parsed.execution_ready !== true) throw new Error("The receipt is not approved for protected execution.");
  if (!expectedExecutor || expectedExecutor.toLowerCase() !== walletAddress.toLowerCase()) throw new Error("Only the receipt-bound executor can release this payout.");
  if (!parsed.expires_at || parsed.expires_at <= Math.floor(Date.now() / 1000)) throw new Error("The receipt has expired and cannot release funds.");
  const value = BigInt(parsed.intent?.amount ?? 0);
  if (value <= 0n) throw new Error("The receipt does not contain a positive payout amount.");
  const hash = await sdk.writeContract({ address: address(contractAddress), functionName: "execute_approved_action", args: [actionId], value, leaderOnly: false });
  await sdk.waitForTransactionReceipt({ hash, status: TransactionStatus.FINALIZED, fullTransaction: true });
  return { hash, record: await readRecord("get_execution", actionId, walletAddress, contractAddress) };
}
