const app = require('express')();
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// DB name after .net/
const url = 'mongodb+srv://Oksana:L1o2l3d4@cluster0.opl8g2v.mongodb.net/todo?retryWrites=true&w=majority';

mongoose.connect(url).then(() => {
    console.log('Connected to DB')
}).catch((err) => {
    console.error(`Error connecting ${err}`)
});

const taskSchema  = new mongoose.Schema({
    title: String,
    descr: String,
    isDone: Boolean
});

const Task = mongoose.model('tasks', taskSchema);


app.get('/tasks', (req,res) => {
    Task.find({}, (err,results) => {
        if (err) {
            console.error(err)
        } else {
            console.log(results);
            res.json({tasks: results})
        }
    })
});

app.put('/tasks/update', (req,res) => {
    Task.findOneAndUpdate(
        {_id: req.query.id},
        { isDone: req.query.isDone }
    ).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
});

app.delete('/tasks/delete', (req,res) => {
    Task.findOneAndDelete(
        {_id: req.query.id}
    ).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err)
    });
});

app.post('/tasks/new', (req,res) => {
    const task = new Task({
        title: req.body.title,
        isDone: false
    });

    task.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send(`{"_id": "${task._id}"}`);
        }
    });
});

app.listen(3030, console.log('Listening to 3030'));