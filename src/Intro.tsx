import { Button, Input, Modal } from "antd";
import { useState } from "react";
import "./Removebutton";
import "./App.css";

interface IntroInput {
  nameSet: Function;
}

function Intro(input: IntroInput) {
  const [patientName, setPatientName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState(true);
  
   
    
  
 


  const handleADD = () => {
    setVisible(false);
    input.nameSet(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      
      

      {!visible && (
        <div className="Nameclass">
          <h4>Scheda Personalizzata per {patientName}</h4>
        </div>
      )}
      {visible && (
        <>
          <Modal
            title={"Aggiungi nome"}
            open={isModalOpen}
            okText="Conferma"
            onOk={handleADD}
            onCancel={handleCancel}
            cancelText="Annulla"
          >
            <Input
              className="area"
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Nome Paziente"
            />
          </Modal>
          <Button className="button" onClick={() => setIsModalOpen(true)}>
            Aggiungi Nome Paziente
          </Button>
        </>
      )}
    </>
  );
}

export default Intro;
