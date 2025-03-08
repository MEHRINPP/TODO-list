import React, { useEffect, useState } from 'react'
import "./Todo.css";
import AddTask from './AddTask';
import ListTask from './ListTask';


const Todo = () => {
    const[tasks,setTasks]=useState([]);
    const[editMode,setEditMode] = useState(null);
    const[editValue,setEditValue] = useState("");
    const [sortOrder,setSortOrder] = useState("incompleteFirst");
    useEffect(()=>{
        document.title=`you have ${tasks.length} pending task(s)`;
    })

    const addTask = (title)=>{
     const newTask=[...tasks,{title,completed:false}]
     setTasks(newTask);

    }

    const removeTask = (index)=>{
     const newTasks = tasks.filter((_, i)=> i !== index);
     setTasks(newTasks);
    }

    const toggleComplete = (index)=>{
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    }

    const handleEdit = (index,title)=>{
        setEditMode(index);
        setEditValue(title);
    }

    const saveEdit = (index)=>{
        const newTasks =[...tasks];
        newTasks[index].title = editValue;
        setTasks(newTasks);
        setEditMode(null);
    }

    const cancelEdit = ()=>{
        setEditMode(null);
    }

    const sortTasks = (tasks) => {
        if (sortOrder === 'incompleteFirst') {
          return tasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
        } else if (sortOrder === 'completedFirst') {
          return tasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1));
        }
        return tasks;
      }
      
    const handleSortChange = (order)=>{
        setSortOrder(order);
    }
    const sortedTasks = sortTasks(tasks);
  return (
    <>
        <div className='todo-container'>
            <div className='header'>TODO LIST</div>
            <div className='sort-options'>
                <button onClick={()=> handleSortChange('incompleteFirst')} className='sort-btn'>Incomplete First</button>
                <button onClick={()=> handleSortChange('completedFirst')} className='sort-btn'>Completed First</button>
            </div>
            <div className='add-task'>
                <AddTask addTask={addTask}/>
            </div>
            <div className='tasks'>
                
                {sortedTasks.map((task,index)=>(
                    <ListTask task={task} removeTask={removeTask} toggleComplete={toggleComplete} editMode={editMode} editValue={editValue} handleEdit={handleEdit} saveEdit={saveEdit} cancelEdit={cancelEdit}  setEditValue={setEditValue}  index={index} key={index} />
                ))}
            </div>
        </div>
    </>
  )
}

export default Todo