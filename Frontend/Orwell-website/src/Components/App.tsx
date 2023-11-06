import Particle from "./Particle";
import "../Styles/App.css";
import MainBody from "./MainBody";

function App() {
  return (
    <>
      <div className="container">
        <div className="column1">
          <Particle></Particle>
          <Particle></Particle>
          <Particle></Particle>
          <Particle></Particle>
          <Particle></Particle>
          <Particle></Particle>
          <Particle></Particle>
        </div>
        <MainBody></MainBody>
        <div className="column3">
          <Particle></Particle>
          <Particle></Particle>
          <Particle></Particle>
          <Particle></Particle>
          <Particle></Particle>
          <Particle></Particle>
          <Particle></Particle>
        </div>
      </div>
    </>
  );
}

export default App;
