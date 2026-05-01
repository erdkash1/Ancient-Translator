const API_URL = 'http://localhost:8080/api/mongolian/translate';

async function handleTranslate() {
    const input = document.getElementById('inputText').value.trim();

    if (!input) {
        alert('Please enter some text to translate!');
        return;
    }

    const btn = document.getElementById('translateBtn');
    if (btn.disabled) return;

    const outputSection = document.getElementById('outputSection');

    btn.disabled = true;
    btn.textContent = 'Translating...';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });

        const data = await response.json();

        document.getElementById('englishOutput').textContent = data.translatedText;
        document.getElementById('mongolianOutput').textContent = data.modernMongolian;
        document.getElementById('scriptOutput').textContent = data.ancientScript;
        document.getElementById('pronunciationOutput').textContent = data.pronunciation;
        document.getElementById('contextOutput').textContent = data.context;

        outputSection.style.display = 'block';

    } catch (error) {
        alert(error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Translate';
    }
}

function initMap() {
    const map = L.map('mongoliaMap', {
        center: [46.8625, 103.8467],
        zoom: 4,
        zoomControl: true,
        scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '© CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    const goldIcon = L.divIcon({
        className: '',
        html: `<div style="
            width: 16px;
            height: 16px;
            background: #F9CC2A;
            border: 2px solid #C4272F;
            border-radius: 50%;
            box-shadow: 0 0 12px rgba(249,204,42,0.8);
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    const capitalIcon = L.divIcon({
        className: '',
        html: `<div style="
            width: 12px;
            height: 12px;
            background: #C4272F;
            border: 2px solid #F9CC2A;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(196,39,47,0.8);
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });

    L.marker([46.8625, 103.8467], { icon: goldIcon })
        .addTo(map)
        .bindPopup(`
            <div style="
                background: #080d1a;
                color: #F9CC2A;
                font-family: 'Philosopher', serif;
                font-size: 0.8rem;
                letter-spacing: 0.1em;
                border: 1px solid rgba(249,204,42,0.3);
                padding: 0.5rem;
                border-radius: 4px;
            ">
                🇲🇳 Mongolia<br/>
                <span style="color:#f0e6d3; font-size:0.7rem;">1,564,116 km²</span>
            </div>
        `, { className: 'custom-popup' })
        .openPopup();

    L.marker([47.8864, 106.9057], { icon: capitalIcon })
        .addTo(map)
        .bindPopup(`
            <div style="
                background: #080d1a;
                color: #C4272F;
                font-family: 'Philosopher', serif;
                font-size: 0.8rem;
                letter-spacing: 0.1em;
                border: 1px solid rgba(196,39,47,0.3);
                padding: 0.5rem;
                border-radius: 4px;
            ">
                🏙️ Ulaanbaatar<br/>
                <span style="color:#f0e6d3; font-size:0.7rem;">Capital City</span>
            </div>
        `);

    const empireCoords = [
        [55, 30], [65, 60], [65, 100], [60, 130],
        [50, 140], [35, 140], [20, 120], [15, 80],
        [25, 50], [35, 30], [45, 25], [55, 30]
    ];

    L.polygon(empireCoords, {
        color: 'rgba(249, 204, 42, 0.6)',
        fillColor: 'rgba(249, 204, 42, 0.05)',
        fillOpacity: 1,
        weight: 1.5,
        dashArray: '6, 4'
    }).addTo(map)
    .bindTooltip('Mongol Empire at Peak (13th century)', {
        permanent: false,
        direction: 'top',
        className: 'empire-tooltip'
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe map
    const mapEl = document.getElementById('mongoliaMap');
    if (mapEl) observer.observe(mapEl);

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe people cards
    document.querySelectorAll('.people-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Observe script facts
    document.querySelectorAll('.script-fact').forEach((fact, index) => {
        fact.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(fact);
    });

    // Observe khan quote
    document.querySelectorAll('.khan-quote').forEach((el) => {
        observer.observe(el);
    });

    // Observe khan stats
    document.querySelectorAll('.khan-stat').forEach((stat, index) => {
        stat.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(stat);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputText').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleTranslate();
        }
    });

    initMap();
    initScrollAnimations();
});