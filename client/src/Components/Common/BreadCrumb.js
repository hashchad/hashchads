import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import LightDark from './LightDark'
import { layoutModeTypes } from '../constants/layout';
import { changeHTMLAttribute } from '../../slices/layouts/utils';

const BreadCrumb = ({ title, pageTitle }) => {

    let layoutMode = false;

    function changeLayoutMode() {
        if (layoutMode) {
            changeHTMLAttribute("data-layout-mode", "dark")
            layoutMode = false;
        } else {
            changeHTMLAttribute("data-layout-mode", "light")
            layoutMode = true;
        }
    }

    return (
        <Row>
            <Col xs={12}>
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 mx-5">{title}</h4>
                    <div className="page-title-right mx-5">
                        < LightDark layoutMode={layoutModeTypes} onChangeLayoutMode={changeLayoutMode} />
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default BreadCrumb;