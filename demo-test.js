// Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
// Licensed under the MIT License modified with the Commons Clause.
// For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE
// Commercial use is prohibited without a license.
// Contact for Commercial License: nabanita@privacylicense.com | https://privacylicense.ai

// Demo file for testing PrivacySDK web interface

// PII Violation - Email
const userEmail = "test@example.com";

// PII Violation - Phone number
const phone = "555-123-4567";

// Security Violation - API key
const apiKey = "sk-1234567890abcdef";

// GDPR Violation - No consent check
function processUserData(user) {
    // Missing consent validation
    const personalInfo = {
        name: user.name,
        email: user.email,
        ssn: user.socialSecurityNumber
    };
    
    // Store without encryption
    localStorage.setItem('userData', JSON.stringify(personalInfo));
    
    return personalInfo;
}

module.exports = { processUserData }; 