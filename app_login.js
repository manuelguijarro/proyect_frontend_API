const messageForm = document.getElementById('error-message');
const loginForm = document.getElementById('login-form');


// Función para cifrar una cadena con SHA-256
async function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }





loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password_input = document.getElementById("password").value;

    // Perform validation (you can add your own validation logic here)
    if (email === "" || password_input === "") {
        messageForm.textContent = "Please enter a username and password.";
        return;
    }
    const password = await hash(password_input).then((hex) => hex);
    console.log(password);
    try {
        const response = await fetch("http://127.0.0.1:5000/api/users/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.result.email === email && data.result.password === password) {
            console.log("Success:", data);
            if(data.result.token==="1234abcd")
            window.location.href = "http://127.0.0.1:5500/admin.html";
            else{
                window.location.href = "http://127.0.0.1:5500/index.html";
            }
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
