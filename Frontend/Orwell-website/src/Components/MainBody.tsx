import { useState } from "react";
import { useEffect } from "react";
import "../Styles/MainBody.css";
import axios from "axios";
import "../Styles/TailwindFile.css";
import { Button } from "flowbite-react";

//First box will be text, second will be filler, third will be textbox

function MainBody() {
  const [prompt, setPrompt] = useState<String>("Loading Prompt...");
  const [passage, setPassage] = useState<String>("");
  const [isPrompt, setIsPrompt] = useState<boolean>(false);
  const [isPassage, setIsPassage] = useState<boolean>(true);
  const [userInput, setUserInput] = useState<String>("");

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

  //   const aiTurn = () => {
  //     getAiTurn().then((passage) => {
  //       setPassage(passage);
  //     });
  //   };

  const submitTextBox = () => {
    getAiTurn().then((passage) => {
      setIsPrompt(true);
      setIsPassage(false);
    });
  };

  const textInput = (val: any) => {
    setUserInput(val.target.value);
  };

  let oneTime: boolean = true;

  useEffect(() => {
    if (oneTime) {
      getPrompt();
      console.log("RUN");
      oneTime = false;
    }
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="text-container">
          <p className="prompt" hidden={isPrompt}>
            {prompt}
          </p>
          <p className="passage">{userInput}</p>
          <p className="passage" hidden={isPassage}>
            {passage}
          </p>
        </div>

        <div className="eye-container"></div>
        <div className="input-container">
          <textarea onChange={textInput}></textarea>
          <Button onClick={submitTextBox} gradientDuoTone={"purpleToPink"}>
            Submit
          </Button>
        </div>

        {/* <Button onClick={getPrompt} gradientDuoTone={"greenToBlue"}>
          GET PROMPT
        </Button>
        <Button onClick={aiTurn}>AI TURN</Button> */}
      </div>
    </>
  );
}

export default MainBody;
