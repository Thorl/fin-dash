import { useState } from "react";

import { Header } from "./features/ui/Header/Header";
import { Dashboard } from "./features/ui/Dashboard/Dashboard";
import { Modal } from "./features/ui/Modal/Modal";

export function App() {
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
