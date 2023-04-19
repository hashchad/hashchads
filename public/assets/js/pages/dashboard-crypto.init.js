/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Crypto Dashboard init js
*/


var html = document.getElementsByTagName("HTML")[0];
var lightDarkBtn = document.getElementById("mode-switch");
var sevenDayButton = document.getElementById("7");
var oneMonthButton = document.getElementById("30");
var oneYearButton = document.getElementById("365");
var allButton = document.getElementById("max");

function setLayoutMode(mode, modeType, modeTypeId, html) {
  var isModeTypeId = document.getElementById(modeTypeId);
  html.setAttribute(mode, modeType);
  if (isModeTypeId) {
    document.getElementById(modeTypeId).click();
  }
}

function makeAllButtonsInactive() {
  [sevenDayButton, oneMonthButton, oneYearButton, allButton].forEach((button) => {
    if (button.classList.contains("active")) {
      button.classList.remove("active")
    }
  })
}

if (lightDarkBtn) {
  lightDarkBtn.addEventListener("click", function (event) {
    html.hasAttribute("data-layout-mode") && html.getAttribute("data-layout-mode") == "dark" ?
      setLayoutMode("data-layout-mode", "light", "layout-mode-light", html) :
      setLayoutMode("data-layout-mode", "dark", "layout-mode-dark", html);
  });
}
sevenDayButton.addEventListener("click", function (event) {
  makeAllButtonsInactive()
  sevenDayButton.classList.add("active")
  generateMarketsChart("7")
});
oneMonthButton.addEventListener("click", function (event) {
  makeAllButtonsInactive()
  oneMonthButton.classList.add("active")
  generateMarketsChart("30")
});
oneYearButton.addEventListener("click", function (event) {
  makeAllButtonsInactive()
  oneYearButton.classList.add("active")
  generateMarketsChart("365")
});
allButton.addEventListener("click", function (event) {
  makeAllButtonsInactive()
  allButton.classList.add("active")
  generateMarketsChart("max")
});



// Example POST method implementation:
async function getData(url = '') {
  // Default options are marked with *
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
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


// get colors array from the string
function getChartColorsArray(chartId) {

  if (document.getElementById(chartId) !== null) {
    var colors = document.getElementById(chartId).getAttribute("data-colors");
    if (colors) {
      colors = JSON.parse(colors);
      return colors.map(function (value) {
        var newValue = value.replace(" ", "");
        if (newValue.indexOf(",") === -1) {
          var color = getComputedStyle(document.documentElement).getPropertyValue(
            newValue
          );
          if (color) return color;
          else return newValue;
        } else {
          var val = value.split(",");
          if (val.length == 2) {
            var rgbaColor = getComputedStyle(
              document.documentElement
            ).getPropertyValue(val[0]);
            rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
            return rgbaColor;
          } else {
            return newValue;
          }
        }
      });
    } else {
      console.warn('data-colors Attribute not found on:', chartId);
    }
  }
}

// Total Portfolio Donut Charts
var donutchartportfolioColors = getChartColorsArray("portfolio_donut_charts");
if (donutchartportfolioColors) {
  var options = {
    series: [19405, 40552, 15824, 30635],
    labels: ["Bitcoin", "Ethereum", "Litecoin", "Dash"],
    chart: {
      type: "donut",
      height: 224,
    },

    plotOptions: {
      pie: {
        size: 100,
        offsetX: 0,
        offsetY: 0,
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "18px",
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: "20px",
              color: "#343a40",
              fontWeight: 500,
              offsetY: 5,
              formatter: function (val) {
                return "$" + val;
              },
            },
            total: {
              show: true,
              fontSize: "13px",
              label: "Total value",
              color: "#9599ad",
              fontWeight: 500,
              formatter: function (w) {
                return (
                  "$" +
                  w.globals.seriesTotals.reduce(function (a, b) {
                    return a + b;
                  }, 0)
                );
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    stroke: {
      lineCap: "round",
      width: 2,
    },
    colors: donutchartportfolioColors,
  };
  var chart = new ApexCharts(document.querySelector("#portfolio_donut_charts"), options);
  chart.render();
}

async function generateMarketsChart(numDays = '7') {

  // let current = document.querySelector("#Market_chart")
  // current.removeChild()

  let dataURL = "https://api.coingecko.com/api/v3/coins/hedera-hashgraph/ohlc?vs_currency=usd&days=" + numDays;
  console.log("Entered chart")
  let res = await getData(dataURL)
  console.log(res)
  var data = []
  res.forEach(element => {
    data.push({ x: new Date(element[0]), y: [element[1], element[2], element[3], element[4]] })
  });

  // Market Chart Candalstick
  var MarketchartColors = getChartColorsArray("Market_chart");
  if (MarketchartColors) {
    var options = {
      series: [{
        data: data,
      },],
      chart: {
        type: "candlestick",
        height: 294,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: MarketchartColors[0],
            downward: MarketchartColors[1],
          },
        },
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
        labels: {
          formatter: function (value) {
            return "$" + value;
          },
        },
      },
      tooltip: {
        shared: true,
        y: [{
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return "$" + y.toFixed(2) + "k";
            }
            return y;
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " Sales";
            }
            return y;
          },
        },
        ],
      },
    };
    var chart = new ApexCharts(document.querySelector("#Market_chart"), options);
    chart.render();
  }
}

generateMarketsChart()

// Bitcoin
var areachartbitcoinColors = getChartColorsArray("bitcoin_sparkline_charts");
if (areachartbitcoinColors) {
  var options = {
    series: [{
      name: "Bitcoin",
      data: [85, 68, 35, 90, 8, 11, 26, 54],
    },],
    chart: {
      width: 130,
      height: 50,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100, 100],
      },
    },
    colors: areachartbitcoinColors,
  };
  var chart = new ApexCharts(document.querySelector("#bitcoin_sparkline_charts"), options);
  chart.render();
}

// Litecoin
var areachartlitecoinColors = getChartColorsArray("litecoin_sparkline_charts");
if (areachartlitecoinColors) {
  var options = {
    series: [{
      name: "Litecoin",
      data: [25, 50, 41, 87, 12, 36, 9, 54],
    },],
    chart: {
      width: 130,
      height: 46,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100, 100],
      },
    },
    colors: areachartlitecoinColors,
  };
  var chart = new ApexCharts(document.querySelector("#litecoin_sparkline_charts"), options);
  chart.render();
}

// Eathereum
var areacharteathereumColors = getChartColorsArray("eathereum_sparkline_charts");
if (areacharteathereumColors) {
  var options = {
    series: [{
      name: "Eathereum",
      data: [36, 21, 65, 22, 35, 50, 29, 44],
    },],
    chart: {
      width: 130,
      height: 46,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100, 100],
      },
    },
    colors: areacharteathereumColors,
  };
  var chart = new ApexCharts(document.querySelector("#eathereum_sparkline_charts"), options);
  chart.render();
}

// Binance
var areachartbinanceColors = getChartColorsArray("binance_sparkline_charts");
if (areachartbinanceColors) {
  var options = {
    series: [{
      name: "Binance",
      data: [30, 58, 29, 89, 12, 36, 9, 54],
    },],
    chart: {
      width: 130,
      height: 46,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100, 100],
      },
    },
    colors: areachartbinanceColors,
  };
  var chart = new ApexCharts(document.querySelector("#binance_sparkline_charts"), options);
  chart.render();
}

// Dash
var areachartdashColors = getChartColorsArray("dash_sparkline_charts");
if (areachartdashColors) {
  var options = {
    series: [{
      name: "Dash",
      data: [24, 68, 39, 86, 29, 42, 11, 58],
    },],
    chart: {
      width: 130,
      height: 46,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100, 100],
      },
    },
    colors: areachartdashColors,
  };
  var chart = new ApexCharts(document.querySelector("#dash_sparkline_charts"), options);
  chart.render();
}

// Tether
var areacharttetherColors = getChartColorsArray("tether_sparkline_charts");
if (areacharttetherColors) {
  var options = {
    series: [{
      name: "Dash",
      data: [13, 76, 12, 85, 25, 60, 9, 54],
    },],
    chart: {
      width: 130,
      height: 46,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100, 100],
      },
    },
    colors: areacharttetherColors,
  };
  var chart = new ApexCharts(document.querySelector("#tether_sparkline_charts"), options);
  chart.render();
}

// Neo
var areachartneoColors = getChartColorsArray("neo_sparkline_charts");
if (areachartneoColors) {
  var options = {
    series: [{
      name: "Neo",
      data: [9, 66, 41, 89, 12, 36, 25, 54],
    },],
    chart: {
      width: 130,
      height: 46,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100, 100],
      },
    },
    colors: areachartneoColors,
  };
  var chart = new ApexCharts(document.querySelector("#neo_sparkline_charts"), options);
  chart.render();
}

// Swiper Slider
var swiper = new Swiper(".cryptoSlider", {
  slidesPerView: 1,
  loop: false,
  spaceBetween: 24,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2.5,
    },
    1024: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});