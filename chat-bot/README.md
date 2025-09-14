# Government Law Help Advisory Website

A comprehensive government law advisory website with an AI-powered chatbot interface using Google's Gemini AI. This website provides legal guidance for government-related matters including contracts, employment law, compliance, and administrative procedures.

## Features

### 🏛️ Government Law Advisory
- **Contract Law**: Guidance on government contracts, procurement, and compliance
- **Employment Law**: Public sector employment rights and workplace regulations
- **Administrative Law**: Government procedures, appeals, and decision processes
- **Compliance**: Regulatory compliance, audits, and government standards
- **Public Policy**: Understanding government policies and regulations
- **Litigation Support**: Legal representation for government-related disputes

### 🤖 AI-Powered Chatbot
- **Gemini AI Integration**: Powered by Google's Gemini AI for intelligent responses
- **Legal Expertise**: Specialized in government law and regulations
- **24/7 Availability**: Always available to answer legal questions
- **Chat History**: Persistent chat history with localStorage
- **Fallback Responses**: Intelligent fallback when API is unavailable

### 🎨 Professional Design
- **Government Theme**: Professional blue color scheme with official styling
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Modern UI**: Clean, professional interface with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and transitions

### 📱 User Experience
- **Mobile-First**: Optimized for mobile devices
- **Fast Loading**: Optimized performance and loading times
- **Easy Navigation**: Intuitive menu and section navigation
- **Contact Forms**: Integrated contact form for direct inquiries
- **Resource Library**: Quick access to legal documents and guides

## Setup Instructions

### 1. Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini
3. Copy the API key

### 2. Configure the Application
1. Open `script.js`
2. Find the line: `GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE'`
3. Replace `'YOUR_GEMINI_API_KEY_HERE'` with your actual Gemini API key

### 3. Run the Website
1. Open `index.html` in a web browser
2. Or serve it using a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## File Structure

```
chat-bot/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── sw.js              # Service worker (optional)
```

## Usage

### Chatbot Features
- **Open Chatbot**: Click the chat button in the bottom-right corner
- **Ask Questions**: Type your government law questions
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + K` to open chatbot
  - `Escape` to close chatbot
  - `Enter` to send messages
- **Chat History**: Your conversations are saved locally

### Navigation
- **Smooth Scrolling**: Click any navigation link for smooth scrolling
- **Mobile Menu**: Tap the hamburger menu on mobile devices
- **Section Links**: Direct links to services, resources, about, and contact

### Contact Form
- Fill out the contact form for direct inquiries
- All fields are required for submission
- Form validation ensures proper data entry

## Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- The color scheme uses CSS custom properties for easy theming
- Responsive breakpoints can be adjusted in the media queries

### Content
- Update the HTML content in `index.html` for your specific needs
- Modify service cards, resource links, and contact information
- Add or remove sections as needed

### Chatbot Behavior
- Adjust the `createLegalPrompt()` function to modify AI responses
- Update fallback responses in `getFallbackResponse()`
- Modify the legal context and guidelines as needed

## Browser Support

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Full responsive support

## Security Considerations

- **API Key**: Keep your Gemini API key secure and never commit it to version control
- **HTTPS**: Use HTTPS in production for secure API communications
- **Input Validation**: All user inputs are sanitized and validated
- **Rate Limiting**: Consider implementing rate limiting for API calls

## Performance

- **Optimized Images**: Uses Font Awesome icons for scalable graphics
- **Minified Assets**: Consider minifying CSS and JS for production
- **Caching**: Service worker provides offline capabilities
- **Lazy Loading**: Intersection Observer for smooth animations

## Legal Disclaimer

This website provides general legal information and should not be considered as professional legal advice. Users should consult with qualified attorneys for specific legal matters. The AI responses are for informational purposes only and do not constitute legal representation.

## Support

For technical support or questions about the website:
- Email: legal.help@govlaw.gov
- Phone: 1-800-GOV-LAW (1-800-468-529)

## License

This project is created for educational and demonstration purposes. Please ensure compliance with Google's Gemini API terms of service and applicable laws when using this code.

---

**Note**: Remember to replace the placeholder API key with your actual Gemini API key before using the chatbot functionality.
