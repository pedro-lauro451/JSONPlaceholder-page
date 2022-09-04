//Data
const user = document.getElementById("user");
const getUser = document.getElementById("get-user");
const getAllUsers = document.getElementById("get-all-users");
const listAllUsers = document.getElementById("list-all-users");
const getPosts = document.getElementById("view-posts");
const getAlbums = document.getElementById("view-albums");
const getTodos = document.getElementById("view-todos");
const displayPosts = document.getElementById("posts");
const displayAlbums = document.getElementById("albums");
const displayTodos = document.getElementById("todos");
const closeIcon = document.getElementById("close");
var clickedUser = '';

//Display
const toggleUserInfo = document.querySelectorAll('.display');
const togglePostInfo = document.querySelectorAll('.posts');
const toggleAlbumInfo = document.querySelectorAll('.albums');
const toggleTodoInfo = document.querySelectorAll('.todos');

var userInfo =
{   
    username: document.getElementById("username"),
    email: document.getElementById("email"),
    name: document.getElementById("name"),
    id: document.getElementById("userId"),
};

var allUsers = [];
var userPosts = [];
var userAlbums = [];
var userTodos = [];

var userId = "";

var UserIsDisplayed = false;
var PostIsDisplayed = false;
var AlbumIsDisplayed = false;
var TodoIsDisplayed = false;
var toggleList = false;

function displayUserInfo()
{
    if(UserIsDisplayed === false)
    {
        toggleUserInfo.forEach(content => {
            content.style.display = 'initial';
        });
        UserIsDisplayed = true;
    }
    else if(UserIsDisplayed === true)
    {
        toggleUserInfo.forEach(content => {
            content.style.display = 'none';
        });
        UserIsDisplayed = false;
    }
};

function displayPostInfo()
{
    if(PostIsDisplayed === false)
    {
        togglePostInfo.forEach(content => {
            content.style.display = 'initial';
        });
        PostIsDisplayed = true;
        getPosts.innerHTML = "Close Posts";
    }
    else if(PostIsDisplayed === true)
    {
        togglePostInfo.forEach(content => {
            content.style.display = 'none';
        });
        PostIsDisplayed = false;
        getPosts.innerHTML = "View Posts";
    }
        
};

function displayAlbumInfo()
{
    if(AlbumIsDisplayed === false)
    {
        toggleAlbumInfo.forEach(content => {
            content.style.display = 'initial';
        });
        AlbumIsDisplayed = true;
        getAlbums.innerHTML = "Close Albums";
    }
    else if(AlbumIsDisplayed === true)
    {
        toggleAlbumInfo.forEach(content => {
            content.style.display = 'none';
        });
        AlbumIsDisplayed = false;
        getAlbums.innerHTML = "View Albums";
    }
};

function displayTodoInfo()
{
    if(TodoIsDisplayed === false)
    {
        toggleTodoInfo.forEach(content => {
            content.style.display = 'initial';
        });
        TodoIsDisplayed = true;
        getTodos.innerHTML = "Close Todos";
    }
    else if(TodoIsDisplayed === true)
    {
        toggleTodoInfo.forEach(content => {
            content.style.display = 'none';
        });
        TodoIsDisplayed = false;
        getTodos.innerHTML = "View Todos";
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

    userPosts = [];
    displayPosts.innerHTML = "";
    getPosts.innerHTML = "View Posts";

    userAlbums = [];
    displayAlbums.innerHTML = "";
    getAlbums.innerHTML = "View Albums";

    userTodos = [];
    displayTodos.innerHTML = "";
    getTodos.innerHTML = "View Todos";
};

closeIcon.onclick = function()
{
    displayUserInfo();
    hideAll();
};

function showUser(name)
{
    displayUserInfo();
    hideAll();

    fetch('https://jsonplaceholder.typicode.com/users/?name=' + name)
    .then(response => {
        return response.json();
    })
    .then(user => {

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

        userInfo.username.innerHTML = "Username: " + parsedUsername;
        userInfo.email.innerHTML = "Email: " + parsedEmail;
        userInfo.name.innerHTML = parsedName;
        userInfo.id.innerHTML = parsedId;
    });
};

getUser.onclick = function()
{
    showUser(user.value.toString());
};

getAllUsers.onclick = function()
{
    if(toggleList === false)
    {
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

function replyClick(clicked_id)
{
    clickedUser = document.getElementById(clicked_id);
    clickedUser = clickedUser.innerHTML;
    showUser(clickedUser);
};

getPosts.onclick = function()
{
    displayPostInfo();

    var post = '';
    var title = '';

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
    displayAlbumInfo();

    var unparsedAlbum = '';
    var album = '';

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
    displayTodoInfo();
    var unparsedTodo = '';
    var todoTitle = '';
    var completed = '';

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
