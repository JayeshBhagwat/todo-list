function add() {
    const task_name = document.getElementById("task_name").value;
    console.log('Name - ', task_name);
    const task_date = document.getElementById("task_date").value;
    console.log('Date - ', task_date);
    const task_disc = document.getElementById("task_disc").value;
    console.log('Discription - ', task_disc)

    // show data
    const list_id = document.getElementById("lst");

    document.getElementById("task_name").value = '';
    document.getElementById("task_date").value = '';
    document.getElementById("task_disc").value = '';

    if (task_name === '' || task_date === '' || task_disc === '') {
        alert('Please fill all sections')
    } else {
        fetch('/', {
            method: 'POST',
            headers: {
                Authorization: 'Jayesh',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_date,
                task_name,
                task_disc
            })
        })
        .then((res) => {
            return res.json();
        })
        .then((res)=>{
            // console.log('js resp',res)
            const space = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
            const data_date = Object.freeze(res[0].date);
            const data_name = Object.freeze(res[0].task);
            console.log("my name is: ",data_name)
            const data_desc = Object.freeze(res[0].disc);
            // console.log('here is responce-- > ', Object.freeze(res[0].task))
            
            addrow(data_date, data_name, data_desc, res[0]._id); // stored data
        })
    }
} // add ends


// data on reload fetch all stored records
function reload(){
    fetch('/real',{
        method : 'GET',
        headers :{
            Authorization:'Jayesh',
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            console.log('result ->>>>>>> ',res)
            for(let i = 0 ; i < res.length; i++){
                addrow(res[i].date, res[i].task, res[i].disc, res[i]._id)
            }
        });

} // reload ends

function addrow(data_date, data_name, data_desc, btnID){
    const space = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
    const newDate = new Date(data_date).toLocaleDateString();
    console.log("my name is: ", data_name)

    let close = document.getElementsByClassName("close");
    let i;

    const newName = data_name.padEnd(35, space) // spaces 35 char
    let li = document.createElement("li");
    let inputValue = '\xa0\xa0\xa0\xa0\xa0'+newName + newDate + space + data_desc;
    let inputVal = document.createTextNode(inputValue);
    li.appendChild(inputVal);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("lst").appendChild(li);
    }

    let span = document.createElement("SPAN");
    span.setAttribute('id',btnID)
    let txt = document.createTextNode("\u00D7"); /// cross btn uid
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function () {
        remove(span.id)
        }
}// addrow ends

function remove(id){
    console.log('!!!!',id)
    fetch('/' + id, {
        method: 'DELETE',
        headers: {
            Authorization: 'Jayesh',
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => { 
            document.getElementById(id).parentNode.style.display = 'none';
        })
} // remove ends

document.addEventListener('DOMContentLoaded',function(){
    reload();
})

document.getElementById('add_button').addEventListener('click', (e) => {
    e.preventDefault();
    add();
});
