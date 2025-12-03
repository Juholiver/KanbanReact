import React, { useState, useEffect } from 'react';
import './App.css';
import * as localDB from './localDB';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { id: 'todo', title: 'A Fazer', color: '#ff6b6b' },
    { id: 'inProgress', title: 'Em Progresso', color: '#4ecdc4' },
    { id: 'done', title: 'Concluído', color: '#09f357ff' }
  ];

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const loadedTasks = localDB.getTasks();
    setTasks(loadedTasks);
  };

  const createTask = () => {
    if (!newTask.title.trim()) return;

    const taskToSave = { ...newTask, status: 'todo' };
    const savedTask = localDB.saveTask(taskToSave);
    if (savedTask) {
        setTasks(localDB.getTasks()); // Recarrega as tarefas para garantir a consistência
        setNewTask({ title: '', description: '' });
        setShowModal(false);
    } else {
        alert('Erro ao criar tarefa');
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const updatedTask = { ...task, status: newStatus };
        localDB.updateTask(updatedTask);
        setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
    }
  };

  const deleteTask = (taskId) => {
    if (!window.confirm('Deseja realmente excluir esta tarefa?')) return;

    localDB.deleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="kanban-container">
      <header className="kanban-header">
        <h1>📋 Kanban Board</h1>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          + Nova Tarefa
        </button>
      </header>

      <div className="kanban-board">
        {columns.map(column => (
          <div key={column.id} className="kanban-column">
            <div className="column-header" style={{ borderTopColor: column.color }}>
              <h2>{column.title}</h2>
              <span className="task-count">{getTasksByStatus(column.id).length}</span>
            </div>

            <div className="column-content">
              {getTasksByStatus(column.id).map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <button
                      className="btn-delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      ×
                    </button>
                  </div>

                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}

                  <div className="task-actions">
                    {column.id !== 'todo' && (
                      <button
                        className="btn-move"
                        onClick={() => updateTaskStatus(task.id,
                          column.id === 'done' ? 'inProgress' : 'todo'
                        )}
                      >
                        ← Voltar
                      </button>
                    )}
                    {column.id !== 'done' && (
                      <button
                        className="btn-move btn-move-forward"
                        onClick={() => updateTaskStatus(task.id,
                          column.id === 'todo' ? 'inProgress' : 'done'
                        )}
                      >
                        Avançar →
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {getTasksByStatus(column.id).length === 0 && (
                <div className="empty-column">
                  <p>Nenhuma tarefa aqui</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nova Tarefa</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Título *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Digite o título da tarefa"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Digite a descrição (opcional)"
                  rows="4"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn-create" onClick={createTask}>
                Criar Tarefa
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default KanbanBoard;