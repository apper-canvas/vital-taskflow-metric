import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTasks } from "@/hooks/useTasks";
import { filterTasks } from "@/utils/taskUtils";
import Header from "@/components/organisms/Header";
import TaskForm from "@/components/molecules/TaskForm";
import FilterBar from "@/components/molecules/FilterBar";
import TaskList from "@/components/organisms/TaskList";
import ApperIcon from "@/components/ApperIcon";

const TaskManager = () => {
  const { tasks, addTask, updateTask, completeTask, uncompleteTask, deleteTask } = useTasks();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Calculate task counts
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
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("task-form")?.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Header */}
      <Header taskCount={taskCounts} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Task Form Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            id="task-form"
            className="bg-white rounded-xl shadow-card border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="Plus" className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editingTask ? "Edit Task" : "Create New Task"}
                </h2>
              </div>
              
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  <ApperIcon name="ChevronDown" className="w-5 h-5" />
                </button>
              )}
            </div>

            {(showForm || editingTask) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TaskForm
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  onCancel={editingTask ? handleCancelEdit : () => setShowForm(false)}
                  initialTask={editingTask}
                  isEditing={!!editingTask}
                />
              </motion.div>
            )}
          </motion.section>

          {/* Filters Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FilterBar
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              onStatusFilterChange={setStatusFilter}
              onPriorityFilterChange={setPriorityFilter}
              taskCounts={filteredTaskCounts}
            />
          </motion.section>

          {/* Task List Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TaskList
              tasks={tasks}
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              onComplete={completeTask}
              onUncomplete={uncompleteTask}
              onEdit={handleEditTask}
              onDelete={deleteTask}
              onCreateTask={scrollToForm}
            />
          </motion.section>
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        onClick={scrollToForm}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 active:scale-95 lg:hidden"
      >
        <ApperIcon name="Plus" className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default TaskManager;