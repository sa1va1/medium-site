const $registerForm = document.querySelector('#signup__form');
const $inputs = $registerForm.querySelectorAll('input');
const $subBtn = $registerForm.querySelector('.signup-btn');

const handleCreateUser = (e) => {
    e.preventDefault();

    const user = {
        name: $inputs[0].value,
        email: $inputs[1].value,
        password: $inputs[2].value
    }

    console.log("User data being sent:", user); 

    $subBtn.setAttribute("disabled", true);
    $subBtn.textContent = "Registering...";

    fetch("https://blog-post-production-b61c.up.railway.app/api/v1/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log("Response status:", response.status);
        return response.json();
    })
    .then(data => {
        $subBtn.removeAttribute("disabled");
        $subBtn.textContent = "Sign Up";
        console.log("Response data:", data); 
        if (data.status === "success") {
            $registerForm.textContent = "Success";
            location.replace(location.origin + "/imtihon/pages/login.html");
        } else if (data.status === "error") {
            alert(data.message || "An error occurred during registration.");
        } else {
            $registerForm.textContent = "Sign Up";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Something went wrong!");
    });
}

$registerForm.addEventListener('submit', handleCreateUser);