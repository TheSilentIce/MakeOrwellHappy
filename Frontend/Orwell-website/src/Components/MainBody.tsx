import { useState } from "react";
import "../Styles/MainBody.css";
import axios from "axios";
//First box will be text, second will be filler, third will be textbox

function MainBody() {
  const [prompt, setPrompt] = useState<String | null>("HELLO");
  const [passage, setPassage] = useState<String>("");

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
    let input = passage.split(" ").join("-");
    const URL = "http://localhost:8080/v1/Orwell/aiTurn/" + input;
    console.log("URL: " + URL);

    try {
      const promptResponse = await axios.post(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(promptResponse);
      return promptResponse.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPrompt = () => {
    promptCollect().then((prompt1) => {
      setPrompt(prompt1);
      setPassage(prompt1);
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
