document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const payload = {
        name,
        email,
        password,
        role
    };

	console.log(JSON.stringify(payload));

    const response = await fetch("http://localhost:8000/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        document.getElementById("errorMsg").style.display = "block";
    }
        alert("Conta criada com sucesso!!");
	window.location.href = "./index.html";
});

