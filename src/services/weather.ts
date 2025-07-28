'use server';

/**
 * @fileOverview A mock weather service to provide sample data for flood risk analysis.
 */

export interface WeatherData {
  rainfall: number; // in mm
  temperature: number; // in Celsius
  humidity: number; // in percentage
  windSpeed: number; // in km/h
  windDirection: string;
}

// This is a mock service. In a real application, you would fetch this data from a weather API.
const mockWeatherData: { [key: string]: WeatherData } = {
  chatsworth: {
    rainfall: 120,
    temperature: 23,
    humidity: 92,
    windSpeed: 25,
    windDirection: 'NE',
  },
  pinetown: {
    rainfall: 85,
    temperature: 24,
    humidity: 90,
    windSpeed: 15,
    windDirection: 'E',
  },
  umhlanga: {
    rainfall: 45,
    temperature: 26,
    humidity: 85,
    windSpeed: 20,
    windDirection: 'S',
  },
  umlazi: {
    rainfall: 150,
    temperature: 22,
    humidity: 95,
    windSpeed: 30,
    windDirection: 'N',
  },
  durban_central: {
      rainfall: 60,
      temperature: 25,
      humidity: 88,
      windSpeed: 18,
      windDirection: 'SE',
  },
};

export async function getRealTimeWeather(area: string): Promise<WeatherData> {
  console.log(`Fetching weather for area: ${area}`);
  const areaKey = area.toLowerCase().replace(/\s+/g, '_');
  const data = mockWeatherData[areaKey] || mockWeatherData['durban_central'];

  // Add some randomness to the mock data to make it feel more dynamic
  data.rainfall += Math.floor(Math.random() * 20) - 10;
  data.temperature += Math.floor(Math.random() * 4) - 2;

  console.log('Returning mock weather data:', data);
  return data;
}
