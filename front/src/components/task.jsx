import { Button } from 'react-bootstrap';

function Task({ task, index, updateTask, removeTask, dud }) {
    console.log(task);
    return (
        <div className='todo'>
            <span style={{ textDecoration: task.isDone ? 'line-through' : '' }}>{task.title}</span>
            <div>
                <Button variant='outline-success' onClick={() => updateTask(index, task._id)}>{dud}</Button>
                <Button variant='outline-danger' onClick={() => removeTask(index, task._id)}>Remove</Button>
            </div>
        </div>
    );
}

export default Task;