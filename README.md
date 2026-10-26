# GreyboxGate for GenLayer

GreyboxGate is a consensus firewall for agent actions that originate from untrusted web content. It is built around the current GenLayer greyboxing and fee-aware Bradbury Phase 2 direction.

## Live deployment

- Studio contract: [`0x2ce99d31bf921f25bBbf09cd35be1044364590a5`](https://explorer-studio.genlayer.com/address/0x2ce99d31bf921f25bBbf09cd35be1044364590a5)
- Public workflow page: `https://klopp78.github.io/greyboxgate-genlayer/`

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

The contract is deployed on Studio at the address above. The web UI uses `genlayer-js` and reads back contract state after accepted transactions.
