const user = document.getElementById("user");
const getUser = document.getElementById("get-user");
const getPosts = document.getElementById("view-posts");
const getAlbums = document.getElementById("view-albums");
const getTodos = document.getElementById("view-todos");
const displayPosts = document.getElementById("posts");

var userInfo =
{   
    username: document.getElementById("username"),
    email: document.getElementById("email"),
    name: document.getElementById("name"),
    id: document.getElementById("userId"),
};

var userPosts = [];
var userAlbums = [];
var userTodos = [];

var userId = "";

getUser.onclick = function()
{
    userPosts = [];
    fetch('https://jsonplaceholder.typicode.com/users/?name=' + user.value.toString())
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
        console.log(userId);

        userInfo.username.innerHTML = "Username: " + parsedUsername;
        userInfo.email.innerHTML = "Email: " + parsedEmail;
        userInfo.name.innerHTML = parsedName;
        userInfo.id.innerHTML = parsedId;
    });
}

getPosts.onclick = function()
{
    var post = '';
    var title = '';
    userPosts = [];
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

            userPosts.push("<span style='font-size:20px'>" + title + "</span>" + "<br>" + body + "<br><br>");
        }
        userPosts.forEach(post => displayPosts.innerHTML += "<br>" + Object.values(post).join(""));
    });
}

getAlbums.onclick = function()
{
    var userAlbums = [];
    fetch("https://jsonplaceholder.typicode.com/users/" + userId + "/albums")
    .then(response => {
        return response.json();
    })
    .then(posts => {
        var unparsed = JSON.stringify(posts);
    });
}

getTodos.onclick = function()
{
    var userTodos = [];
    fetch("https://jsonplaceholder.typicode.com/users/" + userId + "/todos")
    .then(response => {
        return response.json();
    })
    .then(posts => {
        var unparsed = JSON.stringify(posts);
    });
}
