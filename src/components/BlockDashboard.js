import React from 'react';
// Import Components
import BlockTowns from './graphs/BlockTowns';
import BlockHospital from './graphs/BlockHospital';
import BlockSickness from './graphs/BlockSickness';
// Import Styles
import '../styles/BlockDashboard.scss';

const BlockDashboard =  (props) => {
    
    const [, , towns, sickness ,hospitals, showDashboard, persons] = props.useFetchCurrent(props.currentTerrytory.name);
 
    return(
        <div className="dashBoard">
            { showDashboard && (
                <div>
                    {props.currentTerrytory.name === 'CIUDAD DE MÉXICO' && (
                        <div className="dashBoard__town">
                            <div className="dashBoard__title"> No. Casos Positivos por Municipios </div>
                            <BlockTowns towns={towns} breakpoint={props.breakpoint}></BlockTowns>
                        </div>  
                    )}
                    <div className="dashBoard__hospital">
                        <div className="dashBoard__title">Distribución por Sector de Salud. {persons} personas atendidas:</div>
                        <BlockHospital hospitals={hospitals}></BlockHospital>
                    </div>
                    <div className="dashBoard__sickness">
                        <div className="dashBoard__title">Enfermedades presentadas en casos Positivos:</div>
                        <BlockSickness sickness={sickness}></BlockSickness>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BlockDashboard;