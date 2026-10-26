# GreyboxGate for GenLayer

GreyboxGate is a consensus firewall for agent actions that originate from untrusted web content. It is built around the current GenLayer greyboxing and fee-aware Bradbury Phase 2 direction.

## Workflow

1. **Register policy**: bind owner, executor, recipient, action scope, spend cap, fee cap and a canonical policy source.
2. **Assess action**: validators independently render the untrusted input and evidence, hash snapshots, inspect prompt-injection markers, and agree on a policy-bound verdict.
3. **Execute receipt**: only the registered executor can consume an approved, one-use action. Recipient, scope, amount, fees and the canonical action hash are checked again in contract state.

## Security properties

- Canonical SHA-256 commitments bind policy, action intent and rendered input snapshots.
- Web sources are quoted as untrusted data; markers such as `ignore previous instructions`, recipient changes and transfer instructions block approval.
- A public action ID cannot be consumed by an arbitrary wallet.
- Spend and fee caps are cumulative and enforced at assessment and execution.
- Executions are replay protected and retain receipt hashes for review.

## Local validation

```bash
npm install
npm test
```

Deploy `contracts/greybox_gate.py` on Studio Next or a supported GenLayer environment. The web UI uses `genlayer-js` and reads back contract state after accepted transactions.
