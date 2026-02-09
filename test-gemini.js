// Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
// Licensed under the MIT License modified with the Commons Clause.
// For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE
// Commercial use is prohibited without a license.
// Contact for Commercial License: nabanita@privacylicense.com | https://privacylicense.ai

try {
    require.resolve('node-fetch');
} catch (e) {
    console.error('❌ node-fetch package is not installed. Please run "npm install node-fetch".');
    process.exit(1);
}

const fetch = require('node-fetch');

const API_KEY = process.env.GEMINI_API_KEY;

async function testGeminiAPI() {
    if (!API_KEY) {
        console.error("❌ No API key provided. Set GEMINI_API_KEY environment variable to use Gemini API.");
        return;
    }

    try {
        console.log("Testing Google Gemini 3 Pro Preview API...");
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: 'Hello, can you respond with "API test successful"?'
                            }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 100,
                    temperature: 1.0
                }
            })
        });

        console.log(`Response status: ${response.status}`);
        console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error: ${response.status} ${response.statusText}`);
            console.error(`Error details: ${errorText}`);
            return;
        }

        const data = await response.json();
        console.log("✅ API test successful!");
        console.log("Response:", data.candidates[0].content.parts[0].text);
        
    } catch (error) {
        console.error("❌ API test failed:", error.message);
    }
}

testGeminiAPI(); 