import { useState } from "react";

import { Header } from "./features/ui/Header/Header";
import { Dashboard } from "./features/ui/Dashboard/Dashboard";
import { Modal } from "./features/ui/Modal/Modal";

export function App() {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [charts, setCharts] = useState([]);

  const handleModalVisibility = (bool) => {
    setModalVisibility(bool);
  };

  const handleAddChart = (newChart) => {
    setCharts((previousCharts) => {
      return [...previousCharts, newChart];
    });
  };

  const handleRemoveChart = (chartId) => {
    setCharts(() => {
      return charts.filter((chart) => chart.id !== chartId);
    });
  };

  return (
    <>
      <Header onOpenModal={handleModalVisibility} />
      <Dashboard
        addedCharts={charts && charts}
        onRemoveChart={handleRemoveChart}
      />
      <Modal
        isModalVisible={isModalVisible}
        onCloseModal={handleModalVisibility}
        onAddChart={handleAddChart}
      />
    </>
  );
}
