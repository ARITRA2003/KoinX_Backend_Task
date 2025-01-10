import axios from "axios"

//Task - 1
export const  fetchCryptoData = async()=>{
  const url = process.env.COINGECKO_API;
  // console.log(url);
  const params = {
    vs_currency: 'usd',
    ids: 'bitcoin,matic-network,ethereum',
  };

  try {
    const response = await axios.get(url, { params });
    return response.data.map(coin => ({
      coin: coin.id,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
    }));
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    return [];
  }
}

