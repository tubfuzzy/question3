const axios = require('axios');
const cheerio = require("cheerio");
const myArgs = process.argv.slice(2);

async function main() {
    const result = await axios.get('https://codequiz.azurewebsites.net/', { headers: { 'Cookie': 'hasCookie=true' }})
    const $ = cheerio.load(result.data);
    const scrapedData = [];
    $("body > table > tbody > tr").each((index, element ) => {
        if (index === 0) return true;
        const tds = $(element).find("td");
        const fundName = $(tds[0]).text().trim();
        const nav = $(tds[1]).text();
        const bid = $(tds[2]).text();
        const Offer = $(tds[3]).text();
        const change = $(tds[4]).text();
        scrapedData.push({ fundName, nav, bid, Offer, change })
    });
    myArgs.forEach((arg) => {
        const result = scrapedData.find((item) => { return item.fundName === arg});
        result ? process.stdout.write(result.nav): process.stdout.write("Fund not found");
    })
}
main();