package com.Orwell.OrwellServer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public String getPrompt() {
        return orwellService.getPrompt();
    }

}
