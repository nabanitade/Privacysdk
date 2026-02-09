"use strict";
// Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
// Licensed under the MIT License modified with the Commons Clause.
// For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE.
// Commercial use is prohibited without a license.
// Contact for Commercial License: nabanita@privacylicense.com | https://privacylicense.ai
Object.defineProperty(exports, "__esModule", { value: true });
const RuleEngine_1 = require("./ruleEngine/RuleEngine");
const JavaScanner_1 = require("./scanners/JavaScanner");
const GoScanner_1 = require("./scanners/GoScanner");
const TypeScriptScanner_1 = require("./scanners/TypeScriptScanner");
const PythonScanner_1 = require("./scanners/PythonScanner");
const JavaScriptScanner_1 = require("./scanners/JavaScriptScanner");
const CSharpScanner_1 = require("./scanners/CSharpScanner");
const PHPScanner_1 = require("./scanners/PHPScanner");
const RubyScanner_1 = require("./scanners/RubyScanner");
const SwiftScanner_1 = require("./scanners/SwiftScanner");
const KotlinScanner_1 = require("./scanners/KotlinScanner");
const RustScanner_1 = require("./scanners/RustScanner");
const ScalaScanner_1 = require("./scanners/ScalaScanner");
const projectPath = process.argv[2] || '.';
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
// Configure Gemini if enabled
const geminiEnabled = process.env.GEMINI_ENABLED === 'true' || process.argv.includes('--gemini');
const geminiApiKey = process.env.GEMINI_API_KEY;
const googleCloudProject = process.env.GOOGLE_CLOUD_PROJECT;
const googleCloudLocation = process.env.GOOGLE_CLOUD_LOCATION;
const useVertexAI = process.env.GOOGLE_GENAI_USE_VERTEXAI === 'true';
if (geminiEnabled) {
    if (useVertexAI && googleCloudProject) {
        // Use Vertex AI with Google Cloud authentication
        engine.setGeminiEnabled(true);
        engine.setVertexAIConfig({
            project: googleCloudProject,
            location: googleCloudLocation || 'us-central1'
        });
        console.log("🤖 Google Gemini AI scanning enabled via Vertex AI");
    }
    else if (geminiApiKey) {
        // Use Gemini Developer API with API key
        engine.setGeminiApiKey(geminiApiKey);
        engine.setGeminiEnabled(true);
        console.log("🤖 Google Gemini AI scanning enabled via Developer API");
    }
    else {
        console.warn("⚠️  Gemini enabled but no authentication configured. Falling back to hardcoded rules.");
        console.warn("   For Vertex AI: Set GOOGLE_CLOUD_PROJECT and GOOGLE_GENAI_USE_VERTEXAI=true");
        console.warn("   For Developer API: Set GEMINI_API_KEY");
    }
}
else {
    console.log("🔧 Using hardcoded privacy rules");
}
engine.run(projectPath).then((violations) => {
    if (violations.length > 0) {
        console.log("\n" + "=".repeat(80));
        console.log("🔍 PrivacySDK PRIVACY VULNERABILITIES CHECKER - SCAN RESULTS");
        console.log("=".repeat(80));
        // Group violations by language
        const violationsByLanguage = {};
        violations.forEach(v => {
            const match = v.match(/^\[([^\]]+)\]/);
            const language = match ? match[1] : 'Unknown';
            if (!violationsByLanguage[language]) {
                violationsByLanguage[language] = [];
            }
            violationsByLanguage[language].push(v);
        });
        // Display violations by language
        Object.keys(violationsByLanguage).forEach(language => {
            const langViolations = violationsByLanguage[language];
            console.log(`\n📁 ${language.toUpperCase()} FILES (${langViolations.length} violations)`);
            console.log("-".repeat(60));
            langViolations.forEach((violation, index) => {
                const cleanViolation = violation.replace(/^\[\w+\]\s+/, '');
                const [fileInfo, ...details] = cleanViolation.split(' - ');
                console.log(`\n${index + 1}. ${fileInfo}`);
                console.log(`   ${details.join(' - ')}`);
            });
        });
        console.log("\n" + "=".repeat(80));
        console.log(`📊 SUMMARY: ${violations.length} total violations found`);
        if (engine.isGeminiAvailable()) {
            console.log("🤖 Enhanced with Google Gemini AI for comprehensive analysis");
        }
        else {
            console.log("🔧 Analysis completed using hardcoded privacy rules");
        }
        console.log("=".repeat(80) + "\n");
        process.exit(1);
    }
    else {
        console.log("\n" + "=".repeat(80));
        console.log("✅ PrivacySDK PRIVACY VULNERABILITIES CHECKER - SCAN COMPLETE");
        console.log("=".repeat(80));
        console.log("🎉 No privacy violations found in your codebase!");
        if (engine.isGeminiAvailable()) {
            console.log("🤖 Scan completed using Google Gemini AI for comprehensive privacy analysis");
        }
        else {
            console.log("🔧 Scan completed using hardcoded privacy rules");
        }
        console.log("=".repeat(80) + "\n");
    }
});
