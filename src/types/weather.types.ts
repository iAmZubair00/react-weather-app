export interface IWeatherResponse {
	dt: number
	weather: [{
		main: string
		icon: string
	}]
	main: {
		temp: number
		humidity: number
		pressure: number
	}
	name: string
	wind: {
		deg: number
		speed: number
	}
	visibility: number
}

export interface IForecastItemResp {
	dt_txt: string
	dt: number
	main: {
		temp_min: number
		temp_max: number
	}
	weather: [{
		icon: string
	}]
}

export interface IForecastResponse {
	list: IForecastItemResp[]
}

export type ILocation = string | {lat: number, long: number}

export interface IWeather {
	dateToday: Date,
	weatherState: string,
	temp: number,
	iconPath: string,
	location: string,
	windDirectionAngle: number,
	windSpeed: number,
	windDirection: string,
	visibility: number,
	humidity: number,
	airPressure: number,
	forecastData: IForecastItemResp[],
}

export interface IForecast {
	dateToday: Date,
	minTemp: number,
	maxTemp: number,
	iconPath: string,
}