const users = JSON.parse(localStorage.getItem('users'))
const currentUser = localStorage.getItem('currentUser')

let todos = users.find(user => user.name === currentUser).todos

function updateSite(){
    $('.todos').html('')

    for(let todo of todos){
        $('.todos').html( $('.todos').html() + `<div class="todo">
        <div class="todo-content">
            <h2>${todo.title}</h2>
            <p>
                ${todo.text}
            </p>
        </div>
        <div class="options">
            <button id='${todo.id}D' class="btn btn-danger">Delete</button>
            <button id='${todo.id}E' data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-success">Edit</button>
        </div>
    </div>`)
    }
    
}

updateSite()


$('#save-todo').click(function(){
    let newTodo = {
        id: Date.now(),
        title: $('input').val(),
        text: $('textarea').val()
    }


    todos.push(newTodo)

    $('#title').val('')
    $('textarea').val('')

    users.find(user => user.name === currentUser).todos = todos

    localStorage.setItem('users', JSON.stringify(users))
    updateSite()
})


let id

$('.todos').click(function(e){
    if(e.target.innerHTML === 'Delete'){
        id =  e.target.id
        todos = todos.filter(user => user.id + 'D' !== id)
    
        users.find(user => user.name === currentUser).todos = todos
    
    
        localStorage.setItem('users', JSON.stringify(users))
        updateSite()
    }else if(e.target.innerHTML === 'Edit'){
        id =  e.target.id
        const currentTodo = todos.find(todo => todo.id + 'E' === id)

        $('#title').val(currentTodo.title)
        $('textarea').val(currentTodo.text)
    }
    
})