import { useState } from "react";

import { Header } from "./features/ui/Header/Header";
import { Dashboard } from "./features/ui/Dashboard/Dashboard";
import { Modal } from "./features/ui/Modal/Modal";

export function App() {
  const [isModalShowing, setShowModal] = useState(false);
  const [charts, setCharts] = useState([]);

  const handleModalVisibility = (bool) => {
    setShowModal(bool);
  };

  const handleAddChart = (newChart) => {
    setCharts((previousCharts) => {
      return [...previousCharts, newChart];
    });
  };

  const handleRemoveChart = (chartId) => {
    setCharts((previousCharts) => {
      return previousCharts.filter((chart) => chart.id !== chartId);
    });
  };

  return (
    <>
      <Header onShowModal={handleModalVisibility} />
      <Dashboard
        addedCharts={charts && charts}
        onRemoveChart={handleRemoveChart}
      />
      <Modal
        isModalShowing={isModalShowing}
        onShowModal={handleModalVisibility}
        onAddChart={handleAddChart}
      />
    </>
  );
}
