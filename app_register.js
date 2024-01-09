const registerForm = document.getElementById("register-form")

async function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }





registerForm.addEventListener("submit",async function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the values from the form inputs
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    let password_input = document.getElementById("password").value;

    // Perform validation (you can add your own validation logic here)
    if (username === "" || email === "" || password_input === "") {
        alert("Please fill in all fields");
        return;
    }

    // Perform registration or submit the form to the server
    // You can add your own registration logic here


    const password = await hash(password_input).then((hex) => hex);
    console.log(password);
    try {

        const response = await fetch("http://127.0.0.1:5000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (data.username === username && data.password === password) {
            window.location.href = "http://127.0.0.1:5500/login.html";
        } else {
            console.log(data);
        }
        console.log("Success:", data);
        // Reset the form
        document.getElementById("register-form").reset();
    } catch (error) {
        console.log(error);
    }

























    // Reset the form
    document.getElementById("register-form").reset();
});