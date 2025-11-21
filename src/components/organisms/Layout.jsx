import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useTasks } from '@/hooks/useTasks';

function Layout() {
  // Move all app-level state here from TaskManager
  const { tasks, addTask, updateTask, completeTask, uncompleteTask, deleteTask } = useTasks();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const taskCounts = {
    total: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
    all: tasks.length
  };

  const filteredTaskCounts = {
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  const handleCreateTask = (taskData) => {
    addTask(taskData);
    setShowForm(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleUpdateTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
      setShowForm(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const scrollToForm = () => {
    const element = document.getElementById('task-form');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
      if (!showForm && !editingTask) {
        setShowForm(true);
      }
    }
  };

  // Context value to pass to child routes
  const outletContext = {
    tasks,
    addTask,
    updateTask,
    completeTask,
    uncompleteTask,
    deleteTask,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    editingTask,
    setEditingTask,
    showForm,
    setShowForm,
    taskCounts,
    filteredTaskCounts,
    handleCreateTask,
    handleEditTask,
    handleUpdateTask,
    handleCancelEdit,
    scrollToForm
  };

  return (
    <>
      <Outlet context={outletContext} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default Layout;