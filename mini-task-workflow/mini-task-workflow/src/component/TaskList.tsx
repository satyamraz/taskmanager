import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { openDB } from "idb";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Import required AG Grid modules
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

// Register AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Define task type
type Task = {
  id?: number;
  title: string;
  description:string,
  status: string;
  dueDate: string;
  priority: string;
};

// Initialize IndexedDB
const initDB = async () => {
  return openDB("TaskDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("tasks")) {
        db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

// Fetch tasks from IndexedDB
const fetchTasks = async (): Promise<Task[]> => {
  const db = await initDB();
  return await db.getAll("tasks");
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        console.log("Fetched Tasks:", data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadTasks();
  }, []);

  
  const columnDefs: ColDef<Task>[] = [
    { headerName: "Title", field: "title", sortable: true, filter: true },
    { headerName: "Description", field: "description", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    { headerName: "Due Date", field: "dueDate", sortable: true, filter: true },
    { headerName: "Priority", field: "priority", sortable: true, filter: true },
  ];

  // Handle row selection
  const onRowSelected = (event: any) => {
    setSelectedTask(event.data);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <Link to="/" className="text-blue-500">Create New Task</Link>
      <h2 className="text-xl font-semibold mb-4">Task List</h2>

      <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
        <AgGridReact
          rowData={tasks}
          columnDefs={columnDefs}
          rowSelection="single"
          onRowClicked={onRowSelected}
        />
      </div>

      {selectedTask && (
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h3 className="font-semibold">Selected Task</h3>
           <p><strong>Title:</strong> {selectedTask.title}</p>
          <p><strong>Title:</strong> {selectedTask.description}</p>
          <p><strong>Status:</strong> {selectedTask.status}</p>
          <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
          <p><strong>Priority:</strong> {selectedTask.priority}</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
