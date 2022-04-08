import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskListing } from "./TaskListing/TaskListing";

function App() {
  return (
    <div className="App">
      <TaskListing />
      <ToastContainer />
    </div>
  );
}

export default App;
