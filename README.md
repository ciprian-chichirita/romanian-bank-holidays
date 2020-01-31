# romanian-bank-holidays
## use this api to get a list of romanian bank holidays
### API URL: https://us-central1-romanian-bank-holidays.cloudfunctions.net/romanian_bank_holidays/

- romanian bank holidays, RO: zile libere de la stat
- query param: `?year=DEFAULT_CURRENT_YEAR`

```js
//usage example:
function fetchJSON(url, cacheBuster) {
  cacheBuster = cacheBuster ? `ts=${cacheBuster}` : '';
  url = url.concat(url.indexOf("?") !== -1 ? "&" : "?", cacheBuster);
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
  })
    .then((response) => {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })
    .then(response => response.json())
    .catch((error) => {
      throw new Error(`fetchJSON error: ${error}`);
    });
}

//get romanian bank holidays for year 2020
const url = "https://us-central1-romanian-bank-holidays.cloudfunctions.net/romanian_bank_holidays/?year=2020";
fetchJSON(url).then((bankHolidays) => console.log("romanian bank holidays: ", bankHolidays));

//response
/*
[
   {
      "name":"Anul nou",
      "date":"01/01/2020"
   },
   {
      "name":"Anul nou",
      "date":"02/01/2020"
   },
   {
      "name":"Ziua Unirii Principatelor Române",
      "date":"24/01/2020"
   },
   {
      "name":"Vinerea Mare",
      "date":"17/04/2020"
   },
   {
      "name":"Paște ortodox",
      "date":"19/04/2020"
   },
   {
      "name":"Paște ortodox",
      "date":"20/04/2020"
   },
   {
      "name":"Ziua Muncii",
      "date":"01/05/2020"
   },
   {
      "name":"Ziua Copilului",
      "date":"01/06/2020"
   },
   {
      "name":"Rusalii",
      "date":"07/06/2020"
   },
   {
      "name":"A doua zi de Rusalii",
      "date":"08/06/2020"
   },
   {
      "name":"Adormirea Maicii Domnului",
      "date":"15/08/2020"
   },
   {
      "name":"Sfântul Andrei",
      "date":"30/11/2020"
   },
   {
      "name":"Ziua Națională a României",
      "date":"01/12/2020"
   },
   {
      "name":"Crăciunul",
      "date":"25/12/2020"
   },
   {
      "name":"Crăciunul",
      "date":"26/12/2020"
   }
]
*/

```