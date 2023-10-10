import Save from "@/components/shared/icons/save";
import Edit from "@/components/shared/icons/edit";
import Delete from "@/components/shared/icons/delete";
import { FunctionComponent, useState } from "react";
import { useTasksContext } from "@/app/context/TasksContext/TasksProvider";
import { TasksProviderHelpers } from "@/types/custom";

const TaskItem: FunctionComponent = ({ task }: any) => {
  const [editable, setEditable] = useState(false)
  const {
    fetchUpdateTask,
    fetchDeleteTask
  }: TasksProviderHelpers = useTasksContext();

  const updateTaskData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!editable) {
      setEditable(true)
    } else {
      setEditable(false)

      const target = e.target as typeof e.target & {
        title: { value: string };
        description: { value: string };
      };
      const title = target.title.value;
      const description = target.description.value;

      // Make the request only if there's a update difference
      if (task.title !== title || task.description !== description) {
        fetchUpdateTask({ ...task, title, description})
      }
    }
  };
  
  return (
    <div className="flex items-start space-x-6 p-6">
      <form onSubmit={updateTaskData}>
        <div className="relative min-w-0 flex-auto">
          <div className="mt-2 flex flex-wrap text-sm font-medium leading-6">
            <input
                type="text"
                name="title"
                defaultValue={task.title}
                className="truncate pr-20 font-semibold text-slate-900"
                disabled={!editable}
            />
            <div className="mt-2 w-full flex-none font-normal">
              <input
                type="text"
                name="description"
                defaultValue={task.description}
                className="truncate pr-20 font-semibold text-slate-900"
                disabled={!editable}
              />
            </div>
          </div>
          <div className="absolute right-0 top-0 flex items-center space-x-1">
              <button type="submit" className="flex items-center rounded-md py-2 pl-2 pr-3 text-sm font-medium text-white">
                {editable ? <Save /> : <Edit />}
              </button>
              <button onClick={() => fetchDeleteTask(task)} className="flex items-center rounded-md py-2 pl-2 pr-3 text-sm font-medium text-white">
                <Delete />
              </button>
            </div>
        </div>
      </form>
    </div>
  );
}

export default TaskItem