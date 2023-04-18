const getData = require("../requests/getData");
const puppeteer = require("puppeteer")

const getQuotes = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the website
    await page.goto('https://saucerswap.finance/');

    // Wait for the Tokens section to load
    await page.waitForSelector(".MuiTable-root");

    // Get the Tokens section HTML content
    const tokensHtml = await page.$eval(".MuiTable-root", (el) => el.innerHTML);

    // Log the Tokens section HTML content
    console.log(tokensHtml);

    await browser.close();

    return tokensHtml;
};


async function getDashboardData() {
    var priceChangeData = await getData("https://api.saucerswap.finance/tokens/price-change");
    var nftData = await getData("https://api.saucerswap.finance/tokens");
    var newNFTData = {}
    nftData.forEach(element => {
        newNFTData[element.id] = element
    });
    // const sortedNFTData = Object.entries(nftData)
    //     .sort((a, b) => b[1].priceUsd - a[1].priceUsd)
    const priceChangeDataSorted = Object.entries(priceChangeData)
        .sort((a, b) => b[1] - a[1])
    let priceChangeDataSortedHash = {};

    priceChangeDataSorted.forEach(([key, value]) => {
        priceChangeDataSortedHash[key] = value;
    });
    console.log(Object.keys(newNFTData))

    // Start the scraping
    // await getQuotes();

    return {
        title: 'Dashboard',
        page_title: 'Dashboard',
        folder: 'Dashboards',
        nftData: newNFTData,
        priceChangeData: priceChangeDataSortedHash,
        // sortedNFTData: sortedNFTData
    };
}


module.exports = { getDashboardData, getQuotes };