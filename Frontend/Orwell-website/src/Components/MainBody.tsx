import { useState } from "react";
import "../Styles/MainBody.css";
import axios from "axios";
//First box will be text, second will be filler, third will be textbox

function MainBody() {
  const [prompt, setPrompt] = useState<String | null>("HELLO");

  const getPrompt = async () => {
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

  const test = () => {
    getPrompt().then((result) => {
      setPrompt(result);
    });
  };

  return (
    <>
      <div>
        <p>Hello</p>
        <button onClick={test}>CLICK ME</button>
        <p className="prompt">{prompt}</p>
      </div>
    </>
  );
}

export default MainBody;
