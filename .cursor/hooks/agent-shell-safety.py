#!/usr/bin/env python3
import json
import re
import sys

try:
    payload = json.load(sys.stdin)
except json.JSONDecodeError:
    print(json.dumps({
        "permission": "deny",
        "user_message": "Shell safety hook received invalid JSON.",
        "agent_message": "The shell safety hook could not parse its input."
    }))
    sys.exit(0)

command = payload.get("command") or payload.get("tool_input", {}).get("command") or ""
deny_patterns = [
    r"\brm\s+-[A-Za-z]*r[A-Za-z]*f[A-Za-z]*\s+(?:/|~)",
    r"\bgit\s+reset\s+--hard\b",
    r"\bgit\s+push\b.*\s--force(?:\s|$)",
    r"\bchmod\s+-R\s+777\b",
]
ask_patterns = [
    r"\brm\s+-[A-Za-z]*r[A-Za-z]*f[A-Za-z]*\b",
    r"\bgit\s+push\b.*\s--force-with-lease(?:\s|$)",
    r"\bpnpm\s+db:migrate\b",
    r"\bsupabase\s+db\s+reset\b",
    r"\bvercel\b.*\s--prod(?:\s|$)",
    r"\bgh\s+pr\s+merge\b",
]

if any(re.search(pattern, command) for pattern in deny_patterns):
    print(json.dumps({
        "permission": "deny",
        "user_message": "This shell command matches a destructive pattern and was blocked by the project safety hook.",
        "agent_message": "A project hook blocked a destructive shell command. Ask the user before attempting an alternative."
    }))
    sys.exit(0)

if any(re.search(pattern, command) for pattern in ask_patterns):
    print(json.dumps({
        "permission": "ask",
        "user_message": "This shell command can affect databases, production, or repository state. Please approve it before continuing.",
        "agent_message": "A project hook requires user approval for this higher-risk shell command."
    }))
    sys.exit(0)

print(json.dumps({"permission": "allow"}))
