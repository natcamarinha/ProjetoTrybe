import React, { useContext } from 'react';
import Context from '../context/Context';

function Tasks() {
  const {
    tasks,
    handleChange,
    handleClick,
    updateTask,
    deleteTask,
  } = useContext(Context);


  return (
    <div>
      <h1>Tasks</h1>
      <input 
        onChange={ handleChange }/>
      <button
        onClick={ handleClick }
      >
        Adicionar
      </button>
      <div className="list-container">
        <ul>
          { tasks.map(task => <li>{ task }
            <button
              onClick={(event) => updateTask(event)}
            >
              Editar
            </button>
            <button
              onClick={ (index) => deleteTask(index) }
            >
              Excluir
            </button>
          </li>) }
        </ul>
      </div>
      
    </div>
  )
};

export default Tasks;
