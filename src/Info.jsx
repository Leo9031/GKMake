import { Button, Modal, Row, Col } from "antd";

import {  useEffect, useState } from "react";

import "./Removebutton";

import "./App.css";


function Info() {
  
 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [printModeEnabled, setPrintModeEnabled] = useState(false);
 
  useEffect(() => {
    if (printModeEnabled) {
      window.print();
      setPrintModeEnabled(true);
      setTimeout(() => {  setPrintModeEnabled(false); }, 2000);
    }
  }, [printModeEnabled]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      
      <Modal className="modal1"
        title="Info App"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        cancelText="Annulla"
      >
        
          
        <div>
          <p>GK-Make è attualmente una Beta.</p>
          <div>Non sarà possibile salvare su server le schede.</div>
          <p>Per Ulteriori Informazioni 
          <a href="https://www.gkbox.it/gk-make-istruzioni" > Clicca Qui</a>
          </p>
        </div>
        
        
        <Row>
          <Col span={20}></Col>
          <Col span={4}>
            <Button onClick={() => handleCancel()}>
              Chiudi
            </Button>
          </Col>
        </Row>
      </Modal>
      {!printModeEnabled && (
        <Button className="button" onClick={() => setIsModalOpen(true)}>
          Info
        </Button>
      )}
     
      
    </>
  );
}

export default Info;
