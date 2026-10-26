import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../contracts/greybox_gate.py", import.meta.url), "utf8");
const required = ["class GreyboxGate(gl.Contract)", "def register_policy(", "def assess_action(", "def execute_approved_action(", "gl.vm.run_nondet_unsafe", "gl.nondet.web.render", "only_bound_executor_can_execute", "intent_binding_invalid", "ignore previous instructions", "hashlib.sha256"];
for (const marker of required) if (!source.includes(marker)) throw new Error(`Missing GreyboxGate guard: ${marker}`);
console.log("GreyboxGate contract guard check passed");
