
$(function() {
    "use strict";

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    $('.sale_Monthly').sparkline('html', {
        type: 'bar',
        height: '40px',
        barSpacing: 8,
        barWidth: 3,
        barColor: '#868e96',        
    });

    $(function() {
        "use strict";
    
        if( $('#world-map-markers').length > 0 ){
    
            $('#world-map-markers').vectorMap(
            {
                map: 'world_mill_en',
                backgroundColor: 'transparent',
                borderColor: '#fff',
                borderOpacity: 0.25,
                borderWidth: 0,
                color: '#e6e6e6',
                regionStyle : {
                    initial : {
                    fill : '#e9ecef'
                    }
                },
    
                markerStyle: {
                initial: {
                            r: 5,
                            'fill': '#fff',
                            'fill-opacity':1,
                            'stroke': '#000',
                            'stroke-width' : 1,
                            'stroke-opacity': 0.4
                        },
                    },
            
                markers : [{
                    latLng : [21.00, 78.00],
                    name : 'INDIA : 350'
                
                },
                    {
                    latLng : [-33.00, 151.00],
                    name : 'Australia : 250'
                    
                },
                    {
                    latLng : [36.77, -119.41],
                    name : 'USA : 250'
                    
                },
                    {
                    latLng : [55.37, -3.41],
                    name : 'UK   : 250'
                    
                },
                    {
                    latLng : [25.20, 55.27],
                    name : 'UAE : 250'
                
                }],
    
                series: {
                    regions: [{
                        values: {
                            "US": '#6435c9',
                            "SA": '#6435c9',
                            "AU": '#6435c9',
                            "IN": '#6435c9',
                            "GB": '#6435c9',
                        },
                        attribute: 'fill'
                    }]
                },
                hoverOpacity: null,
                normalizeFunction: 'linear',
                zoomOnScroll: false,
                scaleColors: ['#000000', '#000000'],
                selectedColor: '#000000',
                selectedRegions: [],
                enableZoom: false,
                hoverColor: '#fff',
            });  
    
            $('#india_map').vectorMap({
                map : 'in_mill',
                backgroundColor : 'transparent',
                regionStyle : {
                    initial : {
                        fill : '#6435c9'
                    }
                }
            });    
            
            $('#usa_map').vectorMap({
                map : 'us_aea_en',
                backgroundColor : 'transparent',
                regionStyle : {
                    initial : {
                        fill : '#6435c9'
                    }
                }
            });
    
            $('#au_map').vectorMap({
                map : 'au_mill',
                backgroundColor : 'transparent',
                regionStyle : {
                    initial : {
                        fill : '#6435c9'
                    }
                }
            });
                    
            $('#uk_map').vectorMap({
                map : 'uk_mill_en',
                backgroundColor : 'transparent',
                regionStyle : {
                    initial : {
                        fill : '#6435c9'
                    }
                }
            });
        }
    });

    // Revenue Growth
    $(document).ready(function(){
        var chart = c3.generate({
            bindto: '#chart-area-spline', // id of chart wrapper
            data: {
                columns: [
                    // each columns data
                    ['data1',50, 51, 55, 52, 59, 51, 50, 55, 54, 57, 59, 52, 53, 50, 59, 48, 44, 57, 43, 53, 59 ],
                    ['data2',19, 22, 28, 36, 34, 38, 39, 30, 28, 22, 29, 35, 38, 31, 27, 26, 21, 35, 33, 32, 39 ]
                ],
                type: 'area-spline', // default type of chart
                colors: {
                    'data1': anchor.colors["gray-100"],
                    'data2': anchor.colors["indigo"]
                },
                names: {
                    // name of each serie
                    'data1': 'Income',
                    'data2': 'Expense'
                }
            },
            axis: {
                x: {
                    type: 'category',
                    // name of each category
                    categories: []
                },
            },       
            legend: {
                show: true,
                position: 'inset',
                inset: {
                    anchor: 'top-left',
                    x: 73,
                    y: undefined,
                    step: undefined
                }
            },
            padding: {
                bottom: -20,
                top: 0,
                left: -45,
                right: -45,
            },        
        });
    });

    // PROJECTS
    $(document).ready(function(){
        var chart = c3.generate({
            bindto: '#chart-bar-stacked', // id of chart wrapper
            data: {
                columns: [
                    // each columns data
                    ['data1', 11, 8, 15, 18, 19, 17],
                    ['data2', 7, 7, 5, 7, 9, 12]
                ],
                type: 'bar', // default type of chart
                groups: [
                    [ 'data1', 'data2']
                ],
                colors: {
                    'data1': anchor.colors["indigo"],
                    'data2': anchor.colors["pink"]
                },
                names: {
                    // name of each serie
                    'data1': 'Finished',
                    'data2': 'OnGoing'
                }
            },
            axis: {
                x: {
                    type: 'category',
                    // name of each category
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                },
            },
            bar: {
                width: 16
            },
            legend: {
                show: false, //hide legend
            },
            padding: {
                bottom: 0,
                top: 0,                
            },
        });
    });

    // Transaction History
    $(document).ready(function(){
        var chart = c3.generate({
            bindto: '#chart-donut', // id of chart wrapper
            data: {
                columns: [
                    // each columns data
                    ['data1', 50],
                    ['data2', 30],
                    ['data3', 15],
                    ['data4', 5],
                ],
                type: 'donut', // default type of chart
                colors: {
                    'data1': anchor.colors["pink"],
                    'data2': anchor.colors["pink-light"],
                    'data3': anchor.colors["pink-lighter"],
                    'data4': anchor.colors["pink-lightest"],
                },
                names: {
                    // name of each serie
                    'data1': 'Success',
                    'data2': 'Process',
                    'data3': 'Refund',
                    'data4': 'Failed',
                }
            },
            axis: {
            },
            legend: {
                show: true, //hide legend
            },
            padding: {
                bottom: 0,
                top: 0
            },
        });
    });
});