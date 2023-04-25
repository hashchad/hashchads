import { useEffect, useState } from "react"
import getData from "../../requests/getData";


const TopPoolsDiv = () => {

    const [poolsData, setPoolsData] = useState(null);
    const [poolsPriceChangeData, setPoolsPriceChangeData] = useState(null);

    useEffect((() => {
        async function setupData() {

            let pools_daily_vol_url = "https://api.saucerswap.finance/pools/daily-volumes"
            setPoolsPriceChangeData(await getData(pools_daily_vol_url))

            let pools_url = "https://api.saucerswap.finance/pools"
            let poolData = await getData(pools_url)
            poolData.sort((a, b) => Number.parseFloat(poolsPriceChangeData[b.id.toString()]) - Number.parseFloat(poolsPriceChangeData[a.id.toString()]));
            console.log(poolData[0])
            setPoolsData(poolData.slice(0, 11))
            // [name, liquidity, volume(24hr), volume(7d), daily fees, lp reward]
        }
        setupData()
    }), {})

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="col-xxl-4 col-lg-4">
            <div className="card card-height-100">
                <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Top Pools</h4>
                </div>
                <div className="card-body p-0">
                    <ul className="list-group list-group-flush border-dashed mb-0">
                        {poolsData && poolsData.map((key, index) =>
                            poolsPriceChangeData[key.id] && <li key={index} className="list-group-item d-flex align-items-center">
                                <div class="row">
                                    <div class="col-3">
                                        <img src={"https://www.saucerswap.finance" + key.tokenA.icon} alt="Avatar 1" class="avatar-xs" />
                                    </div>
                                    <div class="col-3">
                                        <img src={"https://www.saucerswap.finance" + key.tokenB.icon} alt="Avatar 2" class="avatar-xs" />
                                    </div>
                                </div>
                                {/* <div className="flex-shrink-0"> */}
                                {/* <img src={"https://www.saucerswap.finance" + nftData[key].icon}
                                        className="avatar-xs" alt="" /> */}
                                {/* </div> */}
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="fs-14 mb-1">
                                        {key.lpToken.name}
                                    </h6>
                                    <p className="text-muted mb-0">
                                        {key.lpToken.id}
                                    </p>
                                </div>
                                <div className="flex-shrink-0 text-end">
                                    <h6 className="fs-18 mb-1">
                                        ${numberWithCommas(Number.parseInt(poolsPriceChangeData[key.id.toString()]))}
                                    </h6>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>)
}

export default TopPoolsDiv