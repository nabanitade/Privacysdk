// Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
// Licensed under the MIT License modified with the Commons Clause.
// For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE
// Commercial use is prohibited without a license.
// Contact for Commercial License: nabanita@privacylicense.com | https://privacylicense.ai

const API_KEY = process.env.CLAUDE_API_KEY;

async function testClaudeAPI() {
    if (!API_KEY) {
        console.error("❌ No API key provided. Set CLAUDE_API_KEY environment variable.");
        return;
    }

    try {
        console.log("Testing Claude Sonnet 4 API...");
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 100,
                messages: [
                    {
                        role: 'user',
                        content: 'Hello, can you respond with "API test successful"?'
                    }
                ]
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
        console.log("Response:", data.content[0].text);
        
    } catch (error) {
        console.error("❌ API test failed:", error.message);
    }
}

testClaudeAPI(); 