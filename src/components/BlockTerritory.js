import React from 'react';
import '../styles/BlockTerrytory.scss'

const BlockTerrytory =  (props) => {

    return(
    <div className="blockTerritory">
        <h3>Estado Predefinido</h3>
        <div className="blockTerritory__terrytory">{props.terrytory.name}</div>
        <h3>Total de Casos Positivos SARS-CoV-2: </h3> 
        <div className="blockTerritory__count">{props.terrytory.count}</div>
    </div>
    )
}

export default BlockTerrytory;