import cron  from 'node-cron'
import CryptoCurrencyDataModel from "../models/CryptoCurrencyData.model.js"
import {fetchCryptoData} from "../services/FetchCryptoData.js"

// Schedule the job to run every 2 hours
cron.schedule('* */2 * * *', async () => {
  console.log('Running background job to fetch cryptocurrency data...');
  const data = await fetchCryptoData();

  try {
    if (data.length > 0) {
      // Store the fetched data in the database
      await CryptoCurrencyDataModel.insertMany(data);
      console.log('Crypto data updated successfully.');
    } else {
      console.warn('No data fetched from CoinGecko.');
    }
  } catch (error) {
    console.error('Error saving data to database:', error);
  }
});
