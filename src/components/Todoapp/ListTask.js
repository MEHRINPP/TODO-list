import React from 'react'

const ListTask = ({task, index, removeTask, toggleComplete, editMode, editValue, handleEdit, saveEdit, setEditValue, cancelEdit}) => {
  return (
    <>
      <div className='list-task'>
        <input 
          type='checkbox'
          checked={task.completed}
          onChange={() => toggleComplete(index)}
        />
        
        {editMode === index ? (
          <div className="edit-mode">
            <input
              type='text'
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <button onClick={() => saveEdit(index)} className='save-btn'>Save</button>
            <button onClick={cancelEdit} className='cancel-btn'>Cancel</button>
          </div>
        ) : (
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
        )}

        <div className="buttons-container">
          {editMode !== index && (
            <>
              <button onClick={() => handleEdit(index, task.title)} className='edit-btn'>
                Edit
              </button>
              <button onClick={() => removeTask(index)} className='delete-btn'>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ListTask
