import { Button, Input, Modal, Row, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import jsPDF from "jspdf";
import Exercise from "./interfaces/exercise";
import "./Removebutton";

import "./App.css";
import { CameraTwoTone, DeleteOutlined } from "@ant-design/icons";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { isAwaitExpression } from "typescript";
import Info from "./Info";

function ExerciseSheet() {
  const webcamWrapRef = useRef<any>();
  const webcamRef = useRef<any>();
  const [facingMode, setFacingMode] = useState<any>({ exact: "environment" });
  const [exercises, setExercises] = useState<Array<Exercise>>([]);
  const [validInput, setValidInput] = useState<boolean>(false);
  const [img64, setImg64] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [reps, setReps] = useState<number>(0);
  const [reps2, setReps2] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [webcamWidth, setWebCamWidth] = useState<number>(0);
  const [webcamHeight, setWebCamHeight] = useState<number>(0);
  const [printModeEnabled, setPrintModeEnabled] = useState(false);
  const [visiBut, setVisiBut] = useState(false);

  const removeExercise = (ex: Exercise) => {
    setExercises(exercises.filter((e) => e.id != ex.id)); //prendi tutti gli esercizi tali per cui hanno id diverso da id di esercizio passato in input
  };

  useEffect(() => {
    setValidInput(title.length > -1 && description.length > -1);
  }, [title, description]);



  function relo() {
    
      console.log("Alert Clicked!");
      if(window.confirm("La scheda attuale verrà eliminata, sei sicuro di voler continuare?")) {
        window.location.reload();
      }
    
    
  }

  useEffect(() => {
    let interval: any;
    if (isModalOpen) {
      setImg64("");
      interval = setInterval(() => {
        if (webcamWrapRef && webcamWrapRef.current) {
          setWebCamWidth(webcamWrapRef.current.getBoundingClientRect().width);
          setWebCamHeight(250);
        }
      }, 250);
    } else {
      setWebCamHeight(0);
      setWebCamWidth(0);
      if (interval) interval.clear();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (printModeEnabled) {
      window.print();
      setPrintModeEnabled(true);
      setTimeout(() => {  setPrintModeEnabled(false); }, 2000);
    }
  }, [printModeEnabled]);

  const handleADD = () => {
    let ex: Exercise = {
      id: exercises.length,
      title: title,
      description: description,
      imageBase64: img64,
      reps: reps,
      reps2: reps2,
    };
    setExercises([...exercises, ex]);
    setImg64("");
    setTitle("");
    setReps(0);
    setReps2("");
    setDescription("");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getImage = () => {
    if (webcamRef && webcamRef.current) {
      setImg64(webcamRef.current.getScreenshot());
    }
  };

  return (
    <>
      {exercises.map(function (ex: Exercise) {
        return (
          <div className="Formclass" key={ex.id}>
            <img className="image" src={ex.imageBase64} />
            <h4>{ex.title}</h4>
            <p className="descri">{ex.description}</p>
            <h5>
              Ripetizioni: {ex.reps} x {ex.reps2}
            </h5>
            {!printModeEnabled && (
              <Button className="delebut" onClick={() => removeExercise(ex)}>
                <DeleteOutlined />
              </Button>
            )}
          </div>
        );
      })}
      <Modal
        title="Aggiungi esercizio"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        cancelText="Annulla"
      >
        {img64 == "" && (
          <div
            ref={webcamWrapRef}
            style={{ minWidth: "100%", minHeight: "60%" }}
          >
            {webcamWidth > 0 && webcamHeight > 0 && (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={{
                  width: 200,
                  facingMode: facingMode,
                  height: 200,
                }}
                onUserMediaError={(err: any) => {
                  if (err.constraint && err.constraint == "facingMode")
                    setFacingMode("user");
                }}
              />
            )}
          </div>
        )}
        {img64.length > 0 && <img src={img64} />}
        <div>
          <Button
            icon={<CameraTwoTone />}
            className="printim"
            type="ghost"
            onClick={() => getImage()}
          ></Button>
        </div>
        <Input
          className="area"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titolo"
        />
        <TextArea
          className="area"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={256}
          placeholder="Descrizione"
        />
        <div>Ripetizioni:</div>
        <Input
          className="inp"
          type="number"
          value={reps}
          min={1}
          step={1}
          onChange={(e) => setReps(parseInt(e.target.value))}
          placeholder="Ripetizioni"
        />
        x
        <Input
          className="inp"
          value={reps2}
          onChange={(e) => setReps2(e.target.value)}
          maxLength={8}
          placeholder="Ripetizioni2"
        />
        <Row>
          <Col span={20}></Col>
          <Col span={4}>
            <Button className="dud" disabled={!validInput} onClick={() => handleADD()}>
              Aggiungi
            </Button>
          </Col>
        </Row>
      </Modal>
      {!printModeEnabled && (
        <Button className="button" onClick={() => setIsModalOpen(true)}>
          Aggiungi esercizio
        </Button>
      )}
      {!printModeEnabled && (
        <Button className="button" onClick={() => setPrintModeEnabled(true)}>
          Salva Scheda
        </Button>
      )}
      {!printModeEnabled && (
        <>
        <div className="space"></div>
        <Button className="button1" onClick={relo}>
          Crea Nuova Scheda
        </Button></>
        
      )}
      {!printModeEnabled && (
        <Info />
        
      )}
    </>
  );
}

export default ExerciseSheet;
