package com.Orwell.OrwellServer;

import com.Orwell.APICaller.Connector;
import com.Orwell.APICaller.JsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class OrwellService {
    JsonBuilder jb = new JsonBuilder();
    Connector connector = new Connector();
    public OrwellService(){}

    public String getPrompt() throws IOException {
        String response = connector.connect(jb.buildPrompt());
        return jb.translateResponse(response);
    }

    public String getAIResponse(String passage) throws IOException {
        String response = connector.connect(jb.buildPassage(passage));
        return jb.translateResponse(response);
    }

    public String calculateScores(String passage) throws IOException {
        String response = connector.connect(jb.buildCalculation(passage));
        return jb.translateResponse(response);
    }
}
