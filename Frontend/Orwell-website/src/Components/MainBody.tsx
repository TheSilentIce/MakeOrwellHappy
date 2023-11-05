import "../Styles/MainBody.css";
import axios from "axios";
//First box will be text, second will be filler, third will be textbox

function MainBody() {
  const getPrompt = async () => {
    const URL = "https://localhost:8080/v1/Orwell/getPrompt";

    try {
      const prompt = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return prompt;
    } catch (error) {
      console.log(error);
    }
  };

  const test = () => {
    console.log(getPrompt());
  };

  return (
    <>
      <div>
        <p>Hello</p>
        <button onClick={test}>CLICK ME</button>
      </div>
    </>
  );
}

export default MainBody;
