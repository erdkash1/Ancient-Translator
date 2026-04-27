const API_URL = 'http://localhost:8080/api/mongolian/translate';

async function handleTranslate() {
    const input = document.getElementById('inputText').value.trim();

    if (!input) {
        alert('Please enter some text to translate!');
        return;
    }

    const btn = document.getElementById('translateBtn');
    const outputSection = document.getElementById('outputSection');

    btn.disabled = true;
    btn.textContent = 'Translating...';
    outputSection.style.display = 'none';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: input })
        });

        if (!response.ok) {
            throw new Error('Translation failed. Please try again.');
        }

        const data = await response.json();

        document.getElementById('englishOutput').textContent = data.translatedText;
        document.getElementById('mongolianOutput').textContent = data.modernMongolian;
        document.getElementById('scriptOutput').textContent = data.ancientScript;
        document.getElementById('contextOutput').textContent = data.context;

        outputSection.style.display = 'block';

    } catch (error) {
        alert(error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Translate';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputText').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleTranslate();
        }
    });
});