"use strict";
// Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
// Licensed under the MIT License modified with the Commons Clause.
// For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE
// Commercial use is prohibited without a license.
// Contact for Commercial License: nabanita@privacylicense.com | https://privacylicense.ai
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const genai_1 = require("@google/genai");
const RuleEngine_1 = require("../ruleEngine/RuleEngine");
const JavaScanner_1 = require("../scanners/JavaScanner");
const GoScanner_1 = require("../scanners/GoScanner");
const TypeScriptScanner_1 = require("../scanners/TypeScriptScanner");
const PythonScanner_1 = require("../scanners/PythonScanner");
const JavaScriptScanner_1 = require("../scanners/JavaScriptScanner");
const CSharpScanner_1 = require("../scanners/CSharpScanner");
const PHPScanner_1 = require("../scanners/PHPScanner");
const RubyScanner_1 = require("../scanners/RubyScanner");
const SwiftScanner_1 = require("../scanners/SwiftScanner");
const KotlinScanner_1 = require("../scanners/KotlinScanner");
const RustScanner_1 = require("../scanners/RustScanner");
const ScalaScanner_1 = require("../scanners/ScalaScanner");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const scanStore = new Map();
const scanStoreTtlMs = 30 * 60 * 1000;
app.use(express_1.default.json({ limit: '1mb' }));
// Configure multer for file uploads
const upload = (0, multer_1.default)({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: 50 // Max 50 files
    }
});
// Serve static files
app.use(express_1.default.static(path.join(__dirname, 'public')));
// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Handle file upload and scanning
app.post('/scan', upload.array('files'), async (req, res) => {
    try {
        const files = req.files;
        const aiEnabled = req.body.aiEnabled === 'true';
        const hardcodedEnabled = req.body.hardcodedEnabled !== 'false';
        const policyText = (req.body.policyText || '').trim();
        // Get Gemini/Vertex settings from request body or env
        const geminiApiKey = req.body.geminiApiKey || process.env.GEMINI_API_KEY;
        const vertexProjectId = req.body.vertexProjectId || process.env.GOOGLE_CLOUD_PROJECT;
        const vertexLocation = req.body.vertexLocation || process.env.GOOGLE_CLOUD_LOCATION || 'global';
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        console.log(`Processing ${files.length} files...`);
        // Create a temporary directory for processing
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        // Move uploaded files to temp directory
        const filePaths = [];
        const storedFiles = [];
        for (const file of files) {
            const newPath = path.join(tempDir, file.originalname);
            fs.renameSync(file.path, newPath);
            filePaths.push(newPath);
            try {
                const content = fs.readFileSync(newPath, 'utf8');
                storedFiles.push({ path: newPath, content });
            }
            catch (error) {
                console.warn(`Failed to read ${newPath} for in-memory storage:`, error);
            }
        }
        // Initialize scanners and engine
        const scanners = [
            new JavaScanner_1.JavaScanner(),
            new GoScanner_1.GoScanner(),
            new TypeScriptScanner_1.TypeScriptScanner(),
            new PythonScanner_1.PythonScanner(),
            new JavaScriptScanner_1.JavaScriptScanner(),
            new CSharpScanner_1.CSharpScanner(),
            new PHPScanner_1.PHPScanner(),
            new RubyScanner_1.RubyScanner(),
            new SwiftScanner_1.SwiftScanner(),
            new KotlinScanner_1.KotlinScanner(),
            new RustScanner_1.RustScanner(),
            new ScalaScanner_1.ScalaScanner()
        ];
        const engine = new RuleEngine_1.RuleEngine(scanners);
        // AI mode selection logic
        if (aiEnabled && geminiApiKey) {
            engine.setGeminiEnabled(true);
            engine.setGeminiApiKey(geminiApiKey);
        }
        else if (aiEnabled && vertexProjectId) {
            engine.setGeminiEnabled(true);
            engine.setVertexAIConfig({
                project: vertexProjectId,
                location: vertexLocation
            });
        }
        else {
            engine.setGeminiEnabled(false); // Only hardcoded rules
        }
        engine.setHardcodedEnabled(hardcodedEnabled);
        // Run the scan on the temp directory
        const violations = await engine.run(tempDir);
        // Clean up temporary files
        for (const filePath of filePaths) {
            try {
                fs.unlinkSync(filePath);
            }
            catch (error) {
                console.error(`Error deleting ${filePath}:`, error);
            }
        }
        // Parse violations into structured format
        const structuredViolations = violations.map(violation => {
            const ruleIdMatch = violation.match(/\[ruleId=([^\]]+)\]/);
            const ruleId = ruleIdMatch ? ruleIdMatch[1] : "UNKNOWN";
            const source = ruleId.startsWith("GEMINI") ? "gemini" : ruleId.startsWith("CLAUDE") ? "claude" : "rule";
            const baseFileMatch = violation.match(/\]\s+(.+?):(\d+)\s+-/);
            const baseFile = baseFileMatch ? baseFileMatch[1] : "Unknown";
            const baseLine = baseFileMatch ? parseInt(baseFileMatch[2]) : 0;
            const flowPathMatch = violation.match(/Flow Path:\s*([^\n]+)/i);
            const filesMatch = violation.match(/Files:\s*([^\n]+)/i);
            const flowPath = flowPathMatch ? flowPathMatch[1].trim() : undefined;
            const filesInvolved = filesMatch ? filesMatch[1].trim() : undefined;
            function cleanSeverity(severityRaw) {
                let s = (severityRaw || "MEDIUM").replace(/[\)"\s]+$/g, "").trim().toUpperCase();
                if (!["HIGH", "MEDIUM", "LOW"].includes(s))
                    s = "MEDIUM";
                return s;
            }
            function cleanFix(fixRaw, type, description) {
                let f = (fixRaw || "").trim();
                if (!f || f.toUpperCase() === "N/A") {
                    if (type && type.toLowerCase().includes("email")) {
                        return "Remove hardcoded email addresses and use configuration or environment variables.";
                    }
                    if (type && type.toLowerCase().includes("phone")) {
                        return "Remove hardcoded phone numbers and use configuration or environment variables.";
                    }
                    if ((type && type.toLowerCase().includes("api key")) || (description && description.toLowerCase().includes("api key"))) {
                        return "Move API keys to a secure configuration and rotate them immediately.";
                    }
                    if (type && type.toLowerCase().includes("consent")) {
                        return "Implement consent validation before processing user data.";
                    }
                    if (type && type.toLowerCase().includes("localstorage")) {
                        return "Encrypt the data before storing it in localStorage, or use a more secure storage mechanism.";
                    }
                    if (type && type.toLowerCase().includes("ssn")) {
                        return "Remove SSN collection or justify its necessity and obtain explicit consent.";
                    }
                    if (type && type.toLowerCase().includes("retention")) {
                        return "Implement an expiration mechanism for data stored in localStorage.";
                    }
                    // Add more generic suggestions as needed
                    return "Review and fix the privacy issue according to best practices.";
                }
                return f;
            }
            // First, try to parse AI response format (Gemini/Claude)
            const aiMatch = violation.match(/^([^:]+):\s*([^\n]+(?:\n(?!\n)[^\n]+)*)(?:\n\nSuggested Fix:\s*([^\n]+(?:\n(?!\n)[^\n]+)*))?(?:\n\nSeverity:\s*([^\n]+))?/s);
            if (aiMatch) {
                const type = aiMatch[1].trim();
                const description = aiMatch[2].trim();
                const fix = cleanFix(aiMatch[3], type, description);
                const severity = cleanSeverity(aiMatch[4]);
                // Extract file and line from the violation object
                const fileMatch = violation.match(/([\/\w\.-]+\.(?:js|ts|py|java|go|cs|php|rb|swift|kt|rs|scala)):(\d+)/);
                const file = fileMatch ? fileMatch[1] : baseFile;
                const line = fileMatch ? parseInt(fileMatch[2]) : baseLine;
                return {
                    language: "AI Detected",
                    file: file,
                    line: line,
                    type: type,
                    finding: description,
                    description: description,
                    fix: fix,
                    severity: severity,
                    source,
                    ruleId,
                    flowPath,
                    filesInvolved
                };
            }
            // Try to parse hardcoded rule output with Description, Fix, Severity
            const hardcodedMatch = violation.match(/^(\d+)\s*[–-]\s*([^:]+):?\s*(.*?)(?:\(found:\s*"([^"]+)"\))?\nDescription:\s*([\s\S]*?)\nFix:\s*([\s\S]*?)\nSeverity:\s*(HIGH|MEDIUM|LOW)/);
            if (hardcodedMatch) {
                return {
                    file: "Unknown",
                    line: parseInt(hardcodedMatch[1]),
                    type: hardcodedMatch[2].trim(),
                    finding: hardcodedMatch[4] || hardcodedMatch[3] || "N/A",
                    description: hardcodedMatch[5] || "N/A",
                    fix: cleanFix(hardcodedMatch[6], hardcodedMatch[2], hardcodedMatch[5]),
                    severity: cleanSeverity(hardcodedMatch[7]),
                    source,
                    ruleId,
                    flowPath,
                    filesInvolved
                };
            }
            // Try alternative AI response format with different spacing
            const altAiMatch = violation.match(/^([^:]+):\s*([^\n]+(?:\n(?!\n)[^\n]+)*)(?:\n+Suggested Fix:\s*([^\n]+(?:\n(?!\n)[^\n]+)*))?(?:\n+Severity:\s*([^\n]+))?/s);
            if (altAiMatch) {
                const type = altAiMatch[1].trim();
                const description = altAiMatch[2].trim();
                const fix = cleanFix(altAiMatch[3], type, description);
                const severity = cleanSeverity(altAiMatch[4]);
                // Extract file and line from the violation object
                const fileMatch = violation.match(/([\/\w\.-]+\.(?:js|ts|py|java|go|cs|php|rb|swift|kt|rs|scala)):(\d+)/);
                const file = fileMatch ? fileMatch[1] : baseFile;
                const line = fileMatch ? parseInt(fileMatch[2]) : baseLine;
                return {
                    language: "AI Detected",
                    file: file,
                    line: line,
                    type: type,
                    finding: description,
                    description: description,
                    fix: fix,
                    severity: severity,
                    source,
                    ruleId,
                    flowPath,
                    filesInvolved
                };
            }
            // Try to match the full format, including rule name/description and found value
            let match = violation.match(/^[\[]([^\]]+)\]\s+(.+?):(\d+)\s+-\s+([^-]+?)(?:\s+-\s+)?(?:.*?\(found:\s*"([^"]+)"([\s\S]*?)?\))?/s);
            if (match) {
                // Extract the found value, description, and fix (multi-line)
                let finding = match[5] ? match[5].trim() : "N/A";
                let extra = match[6] ? match[6].trim() : "";
                let description = "N/A";
                let fix = "N/A";
                // Extract Description and Fix from the extra text (multi-line)
                const descMatch = extra.match(/Description:\s*([\s\S]*?)(?:\n|$)/);
                const fixMatch = extra.match(/Fix:\s*([\s\S]*?)(?:\n|$)/);
                if (descMatch && descMatch[1].trim())
                    description = descMatch[1].trim();
                if (fixMatch && fixMatch[1].trim())
                    fix = fixMatch[1].trim();
                const type = match[4].trim().replace(/\s*\[ruleId=[^\]]+\]/, '');
                return {
                    language: match[1],
                    file: match[2],
                    line: parseInt(match[3]),
                    type,
                    finding,
                    description,
                    fix: cleanFix(fix, type, description),
                    severity: "MEDIUM", // Default for hardcoded rules
                    source,
                    ruleId,
                    flowPath,
                    filesInvolved
                };
            }
            // Fallback: try to extract file and line from anywhere in the string
            match = violation.match(/([\/\w\.-]+\.js):(\d+)/);
            if (match) {
                return {
                    language: "Unknown",
                    file: match[1],
                    line: parseInt(match[2]),
                    type: "Unknown",
                    finding: "N/A",
                    description: violation,
                    fix: "N/A",
                    severity: "MEDIUM",
                    source,
                    ruleId,
                    flowPath,
                    filesInvolved
                };
            }
            // Fallback: show the whole string
            return {
                language: "Unknown",
                file: baseFile,
                line: baseLine,
                type: "Unknown",
                finding: "N/A",
                description: violation,
                fix: "N/A",
                severity: "MEDIUM",
                source,
                ruleId,
                flowPath,
                filesInvolved
            };
        });
        // Sort violations by severity (HIGH → MEDIUM → LOW)
        structuredViolations.sort((a, b) => {
            const severityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
            const aOrder = severityOrder[a.severity?.toUpperCase()] || 0;
            const bOrder = severityOrder[b.severity?.toUpperCase()] || 0;
            return bOrder - aOrder; // Higher severity first
        });
        const scanId = crypto_1.default.randomUUID();
        scanStore.set(scanId, {
            files: storedFiles,
            createdAt: Date.now(),
            geminiConfig: {
                apiKey: geminiApiKey || undefined,
                vertexProjectId: vertexProjectId || undefined,
                vertexLocation: vertexLocation || undefined
            }
        });
        cleanupScanStore();
        let policyFindings = [];
        if (policyText && aiEnabled) {
            const geminiClient = createGeminiClient(geminiApiKey, vertexProjectId, vertexLocation);
            if (geminiClient) {
                policyFindings = await runPolicyComplianceCheck(policyText, storedFiles, geminiClient);
            }
        }
        // Return results
        res.json({
            success: true,
            violations: structuredViolations,
            policyFindings,
            scanId,
            totalFiles: files.length,
            totalViolations: violations.length
        });
    }
    catch (error) {
        console.error('Scan error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

app.post('/ask-gemini', async (req, res) => {
    try {
        const { scanId, question, violation } = req.body || {};
        if (!scanId || !question || !violation) {
            return res.status(400).json({ error: 'scanId, question, and violation are required' });
        }
        const scanData = scanStore.get(scanId);
        if (!scanData) {
            return res.status(404).json({ error: 'Scan data not found or expired' });
        }
        const geminiClient = createGeminiClient(scanData.geminiConfig?.apiKey, scanData.geminiConfig?.vertexProjectId, scanData.geminiConfig?.vertexLocation);
        if (!geminiClient) {
            return res.status(400).json({ error: 'Gemini is not configured for this scan' });
        }
        const fileContext = findFileContext(scanData.files, violation.file, violation.line);
        const prompt = buildAskGeminiPrompt(question, violation, fileContext);
        const response = await geminiClient.models.generateContent({
            model: process.env.GEMINI_MODEL || 'gemini-3-pro-preview',
            contents: prompt
        });
        res.json({ answer: response.text || "" });
    }
    catch (error) {
        console.error('Ask Gemini error:', error);
        res.status(500).json({ error: 'Failed to get Gemini response' });
    }
});

function cleanupScanStore() {
    const now = Date.now();
    for (const [key, value] of scanStore.entries()) {
        if (now - value.createdAt > scanStoreTtlMs) {
            scanStore.delete(key);
        }
    }
}

function createGeminiClient(apiKey, vertexProjectId, vertexLocation) {
    if (apiKey) {
        return new genai_1.GoogleGenAI({ apiKey });
    }
    if (vertexProjectId) {
        return new genai_1.GoogleGenAI({
            vertexai: true,
            project: vertexProjectId,
            location: vertexLocation || 'global'
        });
    }
    return null;
}

function findFileContext(files, filePath, line) {
    const file = files.find(f => f.path === filePath);
    if (!file || !line) {
        return "";
    }
    const lines = file.content.split('\n');
    const start = Math.max(line - 6, 0);
    const end = Math.min(line + 4, lines.length);
    return lines.slice(start, end).map((l, idx) => `${start + idx + 1}: ${l}`).join('\n');
}

function buildAskGeminiPrompt(question, violation, fileContext) {
    return `
You are a privacy compliance expert. Answer the user's question about a specific violation.

Violation:
- Type: ${violation.type}
- Severity: ${violation.severity}
- File: ${violation.file}
- Line: ${violation.line}
- Description: ${violation.description}
- Fix: ${violation.fix}
- Flow Path: ${violation.flowPath || "N/A"}

Code Context:
${fileContext || "No code context available."}

User Question:
${question}
`.trim();
}

async function runPolicyComplianceCheck(policyText, files, geminiClient) {
    const maxTotalChars = 30000;
    const maxFileChars = 5000;
    let totalChars = 0;
    const fileSections = [];
    for (const file of files) {
        if (totalChars >= maxTotalChars) {
            break;
        }
        const content = file.content.length > maxFileChars
            ? `${file.content.slice(0, maxFileChars)}\n/* ... truncated ... */`
            : file.content;
        const section = `\n// FILE: ${file.path}\n${content}\n`;
        totalChars += section.length;
        fileSections.push(section);
    }
    const prompt = `
You are a privacy compliance auditor. Compare the privacy policy text with the codebase and
find any contradictions where the code violates the policy promises.

Policy:
${policyText}

Codebase:
${fileSections.join('\n')}

Return ONLY a JSON array in this exact format:
[
  {
    "id": "PC-1",
    "policy_claim": "We do not share personal data with third parties.",
    "evidence": "tracking.js sends user email to api.mixpanel.com without consent.",
    "severity": "HIGH | MEDIUM | LOW",
    "fix": "Update code to stop third-party sharing or update the policy to reflect actual behavior."
  }
]

Rules:
- Only report clear contradictions between policy and code
- If none are found, return []
`.trim();
    const response = await geminiClient.models.generateContent({
        model: process.env.GEMINI_MODEL || 'gemini-3-pro-preview',
        contents: prompt
    });
    const text = response.text || "";
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
        return [];
    }
    try {
        const parsed = JSON.parse(jsonMatch[0]);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch (error) {
        console.warn('Failed to parse policy compliance JSON:', error);
        return [];
    }
}
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});
app.listen(port, () => {
    console.log(`🔒 PrivacySDK Web Server running on port ${port}`);
    console.log(`🌐 Open http://localhost:${port} to use the web interface`);
});
exports.default = app;
