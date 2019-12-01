let todoArray =[
    {
        mytext : 'todo 1',
        complete : false
    },
    {
        mytext : 'todo 2',
        complete : true
    }
];

//Save todoArray to local storage
let saveTodo = (myArray)=>{
    localStorage.setItem('myTodo',JSON.stringify(myArray));
};

//Save local storage to todoArray
let getTodo = ()=>{
    todoArray = JSON.parse( localStorage.getItem('myTodo'));
};

//clear my table
let clearTable =()=>{
    document.getElementById("todoTable").innerHTML=`
        <div class="row col s12 ">  
            <div class="col s6">Task Name</div>
            <div class="col s3">Status</div>
            <div class="col s3">Action</div>    
        </div>

        <div class="col row s12" id="todoList">
            
        </div>
    `;
};

const renderTodos = function(){
    
    //Checking doest the myTodo exist in local storage
    if(!localStorage.getItem('myTodo'))
        saveTodo(todoArray);
    else 
        getTodo();

    let todos = todoArray;//Copying data from todoArray (Global Variable) to todos (Local Variable). Note: we can use global variable, but in the programming process, I had been used todos variable for this function :D, that's why I copy it

    clearTable();

    console.log(todos);
    todos.forEach(function(item, index, todos) {

        //Initializing todo data
        let myStatus="Incomplete";
        let myColor="orange";
        let myIcon = "query_builder";

        //Rewriting todo's data
        if(item.complete===true){
            myStatus="Complete";
            myColor="green";
            myIcon="done";
        }

        //Show the todo one by one
        document.querySelector("#todoList")
        .insertAdjacentHTML("afterend", `
        <div class="row col s12 myrw">
            <div class="col s6">${item.mytext}</div>
            <div class="col s3">
                <div class="btn-floating ${myColor}" onclick="upStat(${index})" title="${myStatus}">
                    <i class="material-icons">${myIcon}</i>
                </div>
            </div>
            <div class="col s3">
                <div class="btn-floating red " onclick="delStat(${index})" title="Delete">
                    <i class="material-icons">delete</i>
                </div>
            </div>
        </div>
      `);

    });   
}

//When submit button clicked
document.querySelector('#myForm')
.addEventListener('submit', function(e){
    e.preventDefault()
    todoArray.push({
        mytext : e.target.elements.newTodo.value,
        complete : false
    });
    saveTodo(todoArray);
    renderTodos();
    e.target.elements.newTodo.value="";
});

//When complete button clicked
let upStat = (val)=>{
    todoArray[val].complete=true;
    saveTodo(todoArray);
    renderTodos();
}

//When delete button clicked
let delStat = (val)=>{
    todoArray.splice(val,1);
    saveTodo(todoArray);
    renderTodos();
    console.log(val);
}
renderTodos();