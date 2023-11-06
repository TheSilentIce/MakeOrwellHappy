import { useState } from "react";
import { useEffect } from "react";
import "../Styles/MainBody.css";
import axios from "axios";
import "../Styles/TailwindFile.css";
import { Button } from "flowbite-react";

function MainBody() {
  const [passage, setPassage] = useState<String>("");
  let [beginning, setBeginning] = useState<String>("Loading Prompt...");
  const [counter, setCounter] = useState<number>(2);
  const [userInput, setUserInput] = useState<String[]>([]);
  const [mainPage, setMainPage] = useState<boolean>(true);
  const [summaryPage, setSummaryPage] = useState<boolean>(false);
  const [summary, setSummary] = useState<String>("Loading Summary...");
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

  const calculateScores = async () => {
    let input: String = "";
    for (let i = 0; i < userInput.length; i++) {
      input += userInput[i].split(" ").join("-");
      input += "\n";
    }

    const URL = "http://localhost:8080/v1/Orwell/calculate/" + input;
    console.log("CALCULATE URL: " + URL);

    try {
      const calculateResponse = await axios.post(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return calculateResponse.data;
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
      if (counter + 1 == 4) {
        setMainPage(false);
        setSummaryPage(true);
        calculateScores().then((summary) => {
          setSummary(summary);
        });
      } else {
        setCounter(counter + 1);
      }

      let newBeginning = beginning + " " + passage;
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
      {mainPage && (
        <div className="main-container">
          <div className="text-container">
            <p className="prompt">{beginning}</p>
            <p className="passage">{passage}</p>
          </div>

          <div className="eye-container">
            <p>Orwell</p>
          </div>
          <div className="input-container">
            <textarea onChange={textInput} rows={4} cols={47}></textarea>
            <Button onClick={submitTextBox} gradientDuoTone={"purpleToPink"}>
              Submit
            </Button>
          </div>
        </div>
      )}

      {summaryPage && (
        <div className="summary-page">
          <div></div>
          <div className="summary-container">
            <p className="summary-text">{summary}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default MainBody;
