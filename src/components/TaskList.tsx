"use client"
import TaskItem from "@/components/TaskItem";
import Add from "@/components/shared/icons/add";
import { AuthProviderHelpers, Task, TasksProviderHelpers } from "@/types/custom";
import { FunctionComponent, useEffect } from "react";
import { useTasksContext } from "@/context/TasksContext/TasksProvider";
import { useAuthContext } from "@/app/context/AuthContext/AuthProvider";

const TaskList: FunctionComponent = () => {
  const {
    tasks,
    updateTasks,
    fetchTasks,
    fetchCreateTask
  }: TasksProviderHelpers = useTasksContext();
  const { isAuthorized }: AuthProviderHelpers = useAuthContext();

  // Initialize data from API
  useEffect(() => {
    if (isAuthorized) {
      fetchTasks()
    }
  }, [isAuthorized])

  const displayTasks = () => {
    if (tasks.length === 0) return <b>No tasks exist.</b>;
    const listItems = tasks.map((task: Task) => (
      <li key={task.id} className="rounded-md shadow-md">
        <TaskItem task={task} />
      </li>
    ));
    return (
      <ul className="grid gap-4 bg-slate-50 text-sm leading-6">
        {listItems}
      </ul>
    );
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col gap-5 pt-16 pb-8 px-4 min-w">
        <div className="z-10 space-y-4 bg-white p-4 rounded-md shadow-xl">
          <div className="flex items-center justify-between gap-4">
          <form className="relative grow">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="pointer-events-none absolute left-3 top-1/2 -mt-2.5 text-slate-400 group-focus-within:text-blue-500"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              />
            </svg>
            <input
              className="w-full appearance-none rounded-md py-2 pl-10 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              aria-label="Filter projects"
              placeholder="Filter tasks..."
            />
          </form>
            <button
              onClick={() => fetchCreateTask()}
              className="flex items-center rounded-md bg-blue-500 py-2 pl-2 pr-3 text-sm font-medium text-white shadow-sm hover:bg-blue-400"
            >
              <Add className="mr-2"/>
              New
            </button>
          </div>
          
        </div>
        <div className="flex-auto overflow-y-auto grow rounded-md shadow-xl">
          <ul className="grid gap-4 bg-slate-50 p-4 text-sm leading-6 sm:px-8">
            {displayTasks()}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TaskList;