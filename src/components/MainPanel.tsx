import React, { lazy, useState } from "react";
const Sections = lazy(() => import("./Sections"));
const Main = () => {
  let localStorageCityName = localStorage.getItem("city");
  const [city, setCity] = useState<string>(localStorageCityName || "Jaipur");
  const onChangerHandler = (e: any) => {
    setCity(e.target.value);
    localStorage.setItem("city", e.target.value);
  };
  return (
    <>
        <h1 className="text-center font-semibold text-4xl py-4 font-serif">
          Weather App
        </h1>
      <main className="flex justify-center items-center">
        <input
          type="search"
          name="search"
          id="searchCity"
          value={city.toUpperCase()}
          onChange={onChangerHandler}
          placeholder="City name"
          className="bg-amber-200 placeholder:text-black px-5 w-64 py-4 rounded text-black accent-black outline-none"
        />
      </main>
      <Sections />
    </>
  );
};

export default Main;
