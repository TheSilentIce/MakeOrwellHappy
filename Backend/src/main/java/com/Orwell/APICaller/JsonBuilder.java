package com.Orwell.APICaller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class JsonBuilder {
    private final String model = "gpt-3.5-turbo";
    private final String prompt = "Generate a random but very creative 3 sentence passage. A user will add their own 3 sentences to it, so make sure one is able to add to it.";

    public String buildPrompt() {
        Gson gson = new Gson();
        JsonObject payload = new JsonObject();

        payload.addProperty("model", model);
        JsonObject[] messages = new JsonObject[1];

        JsonObject userMessage = new JsonObject();
        userMessage.addProperty("role", "user");
        userMessage.addProperty("content", prompt);
        messages[0] = userMessage;

        payload.add("messages", gson.toJsonTree(messages));
        return payload.toString();
    }

    public String buildPassage(String passage) {
        Gson gson = new Gson();
        JsonObject payload = new JsonObject();

        payload.addProperty("model",model);
        JsonObject[] messages = new JsonObject[1];

        JsonObject userMessage = new JsonObject();
        userMessage.addProperty("role","user");
        userMessage.addProperty("content",passage);
        messages[0] = userMessage;

        payload.add("messages",gson.toJsonTree(messages));
        return payload.toString();
    }
}
