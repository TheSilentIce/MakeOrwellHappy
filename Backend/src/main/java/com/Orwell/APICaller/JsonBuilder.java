package com.Orwell.APICaller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class JsonBuilder {
    private final String model = "gpt-3.5-turbo";
    private final String starterPrompt = "Generate a random but very creative 3 sentence passage. A user will add their own 3 sentences to it, so make sure one is able to add to it.";
    private final String aiResponsePrompt = "Add three very creative and random sentences to this passage, then return the entire passage with the added three sentences. Order should be like \"original passage + new 3 sentences\" Passage:  ";
    private final String calculatePrompt = "I want you to grade this passage as George Orwell would; you are going to grade it based on these four categories: Quality of metaphors, descriptive language, conciseness/efficiency, and creativity. Use these questions from Orwell's essay \"Politics and the English Language\" when grading each category: \n" +
            "1. What am I trying to say? \n" +
            "2. What words will express it? \n" +
            "3. What image or idiom will make it clearer? \n" +
            "4. Is this image fresh enough to have an effect?\n" +
            "5. Could I put it more shortly? \n" +
            "6. Have I said anything that is avoidably ugly?\n" +
            "\n" +
            "Quality of metaphors refers to the originality, creativity, and effectiveness of the metaphors used.\n" +
            "Descriptive language refers to the detail, creativity, and emotion that comes from the descriptive language used.\n" +
            "Conciseness/Efficiency refers to if there is no filler/fluff in the passage and if everything in the passage contributes to the bigger idea. Descriptive language is not filler so be careful to carefully differentiate.\n" +
            "Creativity refers to the pure creativity of the writing, which includes the ideas and the expression of those ideas.\n" +
            "\n" +
            "You will score each category from a score of 1-10, 10 being the best. \n" +
            "You will also give feedback and advice for each category on how the writer can improve and give specific examples of what they can improve.\n" +
            "An example being improving a specific metaphor the writer used.\n" +
            "\n" +
            "Here is an example passage that will help grade: \"Beneath the sapphire sky, the city's bustling streets pulsed with the rhythm of a thousand heartbeats, like veins coursing with the lifeblood of ambition. Towering skyscrapers stood sentinel, their mirrored surfaces reflecting dreams and aspirations in a kaleidoscope of glass and steel. At night, the city transformed into a celestial tapestry, with stars of neon and constellations of streetlights, a modern-day galaxy where every soul was a unique, shining sun.\" The scores for this passage are as follows: Quality of Metaphors:6, descriptive language: 8, conciseness/efficiency:5, creativity: 7.\n" +
            "\n" +
            "This is the order you will give me your result:\n" +
            "\n" +
            "Quality of Metaphors: Score\n" +
            "Descriptive Language: Score\n" +
            "Conciseness/Efficiency: Score\n" +
            "Creativity: Score\n" +
            "newline\n" +
            "Feedback:\n" +
            "newline\n" +
            "Quality of Metaphors: Feedback/Advice\n" +
            "newline\n" +
            "Descriptive Language: Feedback/Advice\n" +
            "newline\n" +
            "Conciseness/Efficiency: Feedback/Advice\n" +
            "newline\n" +
            "Creativity: Feedback/Advice\n" +
            "\n" +
            "Passage: ";

    public String buildPrompt() {
        Gson gson = new Gson();
        JsonObject payload = new JsonObject();

        payload.addProperty("model", model);
        JsonObject[] messages = new JsonObject[1];

        JsonObject userMessage = new JsonObject();
        userMessage.addProperty("role", "user");
        userMessage.addProperty("content", starterPrompt);
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
        String content = aiResponsePrompt + passage;
        userMessage.addProperty("content",content);
        messages[0] = userMessage;

        payload.add("messages",gson.toJsonTree(messages));
        return payload.toString();
    }

    public String buildCalculation(String passage) {
        Gson gson = new Gson();
        JsonObject payload = new JsonObject();

        payload.addProperty("model",model);
        JsonObject[] messages = new JsonObject[1];

        JsonObject userMessage = new JsonObject();
        userMessage.addProperty("role","user");
        String content = calculatePrompt + passage;
        userMessage.addProperty("content",content);
        messages[0] = userMessage;

        payload.add("messages",gson.toJsonTree(messages));
        return payload.toString();
    }

    public String translateResponse(String json) {
        JsonObject jsonObject = JsonParser.parseString(json).getAsJsonObject();
        String x = jsonObject.getAsJsonArray("choices").get(0).getAsJsonObject().getAsJsonObject("message").get("content").getAsString();
        return x;
    }
}
