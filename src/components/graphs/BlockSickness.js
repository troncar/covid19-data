import React from 'react';

//Libraries
import { ResponsiveBubble } from '@nivo/circle-packing';

// Styles

import '../../styles/BlockSickness.scss';

const BlockSickness = (props) => {

    const children = Object.keys(props.sickness).map( index => {
        // Get Count Positve 
        const positiveCount = props.sickness[index].facets.filter( sickness => (sickness.path === 'SI'));
        const children = {"name" : props.sickness[index].name , 
        "children": [{ "name": props.sickness[index].name , "count": positiveCount[0].count }]}
       
        return children;
    })

    const root = {"name": "Pacientes con Enfermedad Pre",children};
      
    return (
        <div className="blockSickness">
            <div className="blockSickness__block">
                <ResponsiveBubble
                    root={root}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    identity="name"
                    value="count"
                    colors={{ scheme: 'paired' }}
                    colorBy="depth"
                    padding={6}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.9 ] ] }}
                    borderWidth={2}
                    borderColor={{ from: 'color' }}
                    defs={[
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'none',
                            color: 'inherit',
                            rotation: -45,
                            lineWidth: 5,
                            spacing: 8
                        }
                    ]}
                    fill={[ { match: { depth: 1 }, id: 'lines' } ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={12}
                />
        </div>
    </div>
    )
}

export  default BlockSickness;
