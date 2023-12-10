//getDocumentbyId faster than queryselector
let todoInput = document.querySelector('.input')
let addTodoButton = document.querySelector('.button')
let showTodo = document.querySelector('.todos-container')
let todo
let localData = JSON.parse(localStorage.getItem('todos'))
let todoList = localData || []
// creating function return to get unique id
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

addTodoButton.addEventListener('click', (e) => {
  //due to from page reload again an again
  //solution of this used event prevent tag
  e.preventDefault()
  todo = todoInput.value
  if (todo.length > 0) {
    todoList.push({ id: uuid(), todo, isCompleted: false })
  }
  rederTodoList(todoList)
  localStorage.setItem('todos', JSON.stringify(todoList)) //local stroage take something the form of string
  todoInput.value = ''
})

showTodo.addEventListener('click', (e) => {
  console.log('clicked' + e)
  let key = e.target.dataset.key
  let delTodoKey = e.target.dataset.todokey
  console.log(delTodoKey)
  //   console.log(key)
  //   console.log(e.target)
  todoList = todoList.map((todo) => {
    return todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  })
  todoList = todoList.filter((todo) => todo.id !== delTodoKey)
  localStorage.setItem('todos', JSON.stringify(todoList))
  rederTodoList(todoList)
  console.log(todoList)
})

function rederTodoList(todoList) {
  console.log(todoList)
  //   showTodo.innerHTML = `<div><input type="checkbox"><label class="todo">sky diving</label><button>delete</button></div>
  //     <div><input type="checkbox"><label class="todo">Refersh</label><button>delete</button></div>`
  showTodo.innerHTML = todoList.map(
    ({ id, todo, isCompleted }) =>
      `<div calss="todos relative"><input class="t-checkbox t-pointer" id="item-${id}" type="checkbox" data-key=${id} ${
        isCompleted ? 'checked' : ''
      }><label for="item-${id}" class="todo todo-text t-pointer ${
        isCompleted ? 'checked-todo' : ''
      } data-key=${id}">${todo}</label><button class="absolute right-0 rigbutton cursor"><span data-todokey=${id} class="del-btn material-icons-outlined">delete</span></button></div>`,
  )
}

rederTodoList(todoList)
