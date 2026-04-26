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
                
                Translate the following ancient Mongolian text into modern English.
                
                Rules:
                - Provide the English translation clearly
                - After the translation add exactly one line starting with "Context:" 
                  that gives a short historical or cultural insight about the text
                - Keep the context to one sentence
                
                Text to translate: %s
                """.formatted(text);
    }

    private TranslateResponse parseResponse(String rawResponse) {
        String translatedText = rawResponse;
        String context = "";

        if (rawResponse.contains("Context:")) {
            String[] parts = rawResponse.split("Context:");
            translatedText = parts[0].trim();
            context = parts[1].trim();
        }

        return new TranslateResponse(translatedText, context);
    }
}