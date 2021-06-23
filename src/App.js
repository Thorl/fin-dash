import { useState } from "react";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Modal from "./components/Modal/Modal";

function App() {
  // Toggle modal
  const [show, setShow] = useState(false);

  // Set state for selected graphs
  const defaultChart = [{ title: "NASDAQ" }];

  const [charts, setCharts] = useState(defaultChart);

  const addChartHandler = (newChart) => {
    setCharts((previousCharts) => {
      return [...previousCharts, newChart];
    });
  };

  return (
    <>
      <Header toggleModal={setShow} />
      <Dashboard selectedCharts={charts} />
      <Modal show={show} onClose={setShow} onAddChart={addChartHandler} />
    </>
  );
}

export default App;
