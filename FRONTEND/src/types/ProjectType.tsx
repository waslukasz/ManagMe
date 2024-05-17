export type Project = {
  _id: string;
  name: string;
  description: string | null;
};

export type ProjectDto = {
  name: string;
  description: string | null;
};
