import Particle from "./Particle";
import "../Styles/App.css";
import MainBody from "./MainBody";

function App() {
  return (
    <>
      <div className="container">
        <div className="help">
          <Particle></Particle>
        </div>
        <MainBody></MainBody>
      </div>
    </>
  );
}

export default App;
