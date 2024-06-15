import React, { useState } from 'react'
import axios from 'axios'

function App() {
	const [data, setData] = useState({})
	const [location, setLocation] = useState('')

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=d5a5c95bfdbbaf5eade4db93c367d0f4`

	const searchLocation = event => {
		if (event.key === 'Enter') {
			axios.get(url).then(response => {
				setData(response.data)
				console.log(response.data)
			})
			setLocation('')
		}
	}

	return (
		<div className='app'>
			<div className='search'>
				<input
					value={location}
					onChange={event => setLocation(event.target.value)}
					onKeyPress={searchLocation}
					placeholder='Введите название города'
					type='text'
				/>
			</div>
			<div className='container'>
				<div className='top'>
					<div>
						<div className='location'>
							<p>{data.name}</p>
						</div>
						<div className='temp'>
							{data.main ? (
								<h1>
									{Math.round(
										data.main.feels_like.toFixed() -
											32 / 2 +
											0.1 * data.main.feels_like.toFixed() -
											32
									)}
									°C
								</h1>
							) : null}
						</div>
					</div>
					<div className='description'>
						{data.weather ? <p>{data.weather[0].main}</p> : null}
					</div>
				</div>

				{data.name !== undefined && (
					<div className='bottom'>
						<div className='feels'>
							<p>Ощущается как</p>
							{data.main ? (
								<p className='bold'>
									{Math.round(
										data.main.feels_like.toFixed() -
											32 / 2 +
											0.1 * data.main.feels_like.toFixed() -
											32
									)}
									°C
								</p>
							) : null}
						</div>
						<div className='humidity'>
							<p>Влажность</p>
							{data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
						</div>
						<div className='wind'>
							<p>Скоротсь ветра</p>
							{data.wind ? (
								<p className='bold'>{data.wind.speed.toFixed()} MPH</p>
							) : null}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default App
