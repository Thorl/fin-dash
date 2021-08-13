import { useState } from "react";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Modal from "./components/Modal/Modal";

function App() {
  const [show, setShow] = useState(false);

  const [charts, setCharts] = useState([]);

  const addChartHandler = (newChart) => {
    setCharts((previousCharts) => {
      return [...previousCharts, newChart];
    });
  };

  const removeChartHandler = (chartId) => {
    setCharts((previousCharts) => {
      const updatedCharts = charts.filter((chart) => chart.id !== chartId);
      return updatedCharts;
    });
  };

  return (
    <>
      <Header toggleModal={setShow} />
      <Dashboard
        selectedCharts={charts && charts}
        onRemoveChart={removeChartHandler}
      />
      <Modal show={show} onClose={setShow} onAddChart={addChartHandler} />
    </>
  );
}

export default App;
