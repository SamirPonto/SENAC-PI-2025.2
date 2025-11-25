document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Prepare x-www-form-urlencoded body
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", email);
    formData.append("password", senha);
    formData.append("scope", "");
    //formData.append("client_id", "string");
	// formData.append("client_secret", "your-secret-key");

    console.log(formData.toString());
    const response = await fetch("http://localhost:8000/v1/auth/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    });

    if (response.ok) {
        const data = await response.json();

        // Save JWT token
        localStorage.setItem("access_token", data.access_token);
	localStorage.setItem("user_data", JSON.stringify(data.user));

        // Redirect to dashboard
        //window.location.href = "./dashboard.html";
	if (data.role === 'teacher') {
		window.location.href = "./dashboard_v3.html";
	} else {
		window.location.href = "./dashboard_teacher.html";
	}
    } else {
        document.getElementById("errorMsg").style.display = "block";
    }
});

