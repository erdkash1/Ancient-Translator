package com.linguaantiqua.languages.mongolian.model;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class TranslateResponse {

    private String translatedText;
    private String modernMongolian;
    private String ancientScript;
    private String pronunciation;
    private String context;
}