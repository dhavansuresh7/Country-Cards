'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  console.log(data)
  const countryHtml = `<article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row">
          <span>👫</span>${data.population}
        </p>
        <p class="country__row">
          <span>🗣️</span>${data.languages[0].name}
        </p>
        <p class="country__row">
          <span>💰</span>${data.currencies[0].name}
        </p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', countryHtml);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (name) {
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v2/name/${name}`);

//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     renderCountry(data);

//     const request2 = new XMLHttpRequest();
//     const [neighbour] = data.borders
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);

//     request2.send();

//     request2.addEventListener('load',function(){
//         const data2 = JSON.parse(this.responseText)
//         renderCountry(data2, "neighbour")
//     })
//   });
// };

// getCountryAndNeighbour('bharat');

const getCountryAndNeighbour = fetch(`https://restcountries.com/v2/name/usa`)
  .then(response => response.json())
  .then(data => {
    const [dataObj] = data;
    renderCountry(dataObj);
    return fetch(`https://restcountries.com/v2/alpha/${dataObj.borders[0]}`);
  })
  .then(response => response.json())
  .then(data => 
    renderCountry(data,"neighbour"));
