import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ taskCount = { total: 0, active: 0, completed: 0 } }) => {
  const completionRate = taskCount.total > 0 
    ? Math.round((taskCount.completed / taskCount.total) * 100) 
    : 0;

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-xl"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          {/* App Icon & Title */}
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/90 text-lg mb-6"
          >
            Organize your tasks, boost your productivity
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {taskCount.active}
              </div>
              <div className="text-white/80 text-sm">Active</div>
            </div>
            
            <div className="w-px h-12 bg-white/20" />
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {taskCount.completed}
              </div>
              <div className="text-white/80 text-sm">Completed</div>
            </div>
            
            <div className="w-px h-12 bg-white/20" />
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {completionRate}%
              </div>
              <div className="text-white/80 text-sm">Progress</div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          {taskCount.total > 0 && (
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 w-full max-w-xs mx-auto"
            >
              <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-white/80 to-white rounded-full shadow-glow-success"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;