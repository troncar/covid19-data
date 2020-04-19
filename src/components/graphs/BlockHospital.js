import React from 'react';

// Libraries:

import { ResponsiveBar } from '@nivo/bar'

// Styles

import '../../styles/BlockHospital.scss'

const BlockHospital = (props) => {

      const dataHospitals = props.hospitals[0].facets.map(hospital => {
            const data = {'sector': hospital.path , [hospital.path]: hospital.count}
            return data;
      })

      const dataKeys  =  props.hospitals[0].facets.map( hospital => {
            const key =  hospital.path;
            return key;
      });

    return (
        <div className="blockHospital">
            <div className="blockHospital__block">
                <ResponsiveBar
                    data={ dataHospitals}
                    keys={ dataKeys}
                    indexBy="sector"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.1}
                    groupMode="stacked"
                    colors={{ scheme: 'red_blue' }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Sector',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'No. Personas',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />

            </div>
        </div>
    )
}

export default BlockHospital;