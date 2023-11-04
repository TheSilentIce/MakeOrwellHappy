package com.Orwell.OrwellServer;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping(path = "v1/Orwell/")
public class OrwellController {
    private final OrwellService orwellService;

    /**
     * Constructor for Orwell Controller
     * @param orwellService - service
     */
    public OrwellController(OrwellService orwellService) {
        this.orwellService = orwellService;
    }

    /**
     * Calls orwellService's getPrompt method and returns Ai's prompt
     * @return - returns prompt
     */
    @GetMapping
    public String getPrompt() throws IOException {
        return orwellService.getPrompt();
    }

    @PostMapping("/aiTurn/{passage}")
    public String aiTurn(@PathVariable String passage) throws IOException{
        return orwellService.getAIResponse(passage);
    }

}
