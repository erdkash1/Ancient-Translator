package com.linguaantiqua.languages.mongolian;

import com.linguaantiqua.languages.mongolian.model.TranslateRequest;
import com.linguaantiqua.languages.mongolian.model.TranslateResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mongolian")
@CrossOrigin(origins = "*")
public class MongolianController {

    private final MongolianService mongolianService;

    public MongolianController(MongolianService mongolianService) {
        this.mongolianService = mongolianService;
    }

    @PostMapping("/translate")
    public ResponseEntity<TranslateResponse> translate(@RequestBody TranslateRequest request) {
        TranslateResponse response = mongolianService.translate(request);
        return ResponseEntity.ok(response);
    }
}