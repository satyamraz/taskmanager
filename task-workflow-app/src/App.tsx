import React from "react"
/* import TaskList from "./component/TaskList";
import Workflow from "./component/Workflow";
import TaskForm from "./component/TaskForm"; */

export default function App() {
  const handleTaskSubmit = (task: any) => console.log("New Task:", task);

  return (
    <div className="p-4 flex flex-col gap-4">
     {/*  
      <TaskForm onSubmit={handleTaskSubmit} />

      
      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Task List</h2>
        <TaskList />
      </div>

     
      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Workflow Visualization</h2>
        <Workflow />
      </div> */}
      <>hello</>
    </div>
  );
}
