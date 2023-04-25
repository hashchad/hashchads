import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import MarketGraph from './MarketGraph';
import MyCurrencies from './MyCurrencies';
import MyPortfolio from './MyPortfolio';
import NewsFeed from './NewsFeed';
import RecentActivity from './RecentActivity';
import TopPerformers from './TopPerformers';
import Trading from './Trading';
import Widgets from './Widgets';
import Widgets1 from './Widgets1';
import getData from '../../requests/getData';
import TrendingDiv from './TrendingDiv';
import { changeHTMLAttribute } from '../../slices/layouts/utils';
import NewTokensDiv from './NewTokens';
import TopPoolsDiv from './TopPools';


const DashboardCrypto = () => {
    document.title = "HashChads";

    const [priceChangeData, setPriceChangeData] = useState(null);
    const [nftData, setNftData] = useState(null);

    async function setupData() {

        let base_url = "https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/"

        async function getMoreData(id) {
            let moreNFTData = await getData(base_url + id);
            newNFTData[id]["extra_data"] = moreNFTData
            setNftData(newNFTData)
        }

        var basePriceChangeData = await getData("https://api.saucerswap.finance/tokens/price-change");
        const priceChangeDataSorted = Object.entries(basePriceChangeData)
            .sort((a, b) => b[1] - a[1])

        var baseNftData = await getData("https://api.saucerswap.finance/tokens");
        var newNFTData = {}
        baseNftData.forEach((element) => {
            if (element.priceUsd > 0.01) {
                newNFTData[element.id] = element
                getMoreData(element.id)
            }
        })

        let priceChangeDataSortedHash = {};

        priceChangeDataSorted.forEach(([key, value]) => {
            if (newNFTData[key] && newNFTData[key].priceUsd > 0.01) {
                priceChangeDataSortedHash[key] = value;
            }
        });
        setPriceChangeData(priceChangeDataSortedHash)
        setNftData(newNFTData)
    }


    useEffect(() => {
        changeHTMLAttribute("data-layout-mode", "dark")
        setupData()
    }, [])

    return (
        <div className="mt-4">
            <Container fluid>
                <BreadCrumb title="HEDERA HASHCHADS" pageTitle="HASHCHADS" />
                {nftData && <Row>
                    <Widgets1 nftData={nftData} priceChangeData={priceChangeData} />
                </Row>}
                {/* <Row>
                    <MyCurrencies />
                    <Trading />
                </Row> */}
                <Row>
                    {nftData && <TrendingDiv nftData={nftData} priceChangeData={priceChangeData} />}
                    {nftData && <NewTokensDiv nftData={nftData} priceChangeData={priceChangeData} />}
                    <TopPoolsDiv />
                </Row>
                <MarketGraph />
            </Container>
        </div>
    );
};

export default DashboardCrypto;