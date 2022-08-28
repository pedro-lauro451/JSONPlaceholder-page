const user = document.getElementById("user");
const getUser = document.getElementById("get-user");

var userInfo =
{   
    username: document.getElementById("username"),
    email: document.getElementById("email"),
    name: document.getElementById("name")
};

getUser.onclick = function()
{
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

        userInfo.username.innerHTML = "Username: " + parsedUsername;
        userInfo.email.innerHTML = "Email: " + parsedEmail;
        userInfo.name.innerHTML = parsedName;
    })
}