export type Project = {
  id: string;
  name: string;
  description: string | null;
};

export type ProjectEntity = {
  _id: string;
  name: string;
  description: string | null;
};

export type ProjectDto = {
  name: string;
  description: string | null;
};
