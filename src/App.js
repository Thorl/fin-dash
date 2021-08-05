import { useState, useCallback } from "react";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Modal from "./components/Modal/Modal";

function App() {
  const [show, setShow] = useState(false);

  const [charts, setCharts] = useState([]);

  console.log(charts);

  const addChartHandler = (newChart) => {
    setCharts((previousCharts) => {
      return [...previousCharts, newChart];
    });
  };

  return (
    <>
      <Header toggleModal={setShow} />
      <Dashboard selectedCharts={charts && charts} />
      <Modal show={show} onClose={setShow} onAddChart={addChartHandler} />
    </>
  );
}

export default App;
