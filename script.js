const url = "https://jsonplaceholder.typicode.com/";            //API Url
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

function parseUserInfoJson(JsonString, firstSplit, secondSplit)
{
    JsonString = JsonString[firstSplit];
    JsonString = JsonString.replaceAll('"', '');
    JsonString = JsonString.split(":")[secondSplit];

    return JsonString;
};

function showUser(name)
{
    UserIsDisplayed = displayInfo(UserIsDisplayed,toggleUserInfo);
    hideAll();

    fetch(url + 'users/?name=' + name)
    .then(response => {
        return response.json();
    })
    .then(user => {

        //Parses User Info
        var unparsed = JSON.stringify(user);
        var parsed = unparsed.split(",");

        var name = parseUserInfoJson(parsed, 1, 1);
        var username = parseUserInfoJson(parsed, 2, 1);
        var email = parseUserInfoJson(parsed, 3, 1);
        var id = parseUserInfoJson(parsed, 0, 1);
        userId = id;

        //Sets User Info to be displayed 
        userInfo.username.innerHTML = "Username: " + username;
        userInfo.email.innerHTML = "Email: " + email;
        userInfo.name.innerHTML = name;
        userInfo.id.innerHTML = id;
    });
};

getUser.onclick = function() //Calls showUser method using input value as parameter
{
    if(user.value.toString())
    {
        showUser(user.value.toString());
    }
};

function formatJson(JsonString, firstSplit, secondSplit)
{
    JsonString = JsonString.split(",")[firstSplit];
    JsonString = JsonString.split(":")[secondSplit];
    JsonString = JsonString.replaceAll('"', '');
    JsonString = JsonString.replaceAll('}', '');
    JsonString = JsonString.replaceAll('{', '');

    return JsonString;
};

getAllUsers.onclick = function()
{
    if(toggleList === false)
    {
        //Empties array and div
        allUsers = [];
        listAllUsers.innerHTML = "";

        var parsedUser = "";
        fetch(url + "users")
        .then(response => {
            return response.json();
        })
        .then(users => {
            length = users.length;
            for(var i = 0; i < length; i++)
            {
                parsedUser = JSON.stringify(users[i]);

                parsedUser = formatJson(parsedUser, 1, 1);

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

//Shows Posts, Albums and Todos

getPosts.onclick = function()
{
    PostIsDisplayed = displayInfo(PostIsDisplayed,togglePostInfo);

    var post = '';
    var title = '';

    //Empties array and div
    userPosts = [];
    displayPosts.innerHTML = "";

    fetch(url + "users/" + userId + "/posts")
    .then(response => {
        return response.json();
    })
    .then(posts => {
        length = posts.length;
        for(var i = 0; i < length; i++)
        {
            post = JSON.stringify(posts[i]);

            title = formatJson(post, 2, 1);
            body = formatJson(post, 3, 1);
            
            userPosts.push("<p class='title'>" + title + "</p>" + "<div'><p>" + body + "</div></p>");
        }
        userPosts.forEach(post => displayPosts.innerHTML += "<br>" + Object.values(post).join(""));
    });
};

getAlbums.onclick = function()
{
    AlbumIsDisplayed = displayInfo(AlbumIsDisplayed,toggleAlbumInfo);

    var album = '';

    //Empties array and div
    userAlbums = [];
    displayAlbums.innerHTML = "";

    fetch(url + "users/" + userId + "/albums")
    .then(response => {
        return response.json();
    })
    .then(albums => {
       length = albums.length;
       for(var i = 0; i < length; i++)
       {
            album = JSON.stringify(albums[i]);

            album = formatJson(album, 2, 1);

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

    fetch(url + "users/" + userId + "/todos")
    .then(response => {
        return response.json();
    })
    .then(todos => {
        length = todos.length;
        for(var i = 0; i < length; i++)
        {
            unparsedTodo = JSON.stringify(todos[i]);

            todoTitle = formatJson(unparsedTodo, 2, 1);
            completed = formatJson(unparsedTodo, 3, 1);

            userTodos.push("<p class='title'>" + todoTitle + "</p>" + "<div><p>" + completed + "</div></p>");
        }
        userTodos.forEach(todo => displayTodos.innerHTML += "<br>" + Object.values(todo).join(""));
    });
};
