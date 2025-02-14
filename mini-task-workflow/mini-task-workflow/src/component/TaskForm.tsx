import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { openDB } from "idb";

// Define validation schema
const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "Done"]),
  dueDate: z.string().refine((date) => date !== "", "Due date is required"),
  priority: z.enum(["Low", "Medium", "High"]),
});

// Define TypeScript type
type TaskFormData = z.infer<typeof taskSchema>;

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

// Save task to IndexedDB correctly
const saveTask = async (task: TaskFormData) => {
  try {
    const db = await initDB();
    const tx = db.transaction("tasks", "readwrite");
    const store = tx.objectStore("tasks");
    await store.put({ ...task, createdAt: new Date().toISOString() }); // Use put() instead of add()
    await tx.done; // Ensure transaction completes
  } catch (error) {
    console.error("Error saving task:", error);
  }
};

// Task Form Component
const TaskForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const navigate = useNavigate(); 

  const onSubmit = async (data: TaskFormData) => {
    await saveTask(data); // Save task
    reset(); // Clear form
    navigate("/tasks"); // Redirect to task list
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input type="text" {...register("title")} className="w-full p-2 border border-gray-300 rounded-md" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea {...register("description")} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
       </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select {...register("status")} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input type="date" {...register("dueDate")} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select {...register("priority")} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
