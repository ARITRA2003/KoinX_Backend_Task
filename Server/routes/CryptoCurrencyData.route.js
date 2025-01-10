import express from "express"
import {query} from "express-validator"
import * as CryptoDataController from "../controllers/CryptoCurrencyData.controller.js"

const router = express.Router();


//Task - 2
router.get('/stats',
    [
        // checking if 'coin' param is string as well as falls in the required catagory 
        query('coin').isString().withMessage('No a string').isIn(["bitcoin","matic-network", "ethereum"]).withMessage('Not a valid Coin Type')
    ],
    CryptoDataController.CryptoData
);

export default router;