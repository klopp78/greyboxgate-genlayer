import { GREYBOX_GATE_CONTRACT_ADDRESS } from "@/lib/genlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f6f2] text-[#161814]">
      <section className="border-b border-[#d9ded2] bg-[#fbfcf8]">
        <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
          <span className="pill">GenLayer Project · Season 2</span>
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <h1 className="text-5xl font-semibold leading-tight">GreyboxGate</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#596452]">A consensus firewall for AI agents that receive untrusted web instructions before they can move money or call sensitive tools.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="action-button primary" href="/policy">Register policy</a>
                <a className="action-button" href="/review">Assess action</a>
                <a className="action-button" href="/execute">Inspect receipt</a>
              </div>
            </div>
            <div className="gate-board">
              <div><span>Untrusted input</span><strong>Render and hash the exact web snapshot validators review</strong></div>
              <div><span>Greybox screen</span><strong>Detect instructions that attempt to override policy or redirect funds</strong></div>
              <div><span>Bound execution</span><strong>Only the named executor can consume an approved, capped action</strong></div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-8 md:grid-cols-3 lg:px-8">
        <article className="tool-panel"><span className="field-label">01 Policy</span><h2 className="mt-2 text-2xl font-semibold">Action boundary</h2><p className="mt-3 leading-7 text-[#596452]">Bind an owner, executor, recipient, action scope, spend cap and fee cap to an immutable source commitment.</p></article>
        <article className="tool-panel"><span className="field-label">02 Consensus</span><h2 className="mt-2 text-2xl font-semibold">Input firewall</h2><p className="mt-3 leading-7 text-[#596452]">Validators independently fetch untrusted input and evidence, then agree on safety, scope and cap compliance.</p></article>
        <article className="tool-panel"><span className="field-label">03 Execution</span><h2 className="mt-2 text-2xl font-semibold">One-use receipt</h2><p className="mt-3 leading-7 text-[#596452]">Execution rejects arbitrary callers, unsafe inputs, mismatched recipients, replay and cap overruns.</p></article>
      </section>
      <footer className="mx-auto flex max-w-6xl flex-wrap gap-4 px-5 pb-10 text-sm text-[#596452] lg:px-8">
        <a href="https://github.com/klopp78/greyboxgate-genlayer" target="_blank" rel="noreferrer">Source repository</a>
        <code>{GREYBOX_GATE_CONTRACT_ADDRESS}</code>
      </footer>
    </main>
  );
}
