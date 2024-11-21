# weather-app

1. Introduction:

This Weather App offers real-time weather updates using React.js and Tailwind CSS. Users can search for locations and view details like temperature, humidity, and weather conditions. The app integrates the OpenWeatherMap API for accurate data.

2. Features:

* Search for weather updates by city name.
* Display of temperature, humidity, and weather conditions.
* Toggle between Celsius and Fahrenheit.
* Responsive design using Tailwind CSS.

3. Tech Stack:

* Frontend: React.js, Tailwind CSS
* API: OpenWeatherMap API
* State Management: React Hooks (e.g., useState, useEffect)
* Styling: Tailwind CSS

4. Setup Instructions

# Clone the repository
git clone https://github.com/TamizhSen/weather-app.git

# Navigate into the project directory
cd weather-app

# Install dependencies
npm install

# Run the app
npm start / npm run dev



# Code Explanation with Purpose and Decision-Making

1. CitySelector.jsx

- What it does:

* Provides a dropdown menu for city selection using a predefined list of cities.
* Fetches current weather data for the selected city using the OpenWeatherMap API.
* Passes the fetched weather data to the parent component for display.

- Why it was coded this way:

* Predefined City List: Improves UX by limiting the scope to frequently accessed cities. It avoids unnecessary API calls for city search.
* Material-UI Integration: Ensures a polished and consistent look for the dropdown.
* State Management: Keeps selected city and weather data in sync across components using props like setSelectedCity and setWeatherData.

2. CurrentWeather.jsx

- What it does:

* Fetches and displays current weather information (temperature, weather description, wind speed) for the selected city.

- Why it was coded this way:

* UseEffect Dependency: Automatically fetches new weather data when the city changes, ensuring real-time updates.
* User Feedback: Displays a fallback message ("Please select a city") when no city is selected, improving UX.

3. Forecast.jsx

- What it does:

* Fetches a 5-day weather forecast for the selected city.
* Displays forecast data in a tabular format, grouped by date.

- Why it was coded this way:

* Button-Based Date Navigation: Enhances UX by letting users quickly toggle between dates.
* Modularization: Uses a dedicated DataTable component to handle table rendering, adhering to single-responsibility principles.