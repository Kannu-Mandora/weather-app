import axios from "axios";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useMemo } from "react";

const Sections = () => {
  // useMemo
  let fahrenheit = useMemo(() => 1.8 + 32, []);
  let cityName: string = localStorage.getItem("city") || "Jaipur";
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [getData, setData] = useState<{ [key: string]: any }>();
  const [loader, setLoader] = useState<boolean>(false);
  const getWeather = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    let city = localStorage.getItem("city");
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          cityName || "Jaipur"
        }&appid=${API_KEY}&units=metric`
      );
      if (res.status === 200) {
        setLoader(false);
        setData(res.data);
      } else {
        alert("Something wents wrong!");
        setLoader(false);
      }
    } catch (err) {
      alert("Check your internet connection");
      setLoader(false);
    }
  };
  let kelvin: number = 273.15,
    atomicPressure: number = 0.000987,
    temp: number = getData?.main?.temp,
    clouds: number = getData?.clouds?.all,
    feels_like: number = getData?.main?.feels_like,
    pressure: number = getData?.main?.pressure * atomicPressure,
    humidity: number = getData?.main?.humidity,
    speed: number = getData?.wind?.speed,
    lon: number = getData?.coord?.lon,
    lat: number = getData?.coord?.lat,
    icon: string = getData?.weather[0]?.icon;

  return (
    <>
      <div className="flex justify-center items-center my-4">
        <button
          type="submit"
          onClick={getWeather}
          className="px-4 py-2 bg-amber-300 text-black rounded"
        >
          Check
        </button>
      </div>
      <div className="flex justify-center items-center my-10 gap-10 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <ColorRing
            visible={loader}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
        {getData ? (
          <>
          <div className="flex max-md:flex-col justify-center items-center gap-10 mx-3" >
            <section className="bg-gray-300 rounded p-5 cards">
              <div className="flex justify-evenly py-3 items-center">
                <h1 className="text-3xl font-bold">{temp.toFixed(1)}&#8451;</h1>
                <img
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  alt="weather"
                  className="scale-125 pointer-events-none"
                />
              </div>
              <div className="flex flex-col justify-evenly items-start w-72 mx-auto gap-8">
                <h2 className="text-2xl">{cityName?.toUpperCase()}</h2>
                <span>
                  <strong>Latitude:</strong> {lat}
                </span>
                <span>
                  <strong>Longitude:</strong> {lon}
                </span>
                <span>
                  <strong>Clouds:</strong> {clouds}
                </span>
              </div>
            </section>
            <section className="bg-gray-300 p-5 rounded flex flex-col justify-center items-start cards">
              <div className="flex flex-col justify-center items-start gap-8">
                <span className="font-bold text-2xl uppercase">
                  Weather : {getData.weather[0].description}
                </span>
                <span className="text-xl">
                  <strong>Feels:</strong> {feels_like.toFixed(1)}&#8451;
                </span>
                <span className="text-xl">
                  <strong>Wind Speed:</strong> {speed} KM
                </span>
                <span className="text-xl">
                  <strong>Pressure:</strong> {pressure.toFixed(2)} Atomic
                  Pressure
                </span>
                <span className="text-xl">
                  <strong>Humidity:</strong> {humidity.toFixed(2)}
                </span>
              </div>
            </section>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Sections;
