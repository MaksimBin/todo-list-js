let arrs = []

for (var i = 0; i < 2; i++) {
  arrs.push({
    "id": i,
    "title": "title"
  })
}

const docInnerHtml = (ar) => {
  
  if(ar.length < 1){
    document.getElementById('todo').innerHTML = '<div style="margin-left: 25px;">Список пуст</div>'
  }else{
  
  document.getElementById('todo').innerHTML = ar.map((x, index, arrey) => `<div class="container-flex-row"><div>${index + 1}</div><div>${x.title}</div>
      <div><button style="margin-right:10px;" onclick="delit(${index})" type="button">del</button><button onclick="openModal(${index})" type="button">edit</button></div>
    </div>`)

  document.getElementById('todo').style = "display:block;"
  }
}
docInnerHtml(arrs)

const delit = (indexIn) => {
  let filter = arrs.filter((x, index) => index !== indexIn)
  arrs = filter
  docInnerHtml(arrs)
}


const postTodo = () => {

  let title = document.getElementById('title').value
  
  if(validateTodo(title) == true){
let isvalid = document.getElementById('title')
    isvalid.value = "пустое значение"
    isvalid.style = "color:red;"
  }else{

  arrs.push({
    "id": arrs.length + 1,
    "title": title
  })

  document.getElementById('title').value = ""
document.getElementById('title').style = "color:black;"
  docInnerHtml(arrs)
  }
}

const openModal = (indexTodo) => {
  document.getElementById('modal').innerHTML = `<div id="opModal" style="position: fixed;top: 0; left: 0; width: 100%;height: 100vh; background-color: white;">
  <div style="margin:25px;">
      <label for="">Title</label>
      <input id="edit" type="text" value="${arrs[indexTodo].title}">
      <button type="button" onclick="updateTodo(${indexTodo})">edit</button>
      </div>
    </div>`
}


const updateTodo = (indexIn) => {

  let title = document.getElementById('edit').value
  
   if(validateTodo(title) == true){
let isvalid = document.getElementById('edit')
    isvalid.value = "пустое значение"
    isvalid.style = "color:red;"
  }else{

  arrs[indexIn].title = title

  docInnerHtml(arrs)
  
  document.getElementById('edit').style = "color:black;"

  document.getElementById('edit').value = ""

  document.getElementById('opModal').style = "display: none;"
  }
}


const validateTodo = (title) => {
  if(title == "" || title == "пустое значение") return true
  if(title !== "") return title
}