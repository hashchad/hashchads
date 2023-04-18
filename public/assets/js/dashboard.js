
async function getData(url = '') {
    // Default options are marked with *
    return fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(body) // body data type must match "Content-Type" header
    }).then(res => {
        if (!res.ok) {
            throw Error("Could not fetch the data for that resource");
        }
        return res.json();
    });
}

const currentServerURL = "http://localhost:5000"

var html = document.getElementsByTagName("HTML")[0];
var lightDarkBtn = document.getElementById("mode-switch");

function setLayoutMode(mode, modeType, modeTypeId, html) {
    var isModeTypeId = document.getElementById(modeTypeId);
    html.setAttribute(mode, modeType);
    if (isModeTypeId) {
        document.getElementById(modeTypeId).click();
    }
}

async function testPuppeteer() {
    let data = await getData("https://api.coingecko.com/api/v3/coins/hedera-hashgraph/ohlc?vs_currency=usd&days=5")
    console.log(data)
}

testPuppeteer()

if (lightDarkBtn) {
    lightDarkBtn.addEventListener("click", function (event) {
        html.hasAttribute("data-layout-mode") && html.getAttribute("data-layout-mode") == "dark" ?
            setLayoutMode("data-layout-mode", "light", "layout-mode-light", html) :
            setLayoutMode("data-layout-mode", "dark", "layout-mode-dark", html);
    });
}
