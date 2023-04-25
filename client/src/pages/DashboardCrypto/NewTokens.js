import { useEffect, useState } from "react"


const NewTokensDiv = ({ nftData, priceChangeData }) => {

    const [rankedData, setRankedData] = useState(null)


    useEffect(() => {

        // Convert the object into an array of arrays
        const dataArray = Object.entries(nftData);

        // Sort the array by creation_timestamp
        dataArray.sort((a, b) => {
            if (a[1].extra_data) {
                return a[1].extra_data.created_timestamp + b[1].extra_data.created_timestamp;
            }
        });

        let dataArraySortedHash = {};

        dataArray.forEach(([key, value]) => {
            dataArraySortedHash[key] = value;
        });

        // The sorted array is now in ascending order by creation_timestamp
        // console.log(dataArraySortedHash)
        setRankedData(dataArraySortedHash)
    }, [nftData])


    return (
        <div className="col-xxl-4 col-lg-4">
            <div className="card card-height-100">
                <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">New Tokens</h4>
                </div>
                <div className="card-body p-0">
                    <ul className="list-group list-group-flush border-dashed mb-0">
                        {rankedData && Object.keys(rankedData).map((key, index) =>
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

export default NewTokensDiv