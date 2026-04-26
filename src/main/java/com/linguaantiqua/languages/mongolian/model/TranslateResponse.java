package com.linguaantiqua.languages.mongolian.model;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class TranslateResponse {

    private String translatedText;      // English translation
    private String modernMongolian;     // Modern Mongolian (Cyrillic)
    private String ancientScript;       // Classical Mongolian script
    private String context;             // Historical insight
}