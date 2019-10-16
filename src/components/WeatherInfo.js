import React from 'react';

const URL = 'https://api.openweathermap.org/data/2.5/weather?q=394000&&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial';

class WeatherInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            degreesF: 0,
            degreesC: 0,
            message: '',
            isLoaded: false,
        }
        this.convertFahrenheitToCelsius = this.convertFahrenheitToCelsius.bind(this);
        this.setMessage = this.setMessage.bind(this);
    }
    componentDidMount() {
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({
                degreesF: json.main.temp,
                degreesC: this.convertFahrenheitToCelsius(json.main.temp).toFixed(1),
                isLoaded: true,
            })
        })//.then(this.setState({ message: this.setMessage(this.state.degreesC) }))
    }

    convertFahrenheitToCelsius(tempF) {
        return (tempF - 32) / 1.8
    }

    setMessage(temp) {
        if (temp >= 18) {
            return "Погодка летняя, скорей сюда!"
        }
        if (temp >= 13 && temp < 18) {
            return "Одевайтесь и скорей сюда!"
        }
        if (temp >= 0 && temp < 13) {
            return "Одевайтесь тепло и скорей сюда!"
        }
        if (temp < 0) {
            return "Приходите, разведем костёр!"
        }
    }


    render() {
        this.state.message = this.state.isLoaded ? this.setMessage(this.state.degreesC) : 'загрузка...';
        return (
            <div className="showWeather">
                <h1>Стоит ли нам пойти на банк?</h1>
                <p>В данный момент на банке {this.state.degreesC} &#8451;</p>
                <p className="message">{this.state.message}</p>

            </div >
        )
    }
}

export default WeatherInfo;