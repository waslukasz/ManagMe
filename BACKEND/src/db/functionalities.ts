import mongoose, { SchemaTypes } from "mongoose";

const FunctionalitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  priority: { type: Number, required: true },
  status: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  project: { type: SchemaTypes.ObjectId, ref: "Project", required: true },
  owner: { type: SchemaTypes.ObjectId, ref: "User", required: true },
});

export const FunctionalityModel = mongoose.model(
  "Functionality",
  FunctionalitySchema
);

export const getFunctionalities = () => FunctionalityModel.find();
export const getFunctionalityById = (id: string) =>
  FunctionalityModel.findById(id);
export const createFunctionality = (values: Record<string, any>) =>
  new FunctionalityModel(values)
    .save()
    .then((functionality) => functionality.toObject());
export const deleteFunctionalityById = (id: string) =>
  FunctionalityModel.findByIdAndDelete({ _id: id });
export const updateFunctionalityById = (
  id: string,
  values: Record<string, any>
) => FunctionalityModel.findByIdAndUpdate(id, values);
