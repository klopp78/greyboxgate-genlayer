# GreyboxGate for GenLayer

GreyboxGate is a consensus firewall for agent actions that originate from untrusted web content. It is built around the current GenLayer greyboxing and fee-aware Bradbury Phase 2 direction.

## Current deployment

- Studio contract: the v1 deployment is retained at [`0x2ce99d31bf921f25bBbf09cd35be1044364590a5`](https://explorer-studio.genlayer.com/address/0x2ce99d31bf921f25bBbf09cd35be1044364590a5). The v2 protected-payout deployment will be recorded here after Studio deployment.
- Public workflow page: `https://klopp78.github.io/greyboxgate-genlayer/`

## Workflow

1. **Register policy**: bind owner, executor, recipient, action scope, spend cap, fee cap, a 60-86,400 second receipt lifetime, and a canonical policy source.
2. **Assess action**: validators independently render the untrusted input and evidence, hash snapshots, inspect prompt-injection markers, and agree on a policy-bound verdict.
3. **Execute protected payout**: only the registered executor can submit the exact positive GEN value for an approved, one-use, unexpired action. Recipient, scope, amount, fees and the canonical action hash are checked again in contract state before the value is transferred to the policy-fixed recipient. A failed transfer reverts the lifecycle write.

## Security properties

- Canonical SHA-256 commitments bind policy, action intent and rendered input snapshots.
- Web sources are quoted as untrusted data; markers such as `ignore previous instructions`, recipient changes and transfer instructions block approval.
- A public action ID cannot be consumed by an arbitrary wallet.
- Spend and fee caps are cumulative and enforced at assessment and execution.
- Executions are replay protected, expiry-bound, and retain receipt hashes plus the paid value for review.
- The browser console reads the receipt before requesting a signature, waits for finality, and reads the execution record back after the protected transfer.

## Local validation

```bash
npm install
npm test
```

The contract is deployed on Studio at the address above. The web UI uses `genlayer-js` and reads back contract state after accepted transactions.
