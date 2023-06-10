let arrs = []

for (var i = 0; i < 25; i++) {
  arrs.push({
    "id": i,
    "title": "title"
  })
}


let arrsi = []

let delitPaginationPage
let newArrsi



////Pagination

const pagination = (page, size, arr) => {

  let newPage
  let newSize
  let number = 9
  
  if (page > 1) {
    newPage = page * size - number
    newSize = size + newPage
  }
   else {
     newPage = 0
     newSize = 10
   }
   
 return arr.slice(newPage, newSize)
 
}


const paginationPage = (index) => {
  
  delitPaginationPage = index
  
  arrsi = arrs
  
  arrsi = pagination(index, 10, arrs)
  
  newArrsi = arrsi
  
  docInnerHtml(arrsi)
  arrsi = arrs
  
}

const getPage = (arrayInOut, size) => {
  let result = []
  let page
  
  
  if (arrayInOut.length >= 11) {
    page = parseInt(arrayInOut.length / size)


    for (var i = 0; i < page; i++) {
      result.push(i)
    }
  }
  
  
  if (arrayInOut.length / size > parseInt(arrayInOut.length / size)) {
  result.push(1)
  }
 
  return result
}



const getPageSize = () => {

  let newGetPage = getPage(arrs, 10)
  
  console.log(newGetPage)

  
      document.getElementById('pagination').innerHTML = newGetPage.map((x, index) => `<div onclick='paginationPage(${index + 1})' style="margin-right: 15px; background-color: #ccc;padding: 5px;">${index + 1}</div>`).join("")

}



////Pagination

const docInnerHtml = (ar) => {




  if (ar.length < 1) {
    document.getElementById('todo').innerHTML = '<div style="margin-left: 25px;">Список пуст</div>'
  } else {

    document.getElementById('todo').innerHTML = ar.map((x, index) =>
      `<div class="container-flex-row"><div>${x.id + 1}</div><div>${x.title}</div>
      <div><button style="margin-right:10px;" onclick="delit(${index})" type="button">del</button><button onclick="openModal(${index})" type="button">edit</button></div>
    </div>`
    ).join("")

    getPageSize()

    document.getElementById('todo').style = "display:block;"
    
   
  }
}
docInnerHtml(arrs)


const delit = (indexIn) => {
  let filter = arrs.filter((x, index) => index !== indexIn)
  arrs = filter
 // docInnerHtml(arrs)
// console.log(newArrsi.length)
//console.log(delitPaginationPage)
//console.log(newArrsi.length)
 if (newArrsi.length == 1) {
   delitPaginationPage = delitPaginationPage - 1
//   console.log(delitPaginationPage)  
   paginationPage(delitPaginationPage)

 }else{
 paginationPage(delitPaginationPage)
 }
}


const postTodo = () => {

  let title = document.getElementById('title').value

  if (validateTodo(title) == true) {
    let isvalid = document.getElementById('title')
    isvalid.value = "пустое значение"
    isvalid.style = "color:red;"
  } else {

    arrs.push({
      "id": arrs.length + 1,
      "title": title
    })

    document.getElementById('title').value = ""
    document.getElementById('title').style = "color:black;"
   docInnerHtml(arrs)
   paginationPage(delitPaginationPage)
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
  
  //console.log(delitPaginationPage)

  let title = document.getElementById('edit').value

  if (validateTodo(title) == true) {
    let isvalid = document.getElementById('edit')
    isvalid.value = "пустое значение"
    isvalid.style = "color:red;"
  } else {

   arrs[indexIn].title = title
    
    // сделать обновление по id pagination

 // docInnerHtml(arrs)
    
paginationPage(delitPaginationPage)
    document.getElementById('edit').style = "color:black;"

    document.getElementById('edit').value = ""

    document.getElementById('opModal').style = "display: none;"
  }
}


paginationPage(0)

const validateTodo = (title) => {
  if (title == "" || title == "пустое значение") return true
  if (title !== "") return title
}