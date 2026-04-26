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
            You are an expert scholar in Classical Mongolian language and the Mongol Empire era.
            
            The user will provide either English or modern Mongolian text.
            
            Your response MUST follow this exact format with these exact labels:
            Translation: [translate the input into modern English]
            Script: [write the text in Classical Mongolian vertical script using Unicode characters ᠠᠡᠢᠣᠤᠥᠦᠧᠨᠩᠪᠫᠬᠭᠮᠯᠰᠱᠲᠳᠴᠵᠶᠷᠸᠹᠺᠻᠼᠽᠾᠿ]
            Context: [one sentence of historical or cultural insight]
            
            Text: %s
            """.formatted(text);
    }

    private TranslateResponse parseResponse(String rawResponse) {
        String translatedText = "";
        String ancientScript = "";
        String context = "";

        for (String line : rawResponse.split("\n")) {
            if (line.startsWith("Translation:")) {
                translatedText = line.replace("Translation:", "").trim();
            } else if (line.startsWith("Script:")) {
                ancientScript = line.replace("Script:", "").trim();
            } else if (line.startsWith("Context:")) {
                context = line.replace("Context:", "").trim();
            }
        }

        return new TranslateResponse(translatedText, ancientScript, context);
    }
}