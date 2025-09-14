// Government Law Help Advisory - JavaScript
// Gemini AI Integration and Interactive Features

// Configuration
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSyCmMDEjT7fGujzyDV5YqUKmGg4hrouqSgo', // Replace with your actual Gemini API key
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    MAX_CHAT_HISTORY: 50,
    TYPING_DELAY: 1000,
    // Gemini API Settings
    TEMPERATURE: 0.7,
    TOP_K: 40,
    TOP_P: 0.95,
    MAX_OUTPUT_TOKENS: 1024
};

// Global variables
let chatHistory = [];
let isTyping = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadChatHistory();
});

// Initialize application
function initializeApp() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Initialize chatbot
    initializeChatbot();
}

// Setup event listeners
function setupEventListeners() {
    // Scroll effect for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 58, 138, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)';
            header.style.backdropFilter = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .resource-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Chatbot Functions
function initializeChatbot() {
    const chatbotInput = document.getElementById('chatbot-input');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', handleKeyPress);
    }
}

function openChatbot() {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.querySelector('.chatbot-toggle');
    
    if (chatbot && toggle) {
        chatbot.classList.add('active');
        toggle.classList.add('hidden');
        document.getElementById('chatbot-input').focus();
    }
}

function closeChatbot() {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.querySelector('.chatbot-toggle');
    
    if (chatbot && toggle) {
        chatbot.classList.remove('active');
        toggle.classList.remove('hidden');
    }
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot.classList.contains('active')) {
        closeChatbot();
    } else {
        openChatbot();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get response from Gemini AI
        const response = await getGeminiResponse(message);
        hideTypingIndicator();
        addMessageToChat(response, 'bot');
    } catch (error) {
        hideTypingIndicator();
        addMessageToChat('I apologize, but I\'m experiencing technical difficulties. Please try again later or contact our support team.', 'bot');
        console.error('Error getting AI response:', error);
    }
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to chat history
    chatHistory.push({ message, sender, timestamp: new Date() });
    
    // Limit chat history
    if (chatHistory.length > CONFIG.MAX_CHAT_HISTORY) {
        chatHistory = chatHistory.slice(-CONFIG.MAX_CHAT_HISTORY);
    }
    
    // Save chat history
    saveChatHistory();
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    isTyping = true;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-message';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
    isTyping = false;
}

// Gemini AI Integration
async function getGeminiResponse(userMessage) {
    // Check if API key is configured
    if (CONFIG.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        return getFallbackResponse(userMessage);
    }
    
    try {
        const prompt = createLegalPrompt(userMessage);
        
        const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {maxoutputtokens: 1024,
                    temperature: CONFIG.TEMPERATURE,
                    topK: CONFIG.TOP_K,
                    topP: CONFIG.TOP_P,
                    maxOutputTokens: CONFIG.MAX_OUTPUT_TOKENS,
                },
                safetySettings: [
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
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format from Gemini API');
        }
        
    } catch (error) {
        console.error('Gemini API Error:', error);
        return getFallbackResponse(userMessage);
    }
}

function createLegalPrompt(userMessage) {
    const context = `
You are an AI Legal Assistant specializing in government law and regulations. You provide helpful, accurate, and professional legal guidance for government-related matters.

Your comprehensive expertise includes:

🏛️ GOVERNMENT LAW SECTIONS:

1. **Constitutional Law**
   - Constitutional rights and freedoms
   - Separation of powers
   - Federal vs. state authority
   - Constitutional amendments
   - Judicial review and constitutional interpretation

2. **Administrative Law**
   - Government agency procedures
   - Rulemaking processes
   - Administrative hearings
   - Due process requirements
   - Agency decision-making standards

3. **Government Contracts & Procurement**
   - Federal Acquisition Regulation (FAR)
   - Competitive bidding processes
   - Contract types and requirements
   - Performance standards and compliance
   - Disputes and claims procedures

4. **Public Sector Employment Law**
   - Civil service regulations
   - Collective bargaining rights
   - Workplace discrimination laws
   - Whistleblower protections
   - Employee benefits and retirement

5. **Regulatory Compliance**
   - Environmental regulations
   - Health and safety standards
   - Financial reporting requirements
   - Data protection and privacy laws
   - Industry-specific regulations

6. **Public Policy & Legislation**
   - Legislative process
   - Policy implementation
   - Regulatory impact analysis
   - Public comment procedures
   - Policy evaluation and review

7. **Government Appeals & Disputes**
   - Administrative appeals
   - Judicial review processes
   - Alternative dispute resolution
   - Settlement procedures
   - Enforcement actions

8. **Transparency & Access Laws**
   - Freedom of Information Act (FOIA)
   - Open meetings laws
   - Public records access
   - Privacy Act protections
   - Government transparency requirements

9. **Government Ethics & Standards**
   - Conflict of interest rules
   - Ethics training requirements
   - Gift and travel restrictions
   - Post-employment restrictions
   - Financial disclosure requirements

10. **Criminal Law (Government Context)**
    - Public corruption laws
    - Fraud and abuse statutes
    - Bribery and kickback prohibitions
    - False claims and statements
    - Government investigations

11. **Tax Law (Government Context)**
    - Government tax obligations
    - Tax-exempt organizations
    - Government contractor tax issues
    - State and local tax compliance
    - Tax dispute resolution

12. **Immigration Law (Government Context)**
    - Government immigration policies
    - Border security regulations
    - Asylum and refugee procedures
    - Government immigration enforcement
    - International agreements

13. **Artcle 420 (Government Context)**
    - Cheating
    - Dishonest Inducement
    - Delivery of Property
    - Fraudulent/Dishonest Intent

Guidelines:
1. Provide clear, accurate legal information with specific legal citations when possible
2. Always recommend consulting with a qualified attorney for specific legal advice
3. Focus on government-related legal matters and provide comprehensive coverage
4. Be professional, helpful, and educational
5. If asked about non-government legal matters, politely redirect to government law topics
6. Include relevant case law, statutes, and regulations when applicable
7. Explain complex legal concepts in simple, understandable terms
8. Provide practical guidance and next steps when appropriate
9. Mention relevant government agencies and resources
10. Always emphasize the importance of compliance and proper procedures

User Question: ${userMessage}

Please provide a comprehensive and helpful response focusing on the relevant government law aspects. Include specific legal references, practical guidance, and next steps where appropriate.`;

    return context;
}

function getFallbackResponse(userMessage) {
    const fallbackResponses = {
        'constitutional': 'Constitutional law governs the fundamental principles and structure of government. This includes constitutional rights, separation of powers, federal vs. state authority, and judicial review. For specific constitutional questions, consult with a constitutional law attorney.',
        
        'administrative': 'Administrative law covers government agency procedures, rulemaking processes, administrative hearings, and due process requirements. Each agency has specific procedures for rulemaking and decision-making. Check the relevant agency\'s regulations and procedures.',
        
        'contract': 'Government contracts are governed by the Federal Acquisition Regulation (FAR) and include competitive bidding processes, contract types, performance standards, and dispute procedures. For specific contract issues, consult with a government contracts attorney.',
        
        'employment': 'Public sector employment law includes civil service regulations, collective bargaining rights, workplace discrimination laws, whistleblower protections, and employee benefits. Each government entity has specific policies and procedures.',
        
        'compliance': 'Government compliance involves adhering to federal, state, and local regulations including ethics rules, reporting requirements, audit standards, environmental regulations, and data protection laws. Requirements vary by agency and jurisdiction.',
        
        'policy': 'Public policy and legislation involve the legislative process, policy implementation, regulatory impact analysis, public comment procedures, and policy evaluation. Understanding the policy-making process is crucial for effective government engagement.',
        
        'appeal': 'Administrative appeals processes vary by agency and type of decision. Generally, you have the right to appeal adverse decisions within specified timeframes. Check the specific agency\'s appeal procedures and deadlines.',
        
        'foia': 'The Freedom of Information Act (FOIA) allows public access to government records. Requests must be submitted in writing to the appropriate agency and should be as specific as possible. Agencies have 20 business days to respond.',
        
        'ethics': 'Government ethics include conflict of interest rules, ethics training requirements, gift and travel restrictions, post-employment restrictions, and financial disclosure requirements. All government employees must comply with ethics standards.',
        
        'criminal': 'Government-related criminal law includes public corruption laws, fraud and abuse statutes, bribery and kickback prohibitions, false claims and statements, and government investigations. These are serious matters requiring immediate legal counsel.',
        
        'tax': 'Government tax law covers government tax obligations, tax-exempt organizations, government contractor tax issues, state and local tax compliance, and tax dispute resolution. Tax matters often require specialized legal expertise.',
        
        'immigration': 'Government immigration law includes immigration policies, border security regulations, asylum and refugee procedures, government immigration enforcement, and international agreements. Immigration law is complex and constantly evolving.',
        
        'transparency': 'Government transparency laws include FOIA, open meetings laws, public records access, Privacy Act protections, and government transparency requirements. These laws ensure public access to government information and proceedings.',
        
        'default': 'I\'m here to help with government law questions across 12 comprehensive legal areas: Constitutional Law, Administrative Law, Government Contracts, Public Employment, Regulatory Compliance, Public Policy, Appeals & Disputes, Transparency & Access, Government Ethics, Criminal Law, Tax Law, and Immigration Law. How can I assist you with your specific government law question?'
    };
    
    const message = userMessage.toLowerCase();
    
    // Enhanced keyword matching for comprehensive legal coverage
    if (message.includes('constitutional') || message.includes('constitution') || message.includes('amendment') || message.includes('separation of powers')) {
        return fallbackResponses.constitutional;
    } else if (message.includes('administrative') || message.includes('agency') || message.includes('rulemaking') || message.includes('hearing')) {
        return fallbackResponses.administrative;
    } else if (message.includes('contract') || message.includes('procurement') || message.includes('far') || message.includes('bidding')) {
        return fallbackResponses.contract;
    } else if (message.includes('employment') || message.includes('workplace') || message.includes('employee') || message.includes('civil service') || message.includes('whistleblower')) {
        return fallbackResponses.employment;
    } else if (message.includes('compliance') || message.includes('audit') || message.includes('regulation') || message.includes('environmental') || message.includes('privacy')) {
        return fallbackResponses.compliance;
    } else if (message.includes('policy') || message.includes('legislation') || message.includes('legislative') || message.includes('public comment')) {
        return fallbackResponses.policy;
    } else if (message.includes('appeal') || message.includes('dispute') || message.includes('challenge') || message.includes('judicial review')) {
        return fallbackResponses.appeal;
    } else if (message.includes('foia') || message.includes('freedom of information') || message.includes('public record') || message.includes('transparency')) {
        return fallbackResponses.foia;
    } else if (message.includes('ethics') || message.includes('conflict of interest') || message.includes('gift') || message.includes('financial disclosure')) {
        return fallbackResponses.ethics;
    } else if (message.includes('criminal') || message.includes('corruption') || message.includes('fraud') || message.includes('bribery') || message.includes('investigation')) {
        return fallbackResponses.criminal;
    } else if (message.includes('tax') || message.includes('tax-exempt') || message.includes('contractor tax') || message.includes('tax dispute')) {
        return fallbackResponses.tax;
    } else if (message.includes('immigration') || message.includes('border') || message.includes('asylum') || message.includes('refugee') || message.includes('visa')) {
        return fallbackResponses.immigration;
    } else {
        return fallbackResponses.default;
    }
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Contact Form Handling
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name') || event.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || event.target.querySelector('textarea').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you within 24 hours.');
    event.target.reset();
}

// Chat History Management
function saveChatHistory() {
    try {
        localStorage.setItem('govlaw_chat_history', JSON.stringify(chatHistory));
    } catch (error) {
        console.error('Error saving chat history:', error);
    }
}

function loadChatHistory() {
    try {
        const saved = localStorage.getItem('govlaw_chat_history');
        if (saved) {
            chatHistory = JSON.parse(saved);
            
            // Restore recent messages to chat interface
            const messagesContainer = document.getElementById('chatbot-messages');
            if (messagesContainer && chatHistory.length > 0) {
                // Clear existing messages except the initial bot message
                const initialMessage = messagesContainer.querySelector('.bot-message');
                messagesContainer.innerHTML = '';
                if (initialMessage) {
                    messagesContainer.appendChild(initialMessage);
                }
                
                // Add recent messages (last 10)
                const recentMessages = chatHistory.slice(-10);
                recentMessages.forEach(msg => {
                    addMessageToChat(msg.message, msg.sender);
                });
            }
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
        chatHistory = [];
    }
}

function clearChatHistory() {
    chatHistory = [];
    localStorage.removeItem('govlaw_chat_history');
    
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
        messagesContainer.innerHTML = `
            <div class="message bot-message">
                <div class="message-content">
                    <p>Hello! I'm your AI Legal Assistant. I can help you with government law questions, contract guidance, compliance issues, and more. How can I assist you today?</p>
                </div>
            </div>
        `;
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + K to open chatbot
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        openChatbot();
    }
    
    // Escape to close chatbot
    if (event.key === 'Escape') {
        const chatbot = document.getElementById('chatbot');
        if (chatbot && chatbot.classList.contains('active')) {
            closeChatbot();
        }
    }
});

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

trackPerformance();

// Legal Knowledge Base
const LEGAL_KNOWLEDGE_BASE = {
    'constitutional_rights': {
        title: 'Constitutional Rights',
        summary: 'Fundamental rights protected by the Constitution including freedom of speech, due process, equal protection, and privacy rights.',
        keyPoints: [
            'First Amendment: Freedom of speech, religion, press, assembly, and petition',
            'Fourth Amendment: Protection against unreasonable searches and seizures',
            'Fifth Amendment: Due process, self-incrimination, and eminent domain',
            'Fourteenth Amendment: Equal protection and due process for all citizens'
        ]
    },
    'foia_process': {
        title: 'FOIA Request Process',
        summary: 'How to request government records under the Freedom of Information Act.',
        keyPoints: [
            'Submit written request to appropriate agency',
            'Be specific about records requested',
            'Agencies have 20 business days to respond',
            'Fees may apply for processing and copying',
            'Appeals available if request is denied'
        ]
    },
    'government_contracts': {
        title: 'Government Contracting',
        summary: 'Overview of government contract requirements and procedures.',
        keyPoints: [
            'Governed by Federal Acquisition Regulation (FAR)',
            'Competitive bidding required for most contracts',
            'Various contract types: fixed-price, cost-reimbursement, time-and-materials',
            'Performance standards and compliance requirements',
            'Dispute resolution procedures available'
        ]
    },
    'administrative_appeals': {
        title: 'Administrative Appeals',
        summary: 'How to appeal government agency decisions.',
        keyPoints: [
            'Check agency-specific appeal procedures',
            'File appeal within specified timeframes',
            'Provide supporting documentation',
            'Consider alternative dispute resolution',
            'Judicial review may be available after administrative remedies'
        ]
    },
    'ethics_requirements': {
        title: 'Government Ethics',
        summary: 'Ethics rules and requirements for government employees.',
        keyPoints: [
            'Conflict of interest prohibitions',
            'Financial disclosure requirements',
            'Gift and travel restrictions',
            'Post-employment restrictions',
            'Ethics training requirements'
        ]
    }
};

function getLegalKnowledge(topic) {
    const knowledge = LEGAL_KNOWLEDGE_BASE[topic];
    if (knowledge) {
        return `**${knowledge.title}**\n\n${knowledge.summary}\n\n**Key Points:**\n${knowledge.keyPoints.map(point => `• ${point}`).join('\n')}`;
    }
    return null;
}

// Enhanced chatbot initialization with legal knowledge
function initializeChatbot() {
    const chatbotInput = document.getElementById('chatbot-input');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', handleKeyPress);
    }
    
    // Add legal knowledge quick access
    addLegalKnowledgeButtons();
}

function addLegalKnowledgeButtons() {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    // Add quick access buttons for common legal topics
    const quickAccessDiv = document.createElement('div');
    quickAccessDiv.className = 'legal-quick-access';
    quickAccessDiv.innerHTML = `
        <div class="quick-access-title">Quick Legal Topics:</div>
        <div class="quick-access-buttons">
            <button onclick="askQuickQuestion('constitutional rights')" class="quick-btn">Constitutional Rights</button>
            <button onclick="askQuickQuestion('foia process')" class="quick-btn">FOIA Process</button>
            <button onclick="askQuickQuestion('government contracts')" class="quick-btn">Government Contracts</button>
            <button onclick="askQuickQuestion('administrative appeals')" class="quick-btn">Administrative Appeals</button>
            <button onclick="askQuickQuestion('ethics requirements')" class="quick-btn">Government Ethics</button>
        </div>
    `;
    
    // Insert after the initial bot message
    const initialMessage = messagesContainer.querySelector('.bot-message');
    if (initialMessage) {
        initialMessage.insertAdjacentElement('afterend', quickAccessDiv);
    }
}

function askQuickQuestion(topic) {
    const knowledge = getLegalKnowledge(topic);
    if (knowledge) {
        addMessageToChat(`Tell me about ${topic}`, 'user');
        addMessageToChat(knowledge, 'bot');
    }
}

// Export functions for global access
window.openChatbot = openChatbot;
window.closeChatbot = closeChatbot;
window.toggleChatbot = toggleChatbot;
window.sendMessage = sendMessage;
window.handleKeyPress = handleKeyPress;
window.scrollToSection = scrollToSection;
window.clearChatHistory = clearChatHistory;
window.askQuickQuestion = askQuickQuestion;