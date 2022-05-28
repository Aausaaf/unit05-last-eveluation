let title = document.getElementById("title")
let datacontainer = document.getElementById("datacontainer")
let checkbox = document.getElementById("checkbox")

async function getdata()
{
    try
    {
       let res = await fetch(`http://localhost:3000/task`)
       let data = await res.json()
       console.log(data)
       displaydata(data)
    }
    catch(error)
    {
        console.log(error)
    }
}
getdata()


function displaydata(data)
{
    datacontainer.innerHTML = ""
    data.forEach(ele => {
        
        let div = document.createElement('div')
        let p = document.createElement('p')
        p.innerText = ele.title
        let edit = document.createElement('button')
        edit.innerHTML = "Edit"
        edit.onclick = function()
        {
            localStorage.setItem("ids", JSON.stringify(ele.id))
            let a = document.createElement('a')
            a.href = "edit.html"
            a.append(edit)
            div.append(p,a,deletes)

        }
        let deletes = document.createElement("button")
        deletes.innerHTML = "Delete"
        deletes.onclick=async function (){
            let b=await fetch(`http://localhost:3000/task/${ele.id}`,{
                method:"DELETE"
            })
            displaydata(data)
        }
        div.setAttribute("class","div")
        p.setAttribute("class","p")
        edit.setAttribute("class","edit")
        deletes.setAttribute("class","deletes")
        div.append(p,edit,deletes)
        datacontainer.append(div)
     
        
    });
}

checkbox.value = false
function change()
{
    checkbox.value = true
}
function add()
{   
  
   let data = {
       
       "title" : title.value,
       "status" : false,
       "status" : checkbox.value,
   }
    async function pushdata()
    {
        try
        {
            let res = await fetch("http://localhost:3000/task",
            {
                method:"POST",
               body:JSON.stringify(data),
              headers:{
             "Content-Type":"application/json"
         }
            })
        }
        catch(error)
        {
            console.log(error)
        }
    }
    pushdata()
}


