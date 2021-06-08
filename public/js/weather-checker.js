const submit_button = document.getElementById('sub_btn')
const city_name = document.getElementById('cityname')
const error = document.getElementById('error')
const temp = document.getElementById('temperature')
const temp_status = document.getElementById('temp_status')
const date_and_time = document.getElementById('date-and-time')
const city_and_country = document.getElementById('city-name')
const times = document.getElementById('time')
const min_temp = document.getElementById('min-temp')
const max_temp = document.getElementById('max-temp')
const wind_speed = document.getElementById('wind-speed')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')
const description = document.getElementById('description')
const clearBtn = document.getElementById('clearButton')

const date = new Date()

const getInfo = async(event)=>{
  
    event.preventDefault()

    const cityValue = city_name.value
    const time  = date.getMinutes()
    const hours = date.getHours()
    if(time === 1 && time === 2 || time === 3 || time === 4 || time === 5 || time === 6 || time === 7 || time === 8 || time === 9 )
    {
        const full_time = (`${hours}:0${time}`)
        times.innerText = full_time
    }
    else{
        const full_time = (`${hours}:${time}`)
        times.innerText = full_time
    }
   
    
    

    if(cityValue === ''){
        error.innerText = 'Please Enter a City Name'
    }else{
      
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=ed6a1d895f3c4e559f8fc921aed6f072`
            const jsonData = await fetch(url)
            const objData = await jsonData.json()
            const arrayData = [objData]
            console.log(arrayData)
            temp.innerText = arrayData[0].main.temp
            let temp_svg = arrayData[0].weather[0].main
            console.log(temp_svg)
            const country_and_city = `${arrayData[0].name},${arrayData[0].sys.country}`
            city_and_country.innerText = country_and_city
            
             
            if(temp_svg === 'Clouds')
            {
                temp_status.innerHTML =  '<i class="fas fa-cloud" style="coloe:red"></i>'
            }
           
            else if(temp_svg === 'Clear'){
                temp_status.innerHTML = '<i class="fas fa-sun"></i>'
            }
             else if(temp_svg === 'Haze')
             {
                 temp_status.innerHTML = '<i class="fas fa-smog"></i>'
             }
             
             min_temp.innerText = arrayData[0].main.temp_min
             max_temp.innerText = arrayData[0].main.temp_max
             wind_speed.innerText = arrayData[0].wind.speed
             pressure.innerText = arrayData[0].main.pressure
             humidity.innerText = arrayData[0].main.humidity
             description.innerText = arrayData[0].weather[0].description



           completeDate()
           clearFun()
            

            
        }
        catch(err){
            error.innerText = 'Please Enter a valid City Name'
        }
     }
        
    
}

const completeDate = ()=>{
    const dayNames = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat']
    const name_of_day = dayNames[date.getDay()]
 

    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const name_of_month = monthNames[date.getMonth()]
  

    const year = date.getFullYear()
 

    const fulldate = `${date.getDate()}-${name_of_day} | ${name_of_month} | ${year}`

    

    if(date.getDate() === 1)
    {
        const fulldate = `${name_of_day}-${date.getDate()}st | ${name_of_month} | ${year}`
        date_and_time.innerText = fulldate
    }
    else if(date.getDate() === 2)
    {
        const fulldate = `${name_of_day}-${date.getDate()}nd | ${name_of_month} | ${year}`
        date_and_time.innerText = fulldate
    }
    else{
        const fulldate = `${name_of_day}-${date.getDate()}th | ${name_of_month} | ${year}`
        date_and_time.innerText = fulldate
    }
    


}

const clearFun = ()=>{
    error.innerText = ''
}

const clearData = ()=>{
    min_temp.innerText = '0'
    max_temp.innerText = '0'
    wind_speed.innerText = '0'
    pressure.innerText = '0'
    humidity.innerText = '0'
    description.innerText ='' 
}
submit_button.addEventListener('click',getInfo)
clearBtn.addEventListener('click',clearData)

