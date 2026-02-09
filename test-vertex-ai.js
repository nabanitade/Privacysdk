// Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
// Licensed under the MIT License modified with the Commons Clause.
// For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE
// Commercial use is prohibited without a license.
// Contact for Commercial License: nabanita@privacylicense.com | https://privacylicense.ai

const { GoogleGenAI } = require('@google/genai');

async function testVertexAI() {
    console.log("🧪 Testing Vertex AI connectivity...");
    
    // Get configuration from environment variables
    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    const location = process.env.GOOGLE_CLOUD_LOCATION || 'global';
    
    if (!projectId) {
        console.error("❌ No project ID provided. Set GOOGLE_CLOUD_PROJECT environment variable.");
        return;
    }
    
    try {
        const ai = new GoogleGenAI({
            vertexai: true,
            project: projectId,
            location: location,
        });

        console.log("✅ GoogleGenAI client created successfully");
        console.log(`📍 Using project: ${projectId}, location: ${location}`);
        
        console.log("🤖 Attempting to generate content...");
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: 'Say "Hello, Vertex AI is working!"',
        });

        console.log("✅ Response received!");
        console.log("Response text:", response.text);
        
    } catch (error) {
        console.error("❌ Vertex AI test failed:");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
    }
}

testVertexAI(); 