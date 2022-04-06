
// Large scale area chart
$(function() {
    "use strict";
    var largescaleArea = getChart("echart-large_scale_area");
    var app = {};
    var option = {};
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];

    for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }

    option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        grid: {
            left: '5%',
            right:'0%',
            top: '2%',
            bottom:'20%',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLabel: {
                color: anchor.colors["gray-700"],
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLabel: {
                color: anchor.colors["gray-700"],
            }
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name:'Simulation data',
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: anchor.colors["gray-100"],
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: anchor.colors["pink"],
                    }, {
                        offset: 1,
                        color: anchor.colors["indigo"],
                    }])
                },
                data: data
            }
        ]
    };
    if (option && typeof option === "object") {
        largescaleArea.setOption(option, true);
    }
    $(window).on('resize', function(){
        largescaleArea.resize();
    });
});

// Bar Area
$(function() {
    "use strict";
    var barArea = getChart("echart-bar_area")
    var app = {};
    var option = {};
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
        xAxisData.push('bar' + i);
        data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
    }
    option = {
        
        legend: {
            data: ['bar', 'bar2'],
            align: 'right',
            bottom: '0',
        },
        grid: {
            left: '5%',
            right:'0%',
            top: '2%',
            bottom:'15%',
        },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            silent: true,
            splitLine: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLabel: {
                color: anchor.colors["gray-700"],
            }
        },
        yAxis: {
            splitLine: {
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLabel: {
                color: anchor.colors["gray-700"],
            }
        },
        series: [{
            name: 'bar',
            type: 'bar',
            data: data1,
            color: anchor.colors["indigo"],
            animationDelay: function (idx) {
                return idx * 10;
            }
        }, {
            name: 'bar2',
            type: 'bar',
            data: data2,
            color: anchor.colors["pink"],
            
            animationDelay: function (idx) {
                return idx * 5 + 100;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };
    if (option && typeof option === "object") {
        barArea.setOption(option, true);
    }
    $(window).on('resize', function(){
        barArea.resize();
    });
});

// Rainfall and Evaporation
$(function() {
    "use strict";
    var app = {};
    var option = {};
    var rainFall = getChart("echart-rainfall");
    option = {
        legend: {
            data:['data1','data2'],
            bottom: '0',
        },
        grid: {
            left: '5%',
            right:'0%',
            top: '2%',
            bottom:'15%',
        },
        tooltip : {
            trigger: 'axis'
        },        
        calculable : true,

        xAxis : {
            type : 'category',
            data : ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'],
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLabel: {
                color: anchor.colors["gray-700"],
            }
        },
        yAxis : {
            type : 'value',
            splitLine: {
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLabel: {
                color: anchor.colors["gray-700"],
            }
        },
        series : [
            {
                name:'data1',
                type:'bar',
                color: anchor.colors["indigo"],
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint : {
                    data : [
                        {type : 'max', name: 'Max'},
                        {type : 'min', name: 'Min'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: 'Average'}
                    ]
                }
            },
            {
                name:'data2',
                type:'bar',
                color: anchor.colors["pink"],
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint : {
                    data : [
                        {name : 'Highest', value : 182.2, xAxis: 7, yAxis: 183},
                        {name : 'Minimum', value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : 'Average'}
                    ]
                }
            }
        ]
    };
    if (option && typeof option === "object") {
        rainFall.setOption(option, true);
    }  
    $(window).on('resize', function(){
        rainFall.resize();
    });
});

// Dynamic Data
$(function() {
    "use strict";
    var dynamicData = getChart("echart-dynamic_data");
    var app = {};
    var option = {};

    option = {
        legend: {
            data:['Latest transaction price', 'Pre-order queue']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: (function (){
                    var now = new Date();
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                        now = new Date(now - 2000);
                    }
                    return res;
                })(),
                axisLine:{
                    lineStyle:{
                        color: anchor.colors["gray-100"],
                    }
                },
                
            },            
            {
                type: 'category',
                boundaryGap: true,
                data: (function (){
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.push(10 - len - 1);
                    }
                    return res;
                })(),
            },
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'price',
                max: 30,
                min: 0,
                boundaryGap: [0.2, 0.2],

                axisLine:{
                    lineStyle:{
                        color: anchor.colors["gray-100"],
                    }
                },
                axisLabel: {
                    color: anchor.colors["gray-700"],
                }
            },
            {
                type: 'value',
                scale: true,
                max: 1200,
                min: 0,
                boundaryGap: [0.2, 0.2],
                
                splitLine: {
                    lineStyle:{
                        color: anchor.colors["gray-100"],
                    }
                },
            }
        ],
        series: [
            {
                color: anchor.colors["indigo"],
                name:'queue',
                type:'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data:(function (){
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.push(Math.round(Math.random() * 1000));
                    }
                    return res;
                })()
            },
            {
                color: anchor.colors["pink"],
                name:'Latest transaction',
                type:'line',
                data:(function (){
                    var res = [];
                    var len = 0;
                    while (len < 10) {
                        res.push((Math.random()*10 + 5).toFixed(1) - 0);
                        len++;
                    }
                    return res;
                })()
            }
        ]
    };
    if (option && typeof option === "object") {
        dynamicData.setOption(option, true);
    } 
    $(window).on('resize', function(){
        dynamicData.resize();
    }); 
});

// Basic Candlestick
$(function() {
    "use strict";
    var candleStick = getChart("echart-candlestick");
    var app = {};
    var option = {};

    option = {
        grid: {
            left: '5%',
            right:'0%',
            top: '2%',
            bottom:'8%',
        },
        xAxis: {
            data: ['2018-10-24', '2018-10-25', '2018-10-26', '2018-10-27'],
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            splitLine: {
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
        },        
        yAxis: {
            splitLine: {
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLabel: {
                color: anchor.colors["gray-700"],
            }
        },
        series: [{
            type: 'k',            
            data: [
                {
                    itemStyle:{
                        color: anchor.colors['pink'],
                        borderColor: anchor.colors['pink'],
                    },
                    value: [20, 30, 10, 35]
                },
                {
                    itemStyle:{
                        color: anchor.colors['blue'],
                        color0: anchor.colors['blue'],
                        borderColor: anchor.colors['blue'],
                        borderColor0: anchor.colors['blue'],
                    },
                    value: [40, 35, 30, 55]
                },
                {
                    itemStyle:{
                        color: anchor.colors['pink'],
                        borderColor: anchor.colors['pink'],
                    },
                    value: [33, 38, 33, 40]
                },
                {
                    itemStyle:{
                        color: anchor.colors['orange'],
                        borderColor: anchor.colors['orange'],
                    },
                    value: [40, 40, 32, 42]
                },
            ]
        }]
    };

    if (option && typeof option === "object") {
        candleStick.setOption(option, true);
    }
    $(window).on('resize', function(){
        candleStick.resize();
    });
});

// Basic Scatter Chart
$(function() {
    "use strict";
    var basicScatter = getChart("echart-basic_scatter");
    var app = {};
    var option = {};

    option = {
        grid: {
            left: '5%',
            right:'0%',
            top: '2%',
            bottom:'5%',
        },
        
        xAxis: {
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            splitLine: {
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLabel: {
                color: anchor.colors["gray-700"],
            }            
        },
        yAxis: {
            splitLine: {
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            axisLabel: {
                color: anchor.colors["gray-700"],
            }
        },
        series: [{
            symbolSize: 15,
            color: anchor.colors["pink"],
            data: [
                [10.0, 8.04],
                [8.0, 6.95],
                [13.0, 7.58],
                [9.0, 8.81],
                [11.0, 8.33],
                [14.0, 9.96],
                [6.0, 7.24],
                [4.0, 4.26],
                [12.0, 10.84],
                [7.0, 4.82],
                [5.0, 5.68]
            ],
            type: 'scatter'
        }]
    };
    if (option && typeof option === "object") {
        basicScatter.setOption(option, true);
    }
    $(window).on('resize', function(){
        basicScatter.resize();
    });
});

// Doughnut Chart
$(function() {
    "use strict";
    var doughnutChart = getChart("echart-doughnut");
    var app = {};
    var option = {};

    option = {
        grid: {
            left: '5%',
            right:'0%',
            top: '2%',
            bottom:'5%',
        },
        
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['Data1','Data2','Data3','Data4','Data5']
        },
        series: [
            {
                name:'Access source',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'Data1', itemStyle: {color: anchor.colors["indigo-darkest"],}},
                    {value:310, name:'Data2', itemStyle: {color: anchor.colors["indigo-dark"],}},
                    {value:234, name:'Data3', itemStyle: {color: anchor.colors["indigo"],}},
                    {value:135, name:'Data4', itemStyle: {color: anchor.colors["indigo-light"],}},
                    {value:1548, name:'Data5', itemStyle: {color: anchor.colors["indigo-lightest"],}}
                ]
            }
        ]
    };
    if (option && typeof option === "object") {
        doughnutChart.setOption(option, true);
    }
    $(window).on('resize', function(){
        doughnutChart.resize();
    });
});

// Bubble Chart
$(function() {
    var dom = document.getElementById("echart-Bubble_chart");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;

    var data = [
        [[28604,77,17096869,'Australia',2018],[31163,77.4,27662440,'Canada',2018],[1516,68,1154605773,'China',2018],[13670,74.7,10582082,'Cuba',2018],[28599,75,4986705,'Finland',2018],[29476,77.1,56943299,'France',2018],[31476,75.4,78958237,'Germany',2018],[28666,78.1,254830,'Iceland',2018],[1777,57.7,870601776,'India',2018],[29550,79.1,122249285,'Japan',2018],[2076,67.9,20194354,'North Korea',2018],[12087,72,42972254,'South Korea',2018],[24021,75.4,3397534,'New Zealand',2018],[43296,76.8,4240375,'Norway',2018],[10088,70.8,38195258,'Poland',2018],[19349,69.6,147568552,'Russia',2018],[10670,67.3,53994605,'Turkey',2018],[26424,75.7,57110117,'United Kingdom',2018],[37062,75.4,252847810,'United States',2018]],
        [[44056,81.8,23968973,'Australia',2019],[43294,81.7,35939927,'Canada',2019],[13334,76.9,1376048943,'China',2019],[21291,78.5,11389562,'Cuba',2019],[38923,80.8,5503457,'Finland',2019],[37599,81.9,64395345,'France',2019],[44053,81.1,80688545,'Germany',2019],[42182,82.8,329425,'Iceland',2019],[5903,66.8,1311050527,'India',2019],[36162,83.5,126573481,'Japan',2019],[1390,71.4,25155317,'North Korea',2019],[34644,80.7,50293439,'South Korea',2019],[34186,80.6,4528526,'New Zealand',2019],[64304,81.6,5210967,'Norway',2019],[24787,77.3,38611794,'Poland',2019],[23038,73.13,143456918,'Russia',2019],[19360,76.5,78665830,'Turkey',2019],[38225,81.4,64715810,'United Kingdom',2019],[53354,79.1,321773631,'United States',2019]]
    ];

    option = {
        
        legend: {
            right: 10,
            data: ['2018', '2019']
        },
        grid: {
            left: '5%',
            right:'5%',
            top: '0%',
            bottom:'5%',
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: anchor.colors["gray-100"],
                }
            },
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: anchor.colors["gray-100"],

                }
            },
            axisLine:{
                lineStyle:{
                    color: anchor.colors["gray-100"],
                }
            },
            scale: true
        },
        series: [{
            name: '2018',
            data: data[0],
            type: 'scatter',
            symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: anchor.colors["indigo"],
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: anchor.colors["indigo"],
                    }, {
                        offset: 1,
                        color: anchor.colors["indigo"],
                    }])
                }
            }
        }, {
            name: '2019',
            data: data[1],
            type: 'scatter',
            symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: anchor.colors["pink"],
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: anchor.colors["pink"],
                    }, {
                        offset: 1,
                        color: anchor.colors["pink"],
                    }])
                }
            }
        }]
    };;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}); 

// Customized Pie
$(function() {
    var dom = document.getElementById("echart-Customized_Pie");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
       // backgroundColor: '#fffff',

        title: {
            //text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
                color: anchor.colors["gray-200"],
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'Access source',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'One'},
                    {value:310, name:'Two'},
                    {value:274, name:'Three'},
                    {value:235, name:'Four'},
                    {value:400, name:'Five'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: anchor.colors["pink"],
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: anchor.colors["pink"],
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: anchor.colors["indigo"],
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}); 

// World Total Population
$(function() {
    var dom = document.getElementById("echart-World_Population");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = 'World Population';

    option = {
        title: {
           // text: 'World population',
           //subtext: 'Data from the network'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['2017', '2018']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                color: anchor.colors["gray-500"],
            }
        },
        yAxis: {
            type: 'category',
            data: ['Brazil','Indonesia','USA','India','China','World population'],            
            axisLabel: {
                color: anchor.colors["gray-500"],
            }
        },        
        series: [
            {
                color: anchor.colors["indigo"],
                name: '2017',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                color: anchor.colors["pink"],
                name: '2018',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}); 

// Gradient shadow
$(function() {
    var dom = document.getElementById("echart-Gradient_shadow");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    var dataAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
    var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
    var yMax = 500;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }

    option = {
        title: {
            text: 'Feature example：Gradient shadow',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        grid: {
            left: '5%',
            right:'5%',            
            bottom:'5%',
        },
        xAxis: {
            data: dataAxis,
            axisLabel: {
                inside: true,
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },            
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false,
                color: anchor.colors["gray-100"],
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: anchor.colors["gray-500"],
                }
            },         
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                data: dataShadow,
                animation: true
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: anchor.colors["indigo"]},
                                {offset: 0.5, color: anchor.colors["pink"]},
                                {offset: 1, color: anchor.colors["pink"]}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: anchor.colors["indigo"]},
                                {offset: 0.7, color: anchor.colors["indigo"]},
                                {offset: 1, color: anchor.colors["pink"]}
                            ]
                        )
                    }
                },
                data: data
            }
        ]
    };

    // Enable data zoom when user click bar.
    var zoomSize = 6;
    myChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

}); 

//Line Gradient
$(function() {
    var dom = document.getElementById("echart-Line_Gradient");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;

    data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];

    var dateList = data.map(function (item) {
        return item[0];
    });
    var valueList = data.map(function (item) {
        return item[1];
    });

    option = {

        // Make gradient line here
        visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
        }, {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            dimension: 0,
            min: 0,
            max: dateList.length - 1
        }],


        title: [{
            left: 'center',
            text: 'Gradient along the y axis'
        }, {
            top: '55%',
            left: 'center',
            text: 'Gradient along the x axis'
        }],
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            data: dateList
        }, {
            data: dateList,
            gridIndex: 1
        }],
        yAxis: [{
            splitLine: {show: false}
        }, {
            splitLine: {show: false},
            gridIndex: 1
        }],
        grid: [{
            bottom: '60%'
        }, {
            top: '60%'
        }],
        series: [{
            type: 'line',
            showSymbol: false,
            data: valueList
        }, {
            type: 'line',
            showSymbol: false,
            data: valueList,
            xAxisIndex: 1,
            yAxisIndex: 1
        }]
    };;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

}); 

function getChart(id){
    var dom = document.getElementById(id);
    return echarts.init(dom);
}