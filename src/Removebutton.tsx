import "./App";
import { Button } from "antd";
import "./ExerciseSheet";
import "./Intro";
import { useState } from "react";

function Removebutton() {
  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);

    return (
      <>{visible && <Button onClick={removeElement}>Rimuovi Bottoni</Button>}</>
    );
  };
}

export default Removebutton;
