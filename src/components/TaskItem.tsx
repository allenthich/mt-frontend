import Edit from "@/components/shared/icons/edit";
import Delete from "@/components/shared/icons/delete";
import { FunctionComponent } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
};

const TaskItemAction = (href: string, ActionIcon: FunctionComponent) => {
    return (
        <a href={href} className="flex items-center rounded-md py-2 pl-2 pr-3 text-sm font-medium text-white">
            <ActionIcon />
        </a>
    )
}

export default function TaskItem({ task }: any) {
  return (
    <div className="flex items-start space-x-6 p-6">
      <div className="relative min-w-0 flex-auto">
        <h2 className="truncate pr-20 font-semibold text-slate-900">
          {task.title}
        </h2>
        <dl className="mt-2 flex flex-wrap text-sm font-medium leading-6">
          <div className="mt-2 w-full flex-none font-normal">
            <dt className="sr-only">Description</dt>
            <dd className="text-slate-400">{task.description}</dd>
          </div>
        </dl>
        <div className="absolute right-0 top-0 flex items-center space-x-1">
            { TaskItemAction("/edit", Edit) }
            { TaskItemAction("/delete", Delete) }
          </div>
      </div>
    </div>
  );
}
