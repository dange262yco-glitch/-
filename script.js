// ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
const screenPhone = document.getElementById("screen-phone");
const screenPassword = document.getElementById("screen-password");
const screenLoading = document.getElementById("screen-loading");

// КНОПКИ
const btnPhone = document.getElementById("btn-phone");
const btnPassword = document.getElementById("btn-password");

// ПОЛЯ
const phoneInput = document.getElementById("phone-input");
const passwordInput = document.getElementById("password-input");

// СТРАНЫ
const countrySelector = document.getElementById("country-selector");
const countryModal = document.getElementById("country-modal");
const countryList = document.getElementById("country-list");
const countrySearch = document.getElementById("country-search");

const countryName = document.getElementById("country-name");
const countryFlag = document.getElementById("country-flag");
const phoneCode = document.getElementById("phone-code");


// ================== ЗАГРУЗКА СТРАН ИЗ JSON ==================
async function loadCountries(filter = "") {
  const res = await fetch("countries.json");
  const data = await res.json();

  countryList.innerHTML = "";

  data
    .filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((c) => {
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


// ================== ОТКРЫТИЕ МОДАЛКИ ==================
countrySelector.onclick = () => {
  countryModal.classList.remove("hidden");
  loadCountries();
};

countrySearch.oninput = () => loadCountries(countrySearch.value);


// ================== ЛОГИКА ЭКРАНА ТЕЛЕФОНА ==================
phoneInput.oninput = () => {
  if (phoneInput.value.trim().length > 3) {
    btnPhone.classList.remove("disabled");
    btnPhone.disabled = false;
  } else {
    btnPhone.classList.add("disabled");
    btnPhone.disabled = true;
  }
};

btnPhone.onclick = () => {
  screenPhone.classList.add("hidden");
  screenPassword.classList.remove("hidden");
};


// ================== ЛОГИКА ПАРОЛЯ ==================
passwordInput.oninput = () => {
  if (passwordInput.value.trim().length > 0) {
    btnPassword.classList.remove("disabled");
    btnPassword.disabled = false;
  } else {
    btnPassword.classList.add("disabled");
    btnPassword.disabled = true;
  }
};

btnPassword.onclick = () => {
  screenPassword.classList.add("hidden");
  screenLoading.classList.remove("hidden");
};
