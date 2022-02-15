import React, { useState } from 'react';

function Tasks() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleClick() {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input 
        value={ task }
        onChange={ ({ target }) => setTask(target.value) }/>
      <button
        onClick={ handleClick }
      >
        Adicionar
      </button>
      <ul>
        { tasks.map(task => <li>{ task }</li>) }
      </ul>
    </div>
  )
};

export default Tasks;
