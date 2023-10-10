import { Task, TasksProviderHelpers } from "@/types/custom";
import { getUserAuthCookie } from "@/utils/cookieHandler";
import React, { createContext, useContext, useState } from "react";

const TasksContext = createContext({} as TasksProviderHelpers);

export const useTasksContext = () => {
  return useContext(TasksContext);
};

export const TasksProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const updateTasks = (newTasks: Array<Task>) => {
    setTasks(newTasks);
  };

  // TODO: Abstract/Move to API Provider
  const fetchTasks = async () => {
    try {
      const userAuth = getUserAuthCookie()
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": userAuth.token
        },
      })
  
      const json = await response.json();
      
      if (response.status === 200) {
        setTasks(json)
      } else {
        throw new Error(`API Request failed with ${response.status} (${response.statusText}); ${json}`)
      }
    } catch (e) {
      throw e
    }
  };

  const fetchCreateTask = async () => {
    try {
      const userAuth = getUserAuthCookie()
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: "Example",
          description: "Example description"
        }),
        headers: {
          "Content-type": "application/json",
          "Authorization": userAuth.token
        },
      })
  
      const json = await response.json();
      
      if (response.status === 200) {
        // Update task list
        setTasks([...tasks, json])
      } else {
        throw new Error(`API Request failed with ${response.status} (${response.statusText}); ${json}`)
      }
    } catch (e) {
      throw e
    }
  };

  const tasksProviderHelpers: TasksProviderHelpers = {
    tasks, updateTasks, fetchTasks, fetchCreateTask
  }

  return (
    <TasksContext.Provider value={tasksProviderHelpers}>
      {children}
    </TasksContext.Provider>
  );
};
