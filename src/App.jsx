import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import Trip from "./components/Trip";
import Weather from "./components/Weather";
import axios from "axios";

function App() {
  const containerStyle = {
    backgroundImage: "url(/Images/bg1.jpeg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // width: "100vw",
    // height: "100vh",
  };
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const option = {
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  const [data, setData] = useState({
    celcius: "",
    name: "",
    humidity: "",
    speed: "",
    image: "",
  });
  const [error, setError] = useState("");

  const doStuff = async () => {
    let object = { ...option, prompt: "give me a plan for trip in" + input };

    const response = await openai.createCompletion(object);
    setResult(
      "Here is our plan to " + input + ":" + response.data.choices[0].text
    );
    // result = "Here is our plan to " + { input } + ":\n" + result;
    if (input !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=09e82984190d375192a7cf15c0aff453&&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagepath = "";
          if (res.data.weather[0].main == "Clear") {
            imagepath = "/Images/clear.png";
          } else if (res.data.weather[0].main == "Rain") {
            imagepath = "/Images/rain.png";
          } else if (res.data.weather[0].main == "Drizzle") {
            imagepath = "/Images/drizzle.png";
          } else {
            imagepath = "/Images/clouds.png";
          }
          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagepath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setError("Invalid city name ");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div style={containerStyle}>
        <h1>Welcome to TripPlanner</h1>
        <p>
          Lets plan your trip with us, just enter the city you want to get trip
          in here:
        </p>
      </div>
      <div className="body">
        <Trip
          doStuff={doStuff}
          input={input}
          setInput={setInput}
          result={result}
        />
        {result && <Weather error={error} data={data} />}
      </div>
    </div>
  );
}

export default App;
