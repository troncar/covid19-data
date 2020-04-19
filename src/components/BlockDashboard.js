import React from 'react';
// Import Components
import BlockTowns from './graphs/BlockTowns';
import BlockHospital from './graphs/BlockHospital';
import BlockSickness from './graphs/BlockSickness';
// Import Styles
import '../styles/BlockDashboard.scss';

const BlockDashboard =  (props) => {
    return(
        <div className="dashBoard">
            <div className="dashBoard__town">
                <div className="dashBoard__title"> No. Casos Positivos por Municipios </div>
                <BlockTowns towns={props.towns}></BlockTowns>
            </div>
            <div className="dashBoard__hospital">
                <div className="dashBoard__title">Distribución de personas atendidas por Sector:</div>
                <BlockHospital hospitals={props.hospitals}></BlockHospital>
            </div>
            <div className="dashBoard__sickness">
                <div className="dashBoard__title">Enfermedades presentadas en casos Positivos:</div>
                <BlockSickness sickness={props.sickness}></BlockSickness>
            </div>
        </div>
    )
}

export default BlockDashboard;