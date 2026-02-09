## Testing PrivacySDK

This guide shows how to run the web UI and validate Gemini + rule-based scans.

## Prerequisites
- Node.js and npm
- Google GenAI configuration (optional)

## Install
```bash
npm install
```

## Build (recommended)
```bash
npm run build:prod
```

## Run Web UI
```bash
npm run start:web
```
Open `http://localhost:3000`.

## Quick UI Test
1. Click **Use Sample Code**
2. Ensure **Hardcoded Rules** is ON
3. Click **Start Privacy Scan**
4. Confirm findings appear under **Rule-Based Findings**

## Gemini 3 Test (Vertex AI)
Set environment variables:
```bash
export GOOGLE_CLOUD_PROJECT="your-project-id"
export GOOGLE_CLOUD_LOCATION="global"
```
In the UI:
1. Click **Gemini AI Settings**
2. Enter your **Vertex AI Project ID** (or API key)
3. Turn **AI-Powered Scanning** ON
4. Click **Start Privacy Scan**
5. Confirm findings appear under **🤖 Gemini 3 AI Insights**

## Policy Checker Test
1. Paste text from `sample-privacy-policy.txt` into **Privacy Policy Checker**
2. Upload `sample-tracking.js`
3. Run scan
4. Confirm **Policy Compliance Findings** appears

## API Test (CLI)
Rule-based scan with sample file:
```bash
curl -s -F "files=@sample-tracking.js" -F "aiEnabled=false" -F "hardcodedEnabled=true" http://localhost:3000/scan
```

Gemini scan (Vertex AI):
```bash
curl -s -F "files=@sample-tracking.js" -F "aiEnabled=true" -F "hardcodedEnabled=true" \
  -F "vertexProjectId=your-project-id" -F "vertexLocation=global" \
  http://localhost:3000/scan
```
