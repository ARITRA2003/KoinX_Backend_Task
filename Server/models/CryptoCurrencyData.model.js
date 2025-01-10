import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
    coin: {
        type: String,
        required: true,
        enum: ["bitcoin", "matic-network", "ethereum"]
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
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 86400,
        select:false
    }
});

const CryptoCurrencyDataModel = mongoose.model('CryptoCurrencyData', cryptoSchema);

export default CryptoCurrencyDataModel;
