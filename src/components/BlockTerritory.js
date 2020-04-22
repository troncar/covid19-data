import React from 'react';
import '../styles/BlockTerrytory.scss'

const BlockTerrytory =  (props) => {
    const [currentTerrytory, error , currentTowns] = props.useFetchCurrent(props.currentTerrytory.name);


    const handlerChangeSelect = (event) => {
        props.setCurrentTerrytory({'name': event.target.value});
        props.setCurrentTowns({...currentTowns});
    }

    return(
    <div className="blockTerritory">
        { !!error && (
            <div>
                <h3>Estado Predefinido</h3>
                <div className="blockTerritory__select">
                    <select name="select" onChange={handlerChangeSelect}>
                        { Object.keys(props.terrytory[0].facets).map(index => {
                            return (
                                <option key={index} value={props.terrytory[0].facets[index].name}>{props.terrytory[0].facets[index].name}</option> 
                            );
                        })
                        }
                    </select>
                </div>
                <h3>Total de Casos Positivos SARS-CoV-2: </h3> 
                <div className="blockTerritory__count">{currentTerrytory.count}</div>
            </div>
        )}

    </div>
    )
}

export default BlockTerrytory;