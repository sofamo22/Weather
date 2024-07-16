let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let search = document.getElementById('search')
async function countrySearch(country) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${country}&days=3`)
    let response = await data.json();
    console.log(response)


    display(response);
}
search.addEventListener('input', function () {
    countrySearch(search.value)
})
countrySearch('cairo');
async function display(data) {
    let current = data.current
    let location = data.location
    let forecasat = data.forecast.forecastday
    let currentDay = new Date(current.last_updated.replace(" ", "T"))
    let box = ``
    box = `
                 <div class="col-lg-4  ">
                    <div class="day d-flex justify-content-between data-header px-2 ">
                        <h5>${days[currentDay.getDay()]}</h5>
                        <h5>${currentDay.getDate() + months[currentDay.getMonth()]}</h5>
                    </div>
                    <div class="info d-flex flex-column gap-1 px-3 py-3 ">
                        <h4>${location.name}</h4>
                        <h1>${current.temp_c}<sup>o</sup>C</h1>
<img src="https:${current.condition.icon}" alt="" width=90> 
                        <h5 class='cond-text'>${current.condition.text}</h5>
                        <div class="data d-flex gap-4">
                            <div class="d-flex">
                                <img width='21px' height='21px' src="./imgs/icon-umberella.png" alt="umbrella" class='me-1'>
                                <h5>${current.wind_degree}%</h5>
                            </div>
                            <div class="d-flex">
                                <img width='21px' height='21px' src="./imgs/icon-wind.png" alt="winds" class='me-1'>
                                <h5>${current.wind_kph}km/h</h5>
                            </div>
                            <div class="d-flex">
                                <img width='21px' height='21px' src="./imgs/icon-compass.png" alt="compass" class='me-1'>
                                <h5>${current.wind_dir}</h5>
                            </div>
                        </div>
                    </div>
                </div>
   
    
    
    `
    for (let i = 1; i < forecasat.length; i++) {

        currentDay = new Date(forecasat[i].date.replace(" ", "T"))
        box += `
      <div class="col-lg-4 forecast ">
                    <div class="day d-flex justify-content-center data-header ">
                        <h5>${days[currentDay.getDay()]}</h5>
                    </div>
                    <div class="info d-flex flex-column gap-4 align-items-center">
<img src="https:${forecasat[i].day.condition.icon}" alt="" width=90> 
                    <h2 class='max'>${forecasat[i].day.maxtemp_c}<sup>o</sup>C</h2>
                        <h2 class='min'>${forecasat[i].day.mintemp_c}<sup>o</sup>C</h2>
                        <h5 class='cond-text'>${forecasat[i].day.condition.text}</h5>
                    </div>
                </div> 
        
    
    `
        console.log(days[currentDay.getDay()])
    }

    document.getElementById('rowBody').innerHTML = box;

}
