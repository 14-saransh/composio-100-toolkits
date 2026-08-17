# 100 → Toolkits

A two-minute case study for the Composio AI Product Ops take-home. It contains an explorable 100-app matrix, portfolio patterns, a transparent research workflow, and a risk-weighted verification sample.

## Run the case study

```bash
npm install
npm run dev
```

## Run the research agent

Create `seeds.json` with `{name, website, category}` records, set `OPENAI_API_KEY`, install the OpenAI SDK (`npm i openai`), then run:

```bash
node research-agent.mjs
```

The agent searches official documentation and emits strict structured JSON with claim-level evidence and confidence. It checkpoints every five apps. A second challenge pass should re-check low-confidence rows, all gated verdicts, and claims supported only by marketing pages. Human review is required for production-vs-sandbox access, paid-plan entitlements, partner programs, and ambiguous products.

## Method

1. Discover official API, authentication, access/pricing, and MCP documentation.
2. Extract a normalized record with evidence per claim.
3. Challenge suspiciously easy classifications and conflicting sources.
4. Human-audit a stratified, risk-weighted sample and all ambiguous rows.
5. Publish the normalized matrix and rerun before roadmap commitment.

The page is intentionally honest about uncertainty: access rules change, MCP availability moves quickly, and absence of public documentation is treated as an outreach signal rather than proof that an API does not exist.

