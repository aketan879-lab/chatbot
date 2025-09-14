# Quick Setup Instructions

## 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## 2. Configure the Website

1. Open `script.js` in a text editor
2. Find this line (around line 6):
   ```javascript
   GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
   ```
3. Replace `'YOUR_GEMINI_API_KEY_HERE'` with your actual API key:
   ```javascript
   GEMINI_API_KEY: 'AIzaSyD_eSgPB9MjJRhgBKgCn6BPjSM1YB32MP8',
   ```

## 3. Run the Website

### Option 1: Direct File Opening
- Double-click `index.html` to open in your browser

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open: http://localhost:8000

## 4. Test the Chatbot

1. Click the chat button in the bottom-right corner
2. Ask a government law question like:
   - "What is a government contract?"
   - "How do I file a FOIA request?"
   - "What are public sector employment rights?"

## Features Available

✅ **Without API Key**: Fallback responses for common legal topics
✅ **With API Key**: Full Gemini AI integration with intelligent responses
✅ **Responsive Design**: Works on desktop, tablet, and mobile
✅ **Chat History**: Conversations are saved locally
✅ **Professional UI**: Government-themed design

## Troubleshooting

- **Chatbot not responding**: Check if API key is correctly set
- **Styling issues**: Ensure `styles.css` is in the same folder
- **JavaScript errors**: Check browser console for error messages

## Security Note

Never share your API key publicly or commit it to version control!
