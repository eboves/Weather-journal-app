// API
const APIKEY = "fd352e264fc2d5f2e5fd6feb8d3943df";
const unit = "imperial";

// Declaration api data
const btnGetData = document.getElementById("get-data");
const zipCode = document.getElementById("zip-code");
const zipCodePlace = document.getElementById("zipCodePlace");
const temp = document.getElementById("temp");
const desc = document.getElementById("description");
// Feeling Textarea
const feelings = getElementById("feelings");
// Generate
const btnGenerate = document.getElementById("btnGenerate");

//////////////// GETTING DATA FROM API ////////////////

// This is a event that triggers when the user get the weather based on the zip code
// btnGetData.addEventListener("click", () => {
//   let querry = zipCode.value;
//   const endpoint = new URL(
//     `https://api.openweathermap.org/data/2.5/weather?zip=${querry}&appid=${APIKEY}&units=${unit}`
//   );

//   postData(endpoint);
// });

// This function is an async function that takes an URL as a parameter
// and fetch the data using await
// const postData = async (URL) => {
//   const response = await fetch(URL);
//   try {
//     const data = await response.json();
//     console.log(data);
//     updataUI(data);
//   } catch (error) {
//     console.log("Error: ", error);
//   }
// };

// This code do another async to update the dummies values with the value from the fetch
// we requested on postData.
// const updataUI = async (data) => {
//   const place = data.name;
//   const temperature = Math.trunc(data.main.temp);
//   const description = data.weather[0].description;
//   zipCodePlace.textContent = place;
//   temp.textContent = temperature;
//   desc.textContent = description;
// };

//////////////// GETTING DATA FROM FEELING BOX ////////////////

//////////////// POSTING DATA ON MOST RECENT ////////////////
btnGenerate.addEventListener("click", postToMostRecent);

function postToMostRecent() {
  console.log("I was clicked");
}

const postDataFeelings = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

postData("/addMovie", { movie: "Constantine", score: 5 });
