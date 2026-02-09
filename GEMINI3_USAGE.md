## Gemini 3 Usage in PrivacySDK

This document explains how Gemini 3 Pro Preview is used across the project.

## Model
- Default model: `gemini-3-pro-preview`
- Configurable via `GEMINI_MODEL`

## Environments
Gemini 3 can run in two modes:
- **Vertex AI** (recommended for production)
- **Gemini API key** (direct API access)

Gemini 3 on Vertex AI requires the **global** location.

```bash
export GOOGLE_CLOUD_PROJECT="your-project-id"
export GOOGLE_CLOUD_LOCATION="global"
export GEMINI_MODEL="gemini-3-pro-preview"
```

## Core Usage Areas

### 1) Gemini Privacy Rule (Single-File Analysis)
File: `src/ruleEngine/rules/GeminiPrivacyRule.ts`

- Scans code in chunks
- Produces JSON findings with severity, fix, and regulation hints
- Used when AI scanning is enabled
- **How it works**: Each file is split into fixed-size chunks and sent to Gemini for static analysis. The prompt instructs Gemini to identify concrete privacy risks and return structured JSON only.
- **What Gemini adds**: Context-aware issues (e.g., consent gaps, unsafe logging, retention risks) that are difficult to catch with regex.
- **Output handling**: The response is parsed into violations with severity, suggested fix, and a concise explanation. If the JSON is malformed, the parser attempts cleanup and fallback extraction.
- **When it runs**: Only when AI scanning is enabled in the UI or via config. If Gemini is disabled or unavailable, the rule returns no AI violations.

### 2) Cross-File Data Flow Analysis
File: `src/ruleEngine/rules/GeminiPrivacyRule.ts`

- Aggregates multiple files into a single prompt
- Detects PII flow across files
- Returns a flow path and remediation guidance
- **How it works**: The engine aggregates multiple files into a single Gemini prompt (with size limits) so the model can reason across modules and files.
- **What Gemini adds**: Cross-file PII flow detection (source → intermediate → sink), which is not feasible with single-file pattern rules.
- **Output handling**: Gemini returns a JSON array with `flow_path`, affected files, and a remediation step. These are surfaced as cross-file violations in the results.

### 3) Web UI Results Separation
File: `src/web/server.ts`

- Tags Gemini findings with `source: "gemini"`
- UI renders a dedicated **🤖 Gemini 3 AI Insights** section
- **How it works**: Each violation is tagged with a `ruleId` and a derived `source` (`gemini` or `rule`) on the server.
- **What Gemini adds**: AI-only findings are grouped into a dedicated **🤖 Gemini 3 AI Insights** section for clear attribution.
- **Why it matters**: Judges and users can instantly see what Gemini contributed versus traditional rules.

### 4) Ask Gemini Chat
Files:
- `src/web/server.ts`
- `src/web/index.html`

Flow:
- User clicks **Ask Gemini** on a violation
- Backend builds a prompt with violation metadata + code context
- Response is rendered in the chat panel
- **How it works**: Clicking **Ask Gemini** sends the selected violation to the backend with the scan ID. The server reconstructs file context and builds a targeted prompt.
- **What Gemini adds**: Interactive explanations (why it’s a violation, how to fix it, risk impact) tailored to the exact code context.
- **Output handling**: The response is streamed into the chat panel and formatted for readability in the UI.

### 5) Privacy Policy Checker
File: `src/web/server.ts`

- User pastes a policy
- Gemini compares policy text to codebase behavior
- Returns policy contradictions as structured findings
- **How it works**: The policy text and a snapshot of the codebase are combined into a single prompt asking Gemini to find contradictions.
- **What Gemini adds**: Natural-language reasoning across policy commitments and actual code behavior (e.g., “we do not share data” vs. third-party API calls).
- **Output handling**: Returns structured JSON with the policy claim, evidence, severity, and a suggested remediation.

## UI Configuration
In the web UI:
- **AI-Powered Scanning** toggle enables Gemini
- **Gemini AI Settings** modal accepts:
  - API key
  - Vertex AI project ID
  - Vertex AI location (default: `global`)

Settings are stored in `localStorage` and sent with each scan.

## Fallback Behavior
If Gemini is not configured or fails:
- The scan falls back to hardcoded rules
- Results still render, but Gemini sections remain empty
