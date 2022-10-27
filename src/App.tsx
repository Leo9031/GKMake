import "./App.css";
import ExerciseSheet from "./ExerciseSheet";
import { Button, Input, Modal } from "antd";
import Intro from "./Intro";
import { useState } from "react";

import Info from "./Info";




function App() {
  const [addExerciseMode, setAddExerciseMode] = useState<boolean>(false);
  return (
    <>


      <div id="content" className="Centerme">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <div>
          <h1 className="Titletext">GK-MAKe BetA</h1>
        </div>
        
        <Intro nameSet={setAddExerciseMode} />
        {addExerciseMode && <ExerciseSheet />}
      </div>
    </>
  );
}

export default App;
