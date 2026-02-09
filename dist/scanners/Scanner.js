"use strict";
/**
 * Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
* Licensed under the MIT License with the Commons Clause.
*
* This file is provided for personal, educational, and non-commercial use only.
* Commercial use including selling, sublicensing, internal deployment in for-profit
* environments, SaaS integration, or submission to hackathons, accelerators, or competitive evaluations—is strictly prohibited without a commercial license.
*
* For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE.
* Commercial use is prohibited without a license.
* To request a Commercial License or integration approval, contact: nabanita@privacylicense.com | https://privacylicense.ai
 *
 *
 *
 * Scanner - Base Interface for Multi-Language File Scanning
 *
 * The Scanner interface defines the contract for language-specific file scanners in PrivacySDK.
 * Each scanner is responsible for discovering and processing files of a specific programming
 * language, enabling comprehensive privacy violation detection across diverse codebases.
 *
 * Key Responsibilities:
 * - File Discovery: Recursively scan directories for language-specific files
 * - Content Extraction: Read and prepare file content for analysis
 * - Language Identification: Provide language context for violation reporting
 * - Path Filtering: Exclude irrelevant directories and files
 *
 * Architecture:
 * - Interface-based design for extensibility
 * - Async file processing for performance
 * - Standardized file representation for rule engines
 * - Configurable path exclusion for optimization
 *
 * File Processing:
 * - ScannedFile interface provides consistent file representation
 * - Content extraction handles various file encodings
 * - Path normalization for cross-platform compatibility
 * - Error handling for file access issues
 *
 * Integration:
 * - Used by RuleEngine for multi-language scanning
 * - Supports 12+ programming languages
 * - Enables unified privacy analysis across tech stacks
 * - Facilitates scalable codebase analysis
 *
 * Performance Considerations:
 * - Async processing for large codebases
 * - Path filtering to reduce unnecessary file reads
 * - Efficient file content extraction
 * - Memory-conscious file handling
 *
 * @author PrivacySDK
 * @version 1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGNORED_PATHS = void 0;
exports.IGNORED_PATHS = ['tools/privacy-vulnerability-checker', 'node_modules', '.git'];
