import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

export const ProjectModel = mongoose.model("Project", ProjectSchema);

export const getProjects = () => ProjectModel.find();
export const getProjectById = (id: string) => ProjectModel.findById(id);
export const createProject = (values: Record<string, any>) =>
  new ProjectModel(values).save().then((project) => project.toObject());
export const deleteProjectById = (id: string) =>
  ProjectModel.findByIdAndDelete({ _id: id });
export const updateProjectById = (id: string, values: Record<string, any>) =>
  ProjectModel.findByIdAndUpdate(id, values);
