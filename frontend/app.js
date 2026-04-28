const API_URL = 'http://localhost:8080/api/mongolian/translate';

async function handleTranslate() {
    const input = document.getElementById('inputText').value.trim();
    console.log('Input:', input);

    if (!input) {
        alert('Please enter some text to translate!');
        return;
    }

    const btn = document.getElementById('translateBtn');
    const outputSection = document.getElementById('outputSection');

    btn.disabled = true;
    btn.textContent = 'Translating...';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        });

        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Data received:', data);

        document.getElementById('englishOutput').textContent = data.translatedText;
        document.getElementById('mongolianOutput').textContent = data.modernMongolian;
        document.getElementById('scriptOutput').textContent = data.ancientScript;
        document.getElementById('pronunciationOutput').textContent = data.pronunciation;
        document.getElementById('contextOutput').textContent = data.context;

        console.log('Setting display to block');
        outputSection.style.display = 'block';
        console.log('Display set:', outputSection.style.display);

    } catch (error) {
        console.log('Error:', error);
        alert(error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Translate';
    }
}