const onSubmitLogin = (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  login(email, password);
};

async function login(email, password) {
  const result = await fetch(`/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await result.json();
  if (data.token) {
    window.location.pathname = "/";
  }
  if (!result.ok) {
    document.getElementById("login-error").innerHTML = data.error;
  }
}
