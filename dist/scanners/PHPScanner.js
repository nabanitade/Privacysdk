"use strict";
// Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
// Licensed under the MIT License with the Commons Clause.
// This file is provided for personal, educational, and non-commercial use only.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHPScanner = void 0;
// Commercial use including selling, sublicensing, internal deployment in for-profit
// environments, SaaS integration, or submission to hackathons, accelerators, or competitive evaluations—is strictly prohibited without a commercial license.
// For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE.
// Commercial use is prohibited without a license.
// To request a Commercial License or integration approval, contact: nabanita@privacylicense.com | https://privacylicense.ai
const Scanner_1 = require("./Scanner");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
class PHPScanner {
    constructor() {
        this.language = "PHP";
    }
    async scanFiles(dir) {
        return this.getFilesWithExtension(dir, ".php");
    }
    async getFilesWithExtension(dir, ext) {
        let files = [];
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            // Skip ignored paths
            if (Scanner_1.IGNORED_PATHS.some(ignored => fullPath.includes(ignored))) {
                continue;
            }
            if (entry.isDirectory()) {
                files = files.concat(await this.getFilesWithExtension(fullPath, ext));
            }
            else if (entry.name.endsWith(ext)) {
                const content = await fs.readFile(fullPath, "utf-8");
                files.push({ path: fullPath, content });
            }
        }
        return files;
    }
}
exports.PHPScanner = PHPScanner;
