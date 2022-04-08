import logo from "./logo.svg";
import "./App.css";
import { TaskCreation } from "./TaskCreation/TaskCreation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskListing } from "./TaskListing/TaskListing";

function App() {
  return (
    <div className="App">
      {/* <TaskCreation /> */}
      <TaskListing />
      <ToastContainer />
    </div>
  );
}

export default App;
