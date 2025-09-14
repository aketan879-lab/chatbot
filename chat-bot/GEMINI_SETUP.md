# 🤖 Gemini AI Chatbot Setup Guide

## Quick Setup (3 Steps)

### Step 1: Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key (starts with `AIza...`)

### Step 2: Add API Key to Your Website
1. Open `script.js` in a text editor
2. Find line 6: `GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',`
3. Replace `'YOUR_GEMINI_API_KEY_HERE'` with your actual API key

**Example:**
```javascript
GEMINI_API_KEY: 'AIzaSyD_eSgPB9MjJRhgBKgCn6BPjSM1YB32MP8',
```

### Step 3: Test the Chatbot
1. Open `index.html` in your browser
2. Click the chat button (💬) in the bottom-right corner
3. Ask a question like: "What is a government contract?"

## ✅ What You'll Get

### With Gemini API Key:
- **Intelligent AI responses** powered by Google's Gemini
- **Context-aware conversations** that understand government law
- **Professional legal guidance** for government matters
- **Real-time responses** with typing indicators

### Without API Key (Fallback Mode):
- **Smart fallback responses** for common legal topics
- **Basic government law guidance**
- **Professional interface** still works perfectly

## 🔧 Advanced Configuration

You can customize the AI behavior by modifying these settings in `script.js`:

```javascript
const CONFIG = {
    GEMINI_API_KEY: 'your-api-key-here',
    TEMPERATURE: 0.7,        // Creativity level (0.0-1.0)
    TOP_K: 40,              // Response diversity
    TOP_P: 0.95,            // Response quality
    MAX_OUTPUT_TOKENS: 1024 // Response length
};
```

## 🚨 Troubleshooting

### Chatbot Not Responding?
- ✅ Check if API key is correctly set
- ✅ Verify internet connection
- ✅ Check browser console for errors

### Getting Error Messages?
- ✅ Ensure API key is valid and active
- ✅ Check if you have Gemini API access
- ✅ Verify the API key format (starts with `AIza`)

### Fallback Mode Working?
- ✅ This is normal if no API key is set
- ✅ Fallback provides basic legal guidance
- ✅ Add API key to enable full AI features

## 🔒 Security Notes

- **Never share your API key** publicly
- **Don't commit API keys** to version control
- **Use environment variables** in production
- **Monitor API usage** in Google AI Studio

## 📞 Support

If you need help:
1. Check the browser console for error messages
2. Verify your API key is correct
3. Ensure you have internet connectivity
4. Try refreshing the page

---

**Ready to go!** Once you add your API key, your government law chatbot will be powered by Google's Gemini AI! 🚀
