import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { MarkerCharts } from './DashboardCryptoCharts';
import { useSelector, useDispatch } from "react-redux";
import { getMarketChartsData } from '../../slices/thunks';
import getData from '../../requests/getData'

const MarketGraph = () => {
    const dispatch = useDispatch();

    const [chartData, setchartData] = useState([]);
    // var marketData = [];

    const { marketData } = useSelector(state => ({
        marketData: state.DashboardCrypto.marketData
    }));

    async function fetchMarketData(numDays) {
        let dataURL = "https://api.coingecko.com/api/v3/coins/hedera-hashgraph/ohlc?vs_currency=usd&days=" + numDays;
        let res = await getData(dataURL)
        let newData = []
        res.forEach(element => {
            newData.push({ x: new Date(element[0]), y: [element[1], element[2], element[3], element[4]] })
        });
        // marketData = await getMarketChartsData("week");
        setchartData(newData);
    }

    useEffect(() => {
        fetchMarketData("7")
    }, [marketData]);

    const onChangeChartPeriod = pType => {
        dispatch(getMarketChartsData(pType));
    };

    useEffect(() => {
        dispatch(getMarketChartsData("week"));
    }, [dispatch]);

    return (
        <React.Fragment>
            <Row>
                <Col xxxl={12}>
                    <Card>
                        <CardHeader className="border-0 align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Market Graph</h4>
                            <div className="d-flex gap-1">
                                {/* <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("hour"); }}>
                                    1H
                                </button> */}
                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { fetchMarketData("7"); }}>
                                    7D
                                </button>
                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { fetchMarketData("30"); }}>
                                    1M
                                </button>
                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { fetchMarketData("365"); }}>
                                    1Y
                                </button>
                                <button type="button" className="btn btn-soft-primary btn-sm" onClick={() => { fetchMarketData("max"); }}>
                                    ALL
                                </button>
                            </div>
                        </CardHeader>
                        <div className="card-body p-0 pb-3">
                            <div id="Market_chart" className="apex-charts" dir="ltr">
                                <MarkerCharts series={chartData} dataColors='["--vz-success", "--vz-danger"]' />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default MarketGraph;