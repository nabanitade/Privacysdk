# How to Run PrivacySDK

## Overview

PrivacySDK is a comprehensive privacy vulnerability checker that scans codebases for privacy and security violations using both hardcoded rules and AI-powered analysis via Google Gemini.

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Optional**: Google Cloud project with Vertex AI enabled (for AI scanning)

## Quick Start

### 1. **Clone and Setup**
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

### 3. **Build the Project**
```bash
npm run build
```

### 4. **Run Basic Scan**
```bash
npm start tests
```

## Google Cloud Setup (Optional - for AI Enhancement)

### 1. **Install Google Cloud CLI**
```bash
# macOS
brew install google-cloud-sdk

# Windows
# Download from https://cloud.google.com/sdk/docs/install

# Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### 2. **Authenticate and Configure**
```bash
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>
gcloud services enable aiplatform.googleapis.com
```

### 3. **Set Environment Variables**
```bash
# Google Cloud Configuration
export GOOGLE_CLOUD_PROJECT=<YOUR_PROJECT_ID>
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_VERTEXAI=true

# Gemini Configuration
export GEMINI_ENABLED=true
export GEMINI_API_KEY="your-google-ai-api-key"
export GEMINI_MODEL="gemini-3-pro-preview"
export GEMINI_MAX_TOKENS=4000
export GEMINI_TEMPERATURE=0.1

# Hardcoded Rules Configuration
export HARDCODED_RULES_ENABLED=true
```

## Running the Tool

### Basic Usage
```bash
npm start <directory-path>
```

### Examples

1. **Scan the tests directory:**
```bash
npm start tests
```

2. **Scan the current directory:**
```bash
npm start .
```

3. **Scan a specific project directory:**
```bash
npm start /path/to/your/project
```

4. **Run with AI scanning enabled:**
```bash
GEMINI_ENABLED=true GEMINI_API_KEY="your-key" npm start tests
```

5. **Run with hardcoded rules only:**
```bash
HARDCODED_RULES_ENABLED=true GEMINI_ENABLED=false npm start tests
```

## Sample Output

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

### AI-Enhanced Output
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

### Multi-Language Output
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

### Clean Scan Output
```
================================================================================
✅ PRIVACY VULNERABILITIES CHECKER - SCAN COMPLETE
================================================================================
🎉 No privacy violations found in your codebase!

🤖 Scan completed using Google Gemini AI for comprehensive privacy analysis
================================================================================
```

## Supported Languages

PrivacySDK supports comprehensive scanning across **12+ programming languages**:

- **JavaScript** (.js)
- **TypeScript** (.ts)
- **Java** (.java)
- **Python** (.py)
- **Go** (.go)
- **C#** (.cs)
- **PHP** (.php)
- **Ruby** (.rb)
- **Swift** (.swift)
- **Kotlin** (.kt)
- **Rust** (.rs)
- **Scala** (.scala)

## What It Detects

### **10 Comprehensive Rule Engines:**

1. **Basic PII Detection** - Email addresses, personal identifiers
2. **Comprehensive PII Detection** - 50+ PII types (SSN, credit cards, phone numbers, etc.)
3. **Privacy Policy Compliance** - GDPR/CCPA violations
4. **Consent Management** - Explicit consent marker validation
5. **Encryption & Security** - Data protection and encryption checks
6. **Data Flow Analysis** - Sensitive data handling and retention
7. **Advanced Privacy Rules** - Complex data-flow and context-aware violations
8. **AI-Powered Analysis** - Intelligent explanations and fixes
9. **Developer Guidance** - Real-time privacy impact assessment
10. **Gemini AI Integration** - Google Gemini 3 Pro Preview analysis

### **Privacy Violations Detected:**
- Hardcoded PII (emails, SSNs, credit cards, phone numbers)
- Privacy policy violations (GDPR/CCPA compliance)
- Consent mechanism issues
- Encryption and security problems
- Data flow and retention violations
- Advanced privacy compliance issues

## Configuration Options

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

### Command Line Options

```bash
# Run with AI scanning
GEMINI_ENABLED=true GEMINI_API_KEY="your-key" npm start tests

# Run with hardcoded rules only
HARDCODED_RULES_ENABLED=true GEMINI_ENABLED=false npm start tests

# Run on specific directory
npm start /path/to/your/codebase
```

## Fallback System

PrivacySDK includes a robust fallback system:

- **Always runs hardcoded rules** regardless of AI availability
- **Gracefully falls back** when AI services are unavailable
- **Provides consistent results** across different environments
- **Maintains reliability** in production deployments

### Fallback Scenarios:
- Network issues with Google Cloud Vertex AI
- API rate limits or quota exceeded
- Authentication failures or expired credentials
- Service downtime or maintenance
- Missing API keys or project configuration

## Testing

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

## Exit Codes
- **Exit code 0**: No violations found (clean scan)
- **Exit code 1**: Privacy violations were found

## Troubleshooting

### Common Issues

1. **No violations found**
   - Check if the directory contains supported file types
   - Verify the scanner is finding your files
   - Ensure your code contains test files

2. **Build errors**
   - Ensure TypeScript is installed and run `npm run build`
   - Check for missing dependencies with `npm install`
   - Verify import paths match actual directory names

3. **AI scanning not working**
   - Check your Google AI Studio account status
   - Verify your API key is active and has sufficient credits
   - Ensure your account is verified and billing is set up
   - The tool will automatically fall back to hardcoded rules

4. **Authentication errors**
   - Make sure you have run `gcloud auth login`
   - Set the correct project with `gcloud config set project <YOUR_PROJECT_ID>`
   - Verify environment variables are set correctly

5. **Timeouts**
   - Try reducing the number of files or chunk size
   - Check your network connection
   - Increase timeout values if needed

### Debug Mode

To enable debug output:
```bash
DEBUG=* npm start tests
```

## Performance

- **Fast execution** with hardcoded rules
- **Intelligent chunking** for large files (200 lines per chunk)
- **Async processing** for large codebases
- **Memory-conscious** file handling
- **Scalable** architecture for enterprise use

## License

This project is licensed under the MIT License with Commons Clause. See the [LICENSE](LICENSE) file for details.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review the test cases for examples
- Open an issue on GitLab
- Contact: nabanita@privacylicense.com (https://privacylicense.ai/), https://www.linkedin.com/in/nabanitaai/ 

---

**PrivacySDK is production-ready and provides comprehensive scanning with or without AI enhancement! **
