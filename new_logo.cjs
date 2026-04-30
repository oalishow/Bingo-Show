const fs = require('fs');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <defs>
        <linearGradient id="premium-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fbbf24" />
            <stop offset="50%" stop-color="#d97706" />
            <stop offset="100%" stop-color="#b45309" />
        </linearGradient>
        <filter id="glow">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <filter id="inner-shadow">
            <feOffset dx="0" dy="4"/>
            <feGaussianBlur stdDeviation="4" result="offset-blur"/>
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
            <feFlood flood-color="black" flood-opacity="0.8" result="color"/>
            <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
        </filter>
    </defs>
    
    <!-- Outer Ring -->
    <circle cx="256" cy="256" r="240" fill="url(#premium-bg)" stroke="#fbbf24" stroke-width="8" filter="url(#glow)"/>
    <circle cx="256" cy="256" r="225" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="10 15" opacity="0.4"/>

    <!-- Content -->
    <g transform="translate(256, 240)">
        <!-- The Bingo Ball Background -->
        <circle cx="0" cy="0" r="160" fill="#ffffff" opacity="0.1" filter="url(#inner-shadow)" />
        
        <!-- BINGO Text -->
        <text y="-20" font-family="Montserrat, sans-serif" font-weight="900" font-size="110" fill="url(#gold-gradient)" text-anchor="middle" filter="url(#glow)" letter-spacing="-5" style="text-shadow: 0 10px 20px rgba(0,0,0,0.5)">BINGO</text>
        
        <!-- SHOW Text -->
        <text y="80" font-family="Montserrat, sans-serif" font-weight="700" font-size="70" fill="#ffffff" text-anchor="middle" letter-spacing="15" opacity="0.9">SHOW</text>
    </g>

    <!-- Version Badge (Optional but nice) -->
    <g transform="translate(400, 120) scale(0.6)">
        <circle r="60" fill="#d97706" stroke="#fbbf24" stroke-width="4" filter="url(#glow)"/>
        <text dy="15" font-family="sans-serif" font-weight="900" font-size="45" fill="#ffffff" text-anchor="middle">7.2</text>
    </g>

    <!-- Decorative Stars -->
    <path d="M256 40 L262 60 L282 60 L266 72 L272 92 L256 80 L240 92 L246 72 L230 60 L250 60 Z" fill="#fbbf24" filter="url(#glow)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
    </path>
</svg>`;

const b64 = 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');

let code = fs.readFileSync('index.tsx', 'utf8');
code = code.replace(/customLogoBase64:\s*'data:image\/svg\+xml;base64,[^']+'/, `customLogoBase64: '${b64}'`);

// Re-applying the fix for the default logo placeholder in renderCustomLogo if needed
// Actually let's just make sure the DEFAULT_LOGO_BASE64 part is updated if I used it before
code = code.replace(/const defaultLogo = 'data:image\/svg\+xml;base64,[^']+';/, `const defaultLogo = '${b64}';`);

fs.writeFileSync('index.tsx', code);
