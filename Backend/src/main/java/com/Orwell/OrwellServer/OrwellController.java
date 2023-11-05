package com.Orwell.OrwellServer;

import org.springframework.web.bind.annotation.*;

import javax.imageio.IIOException;
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
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/getPrompt/")
    public String getPrompt() throws IOException {
        return orwellService.getPrompt();
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/aiTurn/{passage}")
    public String aiTurn(@PathVariable String passage) throws IOException{
        return orwellService.getAIResponse(passage);
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/calculate/{passage}")
    public String calculateScores(@PathVariable String passage) throws IOException {
        return orwellService.calculateScores(passage);
    }

}
