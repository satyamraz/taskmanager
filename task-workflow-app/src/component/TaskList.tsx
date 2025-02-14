import React from "react"
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community"; // Import ColDef type
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Define the Task type
type Task = {
  title: string;
  status: "To Do" | "In Progress" | "Done";
  dueDate: string;
  priority: "Low" | "Medium" | "High";
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { title: "Task 1", status: "To Do", dueDate: "2025-02-12", priority: "High" },
    { title: "Task 2", status: "In Progress", dueDate: "2025-02-14", priority: "Medium" },
  ]);

  // Explicitly define columnDefs with the correct TypeScript type
  const columnDefs: ColDef<Task>[] = [
    { headerName: "Title", field: "title", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    { headerName: "Due Date", field: "dueDate", sortable: true },
    { headerName: "Priority", field: "priority", sortable: true },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact<Task>
        rowData={tasks}
        columnDefs={columnDefs}
        domLayout="autoHeight"
      />
    </div>
  );
}
