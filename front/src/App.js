import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormTodo from './components/form'
import Task from './components/task'
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './style.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);



function App() {
    const [todo, setTodo] = useState([]);

    const getData = async () => {
      const { data } = await axios.get(`http://localhost:3030/tasks`);
      setTodo(data.tasks);
    }

    useEffect(()=>{
      getData()
    },[]);

    const removeTask = (index, _id) => {

      MySwal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        showCancelButton: true
      
      });

      // להוסיף IF

      const newTasks = [...todo];
      newTasks.splice(index,1);
      setTodo(newTasks);
      axios.delete(`http://localhost:3030/tasks/delete?id=${_id}`);
    }

    const updateTask = (index, _id) => {
      const newTasks = [...todo];
      if (newTasks[index].isDone)
        newTasks[index].isDone = false;
      else
        newTasks[index].isDone = true;

      axios.put(`http://localhost:3030/tasks/update?id=${_id}&isDone=${newTasks[index].isDone}`);
      setTodo(newTasks);
    }

    const addTodo = text => {

      axios.post(`http://localhost:3030/tasks/new?`, {
        title:text
      }).then(res => {
        console.log(res);

        const newTasks = [...todo, {
          _id: res.data._id,
          title: text,
          isDone: false
        }];
        
        setTodo(newTasks);
      })
    }

    return (
      <div className='app'>
        <div className='container'>
          <h1>Todo List</h1>
          <FormTodo addTodo={addTodo} />

          <Tabs>
            <TabList>
              <Tab>All</Tab>
              <Tab>Undone</Tab>
              <Tab>Done</Tab>
            </TabList>
            <TabPanel>
            {todo.map((task, index) => {
              return (
                <Card key={index}>
                  <Card.Body>
                    <Task
                      key={index}
                      index={index}
                      task={task}
                      updateTask={updateTask}
                      removeTask={removeTask}
                      dud="Check"
                    />
                  </Card.Body>
                </Card>
            )
            })}
            </TabPanel>
            <TabPanel>
              {todo.map((task, index) => {
                if (!task.isDone) {
                return (
                  <Card key={index}>
                    <Card.Body>
                      <Task
                        key={index}
                        index={index}
                        task={task}
                        updateTask={updateTask}
                        removeTask={removeTask}
                        dud="Check"
                        />
                    </Card.Body>
                  </Card>
              )
              }})}
            </TabPanel>
            <TabPanel>
            {todo.map((task, index) => {
              if (task.isDone) {
              return (
                <Card key={index}><Card.Body>
                    <Task
                      key={index}
                      index={index}
                      task={task}
                      updateTask={updateTask}
                      removeTask={removeTask}
                      dud="Uncheck"
                    />
                  </Card.Body>
                </Card>
            )
            }})}
            </TabPanel>
          </Tabs>


            
        </div>
      </div>
    );
}

export default App;