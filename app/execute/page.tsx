"use client";

import { useState } from "react";
import { executeAction, readRecord, type WalletAddress } from "@/lib/genlayer";

export default function ExecutePage() {
  const [wallet, setWallet] = useState(""); const [action, setAction] = useState(""); const [message, setMessage] = useState("Inspect the consensus receipt before signing a protected payout.");
  async function execute() { try { setMessage("Checking executor, receipt expiry, and exact payout value..."); const result = await executeAction(wallet as WalletAddress, action); setMessage(`Protected payout finalized: ${JSON.stringify(result.record, null, 2)}`); } catch (error) { setMessage(error instanceof Error ? error.message : "Protected payout failed."); } }
  async function inspect() { try { setMessage(JSON.stringify(await readRecord("get_action", action, wallet as WalletAddress), null, 2)); } catch (error) { setMessage(error instanceof Error ? error.message : "Read failed."); } }
  return <main className="mx-auto min-h-screen max-w-3xl px-5 py-10 text-[#161814]"><a className="pill" href="/">GreyboxGate</a><h1 className="mt-7 text-4xl font-semibold">Execute a protected payout</h1><p className="mt-3 max-w-2xl text-[#52604d]">The receipt binds one executor, one recipient, an exact positive GEN amount, and an on-chain expiry. The contract releases the executor-supplied amount only when every bound field still matches.</p><section className="tool-panel mt-8 grid gap-4"><label className="grid gap-1 text-sm font-medium">Executor wallet<input className="field" value={wallet} onChange={(event) => setWallet(event.target.value)} /></label><label className="grid gap-1 text-sm font-medium">Action ID<input className="field" value={action} onChange={(event) => setAction(event.target.value)} /></label><div className="flex gap-3"><button className="action-button" onClick={inspect}>Inspect receipt</button><button className="action-button primary" onClick={execute}>Sign protected payout</button></div><pre className="status">{message}</pre></section></main>;
}
