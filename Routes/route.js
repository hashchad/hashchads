const express = require('express');
const getData = require('../requests/getData');
const route = express.Router();


// axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwt')


// route.get('/', (req, res, next) => {
//     res.render('index', { title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards' });
// })
route.get('/', async (req, res, next) => {
    var nftData = await getData("https://api.saucerswap.finance/tokens");
    console.log(nftData)
    res.render('dashboard-crypto', { title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards', nftData: nftData });
})
route.get('/index', (req, res, next) => {
    res.render('index', { title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards' });
})
route.get('/dashboard-crypto', (req, res, next) => {
    res.render('dashboard-crypto', { title: 'Crypto', page_title: 'Crypto', folder: 'Dashboards' });
})
route.get('/dashboard-nft', (req, res, next) => {
    res.render('dashboard-nft', { title: 'NFT Dashboard', page_title: 'NFT Dashboard', folder: 'Dashboards' });
})

route.get('/apps-crypto-transactions', (req, res, next) => {
    res.render('apps-crypto-transactions', { title: 'Transactions', page_title: 'Transactions', folder: 'Crypto' });
})
route.get('/apps-crypto-buy-sell', (req, res, next) => {
    res.render('apps-crypto-buy-sell', { title: 'Buy & Sell', page_title: 'Buy & Sell', folder: 'Crypto' });
})

// https://api.saucerswap.finance/tokens

route.get('/apps-crypto-orders', (req, res, next) => {
    res.render('apps-crypto-orders', { title: 'Orders', page_title: 'Orders', folder: 'Crypto' });
})
route.get('/apps-crypto-wallet', (req, res, next) => {
    res.render('apps-crypto-wallet', { title: 'My Wallets', page_title: 'My Wallets', folder: 'Crypto' });
})
route.get('/apps-crypto-ico', (req, res, next) => {
    res.render('apps-crypto-ico', { title: 'ICO List', page_title: 'ICO List', folder: 'Crypto' });
})
route.get('/apps-crypto-kyc', (req, res, next) => {
    res.render('apps-crypto-kyc', { title: 'KYC Application', page_title: 'KYC Application', folder: 'Crypto' });
})

// NFT Market Place
route.get('/apps-nft-marketplace', (req, res, next) => {
    res.render('apps-nft-marketplace', { title: 'Marketplace', page_title: 'Marketplace', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-explore', (req, res, next) => {
    res.render('apps-nft-explore', { title: 'Explore Now', page_title: 'Explore Now', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-auction', (req, res, next) => {
    res.render('apps-nft-auction', { title: 'Live Auction', page_title: 'Live Auction', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-item-details', (req, res, next) => {
    res.render('apps-nft-item-details', { title: 'Item Details', page_title: 'Item Details', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-collections', (req, res, next) => {
    res.render('apps-nft-collections', { title: 'Collections', page_title: 'Collections', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-creators', (req, res, next) => {
    res.render('apps-nft-creators', { title: 'Creators', page_title: 'Creators', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-ranking', (req, res, next) => {
    res.render('apps-nft-ranking', { title: 'Ranking', page_title: 'Ranking', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-wallet', (req, res, next) => {
    res.render('apps-nft-wallet', { title: 'Wallet Connect', page_title: 'Wallet Connect', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-create', (req, res, next) => {
    res.render('apps-nft-create', { title: 'Create NFT', page_title: 'Create NFT', folder: 'NFT Marketplace' });
})

route.get('/apps-file-manager', (req, res, next) => {
    res.render('apps-file-manager', { layout: 'layout/layout-without-bradcrumb', title: 'Create NFT', page_title: 'Create NFT', folder: 'NFT Marketplace' });
})
route.get('/apps-todo', (req, res, next) => {
    res.render('apps-todo', { layout: 'layout/layout-without-bradcrumb', title: 'Create NFT', page_title: 'Create NFT', folder: 'NFT Marketplace' });
})


module.exports = route;