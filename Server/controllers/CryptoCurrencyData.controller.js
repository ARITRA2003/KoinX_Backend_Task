import { validationResult } from "express-validator";
import CryptoCurrencyDataModel from "../models/CryptoCurrencyData.model.js"

//Task - 2
export const CryptoData = async(req, res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'coin query parameter is required.'});
    }

    const {coin} = req.query;

    try {
        const latestData = await CryptoCurrencyDataModel.findOne({ coin }).sort({ timestamp: -1 });
        
        if (!latestData) {
          return res.status(404).json({ error: 'No data found for the requested cryptocurrency.' });
        }
    
        res.status(200).json(latestData);
      } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}