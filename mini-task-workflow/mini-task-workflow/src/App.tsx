import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskForm from "./component/TaskForm";
import TaskList from "./component/TaskList";

const App = () => {
  
  return (
    <Router basename="/taskmanager">
      <Routes>
        <Route path="/" element={<TaskForm  />} />
         <Route path="/task/:id" element={<TaskForm />} />
        <Route path="/tasks" element={<TaskList  />} />
      </Routes>
    </Router>
  );
};

export default App;
