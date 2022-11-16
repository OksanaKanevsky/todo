import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function FormTodo({ addTodo }) {
    const [value, setValue] = useState('');

    const handleSubmit = e => {
        if (!value) return;

        addTodo(value)
        setValue('');
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Add task</Form.Label>
                <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Type new task" />
            </Form.Group>
            <Button onClick={handleSubmit}>Add Task</Button>
        </Form>
    );
}

export default FormTodo;