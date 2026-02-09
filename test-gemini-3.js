// Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
// Licensed under the MIT License modified with the Commons Clause.
// For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE
// Commercial use is prohibited without a license.
// Contact for Commercial License: nabanita@privacylicense.com | https://privacylicense.ai

try {
    require.resolve('@google/genai');
} catch (e) {
    console.error('❌ @google/genai package is not installed. Please run "npm install @google/genai".');
    process.exit(1);
}

const { GoogleGenAI } = require('@google/genai');

async function testGemini3() {
    console.log("🧪 Testing Gemini 3 Pro Preview with Vertex AI...");
    // Get configuration from environment variables
    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    const location = process.env.GOOGLE_CLOUD_LOCATION || 'global';
    if (!projectId) {
        console.error("❌ No project ID provided. Set GOOGLE_CLOUD_PROJECT environment variable to use Vertex AI Gemini.");
        return;
    }
    
    let ai;
    try {
        ai = new GoogleGenAI({
            vertexai: true,
            project: projectId,
            location: location,
        });

        console.log("✅ GoogleGenAI client created successfully");
        console.log(`📍 Using project: ${projectId}, location: ${location}`);
        
        console.log("🤖 Testing with gemini-3-pro-preview...");
        
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout after 30 seconds')), 30000);
        });
        
        const responsePromise = ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: 'Say "Hello, Gemini 3 Pro Preview is working!"',
        });
        
        const response = await Promise.race([responsePromise, timeoutPromise]);

        console.log("✅ Response received!");
        console.log("Response text:", response.text);
        
        // Test with a privacy-related question
        console.log("\n🔍 Testing privacy analysis capability...");
        const privacyResponse = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: 'Analyze this code for privacy violations: const email = "test@example.com"; console.log(email);',
        });

        console.log("✅ Privacy analysis response:");
        console.log(privacyResponse.text);
        
    } catch (error) {
        console.error("❌ Gemini 3 Pro Preview test failed:");
        console.error(error.message);
        
        // Retry with the same model to verify availability
        if (ai) {
            console.log("\n🔄 Retrying with gemini-3-pro-preview...");
            try {
                const fallbackResponse = await ai.models.generateContent({
                    model: 'gemini-3-pro-preview',
                    contents: 'Say "Hello, Gemini 3 Pro Preview is working!"',
                });
                console.log("✅ Retry works!");
                console.log("Response:", fallbackResponse.text);
            } catch (fallbackError) {
                console.error("❌ Retry also failed:", fallbackError.message);
            }
        } else {
            console.error("❌ Retry skipped because the AI client was not initialized.");
        }
    }
}

testGemini3();