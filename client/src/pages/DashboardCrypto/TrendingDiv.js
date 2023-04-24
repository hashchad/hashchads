

const TrendingDiv = ({ nftData, priceChangeData }) => {

    return (
        <div className="col-xxl-4 col-lg-4">
            <div className="card card-height-100">
                <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Trending</h4>
                </div>
                <div className="card-body p-0">
                    <ul className="list-group list-group-flush border-dashed mb-0">
                        {Object.keys(priceChangeData).map((key, index) =>
                            priceChangeData[key] != null && nftData[key].icon !== null && index < 11 &&
                            <li key={index} className="list-group-item d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <img src={"https://www.saucerswap.finance" + nftData[key].icon}
                                        className="avatar-xs" alt="" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="fs-14 mb-1">
                                        {nftData[key].name}
                                    </h6>
                                    <p className="text-muted mb-0">
                                        {nftData[key].id}
                                    </p>
                                </div>
                                <div className="flex-shrink-0 text-end">
                                    <h6 className="fs-14 mb-1">
                                        ${nftData[key].priceUsd.toFixed(5)}
                                    </h6>
                                    {priceChangeData[key] > 0 ?
                                        <h6 className="fs-14 text-success fs-12 mb-0">
                                            +{priceChangeData[key].toFixed(2)} %
                                        </h6>
                                        :
                                        <h6 className="fs-14 text-danger fs-12 mb-0">
                                            {priceChangeData[key].toFixed(2)} %
                                        </h6>
                                    }
                                </div>
                            </li>

                        )}
                    </ul>
                </div>
            </div>
        </div>)
}

export default TrendingDiv