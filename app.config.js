module.exports = {
  name: "MyApp",
  version: "1.0.0",
  extra: {
    apiUrl: process.env.API_URL,
    weatherApiUrl: process.env.WEATHER_API_URL,
    weatherApiKey: process.env.WEATHER_API_KEY,
  },
};
