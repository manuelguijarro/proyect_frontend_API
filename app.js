const messageForm = document.getElementById('error-message');
const loginForm = document.getElementById('login-form');

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Perform validation (you can add your own validation logic here)
    if (username === "" || password === "") {
        messageForm.textContent = "Please enter a username and password.";
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (data.username === username && data.password === password) {
            window.location.href = "http://127.0.0.1:5000/";
        } else {
            messageForm.textContent = "Invalid username or password.";
            console.log(data);
        }

        // Reset the form
        document.getElementById("login-form").reset();
    } catch (error) {
        console.log(error);
        messageForm.textContent = "An error occurred while processing the request.";
    }
});
