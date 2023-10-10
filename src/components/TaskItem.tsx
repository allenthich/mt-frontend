import Save from "@/components/shared/icons/save";
import Edit from "@/components/shared/icons/edit";
import Delete from "@/components/shared/icons/delete";
import { FunctionComponent, useState } from "react";
import { useTasksContext } from "@/app/context/TasksContext/TasksProvider";
import { TasksProviderHelpers } from "@/types/custom";

const TaskItem: FunctionComponent = ({ task }: any) => {
  const [editable, setEditable] = useState(false);
  const { fetchUpdateTask, fetchDeleteTask }: TasksProviderHelpers =
    useTasksContext();

  const updateTaskData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!editable) {
      setEditable(true);
    } else {
      setEditable(false);

      const target = e.target as typeof e.target & {
        title: { value: string };
        description: { value: string };
      };
      const title = target.title.value;
      const description = target.description.value;

      // Make the request only if there's a update difference
      if (task.title !== title || task.description !== description) {
        fetchUpdateTask({ ...task, title, description });
      }
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={updateTaskData}>
        <div className="flex min-w-0 flex-row gap-2">
          <div className="grow text-sm font-medium leading-6">
            <span className="block text-sm font-medium text-slate-700">
              Title
            </span>
            <input
              type="text"
              name="title"
              defaultValue={task.title}
              className="block w-full appearance-none truncate rounded-md py-2 pl-2 pr-10 text-sm font-semibold leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
              disabled={!editable}
            />
            <div className="mt-2  text-sm font-medium leading-6">
              <span className="block text-sm font-medium text-slate-700">
                Description
              </span>
              <input
                type="text"
                name="description"
                defaultValue={task.description}
                className="block w-full appearance-none truncate rounded-md py-2 pl-2 pr-10 text-sm font-semibold leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                disabled={!editable}
              />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              type="submit"
              className="flex items-center rounded-md py-2 pl-2 pr-3 text-sm font-medium text-white"
            >
              {editable ? <Save /> : <Edit />}
            </button>
            <button
              onClick={() => fetchDeleteTask(task)}
              className="flex items-center rounded-md py-2 pl-2 pr-3 text-sm font-medium text-white"
            >
              <Delete />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskItem;
