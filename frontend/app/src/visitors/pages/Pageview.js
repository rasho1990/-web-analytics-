import React, { useState, useEffect } from 'react';
import ErrorModal from '../../shared/modal/ErrorModal'
import useHttpRequest from '../../shared/hooks/http-hook'
import { ResponsiveBar } from '@nivo/bar'

const Pageview = () => {


    const [visitors, setVisitors] = useState([]);
    const [pageViewers, setpageViewers] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    const data = [{
        "Time": 'May',
        "pageView": pageViewers.length,
        "pageViewColor": "hsl(109, 70%, 50%)"
    }];


    const fetchVisitors = async () => {
        const url = `http://localhost:5000/api`;
        try {
            const responseData = await sendRequest(
                url,
                'GET'
            );

            setVisitors(responseData);
            setpageViewers(responseData.allVisitors.filter(p => p.name === 'pageView'))

        } catch (err) {
            console.log('Error in fetching users!', err);
        }

    };
    useEffect(() => {
        fetchVisitors();
    }, [sendRequest]);

    console.log(data);

    return <React.Fragment>
        {error && <ErrorModal error={error} onClear={clearError} />}
        {isLoading &&
            <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
            </div>}
        {visitors.allVisitors && !error && <div style={{ height: 400 }}> <ResponsiveBar
            data={data}
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