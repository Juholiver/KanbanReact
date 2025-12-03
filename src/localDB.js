const TASKS_KEY = 'kanban_tasks';

// Garante que temos dados iniciais se for a primeira vez que o usuário abre o app
const initializeTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  if (!tasks) {
    localStorage.setItem(TASKS_KEY, JSON.stringify([]));
  }
};

initializeTasks();

export const getTasks = () => {
  try {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error getting tasks from localStorage", error);
    return [];
  }
};

export const saveTask = (task) => {
  try {
    const tasks = getTasks();
    const existingIndex = tasks.findIndex(t => t.id === task.id);

    if (existingIndex > -1) {
      // Atualiza tarefa existente
      tasks[existingIndex] = task;
    } else {
      // Adiciona nova tarefa com um ID único
      task.id = new Date().toISOString();
      tasks.push(task);
    }

    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return task;
  } catch (error) {
    console.error("Error saving task to localStorage", error);
    return null;
  }
};

export const updateTask = (updatedTask) => {
    try {
        const tasks = getTasks();
        const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
        if (taskIndex > -1) {
            tasks[taskIndex] = updatedTask;
            localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
            return updatedTask;
        }
        return null;
    } catch (error) {
        console.error("Error updating task in localStorage", error);
        return null;
    }
};


export const deleteTask = (taskId) => {
  try {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error deleting task from localStorage", error);
  }
};
