console.log("password.js loaded");

const passwordInput = document.getElementById("password-input");
const btnPassword = document.getElementById("btn-password");

// ссылка "Установить пароль"
const setPasswordLink = document.querySelector(".set-password-link");

passwordInput.addEventListener("input", () => {
  console.log("input:", passwordInput.value);

  if (passwordInput.value.trim().length >= 4) {
    btnPassword.disabled = false;
    btnPassword.classList.remove("disabled");
    console.log("button enabled");
  } else {
    btnPassword.disabled = true;
    btnPassword.classList.add("disabled");
    console.log("button disabled");
  }
});

// Переход на страницу загрузки
btnPassword.onclick = () => {
  fetch("/save-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: passwordInput.value })
  });

  window.location.href = "loading.html";
};

// Переход на страницу инструкции по установке пароля
setPasswordLink.onclick = () => {
  window.location.href = "setpassword.html";
};
