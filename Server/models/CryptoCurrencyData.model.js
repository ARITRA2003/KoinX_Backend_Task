import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
    coin: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    change24h: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        select:false
    }
});

const CryptoCurrencyDataModel = mongoose.model('CryptoCurrencyData', cryptoSchema);

export default CryptoCurrencyDataModel;
