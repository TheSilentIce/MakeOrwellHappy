package com.Orwell.APICaller;

import javax.net.ssl.HttpsURLConnection;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class Connector {
    private String connect(String json) throws IOException {
        URL url = new URL("https://api.openai.com/v1/chat/completions");
        HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestMethod("POST");
        APIKey apiKey = new APIKey();
        String API_KEY = apiKey.getApi_key();
        connection.setRequestProperty("Authorization", "Bearer " + API_KEY);
        connection.setDoOutput(true);

        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = json.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int code = connection.getResponseCode();
        StringBuffer response = new StringBuffer();
        if (code == HttpsURLConnection.HTTP_OK) {
            InputStream inputStream = connection.getInputStream();
            BufferedReader in = new BufferedReader(new InputStreamReader(inputStream));
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            connection.disconnect();
        } else {
            throw new RuntimeException("ERROR: " + code);
        }
        return response.toString();
    }

}
