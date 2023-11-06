import { useState } from "react";
import { useEffect } from "react";
import "../Styles/MainBody.css";
import axios from "axios";
import "../Styles/TailwindFile.css";
import { Button } from "flowbite-react";

//First box will be text, second will be filler, third will be textbox

function MainBody() {
  const [passage, setPassage] = useState<String>("");
  let [beginning, setBeginning] = useState<String>("Loading Prompt...");
  const [counter, setCounter] = useState<number>(0);
  const [userInput, setUserInput] = useState<String[]>([]);
  const [mainPage, setMainPage] = useState<boolean>(true);
  const [summaryPage, setSummaryPage] = useState<boolean>(false);

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
    userInput.push(passage);
    setUserInput(userInput);
    beginning = beginning + " " + passage;
    let input: String = beginning.split(" ").join("-");
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
      setBeginning(prompt1);
    });
  };

  const submitTextBox = () => {
    getAiTurn().then((passage) => {
      setCounter(counter + 1);
      let newBeginning = beginning + passage;
      setBeginning(newBeginning);
      setPassage("");
    });
  };

  const textInput = (val: any) => {
    setPassage(val.target.value);
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
      {true && (
        <div className="main-container">
          <div className="text-container">
            <p className="prompt">{beginning}</p>
            <p className="passage">{passage}</p>
          </div>

          <div className="eye-container"></div>
          <div className="input-container">
            <textarea onChange={textInput}></textarea>
            <Button onClick={submitTextBox} gradientDuoTone={"purpleToPink"}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default MainBody;
