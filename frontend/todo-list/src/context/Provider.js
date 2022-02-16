import React, { useState } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleChange({ target }) {
    setNewTask(target.value);
  };

  function handleClick() {
    setTasks([...tasks, newTask]);
  };

  function updateTask({ target }, index) {
    const itensCopy = Array.from(tasks);
    itensCopy.splice(index, 1, { id: index, value: target.value });
    setTasks(itensCopy);
  };

  function deleteTask(index) {
    const itensCopy = Array.from(tasks);
    itensCopy.splice(index, 1); // parâmetro inbdex para indicar qual elemento será atualizado e o método splice que adiciona novos elementos enquando remove elementos antigos ou só remove elementos.
    setTasks(itensCopy);
  };

  // Array.from(): cópia do array para não alterar o array original, cria um array de objetos array-like (propriedade length) ou objetos iteráveis (coletar elementos com map por ex.)

  const ContextValue = {
    newTask,
    setNewTask,
    tasks,
    setTasks,
    handleChange,
    handleClick,
    updateTask,
    deleteTask,
  };

  return (
    <Context.Provider value={ ContextValue }>
      { children }
    </Context.Provider>
  )
}

export default Provider;
