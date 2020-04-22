import React from 'react';
// Libraries
import { ResponsivePie } from '@nivo/pie'
// Styles
import '../../styles/BlockTowns.scss';

const BlockTowns = (props) => {
  

    const dataTowns = props.towns[0].facets.map( town => {
        const data = {"id" : town.path , 'label': town.path ,"value": town.count};
        return data;
    })

    return (
        <div className="blockTowns">
            <div className="blockTowns__block">
                <ResponsivePie
                    data={dataTowns}
                    margin={{ top: 10, right: 20, bottom: 80, left: 20 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'spectral' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    enableRadialLabels={props.breakpoint === 'sm' ? false : true}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={10}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{ from: 'color' }}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default BlockTowns;