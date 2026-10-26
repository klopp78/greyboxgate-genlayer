"use client";

import { useState } from "react";
import { executeAction, readRecord, type WalletAddress } from "@/lib/genlayer";

export default function ExecutePage() {
  const [wallet, setWallet] = useState(""); const [action, setAction] = useState(""); const [message, setMessage] = useState("Only the bound executor can consume an approved action.");
  async function execute() { try { setMessage("Executing approved action..."); const result = await executeAction(wallet as WalletAddress, action); setMessage(`Execution accepted: ${JSON.stringify(result.record)}`); } catch (error) { setMessage(error instanceof Error ? error.message : "Execution failed."); } }
  async function inspect() { try { setMessage(JSON.stringify(await readRecord("get_action", action, wallet as WalletAddress), null, 2)); } catch (error) { setMessage(error instanceof Error ? error.message : "Read failed."); } }
  return <main className="mx-auto min-h-screen max-w-3xl px-5 py-10 text-[#161814]"><a className="pill" href="/">GreyboxGate</a><h1 className="mt-7 text-4xl font-semibold">Inspect or execute a receipt</h1><section className="tool-panel mt-8 grid gap-4"><label className="grid gap-1 text-sm font-medium">Executor wallet<input className="field" value={wallet} onChange={(event) => setWallet(event.target.value)} /></label><label className="grid gap-1 text-sm font-medium">Action ID<input className="field" value={action} onChange={(event) => setAction(event.target.value)} /></label><div className="flex gap-3"><button className="action-button" onClick={inspect}>Read action</button><button className="action-button primary" onClick={execute}>Execute approved action</button></div><pre className="status">{message}</pre></section></main>;
}
