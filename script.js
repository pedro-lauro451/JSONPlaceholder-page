const user = document.getElementById("user");                   //Find User input
const getUser = document.getElementById("get-user");            //Find User button
const getAllUsers = document.getElementById("get-all-users");   //Displays User List when clicked
const listAllUsers = document.getElementById("list-all-users"); //User List is displayed in the corresponding div

const getPosts = document.getElementById("view-posts");         //View Posts button 
const getAlbums = document.getElementById("view-albums");       //View Albums button
const getTodos = document.getElementById("view-todos");         //View Todos button
const closeIcon = document.getElementById("close");             //Close User Info button

const displayPosts = document.getElementById("posts");          //Posts are displayed in this div
const displayAlbums = document.getElementById("albums");        //Albums are displayed in this div
const displayTodos = document.getElementById("todos");          //Todos are displayed in this div

var clickedUser = '';                                           //Receives the selected User in the User List (replyClick method)

const toggleUserInfo = document.querySelectorAll('.display');   //User card class

const togglePostInfo = document.querySelectorAll('.posts');     //Posts list class 
const toggleAlbumInfo = document.querySelectorAll('.albums');   //Albums list class
const toggleTodoInfo = document.querySelectorAll('.todos');     //Todos list class

//User object
var userInfo =
{   
    username: document.getElementById("username"),
    email: document.getElementById("email"),
    name: document.getElementById("name"),
    id: document.getElementById("userId"),
};

var allUsers = [];      //This array will contain the User List in the getAllUsers onclick
var userPosts = [];     //Contains User Posts
var userAlbums = [];    //Contains User Albums
var userTodos = [];     //Contains User Todos

var userId = "";

//Booleans used in display toggle methods
var UserIsDisplayed = false;
var PostIsDisplayed = false;
var AlbumIsDisplayed = false;
var TodoIsDisplayed = false;
var toggleList = false;

function displayInfo(boolValue,toggleValue)
{
    if(boolValue == false)
    {
        toggleValue.forEach(content => {
            content.style.display = 'initial';
        });
        boolValue = true;
        return boolValue;
    }
    else if(boolValue == true)
    {
        toggleValue.forEach(content => {
            content.style.display = 'none';
        });
        boolValue = false;
        return boolValue;
    }
};

function hideAll()
{
    if(PostIsDisplayed === true)
    {
        togglePostInfo.forEach(content => {
            content.style.display = 'none';
        });
        PostIsDisplayed = false;
    }

    if(AlbumIsDisplayed === true)
    {
        toggleAlbumInfo.forEach(content => {
            content.style.display = 'none';
        });
        AlbumIsDisplayed = false;
    }

    if(TodoIsDisplayed === true)
    {
        toggleTodoInfo.forEach(content => {
            content.style.display = 'none';
        });
        TodoIsDisplayed = false;
    }

    //Empties arrays and divs
    userPosts = [];
    displayPosts.innerHTML = "";

    userAlbums = [];
    displayAlbums.innerHTML = "";

    userTodos = [];
    displayTodos.innerHTML = "";
};

closeIcon.onclick = function()
{
    UserIsDisplayed = displayInfo(UserIsDisplayed,toggleUserInfo);
    hideAll();
};

function showUser(name)
{
    UserIsDisplayed = displayInfo(UserIsDisplayed,toggleUserInfo);
    hideAll();

    fetch('https://jsonplaceholder.typicode.com/users/?name=' + name)
    .then(response => {
        return response.json();
    })
    .then(user => {

        //Parses User Info
        var unparsed = JSON.stringify(user);
        var parsed = unparsed.split(",");

        var name = parsed[1];
        name = name.replaceAll('"', '');
        var parsedName = name.split(":")[1];

        var username = parsed[2];
        username = username.replaceAll('"', '');
        var parsedUsername = username.split(":")[1];
        
        var email = parsed[3];
        email = email.replaceAll('"', '');
        var parsedEmail = email.split(":")[1];

        var id = parsed[0];
        id = id.replaceAll('"', '');
        var parsedId = id.split(":")[1];
        userId = parsedId;

        //Sets User Info to be displayed 
        userInfo.username.innerHTML = "Username: " + parsedUsername;
        userInfo.email.innerHTML = "Email: " + parsedEmail;
        userInfo.name.innerHTML = parsedName;
        userInfo.id.innerHTML = parsedId;
    });
};

getUser.onclick = function() //Calls showUser method using input value as parameter
{
    showUser(user.value.toString());
};

getAllUsers.onclick = function()
{
    if(toggleList === false)
    {
        //Empties array and div
        allUsers = [];
        listAllUsers.innerHTML = "";

        var parsedUser = "";
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            return response.json();
        })
        .then(users => {
            length = users.length;
            for(var i = 0; i < length; i++)
            {
                parsedUser = JSON.stringify(users[i]);
                parsedUser = parsedUser.split(",")[1];
                parsedUser = parsedUser.split(":")[1];
                parsedUser = parsedUser.replaceAll('"', '');

                 //Adds an unique id for each User in the User List, to be used by the replyClick method
                 //when you click the User
                allUsers.push("<p id='user" + i + "' onClick='replyClick(this.id)'>" + parsedUser + "</p>");
            }
            allUsers.forEach(user => listAllUsers.innerHTML += Object.values(user).join(""));
        });
        toggleList = true;
    }    
    else if(toggleList === true)
    {
        allUsers = [];
        listAllUsers.innerHTML = "";
        toggleList = false;
    }
};

function replyClick(clicked_id) //Calls showUser method using ids generated for the User List as a parameter
{
    clickedUser = document.getElementById(clicked_id);
    clickedUser = clickedUser.innerHTML;
    showUser(clickedUser);
};

getPosts.onclick = function()
{
    PostIsDisplayed = displayInfo(PostIsDisplayed,togglePostInfo);

    var post = '';
    var title = '';

    //Empties array and div
    userPosts = [];
    displayPosts.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/users/" + userId + "/posts")
    .then(response => {
        return response.json();
    })
    .then(posts => {
        length = posts.length;
        for(var i = 0; i < length; i++)
        {
            post = JSON.stringify(posts[i]);
            title = post.split(",")[2];
            title = title.split(":")[1];
            title = title.replaceAll('"', '');

            body = post.split(",")[3];
            body = body.split(":")[1];
            body = body.replaceAll('"', '');
            body = body.replaceAll('}', '');

            userPosts.push("<p class='title'>" + title + "</p>" + "<div'><p>" + body + "</div></p>");
        }
        userPosts.forEach(post => displayPosts.innerHTML += "<br>" + Object.values(post).join(""));
    });
};

getAlbums.onclick = function()
{
    AlbumIsDisplayed = displayInfo(AlbumIsDisplayed,toggleAlbumInfo);

    var unparsedAlbum = '';
    var album = '';

    //Empties array and div
    userAlbums = [];
    displayAlbums.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/users/" + userId + "/albums")
    .then(response => {
        return response.json();
    })
    .then(albums => {
       length = albums.length;
       for(var i = 0; i < length; i++)
       {
            unparsedAlbum = JSON.stringify(albums[i]);
            album = unparsedAlbum.split(",")[2];
            album = album.split(":")[1];
            album = album.replaceAll('"', '');
            album = album.replaceAll('}', '');

            userAlbums.push("<p class='title'>" + album + "</p>");
       }
       userAlbums.forEach(album => displayAlbums.innerHTML += "<br>" + Object.values(album).join(""));
    });
};

getTodos.onclick = function()
{
    TodoIsDisplayed = displayInfo(TodoIsDisplayed,toggleTodoInfo);
    var unparsedTodo = '';
    var todoTitle = '';
    var completed = '';

    //Empties array and div
    userTodos = [];
    displayTodos.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/users/" + userId + "/todos")
    .then(response => {
        return response.json();
    })
    .then(todos => {
        length = todos.length;
        for(var i = 0; i < length; i++)
        {
            unparsedTodo = JSON.stringify(todos[i]);
            todoTitle = unparsedTodo.split(",")[2];
            todoTitle = todoTitle.split(":")[1];
            todoTitle = todoTitle.replaceAll('"', '');
            todoTitle = todoTitle.replaceAll('}', '');

            completed = unparsedTodo.split(",")[3];
            completed = completed.split(":")[1];
            completed = completed.replaceAll('"', '');
            completed = completed.replaceAll('}', '');

            userTodos.push("<p class='title'>" + todoTitle + "</p>" + "<div><p>" + completed + "</div></p>");
        }
        userTodos.forEach(todo => displayTodos.innerHTML += "<br>" + Object.values(todo).join(""));
    });
};
