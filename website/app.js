// API
const APIKEY = "fd352e264fc2d5f2e5fd6feb8d3943df";
const unit = "imperial";

const btnGetData = document.getElementById("get-data");
const zipCode = document.getElementById("zip-code");
const zipCodePlace = document.getElementById("zipCodePlace");
const temp = document.getElementById("temp");
const desc = document.getElementById("description");

let journalContent = document.getElementById("journalContent");
const btnGenerate = document.getElementById("btnGenerate");

const projectData = {};

btnGetData.addEventListener("click", () => {
  let querry = zipCode.value;
  const endpoint = new URL(
    `https://api.openweathermap.org/data/2.5/weather?zip=${querry}&appid=${APIKEY}&units=${unit}`
  );

  postDataWeather(endpoint);
});

// This function is an async function that takes an URL as a parameter
// and fetch the data using await
const postDataWeather = async (URL) => {
  const response = await fetch(URL);
  try {
    const data = await response.json();
    console.log(data);
    updateUIWeather(data);
  } catch (error) {
    console.log("Error: ", error);
  }
};

// This code do another async to update the dummies values with the value from the fetch
// we requested on postData.
const updateUIWeather = async (data) => {
  const place = data.name;
  const temperature = Math.trunc(data.main.temp);
  const description = data.weather[0].description;
  zipCodePlace.textContent = place;
  temp.textContent = temperature;
  desc.textContent = description;
  // Data added to the object going to server
  projectData.temp = temperature;
  projectData.desc = description;
};

const postData = async (url = "", data = {}) => {
  console.log("sent: ", data);

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log("new Data: ", newData);
    updateUI(newData);
    // return newData;
  } catch (error) {
    console.log("error", error);
  }
};
const recentUl = document.querySelector("recent-ul");
const updateUI = async (newData) => {
  document.getElementById("newFeeling").textContent = newData.feeling;
  document.getElementById("newTemp").textContent = newData.temp;
  document.getElementById("newDate").textContent = newData.date;
};

const getTodaysDate = function () {
  // this creates a new instance of Date
  const today = new Date();

  const [month, day, year] = [
    today.getMonth() + 1,
    today.getDate(),
    today.getFullYear(),
  ];
  const todayDate = `${month}/${day}/${year}`;

  projectData.date = todayDate;
};

btnGenerate.addEventListener("click", function () {
  let feeling = journalContent.value;
  projectData.feeling = feeling;
  getTodaysDate();
  console.log("projectData: ", projectData);
  postData("/add", projectData);
});

// // create li
// const newLi = document.createElement("li");
// newLi.classList.add("most-recent-li");
// recentUl.appendChild(newLi);

// // create div
// const MRliDiv = document.createElement("div");
// MRliDiv.classList.add("most-recent-li-info flex");
// newLi.appendChild(MRliDiv);
// // cretae p feeling
// const pFeeling = document.createElement("p");
// pFeeling.classList.add("feeling");
// pFeeling.setAttribute("id", "newFeeling");
// pFeeling.textContent = newData.feeling;
// MRliDiv.appendChild(pFeeling);

// // crete data-info div
// const dataInfoDiv = document.createElement("div");
// dataInfoDiv.classList.add("data-info");
// newLi.appendChild(dataInfoDiv);

// // crete img-container div
// const imgDiv = document.createElement("div");
// imgDiv.classList.add("img-container-li");
// dataInfoDiv.appendChild(imgDiv);

// // create p img
// const pImg = document.createElement("p");
// pImg.classList.add("img");
// pImg.innerHTML = '<i class="icon-sm fa-solid fa-sun"></i>';

// // create temp div
// const tempDiv = document.createElement("div");
// tempDiv.classList.add("temperature-li flex");
// dataInfoDiv.appendChild(tempDiv);

// // create p temp
// const pTemp = createElement("p");
// pTemp.classList.add("temperature-li");
// pTemp.setAttribute("id", "newTemp");
// pTemp.textContent = newData.temp;
// tempDiv.appendChild(pTemp);

// // create degree
// const pDegree = document.createElement("p");
// pDegree.classList.add("degree");
// pDegree.innerHTML = `&deg;<span class="converter">F</span>`;
// tempDiv.appendChild(pDegree);

// // create date div
// const dateDiv = document.createElement("div");
// dateDiv.classList.add("date");
// dateDiv.setAttribute("id", "newDate");
// dateDiv.textContent = newData.date;
// dataInfoDiv.appendChild(dateDiv);
