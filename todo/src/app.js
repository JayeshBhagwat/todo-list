const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/todo', { useNewUrlParser: true })
const db = mongoose.connection // db connection

const list = mongoose.model('todo_lists', {
    date: {
        type: Date
        // format: '%Y-%m-%d',
    },
    task: {
        type: String
    },
    disc: {
        type: String
    }
})

const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('../public'));
app.post('/', async (req, res) => {
    const { task_date, task_name, task_disc } = req.body;
    await insert(task_date, task_name, task_disc);
    // console.log('Jayesh data ---> ', jayesh)

    list.find({}).sort({ _id: -1 }).limit(1).exec(function (err, result) {
        if (err) {
            console.log('something went wrong..')
        } else {
            console.log('jayesh bhagwat --->..',result)
            res.send(result)
        }
    });

    // res.send(list.todo_lists.find().sort({ _id: -1 }).limit(1))

});

// del record of perticular ID
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    list.findByIdAndDelete(id, function (error, result) {
        console.log('------------------------ ', result)
        res.send(result);
    })
    

});

app.get('/real',(req,res)=>{
    list.find({},function(error,result){
        console.log('------------------------ ',result)
        res.send(result);
    })
});

async function insert(task_date, task_name, task_disc) {
    const listObj = new list({
        date: task_date,
        task: task_name,
        disc: task_disc
    })

    await listObj.save().then(() => {
        console.log('Successfully inserted data');
        // db.close();
    }).catch((error) => {
        console.log('Unsuccessfull')
    })

} // insert end


app.listen(3000, () => {
    console.log('3000 is activated..');
});
