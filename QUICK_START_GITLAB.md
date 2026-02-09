# 🚀 PrivacySDK Quick Start for GitLab

## Get PrivacySDK Running in 1 Minute!

### **Option 1: Simple Integration (Recommended)**

Add this to your project's `.gitlab-ci.yml`:

```yaml
include:
  - project: 'tnabanitade/privacysdk'
    file: '/templates/privacy-scan.yml'

privacy_scan:
  extends: .privacy_scan
  variables:
    PROJECT_PATH: "."
```

### **Option 2: AI-Powered Scanning**

```yaml
include:
  - project: 'tnabanitade/privacysdk'
    file: '/templates/privacy-scan.yml'

privacy_scan_ai:
  extends: .privacy_scan_with_ai
  variables:
    PROJECT_PATH: "."
    GEMINI_API_KEY: $GEMINI_API_KEY
```

### **Option 3: Full Integration with Merge Request Comments**

```yaml
include:
  - project: 'tnabanitade/privacysdk'
    file: '/templates/privacy-scan.yml'

privacy_scan_full:
  extends: .privacy_scan_full_integration
  variables:
    PROJECT_PATH: "."
    GITLAB_TOKEN: $GITLAB_TOKEN
    GEMINI_API_KEY: $GEMINI_API_KEY
```

## 🔧 Setup (Optional - for AI features)

### **Add GitLab Variables:**

Go to your project → Settings → CI/CD → Variables:

```bash
# For AI-powered scanning
GEMINI_API_KEY: your-google-ai-api-key

# For merge request comments
GITLAB_TOKEN: your-gitlab-access-token
```

## 🎯 What Happens Next

1. **Every merge request** will be scanned for privacy violations
2. **Comments will be posted** with detailed findings
3. **Pipeline will fail** if high-severity violations are found
4. **Reports are generated** for compliance tracking

## 📊 Supported Languages

- JavaScript, TypeScript, Java, Python, Go, C#, PHP, Ruby, Swift, Kotlin, Rust, Scala

## 🔍 What It Detects

- Hardcoded PII (emails, SSNs, credit cards)
- GDPR/CCPA compliance violations
- Privacy policy issues
- Encryption and security problems
- Data flow violations

## 🆘 Need Help?

- **Documentation**: [run_on_gitlab.md](run_on_gitlab.md)
- **Issues**: [GitLab Issues](https://gitlab.com/tnabanitade/privacysdk/-/issues)
- **Support**: nabanita@privacylicense.com

---

**That's it! Your project now has enterprise-grade privacy scanning! 🔒** 