import Accept from "./accept.svg?react";
import Back from "./back.svg?react";
import Continue from "./continue.svg?react";
import Edit from "./edit.svg?react";
import Delete from "./delete.svg?react";
import Selected from "./selected.svg?react";
import NotSelected from "./notselected.svg?react";
import Task from "./task.svg?react";

const defaultClassName =
  "h-5 w-5 rounded-full cursor-pointer shadow-sm hover:shadow";

export const AcceptIcon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = (props) => {
  return (
    <Accept {...props} className={`${defaultClassName} ${props.className}`} />
  );
};

export const BackIcon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = (props) => {
  return (
    <Back {...props} className={`${defaultClassName} ${props.className}`} />
  );
};

export const ContinueIcon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = (props) => {
  return (
    <Continue {...props} className={`${defaultClassName} ${props.className}`} />
  );
};

export const EditIcon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = (props) => {
  return (
    <Edit {...props} className={`${defaultClassName} ${props.className}`} />
  );
};

export const DeleteIcon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = (props) => {
  return (
    <Delete {...props} className={`${defaultClassName} ${props.className}`} />
  );
};

export const SelectedIcon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = (props) => {
  return (
    <Selected {...props} className={`${defaultClassName} ${props.className}`} />
  );
};

export const NotSelectedIcon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = (props) => {
  return (
    <NotSelected
      {...props}
      className={`${defaultClassName} ${props.className}`}
    />
  );
};

export const TaskIcon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = (props) => {
  return (
    <Task {...props} className={`${defaultClassName} ${props.className}`} />
  );
};

export const NotificationIcon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = (props) => {
  return (
    <Task {...props} className={`${defaultClassName} ${props.className}`} />
  );
};
