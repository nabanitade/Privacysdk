"use strict";
/**
 * Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
* Licensed under the MIT License with the Commons Clause.
* This file is provided for personal, educational, and non-commercial use only.
* Commercial use including selling, sublicensing, internal deployment in for-profit
* environments, SaaS integration, or submission to hackathons, accelerators, or competitive evaluations—is strictly prohibited without a commercial license.
*
* For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE.
* Commercial use is prohibited without a license.
* To request a Commercial License or integration approval, contact: nabanita@privacylicense.com | https://privacylicense.ai
*
 * RuleEngine - Core Privacy Scanning Engine
 *
 * The RuleEngine is the central orchestrator of PrivacySDK's privacy violation detection system.
 * It manages a collection of privacy rules and scanners to provide comprehensive privacy compliance
 * analysis across multiple programming languages and file types.
 *
 * Key Features:
 * - Orchestrates 10+ privacy rule engines for comprehensive violation detection
 * - Manages multi-language scanners for 12+ programming languages
 * - Provides hybrid AI + hardcoded rule scanning capabilities
 * - Implements robust fallback mechanisms for reliability
 * - Offers configurable scanning modes and rule management
 *
 * Architecture:
 * - Rule-based detection using pattern matching and validation
 * - AI-enhanced analysis via Google Gemini (optional)
 * - Multi-language support through specialized scanners
 * - Hybrid approach combining traditional and AI-powered detection
 *
 * Rule Types Managed:
 * - PII Detection: Email addresses, SSN, credit cards, phone numbers
 * - Privacy Policy: GDPR/CCPA compliance violations
 * - Consent Management: Explicit consent marker validation
 * - Encryption & Security: Data protection and encryption checks
 * - Data Flow: Sensitive data handling and retention
 * - Advanced Privacy: Complex data-flow and context-aware violations
 * - AI-Powered: Intelligent analysis and explanations
 * - Developer Guidance: Real-time privacy impact assessment
 *
 * Supported Languages:
 * - JavaScript, TypeScript, Java, Python, Go, C#
 * - PHP, Ruby, Swift, Kotlin, Rust, Scala
 *
 * Configuration Options:
 * - GEMINI_ENABLED: Enable/disable AI scanning
 * - HARDCODED_RULES_ENABLED: Enable/disable hardcoded rules
 * - GOOGLE_CLOUD_PROJECT: Vertex AI project configuration
 * - GEMINI_API_KEY: Google AI API key for direct access
 *
 * Usage:
 * The RuleEngine processes code files through multiple rule engines,
 * combining traditional pattern-based detection with AI-powered analysis
 * to provide comprehensive privacy violation detection and remediation guidance.
 *
 * Fallback System:
 * - Always runs hardcoded rules regardless of AI availability
 * - Gracefully falls back when AI services are unavailable
 * - Provides consistent results across different environments
 * - Maintains reliability in production deployments
 *
 * @author PrivacySDK
 * @version 1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEngine = void 0;
const PiiRule_1 = require("./rules/PiiRule");
const PrivacyPolicyRule_1 = require("./rules/PrivacyPolicyRule");
const PiiDetectionRule_1 = require("./rules/PiiDetectionRule");
const AiPrivacyRule_1 = require("./rules/AiPrivacyRule");
const DeveloperGuidanceRule_1 = require("./rules/DeveloperGuidanceRule");
const GeminiPrivacyRule_1 = require("./rules/GeminiPrivacyRule");
const ConsentRule_1 = require("./rules/ConsentRule");
const EncryptionRule_1 = require("./rules/EncryptionRule");
const DataFlowRule_1 = require("./rules/DataFlowRule");
const AdvancedPrivacyRule_1 = require("./rules/AdvancedPrivacyRule");
class RuleEngine {
    constructor(scanners) {
        this.scanners = scanners;
        this.hardcodedEnabled = true;
        this.rules = [
            // Core PII Detection Rules
            new PiiRule_1.PiiRule(),
            new PiiDetectionRule_1.PiiDetectionRule(),
            // Privacy Policy and Compliance Rules
            new PrivacyPolicyRule_1.PrivacyPolicyRule(),
            new ConsentRule_1.ConsentRule(),
            // Security and Encryption Rules
            new EncryptionRule_1.EncryptionRule(),
            // Data Flow and Handling Rules
            new DataFlowRule_1.DataFlowRule(),
            // Advanced Privacy Rules
            new AdvancedPrivacyRule_1.AdvancedPrivacyRule(),
            // AI-Powered Rules
            new AiPrivacyRule_1.AiPrivacyRule(),
            new DeveloperGuidanceRule_1.DeveloperGuidanceRule(),
            new GeminiPrivacyRule_1.GeminiPrivacyRule({ enabled: false }) // Disabled by default, can be enabled via config
        ];
    }
    async run(projectPath) {
        const violations = [];
        const allFiles = [];
        for (const scanner of this.scanners) {
            const files = await scanner.scanFiles(projectPath);
            allFiles.push(...files);
        }
        const fileMap = new Map();
        for (const file of allFiles) {
            if (!fileMap.has(file.path)) {
                fileMap.set(file.path, file);
            }
        }
        for (const file of fileMap.values()) {
            for (const rule of this.rules) {
                if (!this.hardcodedEnabled && rule.id !== "GEMINI001") {
                    continue;
                }
                const fileViolations = await rule.evaluate(file.content, file.path);
                for (const violation of fileViolations) {
                    violations.push(`[${this.getLanguageForFile(file.path)}] ${file.path}:${violation.line} - ${rule.description} [ruleId=${rule.id}] (found: "${violation.match}")`);
                }
            }
        }
        const geminiRule = this.rules.find(rule => rule.id === "GEMINI001");
        if (geminiRule && geminiRule.isAvailable()) {
            const crossFileViolations = await geminiRule.analyzeCrossFile(Array.from(fileMap.values()));
            for (const violation of crossFileViolations) {
                violations.push(`[Cross-File] Cross-File Data Flow:1 - Gemini 3 Cross-File Data Flow [ruleId=GEMINI_CROSS_FILE] (found: "${violation.match}")`);
            }
        }
        return violations;
    }
    getLanguageForFile(filePath) {
        const extension = (filePath.split('.').pop() || "").toLowerCase();
        const extensionMap = {
            js: "JavaScript",
            ts: "TypeScript",
            java: "Java",
            py: "Python",
            go: "Go",
            cs: "C#",
            php: "PHP",
            rb: "Ruby",
            swift: "Swift",
            kt: "Kotlin",
            rs: "Rust",
            scala: "Scala"
        };
        return extensionMap[extension] || "Unknown";
    }
    // Method to enable/disable Gemini scanning
    setGeminiEnabled(enabled) {
        const geminiRule = this.rules.find(rule => rule.id === "GEMINI001");
        if (geminiRule) {
            geminiRule.setEnabled(enabled);
        }
    }
    // Method to set Gemini API key
    setGeminiApiKey(apiKey) {
        const geminiRule = this.rules.find(rule => rule.id === "GEMINI001");
        if (geminiRule && typeof geminiRule.setApiKey === 'function') {
            geminiRule.setApiKey(apiKey);
        }
    }
    // Method to set Vertex AI configuration
    setVertexAIConfig(config) {
        const geminiRule = this.rules.find(rule => rule.id === "GEMINI001");
        if (geminiRule) {
            geminiRule.setVertexAIConfig(config);
        }
    }
    setHardcodedEnabled(enabled) {
        this.hardcodedEnabled = enabled;
    }
    // Method to check if Gemini is available
    isGeminiAvailable() {
        const geminiRule = this.rules.find(rule => rule.id === "GEMINI001");
        return geminiRule ? geminiRule.isAvailable() : false;
    }
    // Method to get rule statistics
    getRuleStats() {
        return {
            totalRules: this.rules.length,
            ruleTypes: this.rules.map(rule => rule.description)
        };
    }
}
exports.RuleEngine = RuleEngine;
