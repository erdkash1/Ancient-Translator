package com.linguaantiqua.languages.mongolian;

import com.linguaantiqua.client.GroqClient;
import com.linguaantiqua.languages.mongolian.model.TranslateRequest;
import com.linguaantiqua.languages.mongolian.model.TranslateResponse;
import org.springframework.stereotype.Service;

@Service
public class MongolianService {

    private final GroqClient groqClient;

    public MongolianService(GroqClient groqClient) {
        this.groqClient = groqClient;
    }

    public TranslateResponse translate(TranslateRequest request) {
        String prompt = buildPrompt(request.getText());
        String rawResponse = groqClient.translate(prompt);
        return parseResponse(rawResponse);
    }


    private String buildPrompt(String text) {
        return """
            You are a native Mongolian speaker and expert scholar in Classical Mongolian language and the Mongol Empire era.
            
            The user will provide text in any language.
            
            Important rules for translation:
            - Translate naturally and fluently, NOT word by word
            - Write Mongolian exactly how a native Mongolian person speaks in everyday life
            - Use the most natural and common way to express the meaning
            - Keep it simple and short — do NOT add extra words
            - Use proper Mongolian grammar: subject + object + verb structure
            - For expressing love or feelings use "хайртай" NOT "хайрладаг"
            - For example:
                "I love my friends" → "Би найзууддаа хайртай"
                "I love my mother" → "Би ээждээ хайртай"
                "I am happy" → "Би баяртай байна"
            - Do NOT use overly formal or literary Mongolian
            - Preserve the original meaning and emotion
            
            Your response MUST follow this exact format with these exact labels:
            English: [natural fluent English translation]
            Mongolian: [simple natural everyday Mongolian in Cyrillic script]
            Script: [the Mongolian translation in Classical Mongolian script using Unicode ᠠᠡᠢᠣᠤᠥᠦᠧᠨᠩᠪᠫᠬᠭᠮᠯᠰᠱᠲᠳᠴᠵᠶᠷᠸ]
            Pronunciation: [romanized pronunciation of the Mongolian translation, syllable by syllable with dashes, e.g. "bi naij-uud-daa khair-tai"]
            Context: [one sentence of historical or cultural insight]
            
            Text: %s
            """.formatted(text);
    }
    private TranslateResponse parseResponse(String rawResponse) {
        String translatedText = "";
        String modernMongolian = "";
        String ancientScript = "";
        String pronunciation = "";
        String context = "";

        for (String line : rawResponse.split("\n")) {
            if (line.startsWith("English:")) {
                translatedText = line.replace("English:", "").trim();
            } else if (line.startsWith("Mongolian:")) {
                modernMongolian = line.replace("Mongolian:", "").trim();
            } else if (line.startsWith("Script:")) {
                ancientScript = line.replace("Script:", "").trim();
            } else if (line.startsWith("Pronunciation:")) {
                pronunciation = line.replace("Pronunciation:", "").trim();
            } else if (line.startsWith("Context:")) {
                context = line.replace("Context:", "").trim();
            }
        }

        return new TranslateResponse(translatedText, modernMongolian, ancientScript, pronunciation, context);
    }
}