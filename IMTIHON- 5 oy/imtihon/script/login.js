const $loginForm = document.querySelector('.login__form');
const $inputs = $loginForm.querySelectorAll('input');
const signBtn = $loginForm.querySelector('.signup-btn');

const loginUser = (e) => {
    e.preventDefault();

    const user = {
        email: $inputs[0].value,
        password: $inputs[1].value,
    }

    console.log("User data being sent for login:", user);

    signBtn.setAttribute("disabled", true);
    signBtn.textContent = "Log In...";

    fetch("https://blog-post-production-b61c.up.railway.app/api/v1/user/login", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            console.log("Response status:", res.status);
            return res.json();
        })
        .then(data => {
            signBtn.removeAttribute("disabled");
            console.log("Response data:", data);
            if (data.status === "success") {
                localStorage.setItem('token', JSON.stringify(data.data.token));
                localStorage.setItem('email', JSON.stringify(data.data.user.email));
                signBtn.textContent = "Success";
                location.replace(location.origin + "/imtihon/index.html");
            } else {
                signBtn.textContent = "Log In";
                alert(data.message || "Something went wrong during login.");
            }
        })
        .catch(error => {
            signBtn.removeAttribute("disabled");
            signBtn.textContent = "Log In";
            console.error('Error:', error);
            alert("Something went wrong!");
        });
}

$loginForm.addEventListener('submit', loginUser);