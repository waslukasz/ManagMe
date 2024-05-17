import mongoose, { SchemaTypes } from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  start: { type: Date },
  end: { type: Date },
  estimated: { type: Date },
  functionality: {
    type: SchemaTypes.ObjectId,
    ref: "Functionality",
    required: true,
  },
  assignedUser: { type: SchemaTypes.ObjectId, ref: "User" },
});

export const TaskModel = mongoose.model("Task", TaskSchema);

export const getTasks = () => TaskModel.find();
export const getTaskById = (id: string) => TaskModel.findById(id);
export const createTask = (values: Record<string, any>) =>
  new TaskModel(values).save().then((task) => task.toObject());
export const deleteTaskById = (id: string) =>
  TaskModel.findByIdAndDelete({ _id: id });
export const updateTaskById = (id: string, values: Record<string, any>) =>
  TaskModel.findByIdAndUpdate(id, values);
