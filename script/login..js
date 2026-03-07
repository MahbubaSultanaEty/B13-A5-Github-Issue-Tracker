document.getElementById("sign-in-btn").addEventListener("click", function () {
    const username = document.getElementById("username-input").value;
    console.log(username);

    const password = document.getElementById("password-input").value;
    console.log(password);

    if (username == "admin" && password == "admin123") {
        alert("Sign In successful");
        window.location.href = "home.html";

    } else {
        alert("password Incorrect");
        return;
    }
})