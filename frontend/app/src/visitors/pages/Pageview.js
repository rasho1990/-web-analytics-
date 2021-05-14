import React, { useState, useEffect } from 'react';
import ErrorModal from '../../shared/modal/ErrorModal'
import useHttpRequest from '../../shared/hooks/http-hook'
import { ResponsiveBar } from '@nivo/bar'

const Pageview = () => {


    const [visitors, setVisitors] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();
    const data = (v) => {
        let dataTemp = [];
        let months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        v.forEach(element => {
            dataTemp.push({
                "Time": months[element._id-1],
                "pageView": element.visitors,
                "pageViewColor": "hsl(57, 70%, 50%)"
            })
        });
        return dataTemp;
    }




    const fetchVisitors = async () => {
        const url = `http://localhost:5000/api`;
        try {
            const responseData = await sendRequest(
                url,
                'GET'
            );

            setVisitors(responseData);


        } catch (err) {
            console.log('Error in fetching users!', err);
        }

    };

    useEffect(() => {
        fetchVisitors();

    }, [sendRequest]);
    return <React.Fragment>
        {error && <ErrorModal error={error} onClear={clearError} />}
        {isLoading &&
            <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
            </div>}
        {visitors && !error && <div style={{ height: 400 }}> <ResponsiveBar
            data={data(visitors.visitorsPerMonth)}
            keys={['pageView']}
            indexBy="Time"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
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
            fill={[
                {
                    match: {
                        id: 'pageView'
                    },
                    id: 'solid'
                },
                {
                    match: {
                        id: 'click'
                    },
                    id: 'solid'
                }
            ]}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Time',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Visitors',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
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
        /> </div>
        }
    </React.Fragment>
}

export default Pageview;