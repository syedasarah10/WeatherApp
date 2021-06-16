import WEATHER_API_KEY from "./apikey.js";

export const getWeather = async(id) => {
    const url = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(url + query);
    const data = await response.json();

    return data[0];
}


export const getCity = async(city) =>{
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;


    const response = await fetch(url + query);
    const data = await response.json();

    return data[0];

};




