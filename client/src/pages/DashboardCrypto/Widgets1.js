import React from 'react';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Mousewheel } from "swiper";

const Widgets1 = ({ nftData, priceChangeData }) => {

    return (
        <React.Fragment>
            <Col lg={12}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={24}
                    mousewheel={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 3,
                        },
                        1600: {
                            slidesPerView: 5,
                        },
                    }}
                    modules={[Autoplay, Mousewheel]}
                    className="cryptoSlider">

                    {Object.keys(nftData).map((item, key) =>
                        priceChangeData[item] && nftData[item].icon && <SwiperSlide key={key}>
                            <Card>
                                <CardBody>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <div className="d-flex align-items-center">
                                                <img src={"https://www.saucerswap.finance" + nftData[item].icon} className="bg-light rounded-circle p-1 avatar-xs img-fluid" alt="" />
                                                <h4 className="ms-2 mb-0 fs-18">{nftData[item].name}</h4>
                                                {nftData[item].dueDiligenceComplete == false &&
                                                    <i title='Due diligence incomplete!' className="mx-2 fs-20 text-danger bi bi-exclamation-triangle-fill"></i>
                                                }
                                            </div>
                                            <h5 className="mb-1 mt-2">${nftData[item].priceUsd.toFixed(3)}</h5>
                                            <h5 className="mb-1 mt-1 text-success">{nftData[item].id} ({nftData[item].symbol})</h5>
                                            {nftData[item].extra_data && <h5 className="mb-1 mt-1">TVL:
                                                {/* ${Number.parseFloat(nftData[item]["extra_data"]["total_supply"]) * Number.parseFloat(nftData[item]["priceUsd"])} */}
                                            </h5>}
                                            <h5 className="mb-1 mt-1">Keys: { }</h5>
                                        </div>
                                        <div>
                                            <h5 className="mb-1 mt-2">24hr%</h5>
                                            {priceChangeData[item] &&
                                                priceChangeData[item] > 0 ?
                                                <h5 className={"mb-0 text-success"}>+{priceChangeData[item].toFixed(2)}%<i className={"align-middle me-1 " + "mdi mdi-trending-up"}></i></h5>
                                                :
                                                <h5 className={"mb-0 text-danger"}>{priceChangeData[item].toFixed(2)}%<i className={"align-middle me-1 " + "mdi mdi-trending-down"}></i></h5>
                                            }
                                            <h5 className="mb-1 mt-3">Holders: XXXXX</h5>
                                            <h5 className="mb-1 mt-1">Fees: NONE</h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </SwiperSlide>

                    )}
                </Swiper>
            </Col>
        </React.Fragment>
    );
};

export default Widgets1;