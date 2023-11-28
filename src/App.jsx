import './App.css';
import { TodoList } from './components/TodoList';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { v4 as uuid4 } from "uuid";
import fondo from './fondo.png';




// Se declara una constante que oficializara de clave para la persistencia local
const KEY = 'tareas.App.tareas'
function App() {
  //Hookk de estado // Estado inicial array
  const [tareas, setTareas] = useState([]);

  // Hook para referenciar elementos input en este caso
  const todasTaskRef = useRef()

  // Carga las tareas almacenadas localmente con anterioridad
  useEffect(() => {
    const storedTareas = JSON.parse(localStorage.getItem(KEY))
    // Actualiza el estado si hay tareas guardadas previamente
    console.log(storedTareas)
    if (storedTareas) {
      setTareas(storedTareas)
    }
  }, []);



  // Permite almacenar localmente las tareas
  const SaveTareas = () => {
    localStorage.clear();
    localStorage.setItem(KEY, JSON.stringify(tareas))
    alert('Tarea Guardada')
  }

  // Permite agregar una nueva tarea
  const handleTareaAdd = () => {
    const task = todasTaskRef.current.value
    if (task === '') return

    setTareas((prevTodas) => {
      // Realiza una copia del estado anterior
      return [...prevTodas, { id: uuid4(), task, completed: false }]
    })

    // Limpia el campo de texto
    todasTaskRef.current.value = null
  }

  const toggleTodo = (id) => {
    // Realiza una copia del estado anterior
    const newTareas = [...tareas]
    // Busca la tarea que coincida con el id
    const tarea = newTareas.find((tarea) => tarea.id === id)
    // Cambia el estado de la tarea
    tarea.completed = !tarea.completed
    // Guarda el nuevo estado
    setTareas(newTareas)
    console.log(newTareas)
  }

  // Borrar tareas terminadas
  const handleClearAll = () => {
    const newTareas = tareas.filter((tarea) => !tarea.completed)
    setTareas(newTareas)
  }

  return (
    <React.Fragment>
      <div className="container">
        <TodoList tareas = {tareas} toggleTodo = {toggleTodo}/>
        <img src={fondo} className="imagen" alt="fondo" />

          <h1>
            Listado <code>de</code> Tareas
          </h1>

          <input  type='text' placeholder='Ingrese su tarea'></input>

          <section className='section'>
            <button onClick={handleTareaAdd} className='agregar'>Agregar Tarea</button>
            <button onClick={handleClearAll} className='eliminar'>Eliminar Tarea</button>
            <button onClick={SaveTareas} className='guardar'>Guardar Tarea</button>
          </section>

            <div className='lista'>
              Te quedan {tareas.filter((tarea) => !tarea.completed).length} tareas sin realizar
            </div>
      </div>
    </React.Fragment>
  );
}

export default App;


