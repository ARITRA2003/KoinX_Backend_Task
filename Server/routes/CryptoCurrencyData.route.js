import express from "express"
import {query} from "express-validator"
import * as CryptoDataController from "../controllers/CryptoCurrencyData.controller.js"

const router = express.Router();

//Task - 2
router.get('/stats',
    [
        // checking if 'coin' param is string as well as falls in the required catagory 
        query('coin').isString().withMessage('Not a string').isIn(["bitcoin","matic-network", "ethereum"]).withMessage('Not a valid Coin Type')
    ],
    CryptoDataController.CryptoDataStats
);

//Task - 3
router.get('/deviation',
    [
        // checking if 'coin' param is string as well as falls in the required catagory 
        query('coin').isString().withMessage('Not a string').isIn(["bitcoin","matic-network", "ethereum"]).withMessage('Not a valid Coin Type')
    ],
    CryptoDataController.CryptoDataDeviation
);

export default router;