import { useState } from "react";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Modal from "./components/Modal/Modal";

function App() {
  // Toggle modal
  const [show, setShow] = useState(false);

  // Set state for selected graphs
  const defaultGraph = [{ title: "NASDAQ" }];

  const [graphs, setGraphs] = useState(defaultGraph);

  const addGraphHandler = (newGraph) => {
    setGraphs((previousGraphs) => {
      return [...previousGraphs, newGraph];
    });
  };

  return (
    <>
      <Header toggleModal={setShow} />
      <Dashboard selectedGraphs={graphs} />
      <Modal show={show} onClose={setShow} onAddGraph={addGraphHandler} />
    </>
  );
}

export default App;
