const express = require('express');
const path = require('path');
// Voeg de helmet middleware toe voor beveiligingsheaders
const helmet = require('helmet');

const app = express();
const port = 3001;

// --- 0. CSP instellen met Helmet ---
// Configureer Helmet om een Content-Security-Policy in te stellen.
// Sta 'self' en 'data:' toe voor afbeeldingen (img-src), dit lost de favicon-fout op.
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            // Sta afbeeldingen van de eigen oorsprong ('self') en data URI's toe
            imgSrc: ["'self'", "data:"],

            // Sta scripts, stijlen en andere basisfunctionaliteit van de eigen oorsprong toe
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"]
        }
    }
}));


// 1. Statische bestanden (de frontend) serveren
// BELANGRIJKE WIJZIGING: We gebruiken path.join(__dirname, '..', 'public')
// Dit gaat één map terug (van 'backend' naar 'smartCity/') en zoekt dan naar 'public'.
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));
console.log(`Statische bestanden worden geserveerd vanuit: ${publicPath}`);


// 2. Optionele API endpoint (de backend)
app.get('/api/status', (req, res) => {
    res.json({
        status: 'OK',
        server: 'Node.js Express',
        time: new Date().toISOString()
    });
});

// 3. Server starten
app.listen(port, () => {
    console.log(`✅ Server draait op http://localhost:${port}`);
    console.log(`🌐 Frontend te zien via http://localhost:${port}`);
});