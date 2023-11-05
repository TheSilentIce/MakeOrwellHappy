import { useState } from "react";
import "../Styles/MainBody.css";
import axios from "axios";
//First box will be text, second will be filler, third will be textbox

function MainBody() {
  const [prompt, setPrompt] = useState<String | null>("HELLO");
  const [passage, setPassage] = useState<String | null>("");

  const promptCollect = async () => {
    const URL = "http://localhost:8080/v1/Orwell/getPrompt/";

    try {
      const promptResponse = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return promptResponse.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAiTurn = async () => {
    const URL = "http://localhost:8080/v1/Orwell/aiTurn/" + passage;

    try {
      const aiResponse = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return aiResponse.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPrompt = () => {
    promptCollect().then((prompt) => {
      setPrompt(prompt);
      setPassage(prompt);
    });
  };

  const aiTurn = () => {
    getAiTurn().then((passage) => {
      setPassage(passage);
    });
  };

  return (
    <>
      <div>
        <button onClick={getPrompt}>GET PROMPT</button>
        <button onClick={aiTurn}>AI TURN</button>
        <p className="prompt">{prompt}</p>
        <p className="passage">{passage}</p>
      </div>
    </>
  );
}

export default MainBody;
