var app = new Vue({
    el: '#app',
    data: {
        weather: {},
        cityname: "",
        city: "",
        status: "",
        temp: 0,
        mintemp: 0,
        maxtemp: 0,
    },

    created: function () {

    },

    methods: {

        calljson: function () {
            {
                fetch("https://api.openweathermap.org/data/2.5/weather?q=" + this.cityname + "&APPID=f6b318097dd13ebe3e9ed01c8d331b49", {
                    method: "GET",

                }).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }

                }).then(function (json) {
                    app.weather = json;
                    console.log(app.weather);
                    app.city = app.weather.name;
                    app.status = app.weather.weather[0].description;
                    app.temp = app.weather.main.temp - 273, 15;
                    app.mintemp = app.weather.main.temp_min - 273, 15;
                    app.maxtemp = app.weather.main.temp_max - 273, 15;

                    app.temp = Math.round(app.temp);
                    app.mintemp = Math.round(app.mintemp);
                    app.maxtemp = Math.round(app.maxtemp);

                }).catch(function (error) {
                    console.log("Request failed: + error.message");
                });
            }
        },

        citysearch: function () {
            var cityvalue = document.getElementById("citybutton").value
            this.cityname = cityvalue;
            this.calljson();
            document.getElementById("citybutton").value= " ";
        },

    }
})
