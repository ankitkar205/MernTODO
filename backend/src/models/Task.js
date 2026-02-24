import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
    status: { type: String, enum: ["todo", "in-progress", "completed"], default: "todo" },
    category: { type: String, enum: ["Personal", "Work", "Shopping", "Health", "None"], default: "None" },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);