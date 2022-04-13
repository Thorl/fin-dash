import { useState } from "react";

import { Header } from "./features/ui/Header/Header";
import { Dashboard } from "./features/ui/Dashboard/Dashboard";
import { Modal } from "./features/ui/Modal/Modal";
import { ChartModel } from "./ts-models/chart.model";

export function App() {
  const [isModalShowing, setShowModal] = useState(false);
  const [charts, setCharts] = useState<ChartModel[]>([]);

  const handleModalVisibility = (bool: boolean) => {
    setShowModal(bool);
  };

  const handleAddChart = (newChart: ChartModel) => {
    setCharts((previousCharts) => {
      return [...previousCharts, newChart];
    });
  };

  const handleRemoveChart = (chartId: string) => {
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
      {isModalShowing && (
        <Modal
          isModalShowing={isModalShowing}
          onShowModal={handleModalVisibility}
          onAddChart={handleAddChart}
        />
      )}
    </>
  );
}
