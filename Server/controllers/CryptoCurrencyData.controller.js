import { validationResult } from "express-validator";
import CryptoCurrencyDataModel from "../models/CryptoCurrencyData.model.js"
import { calculateStandardDeviation } from "../services/CalculateStandardDeviation.js";

//Task - 2
export const CryptoDataStats = async(req, res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'coin query parameter is required.'});
    }

    const {coin} = req.query;

    try {
        const latestData = await CryptoCurrencyDataModel.findOne({ coin }).sort({ createdAt: -1 });
        
        if (!latestData) {
          return res.status(404).json({ error: 'No data found for the requested cryptocurrency.' });
        }
    
        res.status(200).json(latestData);
      } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

//Task - 3
export const CryptoDataDeviation = async(req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'coin query parameter is required.'});
  }

  const {coin} = req.query;

  try {
    // Fetch available records, up to 100
    const records = await CryptoCurrencyDataModel.find({ coin })
      .sort({ createdAt: -1 })
      .limit(100)
      .select('price -_id');

    const prices = records.map(record => record.price);

    const standardDeviation =await calculateStandardDeviation(prices);

    res.status(200).json({
      coin,
      dataCount: prices.length,
      standardDeviation: standardDeviation.toFixed(2), // Round to 2 decimals
    });
  } catch (error) {
    console.error('Error calculating standard deviation:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}