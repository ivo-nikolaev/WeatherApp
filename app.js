new Vue({
    el: '#app',
    data:{
        lookingFor: '',
        noData: false,

        show: false,

        city: '',
        country: '',
        forcast: [],
    },
    methods:{
        // GET-ing the result
        lookUp: function(){
            
            //Override latest shown data
            this.show = false;

            let city = this.lookingFor;

            //The API doen't like keeping API keys on the browser, thus we
            //Use cors-anywhere.herokuapp.com
            const cors = 'https://cors-anywhere.herokuapp.com/'
            const call = 'api.openweathermap.org/data/2.5/forecast?q='  
            const apikey = 'd7b96f47bcb28b2643d7e7e9a4a7096f' 
            fetch(cors + call + city + '&appid=' + apikey)
            .then(response => response.json())
            .then(json => this.handleData(json))
            // .then(json => console.log(json.cod))
        },
        handleData(json){

            if(json.cod !== "200"){
                this.noData = true;
                this.show = false;
            }
            else{
                this.city = json.city.name;
                this.country = json.city.country;
                console.log(json);
                this.forcast = [];
                for(let i = 1; i <= 5; i++){
                    //
                    let data = json.list[i*8 - 1];
                    let weather = {};
                    
                    weather.date = (data.dt_txt).toString().substring(0,10);
                    //conervting for Kelvins to Celsius
                    weather.temp = (data.main.temp -273.15).toFixed(2);
                    weather.humidity = (data.main.humidity);
                    weather.description = (data.weather[0].description);
                    weather.windSpeed = (data.wind.speed);
                    this.forcast.push(weather)
                }
                console.log(this.forcast);
                this.show = true;
            }
        },
        //
        showForcast(dt_text, temp_max, temp_min, decription, humidity, speed){

        }
        

    }
})

