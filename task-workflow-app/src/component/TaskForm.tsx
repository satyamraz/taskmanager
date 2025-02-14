import React from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "Done"]),
  dueDate: z.string(),
  priority: z.enum(["Low", "Medium", "High"]),
});

type TaskType = z.infer<typeof TaskSchema>;

export default function TaskForm({ onSubmit }: { onSubmit: (data: TaskType) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskType>({ resolver: zodResolver(TaskSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
      <input {...register("title")} placeholder="Title" className="input" />
      <p>{errors.title?.message}</p>
      <textarea {...register("description")} placeholder="Description" className="textarea"></textarea>
      <select {...register("status")} className="select">
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button type="submit" className="btn">Save Task</button>
    </form>
  );
}
