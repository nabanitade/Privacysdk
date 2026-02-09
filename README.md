# PrivacySDK

-----------

Privacy vulnerabilities hiding in your code could cost millions in fines tomorrow. What if you could catch them today, as easily as fixing a typo, **before they are checked into production**?
PrivacySDK transforms privacy compliance from a legal nightmare into a seamless part of your development workflow. Instead of scrambling to fix privacy issues after they're discovered in production, our AI-powered tool catches them the moment they're written—turning compliance into code quality.

**🎯 What This Project Does:**

PrivacySDK is a comprehensive Privacy Vulnerabilities Checker that integrates directly into your existing DevSecOps pipelines in minutes. It continuously scans your codebase using a powerful combination of traditional pattern-based detection and AI, identifying privacy and security vulnerabilities before they reach production. The tool provides instant, regulation-specific feedback mapped to GDPR, CCPA, HIPAA, and other major privacy frameworks, making compliance violations as obvious and fixable as syntax errors.

## ✨ Key Features

1. **Seamless Integration**: Embed privacy-by-design principles directly into your SDLC without disrupting existing workflows. Deploy through GitLab CI/CD, GitHub Actions, or any DevOps pipeline in minutes.
2. **Intelligent Detection**: Dual-powered scanning combines hardcoded compliance rules with Google Gemini 3 Pro Preview (Vertex AI) for comprehensive coverage across 12+ programming languages.
3. **Actionable Insights**: Get specific, regulation-mapped findings that tell you exactly what's wrong and how to fix it—no legal degree required.
4. **Real-Time Feedback**: Catch privacy issues at the source with instant alerts in your development environment, making privacy compliance as natural as code linting.
5. **Enterprise-Ready**: Built for scale with support for complex codebases and enterprise security requirements.

Make privacy compliance as effortless as running your tests. Because in today's regulatory landscape, privacy isn't just good practice—it's essential infrastructure.

## 📊 **See It In Action**

Want to see what PrivacySDK can detect? Check out our **[sample reports](/reports)** folder which contains:

- **3 sample files** with intentional privacy vulnerabilities (JavaScript, Python, Java)
- **Detailed scan reports** showing exactly what the tool detects
- **45 total vulnerabilities** found across different domains (healthcare, finance, user management)
- **Compliance violations** mapped to GDPR, HIPAA, PCI DSS, and CCPA
- **Actionable recommendations** for each detected issue

**Sample files include:**
- `user-service.js` - User management system with hardcoded secrets and PII exposure
- `payment-processor.py` - Payment processing with PCI DSS violations and credit card data exposure  
- `healthcare-api.java` - Healthcare system with HIPAA violations and PHI exposure

**Key findings demonstrated:**
- **30 Critical vulnerabilities** (hardcoded secrets, PII exposure, data breaches)
- **12 High severity issues** (weak encryption, SQL injection, insecure transmission)
- **Multi-language detection** across JavaScript, Python, and Java
- **Compliance mapping** to specific regulatory requirements
- **Detailed remediation guidance** for each violation

This gives you a comprehensive view of the tool's capabilities and the types of privacy issues it can help you prevent in your own codebase.

-----------

# Copyright (c) 2025 PrivacySDK by Privacy License. All rights reserved.
# Licensed under the MIT License.
For complete license terms, see the [LICENSE](LICENSE) file.
---

## 🎯 **Problems This Tool Solves**

### **For Developers:**
- **Early detection**: Catches privacy violations before they reach production
- **Real-time feedback**: Provides immediate guidance during development
- **Compliance education**: Teaches developers about privacy best practices
- **Automated scanning**: No manual effort required for privacy checks

### **For Organizations:**
- **Regulatory compliance**: Ensures GDPR, CCPA, HIPAA compliance
- **Risk mitigation**: Prevents costly privacy violations and data breaches
- **Audit trail**: Provides comprehensive documentation for compliance audits
- **Cost savings**: Reduces manual privacy review overhead

### **For DevSecOps Teams:**
- **Shift Privacy Left**: Integrates privacy checks into existing CI/CD workflows
- **Automated enforcement**: Enforces privacy policies automatically
- **Scalable solution**: Works across multiple projects and teams
- **Integration ready**: Fits into existing GitLab/GitHub workflows

---

## 🎯 **Use Cases**

### **1. Pre-commit Privacy Checks**
- Developers run the tool locally before committing code
- Catches privacy violations early in the development cycle
- Provides immediate feedback and guidance

### **2. CI/CD Pipeline Integration**
- Automated privacy scanning on every merge request
- Real-time feedback in GitLab merge request comments
- Automatic issue creation for high-severity violations

### **3. Compliance Auditing**
- Comprehensive scanning of entire codebases
- Detailed reports for regulatory compliance
- Documentation for audit trails

### **4. Developer Education**
- Teaches developers about privacy best practices
- Provides context about privacy regulations
- Offers specific fixes and guidance

### **5. Risk Assessment**
- Identifies privacy risks in codebases
- Prioritizes violations by severity
- Helps organizations understand their privacy posture

---

## 🛠️ **Technical Architecture**

### **Core Components:**
- **Rule Engine**: Pattern-based detection with 10+ rule types
- **AI Integration**: Google Gemini 3 Pro Preview via Vertex AI
- **File Processor**: Intelligent chunking and processing for large codebases
- **CI/CD Integration**: GitLab pipeline integration with real-time feedback
- **Reporting Engine**: Comprehensive violation reporting and compliance documentation

### **Supported Technologies:**
- **Languages**: JavaScript, TypeScript, Java, Python, Go, C#, PHP, Ruby, Swift, Kotlin, Rust, Scala and more
- **Frameworks**: React, Angular, Vue, Node.js, Spring, Django, etc.
- **Platforms**: GitLab CI/CD, GitHub Actions, Jenkins, Azure DevOps
- **Cloud**: Google Cloud (Vertex AI), AWS, Azure

### **Configuration Options:**
- **Environment-based**: All configuration via environment variables
- **Flexible deployment**: Works in any environment with Node.js
- **Scalable**: Handles codebases of any size with intelligent chunking
- **Secure**: No hardcoded secrets or project names

---

## 🚀 **Production Ready Features**

- **Robust error handling**: Graceful fallbacks when AI is unavailable
- **Comprehensive testing**: 34 test cases covering all major rules
- **Performance optimized**: Intelligent chunking for large codebases
- **Security focused**: No hardcoded secrets or sensitive data
- **Documentation complete**: Comprehensive README with setup and usage instructions
- **CI/CD ready**: Full GitLab integration with automated workflows
- **Scalable architecture**: Handles codebases of any size
- **Multi-language support**: Works across multiple programming languages

---


## **Detailed Technical features**

### 🔍 **Enhanced File Tracking**
- **Clear file identification**: Each file being analyzed is clearly identified in the output
- **Sequential processing**: Files are processed in order with detailed progress tracking
- **Line number context**: Line numbers are shown relative to each specific file
- **Chunk-based analysis**: Large files are processed in 200-line chunks for optimal performance

**Example Output:**
```
📄 Processing UserEmailService.java (29 lines) with Vertex AI in 1 chunks
🤖 Analyzing UserEmailService.java lines 1-29 (29 total lines, 24 code lines)
✅ Vertex AI analysis complete for UserEmailService.java. Found 3 AI-detected violations
```

### 🤖 **AI-Powered Analysis**
- Uses Google Gemini 3 Pro Preview via Vertex AI for intelligent privacy violation detection
- Provides detailed explanations with specific fixes and regulatory references
- **Robust fallback mechanism**: Always runs comprehensive hardcoded rules regardless of AI availability
- **Hybrid approach**: Combines AI insights with traditional pattern-based detection for maximum coverage
- Configurable via environment variables

### 📋 **Comprehensive Rule Set**
- **10+ hardcoded rule engines** that always run for reliable detection
- 50+ PII detection patterns (SSN, credit cards, phone numbers, etc.)
- GDPR/CCPA compliance validation
- Consent mechanism verification
- Encryption and security best practices
- Data flow and retention policy checks
- **AI enhancement**: Additional intelligent analysis when Gemini is available

### 🛡️ **Hardcoded Rules (Always Active)**

The tool includes 10 comprehensive hardcoded rule engines that provide reliable privacy violation detection:

#### 🔍 **1. Basic PII Rule (PiiRule)**
**Purpose**: Foundational email address detection and validation
- **Detection Capabilities**:
  - Standard email address formats (user@domain.com)
  - Hardcoded email strings in variable assignments
  - Email addresses in configuration files and comments
  - Email exposure in code validation
- **Privacy Laws Addressed**: GDPR Article 4 (Definitions), CCPA Section 1798.140 (Definitions)
- **Key Features**: Simple and reliable detection using standard email regex patterns
- **Use Case**: Basic building block for PII detection, focusing specifically on email addresses

#### 🔍 **2. Comprehensive PII Detection Rule (PiiDetectionRule)**
**Purpose**: Advanced detection of 50+ PII types across multiple categories
- **Detection Capabilities**:
  - **Personal Identifiers**: SSN (US and international formats), Passport numbers, Driver's licenses
  - **Financial Information**: Credit card numbers (all major card types), Bank account numbers
  - **Government IDs**: National IDs, Tax IDs, various government identification formats
  - **Address Information**: Street addresses, ZIP codes, Postal codes (international)
  - **Medical Information**: Medical record numbers, Health codes, Medical licenses
  - **Biometric Data**: Fingerprints, DNA, Face recognition, Biometric hashes
  - **API Keys**: Personal API keys, tokens with personal information
  - **Database Schemas**: Sensitive field detection in database schemas
  - **Data Flow Tracking**: PII in logging, console logs, data flows
- **Privacy Laws Addressed**: GDPR Article 4 & 9, CCPA Section 1798.140, HIPAA, Regional data protection laws
- **Key Features**: Regex-based pattern matching with validation algorithms, context-aware detection
- **Use Case**: Comprehensive scanning for hardcoded PII and flags violations when personal data is inappropriately stored or exposed

#### 📜 **3. Privacy Policy Rule (PrivacyPolicyRule)**
**Purpose**: GDPR/CCPA compliance violation detection and validation
- **Detection Capabilities**:
  - **GDPR "Right to be forgotten" violations**: Hardcoded user deletion queries without proper authorization
  - **CCPA "Do not sell" violations**: Data selling patterns, third-party data sharing
  - **Data minimization violations**: Excessive data collection beyond stated purposes
  - **Consent violations**: Disabled opt-out mechanisms, forced consent patterns
  - **Data retention violations**: Improper data retention practices
  - **Data sharing violations**: Non-compliant data sharing patterns
- **Privacy Laws Addressed**: GDPR Article 17 (Right to erasure), Article 5 (Principles), Article 6 (Lawfulness), CCPA Sections 1798.120, 1798.115, 1798.110
- **Key Features**: Automated pattern recognition for compliance violations, legal compliance tracking
- **Use Case**: Ensures applications respect user privacy rights and implement compliant data handling practices

#### 🔐 **4. Consent Rule (ConsentRule)**
**Purpose**: Explicit consent marker validation and consent mechanism enforcement
- **Detection Capabilities**:
  - **Explicit consent violations**: Data capture without @consent_required annotation
  - **Purpose limitation violations**: PII fields without data_purpose= specification
  - **Profiling violations**: Profiling models not excluding opt-out users
  - **Consent withdrawal violations**: Missing consent withdrawal mechanisms
  - **Granular consent violations**: Inadequate consent granularity
  - **Audit trail violations**: Lack of consent audit trails
- **Required Annotations**:
  - `@consent_required`: Must precede any data capture
  - `data_purpose=`: Every PII field needs purpose specification
  - `profiling_disabled=true`: For users who opt out of profiling
- **Privacy Laws Addressed**: GDPR Article 7 (Conditions for consent), Article 6 (Lawfulness), Article 22 (Automated decisions), CCPA Section 1798.120
- **Key Features**: Validates consent annotations and flags violations when consent mechanisms are missing or inadequate
- **Use Case**: Ensures proper consent mechanisms are in place before collecting, processing, or storing personal data

#### 🔐 **5. Encryption Rule (EncryptionRule)**
**Purpose**: Security and encryption violation detection for sensitive data handling
- **Detection Capabilities**:
  - **Encryption-at-rest violations**: Writes to sensitive tables without encryption
  - **TLS violations**: HTTP (non-HTTPS) traffic with tainted data
  - **Hash/tokenize violations**: Raw email/phone numbers used as primary keys
  - **Rate limiting violations**: Public endpoints returning personal data without rate limiting
  - **Key management violations**: Weak encryption algorithms, insecure key storage
  - **Missing encryption**: Sensitive fields without encryption specification
- **Required Functions**:
  - `apply_rate_limit()`: Required for public endpoints returning personal data
  - `encrypt()`: Must be used for sensitive data at rest
  - `hash()`/`tokenize()`: Required for unique identifiers
  - `HTTPS`: Mandatory for all data transmission
- **Privacy Laws Addressed**: GDPR Article 32 (Security of processing), Article 34 (Data breach communication), CCPA Section 1798.150, SOC2, ISO27001
- **Key Features**: Validates appropriate security measures and encryption best practices
- **Use Case**: Ensures personal data is properly encrypted at rest, in transit, and during processing

#### 🌊 **6. Data Flow Rule (DataFlowRule)**
**Purpose**: Data flow and handling violation detection throughout application lifecycle
- **Detection Capabilities**:
  - **Sensitive payload violations**: PII flowing from source to sink without proper masking/anonymization
  - **Logging violations**: Raw PII logging, unsanitized stack traces
  - **Third-party violations**: Third-party integration without proper data protection
  - **Retention violations**: Queries to retained tables without deletion/TTL mechanisms
  - **DSAR violations**: Missing DSAR registration for new personal data writes
  - **Anonymization violations**: Inadequate data anonymization practices
- **Required Functions**:
  - `mask()`/`anonymize()`: Must be used for PII in data flows
  - `register_dsar()`: Required for new personal data writes
  - `sanitize_stack_trace()`: For error handling
  - `apply_retention_policy()`: For data lifecycle management
- **Privacy Laws Addressed**: GDPR Article 5 (Principles), Article 17 (Right to erasure), Article 20 (Data portability), CCPA Sections 1798.110, 1798.115
- **Key Features**: Monitors and validates how personal data flows through the application
- **Use Case**: Ensures personal data is handled securely throughout its lifecycle with proper data handling functions

#### 🚀 **7. Advanced Privacy Rule (AdvancedPrivacyRule)**
**Purpose**: Complex data-flow and context-aware privacy violations detection
- **Detection Capabilities**:
  - **Field-level scoping violations**: PII field access without proper @scope directive
  - **Ad/tracking violations**: Tracking code on privacy opt-out pages
  - **Region-lock violations**: Cloud SDK calls shipping EU data outside EEA
  - **Join-safety violations**: Unsafe joins between large PII tables
  - **ML pipeline violations**: ML training jobs loading unused sensitive columns
  - **Version violations**: API version changes without PII field updates
  - **Privilege violations**: Database columns not referenced elsewhere
- **Required Annotations**:
  - `@scope`: Field-level access scoping for PII fields
  - `@purpose`: Purpose limitation enforcement
  - `consent=opt_out`: For users who opt out of profiling
- **Privacy Laws Addressed**: GDPR Article 25 (Privacy by design), Article 32 (Security), CCPA Section 1798.100
- **Key Features**: Goes beyond simple pattern matching to understand data relationships and processing contexts
- **Use Case**: Implements advanced privacy violation detection for sophisticated compliance requirements

#### 🤖 **8. AI Privacy Rule (AiPrivacyRule)**
**Purpose**: AI-powered explanations and fixes for privacy violations
- **Detection Capabilities**:
  - **Hardcoded credentials**: Passwords, secrets, keys, tokens in source code
  - **Excessive data collection**: Collecting more personal data than necessary
  - **PII in logs**: Logging personal information without masking
  - **Third-party sharing**: Data sharing without proper consent and agreements
  - **Incomplete deletion**: Permanent deletion without proper verification
  - **Disabled opt-out**: Opt-out mechanisms that are disabled
  - **Excessive backup**: Backing up all personal data without purpose limitation
- **Guidance Features**:
  - Plain-English explanations of privacy violations
  - Specific code fixes that maintain functionality
  - Context about privacy laws being violated
  - References to specific GDPR/CCPA articles
  - Step-by-step fix instructions with code examples
- **Privacy Laws Addressed**: All GDPR articles and CCPA sections with specific references
- **Key Features**: Provides enhanced explanations and actionable guidance for privacy compliance
- **Use Case**: Helps developers understand not just what is wrong, but why it matters and how to fix it

#### 🧑‍💻 **9. Developer Guidance Rule (DeveloperGuidanceRule)**
**Purpose**: Real-time developer guidance and privacy impact assessment
- **Detection Capabilities**:
  - **Object creation violations**: Creating objects that may contain PII
  - **Data storage violations**: Storing personal data without proper policies
  - **Communication violations**: Sending communications with personal data
  - **Data export violations**: Exporting data with personal information
  - **API endpoint violations**: API endpoints that handle personal data
  - **Database schema violations**: Database schemas containing personal data
  - **Caching violations**: Caching personal data without proper controls
  - **Search violations**: Searching or querying with personal data
- **Guidance Features**:
  - IDE-like warnings for privacy-violating code
  - Privacy impact assessments for each violation
  - Real-time suggestions with emojis and clear explanations
  - Risk level indicators (High/Medium/Low impact)
  - Best practices recommendations
  - Educational content delivery
- **Privacy Laws Addressed**: All GDPR articles and CCPA sections with developer-focused guidance
- **Key Features**: Provides immediate feedback and guidance on privacy compliance during development
- **Use Case**: Enhances developer experience by helping developers write privacy-compliant code from the start

#### 🤖 **10. Gemini Privacy Rule (GeminiPrivacyRule)**
**Purpose**: AI-powered privacy scanning using Google Gemini for intelligent analysis
- **Detection Capabilities**:
  - **Intelligent PII detection**: Context-aware identification of hardcoded PII
  - **Privacy policy analysis**: Advanced privacy policy violation detection
  - **Data handling compliance**: Complex data handling compliance issues
  - **Security vulnerability analysis**: Security vulnerabilities in privacy context
  - **Consent mechanism analysis**: Sophisticated consent mechanism validation
  - **Data flow analysis**: Advanced data flow and retention issue detection
- **AI Features**:
  - Uses Google Gemini 3 Pro Preview for intelligent privacy analysis
  - Provides detailed explanations with specific fixes
  - References relevant privacy laws (GDPR, CCPA, etc.)
  - Includes severity levels and actionable guidance
  - Falls back gracefully if AI is unavailable
  - Configurable via environment variables
- **Configuration Options**:
  - `GEMINI_ENABLED`: Enable/disable AI scanning
  - `GEMINI_API_KEY`: Your Google AI API key
  - `GEMINI_MODEL`: Model to use (default: gemini-3-pro-preview)
  - `GEMINI_MAX_TOKENS`: Max tokens per request
  - `GEMINI_TEMPERATURE`: AI creativity level
- **Privacy Laws Addressed**: All privacy regulations with AI-enhanced analysis
- **Key Features**: Works in hybrid mode with hardcoded rules, providing enhanced accuracy while maintaining reliability
- **Use Case**: Provides intelligent, context-aware analysis of code to identify privacy violations that traditional pattern-based rules might miss

### 🌐 **Multi-Language Scanning**
- **Comprehensive language support**: Scans JavaScript (.js), TypeScript (.ts), Java (.java), Python (.py), Go (.go), C# (.cs), PHP (.php), Ruby (.rb), Swift (.swift), Kotlin (.kt), Rust (.rs), Scala (.scala), and more.
- **Unified privacy rules**: All rules and AI analysis apply across all supported languages.
- **Automatic language detection**: Output is grouped by language for easy review.

### ✨ **Modern web interface**: Beautiful, responsive web UI for uploading files, configuring AI settings, and viewing results in real time

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Optional**: Google AI API key for AI-powered scanning

### 1. **Clone the Repository**
```bash
git clone https://gitlab.com/tnabanitade/privacysdk.git
cd privacysdk
```

### 2. **Install Dependencies**
```bash
npm install
# Install test dependencies (required for running tests)
npm install --save-dev jest @types/jest ts-jest
```

### 3. **Google Cloud Setup**
- You must have a Google Cloud project with Vertex AI enabled.
- Install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install).
- Authenticate with your Google account:
  ```bash
  gcloud auth login
  ```
- Set your project:
  ```bash
  gcloud config set project <YOUR_PROJECT_ID>
  ```
- Enable Vertex AI API:
  ```bash
  gcloud services enable aiplatform.googleapis.com
  ```

### 4. **Set Environment Variables**
Create a `.env` file or export these in your shell:
```bash
# Google Gemini Configuration
export GOOGLE_CLOUD_PROJECT=<YOUR_PROJECT_ID>
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=true
export GEMINI_ENABLED=true
export GEMINI_API_KEY="your-google-ai-api-key"
export GEMINI_MODEL="gemini-3-pro-preview"
export GEMINI_MAX_TOKENS=4000
export GEMINI_TEMPERATURE=0.1

# Hardcoded Rules Configuration
export HARDCODED_RULES_ENABLED=true
```

### 5. **Build the Project**
```bash
# For development (includes tests, full type checking)
npm run build:dev

# For production (faster, only src, excludes tests)
npm run build:prod

# Default build (uses main config)
npm run build
```

### 6. **Run the Scanner**
```bash
# Basic usage
npm start <directory-path>

# Examples
npm start tests
npm start /path/to/your/codebase

# With AI scanning enabled
GEMINI_ENABLED=true GEMINI_API_KEY="your-key" npm start tests

# With hardcoded rules only
HARDCODED_RULES_ENABLED=true GEMINI_ENABLED=false npm start tests
```

## 🏗️ Using PrivacySDK in Other GitLab Projects

You can add PrivacySDK to any GitLab project in just a minute!

### **Basic Usage (Recommended)**
Add this to your `.gitlab-ci.yml`:

```yaml
include:
  - project: 'tnabanitade/privacysdk'
    file: '/templates/privacy-scan.yml'

privacy_scan:
  extends: .privacy_scan
  variables:
    PROJECT_PATH: "."
```

### **AI-Powered Scanning**
```yaml
privacy_scan_ai:
  extends: .privacy_scan_with_ai
  variables:
    PROJECT_PATH: "."
    GEMINI_API_KEY: $GEMINI_API_KEY
```

### **Full Integration with Merge Request Comments**
```yaml
privacy_scan_full:
  extends: .privacy_scan_full_integration
  variables:
    PROJECT_PATH: "."
    GITLAB_TOKEN: $GITLAB_TOKEN
    GEMINI_API_KEY: $GEMINI_API_KEY
```

### **Add Required Variables in GitLab UI**
Go to **Settings → CI/CD → Variables** in your project and add:
- `GEMINI_API_KEY` (for AI scanning)
- `GITLAB_TOKEN` (for merge request comments)
- `CI_DEPLOY_USER: <your-gitlab-deploy-username>`
- `CI_DEPLOY_PASSWORD: <your-gitlab-deploy-password>`

### **Reference**
For more details and advanced options, see [QUICK_START_GITLAB.md](QUICK_START_GITLAB.md).

---

## 🎯 Sample Output

### Hardcoded Rules Output
```
🔧 Using hardcoded privacy rules

================================================================================
🔍 PRIVACY VULNERABILITIES CHECKER - SCAN RESULTS
================================================================================

📁 JAVA FILES (16 violations)
------------------------------------------------------------
1. tests/java/UserEmailService.java:3
   Avoid hardcoding email addresses (found: "test@example.com")

2. tests/java/UserEmailService.java:10
   Avoid hardcoding email addresses (found: "admin@example.com")

3. tests/privacy_test.java:4
   Comprehensive PII Detection - 50+ PII types (found: "SSN: private String ssn = "123-45-6789";")

================================================================================
📊 SUMMARY: 16 total violations found
🔧 Analysis completed using hardcoded privacy rules
================================================================================
```

### AI-Powered Output
```
🤖 Google Gemini AI scanning enabled

📄 Processing UserEmailService.java (29 lines) with Vertex AI in 1 chunks
🤖 Analyzing UserEmailService.java lines 1-29 (29 total lines, 24 code lines)
✅ Vertex AI analysis complete for UserEmailService.java. Found 3 AI-detected violations

================================================================================
🔍 PRIVACY VULNERABILITIES CHECKER - SCAN RESULTS
================================================================================

📁 JAVA FILES (19 violations)
------------------------------------------------------------
1. tests/java/UserEmailService.java:3
   Google Gemini 3 Pro Preview (Vertex AI) Privacy Scanning (found: "Hard-coded or Plain-text PII / Secrets: The string 'test@example.com' is a hardcoded email address that could expose user information.

Suggested Fix: Use environment variables or secure configuration management to store sensitive data.

Severity: MEDIUM")

================================================================================
📊 SUMMARY: 19 total violations found
🤖 Enhanced with Google Gemini AI for comprehensive analysis
================================================================================
```

### Multi-Language Output Example
```
📁 JAVASCRIPT FILES (12 violations)
...
📁 C# FILES (8 violations)
...
📁 PHP FILES (8 violations)
...
📁 RUBY FILES (11 violations)
...
```

---

## 🧑‍💻 Usage Notes
- **Hybrid scanning**: The tool always runs comprehensive hardcoded rules for reliable detection
- **AI enhancement**: When enabled, Gemini AI provides additional intelligent analysis on top of hardcoded rules
- By default, the tool uses **Gemini 3 Pro Preview** via Vertex AI for AI-powered scanning (when enabled).
- You can disable AI scanning by setting `GEMINI_ENABLED=false` - hardcoded rules will still run.
- All configuration is via environment variables—**no Google project names or secrets are hardcoded**.
- The tool will skip small files and process code in 200-line chunks for efficiency.
- **File tracking**: Each file is clearly identified in the output, so you know exactly which files are being analyzed.
- **Fallback reliability**: Even if Gemini AI fails or is unavailable, you'll still get comprehensive privacy violation detection from hardcoded rules.

---

## 📌 Features Overview

### Cross-File Data Flow Analysis
Gemini analyzes how PII flows across multiple files, not just single-file patterns. For example, a user object created in `auth.js`, passed to `analytics.js`, and sent to a third-party API in `tracking.js` without consent is flagged as a GDPR Article 6 violation.

Implementation:
- Concatenate related files into a single Gemini prompt
- Trace PII from source → sink across files and flag violations
- Display a visual data flow path in the web UI

### Gemini Insights Panel in the Web UI
Gemini AI findings are separated from rule-based findings so it is clear what AI discovered beyond regex and hardcoded rules.

Implementation:
- Tag each violation with its source (`hardcoded` vs `gemini`)
- Render two sections: **Rule-Based Findings** and **🤖 Gemini 3 AI Insights**
- Give the Gemini section a distinct visual style for clarity
- Default the UI to Gemini-ON for immediate AI visibility

### Interactive "Ask Gemini" Chat
After scanning, developers can ask Gemini follow-up questions for any violation (e.g., “Why is this a GDPR issue?” or “Show me the exact fix for my codebase”).

Implementation:
- Add a **💬 Ask Gemini** button next to each violation
- Open a chat panel with violation context pre-loaded
- Send the violation + surrounding code + user question to Gemini 3
- Stream the response back in the UI

### Natural Language Privacy Policy Checker
Users paste a privacy policy and upload their codebase. Gemini checks whether the code complies with the policy’s promises.

Implementation:
- Provide a text area in the web UI for policy text
- Send policy + code to Gemini to identify contradictions
- Display mismatches in a **Policy Compliance** section

### Gemini 3 Summary
PrivacySDK uses Gemini 3 Pro Preview to transform privacy compliance from reactive legal work into proactive, AI-powered code intelligence.

Key Gemini 3 integrations:
- Cross-file PII flow reasoning across 12+ programming languages
- Context-aware violation detection that understands code semantics, not just syntax
- Interactive remediation via **Ask Gemini**
- Natural language privacy policy verification

## 🔧 Configuration Options

### Environment Variables

```bash
# Google Gemini Configuration
export GEMINI_ENABLED=true                    # Enable AI scanning
export GEMINI_API_KEY="your-api-key"          # Your Google AI API key
export GEMINI_MODEL="gemini-3-pro-preview"        # Model to use
export GEMINI_MAX_TOKENS=4000                 # Max tokens per request
export GEMINI_TEMPERATURE=0.1                 # AI creativity level

# Google Cloud Configuration
export GOOGLE_CLOUD_PROJECT=<YOUR_PROJECT_ID>
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=true

# Hardcoded Rules Configuration
export HARDCODED_RULES_ENABLED=true           # Enable/disable hardcoded rules
```

### Command Line Usage

```bash
# Run with AI scanning
GEMINI_ENABLED=true GEMINI_API_KEY="your-key" npm start tests

# Run with hardcoded rules only
HARDCODED_RULES_ENABLED=true GEMINI_ENABLED=false npm start tests

# Run on specific directory
npm start /path/to/your/codebase
```

---

## 🚀 CI/CD Integration

### GitHub Actions Setup

The project includes a comprehensive GitHub Actions workflow for automated privacy scanning:

**Features:**
- **Automated privacy scanning** on every push and pull request
- **Multi-language support** across all 12 supported languages
- **AI-enhanced analysis** using Google Gemini (optional)
- **Real-time PR comments** with privacy violation summaries
- **Automatic issue creation** for high-severity violations
- **Compliance reporting** with GDPR/CCPA status
- **Security scanning** with npm audit integration
- **Scheduled daily scans** for ongoing monitoring

**Quick Setup:**
1. Copy `.github/workflows/privacy-scan.yml` to your repository
2. For AI analysis, add `GEMINI_API_KEY` secret in GitHub repository settings
3. The workflow runs automatically on pushes and pull requests

**Example PR Comment:**
```
## 🔍 Privacy Scan Summary

**Scan Date:** 2024-01-15 10:30:00 UTC
**Repository:** your-org/your-repo
**Branch:** feature/new-feature

## Results
- **Total Violations:** 5
- **High Severity:** 1
- **Medium Severity:** 2
- **Low Severity:** 2

## Detailed Report
📁 JAVASCRIPT FILES (3 violations)
1. src/userService.js:15 - Avoid hardcoding email addresses
2. src/userService.js:23 - Comprehensive PII Detection - SSN

[View Full Report](artifact://privacy-scan-report.txt)
```

**For detailed setup instructions, see [GitHub Actions Setup Guide](docs/github-actions-setup.md)**

### GitLab CI Setup

1. **Set up deployment tokens** in your repo:
   - Go to Settings → CI/CD → Variables
   - Add: `CI_DEPLOY_USER: <your-gitlab-deploy-username>`
   - Add: `CI_DEPLOY_PASSWORD: <your-gitlab-deploy-password>`

2. **Optional**: Add Google Gemini configuration for AI-powered scanning:
   ```yaml
   GEMINI_ENABLED: true
   GEMINI_API_KEY: your-google-ai-api-key
   ```

3. **Copy the `.gitlab-ci.yml` file** to your repo.

### GitHub Actions Setup

```yaml
name: Privacy Scan
on: [push, pull_request]
jobs:
  privacy-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm start .
        env:
          GEMINI_ENABLED: true
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

### 🔗 GitLab DevSecOps Integration

### Real-Time Privacy Feedback in Merge Requests and Issues

The project includes a robust GitLab integration script: `scripts/privacy-gitlab-integration.sh`.

**Key Features:**
- **Real-time merge request comments:** Posts a privacy scan summary as a comment on every merge request.
- **Automatic issue creation:** Creates GitLab issues for every high-severity privacy violation detected.
- **Pipeline status updates:** Fails the pipeline on high-severity violations, warns on medium/low, passes if clean.
- **Detailed scan summary:** Shows total, high, medium, and low severity violations, with actionable recommendations.
- **Seamless CI/CD integration:** Designed to work out-of-the-box in GitLab CI/CD pipelines using environment variables.
- **Manual/local run support:** Can be run locally for pre-commit privacy checks.

**Example MR Comment:**
```
## 🔒 Privacy Compliance Check Results

### 📊 Scan Summary
- **Total Violations**: 5
- **High Severity**: 1
- **Medium Severity**: 2
- **Low Severity**: 2

### 📋 Detailed Findings
<first 30 lines of scan output>

### 🚀 Recommendations
- Review all privacy violations before merging
- Address high-severity issues immediately
- Ensure GDPR/CCPA compliance
```

### How to Run the GitLab Integration Script

#### In GitLab CI/CD (Recommended)
Add the following job to your `.gitlab-ci.yml` (or use the provided one):
```yaml
privacy_gitlab_integration:
  stage: privacy_scan
  image: node:20
  script:
    - npm ci
    - npm run build
    - bash scripts/privacy-gitlab-integration.sh
  only:
    - merge_requests
    - main
    - develop
  variables:
    GITLAB_TOKEN: $GITLAB_TOKEN  # Set this in CI/CD variables for API access
```

#### Locally (for pre-commit or manual checks)
```bash
# Make sure you have built the project first
npm run build
# Run the integration script
bash scripts/privacy-gitlab-integration.sh
```

**Environment Variables Required:**
- `GITLAB_TOKEN`: Your GitLab personal or CI job token (for API access)
- `CI_SERVER_URL`, `CI_PROJECT_ID`, `CI_MERGE_REQUEST_IID`, `CI_COMMIT_SHA` (set automatically in GitLab CI)

**What happens:**
- The script runs the privacy checker, parses the output, and posts a summary as a merge request comment.
- If high-severity violations are found, it creates issues and fails the pipeline.
- For medium/low severity, it warns but allows the pipeline to pass.
- All output is visible in the pipeline logs for traceability.

**Advanced:** You can customize the script or integrate it with other DevSecOps tools as needed.

---

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Test Environment Setup

Before running individual test files, you need to set up the required environment variables:

#### **For Vertex AI Tests (test-gemini-3.js, test-vertex-ai.js)**
```bash
# Required: Set your Google Cloud project ID
export GOOGLE_CLOUD_PROJECT="your-project-id"

# Optional: Set location (defaults to global)
export GOOGLE_CLOUD_LOCATION="global"

# Run the tests
node test-gemini-3.js
node test-vertex-ai.js
```

#### **For Direct API Tests (test-gemini.js)**
```bash
# Required: Set your Google AI API key
export GEMINI_API_KEY="your-google-ai-api-key"

# Run the test
node test-gemini.js
```

#### **For All Tests Together**
```bash
# Set all environment variables
export GOOGLE_CLOUD_PROJECT="your-project-id"
export GOOGLE_CLOUD_LOCATION="global"
export GEMINI_API_KEY="your-google-ai-api-key"

# Run all tests
node test-gemini-3.js
node test-vertex-ai.js
node test-gemini.js
```

## AI Integration & Testing Notes

- To run Gemini API tests (`test-gemini.js`), set the `GEMINI_API_KEY` environment variable with your Google Gemini API key.
- To run Vertex AI Gemini 3 tests (`test-gemini-3.js`), set the `GOOGLE_CLOUD_PROJECT` environment variable with your Google Cloud project ID.
- If these variables are not set, the scripts will print a clear message and exit, so you know exactly what to do.
- Required packages (`node-fetch` for Gemini, `@google/genai` for Vertex AI) are also checked, and you will be prompted to install them if missing.



#### **Using .env File (Recommended)**
Create a `.env` file in the project root:
```bash
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=global

# Google AI Configuration
GEMINI_API_KEY=your-google-ai-api-key
```

Then load it before running tests:
```bash
# Load environment variables from .env file
source .env

# Run tests
node test-gemini-3.js
node test-vertex-ai.js
node test-gemini.js
```

### Test Gemini API Key
```bash
GEMINI_API_KEY="your-key" node test-gemini.js
```

### Test Cases
Test cases are in `__tests__/` and cover all major rules, including positive and negative scenarios.

---

## 🎯 Troubleshooting

### Google Gemini API Issues
If you get 401 Unauthorized errors:
- Check your Google AI Studio account status at [makersuite.google.com](https://makersuite.google.com)
- Verify your API key is active and has sufficient credits
- Ensure your account is verified and billing is set up
- The tool will automatically fall back to hardcoded rules if AI is unavailable

### Common Issues
- **No violations found**: Check if the directory contains supported file types
- **Build errors**: Ensure TypeScript is installed and run `npm run build`
- **Test failures**: Run `npm test` to see specific test failures
- **Authentication errors**: Make sure you have run `gcloud auth login` and set the correct project
- **Timeouts**: If you see timeouts, try reducing the number of files or chunk size, or check your network connection
- **Model errors**: Ensure the model name is correct and available in your region
- **Privacy**: No code or data is sent to third parties except Google Vertex AI for analysis

## AI Integration & Testing Notes

- To run Gemini API tests (`test-gemini.js`), set the `GEMINI_API_KEY` environment variable with your Google Gemini API key.
- To run Vertex AI Gemini 3 tests (`test-gemini-3.js`), set the `GOOGLE_CLOUD_PROJECT` environment variable with your Google Cloud project ID.
- If these variables are not set, the scripts will print a clear message and exit, so you know exactly what to do.
- Required packages (`node-fetch` for Gemini, `@google/genai` for Vertex AI) are also checked, and you will be prompted to install them if missing.

---

## 🔧 Adding New Rules

Add new rules in `src/ruleEngine/rules/` using the PatternRule interface style. Add corresponding tests in `__tests__/`.

### Rule Interface
```typescript
interface PatternRule {
    pattern: RegExp;
    type: string;
    description: string;
    fix: string;
    isPositive?: boolean;
    marker?: RegExp;
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your changes and tests
4. Run `npm test` to ensure all tests pass
5. Submit a pull request

---

## 📚 References
- [Vertex AI Gemini Models](https://cloud.google.com/vertex-ai/docs/generative-ai/learn/models)
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)
- [Environment Variables in Node.js](https://nodejs.org/api/process.html#processenv)

---

## 📞 Support
For issues and questions:
- Check the troubleshooting section above
- Review the test cases for examples
- Open an issue on GitHub/GitLab
- Contact the development team (nabanita@privacylicense.com )

---

### 🛡️ **Reliable Fallback System**

PrivacySDK implements a robust fallback system that ensures privacy scanning works reliably even when AI services are unavailable. The system always runs comprehensive hardcoded rules as a foundation, with AI enhancement as an optional layer.

#### **Fallback Scenarios:**

**1. AI Service Unavailable**
- **Network issues** with Google Cloud Vertex AI
- **API rate limits** or quota exceeded
- **Authentication failures** or expired credentials
- **Service downtime** or maintenance

**2. Configuration Issues**
- **Missing API keys** or project configuration
- **Incorrect environment variables**
- **Invalid Google Cloud project** settings
- **Disabled AI scanning** by user preference

**3. AI Processing Failures**
- **Request timeouts** (30-second limit per chunk)
- **Invalid AI responses** or parsing errors
- **Content too large** for AI processing
- **Unsupported file types** or formats

#### **Fallback Behavior:**

**✅ Always Active Hardcoded Rules:**
- **10 comprehensive rule engines** run regardless of AI status
- **50+ PII detection patterns** for reliable violation detection
- **GDPR/CCPA compliance validation** with legal references
- **Security and encryption checks** for data protection
- **Data flow and consent validation** for privacy compliance

**🤖 AI Enhancement (When Available):**
- **Intelligent context analysis** beyond pattern matching
- **Detailed explanations** with specific code fixes
- **Regulatory references** to GDPR/CCPA articles
- **Severity assessment** and risk prioritization
- **Advanced violation detection** for complex scenarios

#### **Fallback Implementation:**

```typescript
// Main fallback logic in index.ts
if (geminiEnabled) {
    if (useVertexAI && googleCloudProject) {
        // AI scanning enabled
        engine.setGeminiEnabled(true);
        console.log("🤖 Google Gemini AI scanning enabled via Vertex AI");
    } else if (geminiApiKey) {
        // AI scanning enabled with API key
        engine.setGeminiEnabled(true);
        console.log("🤖 Google Gemini AI scanning enabled via Developer API");
    } else {
        // Fallback to hardcoded rules
        console.warn("⚠️  Gemini enabled but no authentication configured. Falling back to hardcoded rules.");
    }
} else {
    // Hardcoded rules only
    console.log("🔧 Using hardcoded privacy rules");
}
```

**AI Rule Fallback (GeminiPrivacyRule.ts):**
```typescript
try {
    const aiViolations = await this.scanWithGemini(content, filePath);
    return aiViolations;
} catch (error) {
    console.warn(`Gemini scanning failed: ${error}. Falling back to hardcoded rules.`);
    return violations; // Returns empty array, hardcoded rules continue
}
```

#### **Fallback Benefits:**

**🔒 Reliability:**
- **Never fails completely** - hardcoded rules always run
- **Graceful degradation** - AI failures don't stop scanning
- **Consistent results** - same core violations always detected
- **Production ready** - works in any environment

**⚡ Performance:**
- **Fast execution** - hardcoded rules are lightweight
- **No external dependencies** - works offline
- **Predictable timing** - no AI request delays
- **Scalable** - handles large codebases efficiently

**🎯 Coverage:**
- **Comprehensive detection** - 10 rule types cover all major violations
- **Multi-language support** - works across 12+ programming languages
- **Regulatory compliance** - GDPR, CCPA, HIPAA coverage
- **Security focused** - encryption and data protection checks

#### **Fallback Monitoring:**

The system provides clear feedback about which scanning mode is active:

**AI + Hardcoded Rules:**
```
🤖 Google Gemini AI scanning enabled via Vertex AI
📊 SUMMARY: 19 total violations found
🤖 Enhanced with Google Gemini AI for comprehensive analysis
```

**Hardcoded Rules Only:**
```
🔧 Using hardcoded privacy rules
📊 SUMMARY: 16 total violations found
🔧 Analysis completed using hardcoded privacy rules
```

**Fallback Triggered:**
```
⚠️  Gemini enabled but no authentication configured. Falling back to hardcoded rules.
🔧 Using hardcoded privacy rules
```

This fallback system ensures that PrivacySDK provides reliable privacy scanning in any environment, with AI enhancement as a valuable addition when available.

---

## 🌐 **Web Interface & Cloud Deployment**

PrivacySDK now includes a modern web interface for easy scanning and a complete Google Cloud Run deployment setup!

### **🎨 Web Interface Features**

- **Modern, responsive design** with beautiful gradient UI
- **Drag & drop file upload** supporting 12+ programming languages
- **Real-time scanning** with progress indicators and loading animations
- **Toggle controls** for AI-powered vs hardcoded rule scanning
- **Structured results display** showing violations by file, line, type, description, fix, and severity
- **Color-coded severity**: Violations are clearly marked as HIGH, MEDIUM, or LOW with color coding for quick risk assessment
- **Fix suggestions in code blocks**: If a fix looks like code, it is rendered in a code block for easy copy-paste
- **Always shows all violation details**: Type, file, line, description, fix, and severity are always displayed for every violation
- **No file size/line count threshold**: Every file is scanned (except empty/comment-only), ensuring nothing is skipped
- **Robust AI parsing and fallback**: Handles malformed AI responses, always extracts as much as possible, and falls back to hardcoded rules if needed
- **User-configurable AI settings**: Enter Gemini API key and Vertex AI settings in a dedicated modal overlay
- **True modal overlay for Gemini AI settings**: Centered, with a dimmed backdrop, unscrollable background, and a close button; does not affect the layout of the upload section
- **Settings stored in browser**: Gemini/Vertex settings are saved in localStorage and sent with each scan
- **Gemini 3 Insights panel**: AI findings are separated into a dedicated "🤖 Gemini 3 AI Insights" section
- **Rule-based vs AI separation**: Rule-based findings are grouped separately for clear comparison
- **Ask Gemini chat**: Open a chat for any violation and ask follow-up questions with context
- **Cross-file data flow insights**: Gemini analyzes multi-file PII flows and shows flow paths
- **Privacy policy checker**: Paste a policy and detect code-to-policy contradictions
- **Sample demo upload**: "Use Sample Code" button for instant demo scans
- **Professional, user-friendly UX**: Clean, modern, and accessible interface perfect for demos, hackathons, and real-world use
- **Seamless backend/frontend integration**: All scan options and settings are respected by the backend for accurate, user-driven results

### **🚀 Local Development**

```bash
# Install dependencies
npm install

# Build the project
npm run build:prod

# Start the web server
npm run start:web

# Or use a custom port
PORT=8080 npm run start:web
```

Then open `http://localhost:3000` (or your custom port) in your browser!

### **☁️ Google Cloud Run Deployment**

#### **Quick Deploy (Automated)**
```bash
# Make sure you have gcloud CLI installed and authenticated
chmod +x deploy.sh
./deploy.sh YOUR_GOOGLE_CLOUD_PROJECT_ID
```

#### **Manual Deploy**
```bash
# 1. Set your project
gcloud config set project YOUR_PROJECT_ID

# 2. Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable aiplatform.googleapis.com

# 3. Build and deploy
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/privacy-sdk
gcloud run deploy privacy-sdk \
  --image gcr.io/YOUR_PROJECT_ID/privacy-sdk \
  --platform managed \
  --region global \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2

# 4. Add Gemini AI support (optional)
gcloud run services update privacy-sdk \
  --region=global \
  --set-env-vars GEMINI_API_KEY=your_api_key_here
```
#### **Environment Variables**
- `GEMINI_API_KEY`: Your Google AI API key for enhanced scanning
- `GOOGLE_CLOUD_PROJECT`: Your GCP project ID for Vertex AI
- `GOOGLE_CLOUD_LOCATION`: Vertex AI location (default: global)
- `NODE_ENV`: Set to `production` for optimized performance

### **🎯 Perfect for Hackathons**

The web interface provides an excellent way to showcase PrivacySDK:
- **Professional presentation** with modern UI
- **Real-time demonstrations** of privacy scanning
- **Easy file upload** for live demos
- **Comprehensive results** showing AI + rule-based detection
- **Cloud deployment** ready for public access

---

## 🚀 How to Deploy the Web Interface on Google Cloud Run

### Prerequisites
- **Google Cloud account** with a project and billing enabled
- **gcloud CLI** installed and authenticated ([Install guide](https://cloud.google.com/sdk/docs/install))
- **Docker** installed (for local builds, optional)

### 1. Clone and Build the Project
```bash
git clone https://gitlab.com/tnabanitade/privacysdk.git
cd privacysdk
npm install
npm run build:prod
```

### 2. Deploy to Google Cloud Run (Recommended: Automated Script)
```bash
# Make the deploy script executable
chmod +x deploy.sh
# Deploy (replace YOUR_PROJECT_ID with your GCP project)
./deploy.sh YOUR_PROJECT_ID
```

### 3. (Alternative) Manual Deployment
```bash
# Set your project
 gcloud config set project YOUR_PROJECT_ID
# Enable required APIs
 gcloud services enable cloudbuild.googleapis.com run.googleapis.com aiplatform.googleapis.com
# Build and push Docker image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/privacy-sdk .
# Deploy to Cloud Run
gcloud run deploy privacy-sdk \
  --image gcr.io/YOUR_PROJECT_ID/privacy-sdk \
  --platform managed \
  --region global \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --max-instances 10 \
  --timeout 300 \
  --set-env-vars NODE_ENV=production
```

### 4. Enable Gemini AI (Optional)
```bash
gcloud run services update privacy-sdk \
  --region=global \
  --set-env-vars GEMINI_API_KEY=your_api_key_here
```

### 5. Get Your Public URL
After deployment, the script or Cloud Run console will show a URL like:
```
https://privacy-sdk-xxxxxx-uc.a.run.app
```
Open this in your browser to use the web interface!

### Troubleshooting
- **Permission errors:** Make sure your Google account has Owner/Editor and Cloud Build/Run permissions.
- **PORT variable error:** Do NOT set the PORT env var in Cloud Run; it is set automatically.
- **Docker not running:** Use the automated script or Cloud Build (no local Docker needed).
- **API errors:** Ensure all required Google Cloud APIs are enabled.

---

## 📄 License
This project is licensed under the MIT License. 

For complete license terms, see the [LICENSE](LICENSE) file.

## 🔒 Security & License Disclaimer
For important security information and detailed license disclaimers, please see [Security.md](Security.md).

This software is provided "as is", without warranty or guarantee of privacy compliance. Use at your own risk.
# Privacysdk
