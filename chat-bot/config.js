// Configuration file for Gemini API
// Replace the API key below with your actual Gemini API key

const GEMINI_CONFIG = {
    // Get your API key from: https://makersuite.google.com/app/apikey
    API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
    
    // API Configuration
    MODEL: 'gemini-pro',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    
    // Response Settings
    TEMPERATURE: 0.7,
    TOP_K: 40,
    TOP_P: 0.95,
    MAX_OUTPUT_TOKENS: 1024,
    
    // Safety Settings
    SAFETY_SETTINGS: [
        {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
    ]
};

// Instructions:
// 1. Go to https://makersuite.google.com/app/apikey
// 2. Create a new API key
// 3. Replace 'YOUR_GEMINI_API_KEY_HERE' above with your actual API key
// 4. Save this file
// 5. The chatbot will now use Gemini AI for responses
