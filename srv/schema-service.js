const cds = require("@sap/cds");
const axios = require('axios');

module.exports = cds.service.impl(async function () {
    const { Coins } = this.entities;
    try {
        console.log("-------------> trying to get Coins...");

        const getCoins = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false')

        const coinsList = getCoins.data;
        console.log("-------------> got the Coins");

        try {
            console.log("-------------> trying to insert into Coins entity...");
            for (let i = 0; i < coinsList.length; i++) {
                await cds.run(INSERT.into(Coins).entries(
                    {
                        id: coinsList[i].id,
                        symbol: coinsList[i].symbol,
                        name: coinsList[i].name,
                        high_price_last_24h: coinsList[i].high_24h,
                        low_price_last_24h: coinsList[i].low_24h
                    }
                ))
            }
            console.log("-------------> inserted into Coins entity...");

        } catch (err) { console.error("------------> error inserting into Coins entity", err) }

    } catch (err) { console.error("------------> error accesing API") }
});
