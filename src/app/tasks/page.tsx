"use client"
import { FunctionComponent} from "react";
import { TasksProvider } from "@/context/TasksContext/TasksProvider";
import TaskList from "@/components/TaskList";

const TasksDashboard: FunctionComponent = () => {
  return (
    <>
      <TasksProvider>
        <TaskList />
      </TasksProvider>
    </>
  );
}

export default TasksDashboard;