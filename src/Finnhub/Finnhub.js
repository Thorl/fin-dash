import apiKey from "./APIKey";

const getStockSymbols = async (searchQuery) => {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/search?q=${searchQuery}&token=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    const loadedStocks = [...data.result];

    return loadedStocks;
  } catch (error) {
    console.log(error.message);
  }
};

export default getStockSymbols;
