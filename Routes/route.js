const express = require('express');
const route = express.Router();


// axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwt')


// route.get('/', (req, res, next) => {
//     res.render('index', { title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards' });
// })
route.get('/', (req, res, next) => {
    res.render('dashboard-crypto', { title: 'Dashboard', page_title: 'Dashboard', folder: 'Dashboards' });
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

module.exports = route;