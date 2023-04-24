import React from 'react';

//constants
import { layoutModeTypes } from "../../Components/constants/layout";

const LightDark = ({ layoutMode, onChangeLayoutMode }) => {

    const mode = layoutMode === layoutModeTypes['DARKMODE'] ? layoutModeTypes['LIGHTMODE'] : layoutModeTypes['DARKMODE'];

    return (
        <button
            onClick={() => onChangeLayoutMode(mode)}
            type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
            <i className='bx bx-moon fs-22'></i>
        </button>
    );
};

export default LightDark;