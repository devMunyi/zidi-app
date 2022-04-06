
$(document).ready(function() {
    var randomizeArray = function (arg) {
        var array = arg.slice();
        var currentIndex = array.length,
        temporaryValue, randomIndex;
  
        while (0 !== currentIndex) {  
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }  
        return array;
    }

    // data for the sparklines that appear below header area
    var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

    // FACEBOOK ENGAGED USERS
    var spark1 = {
        chart: {
            type: 'area',
            height: 160,
            sparkline: {
            enabled: true
            },
        },
        stroke: {
            width: 2
        },
        series: [{
            data: randomizeArray(sparklineData)
        }],
        colors: ['#DCE6EC'],
        title: {
            text: '18,254',
            offsetX: 0,
            style: {
                fontSize: '24px',
                cssClass: 'apexcharts-yaxis-title'
            }
        },
        subtitle: {
            text: 'Engaged User',
            offsetX: 0,
            style: {
                fontSize: '14px',
                cssClass: 'apexcharts-yaxis-title'
            }
        }
    }
    var spark1 = new ApexCharts(document.querySelector("#apex-chart-Facebook-1"), spark1);
    spark1.render();

    var spark1 = {
        chart: {
            type: 'area',
            height: 160,
            sparkline: {
            enabled: true
            },
        },
        stroke: {
            width: 2
        },
        series: [{
            data: randomizeArray(sparklineData)
        }],
        colors: ['#DCE6EC'],
        title: {
            text: '1,28,823',
            offsetX: 0,
            style: {
                fontSize: '24px',
                cssClass: 'apexcharts-yaxis-title'
            }
        },
        subtitle: {
            text: 'Page Impressions',
            offsetX: 0,
            style: {
                fontSize: '14px',
                cssClass: 'apexcharts-yaxis-title'
            }
        }
    }
    var spark1 = new ApexCharts(document.querySelector("#apex-chart-Facebook-2"), spark1);
    spark1.render();

    var spark1 = {
        chart: {
            type: 'area',
            height: 160,
            sparkline: {
            enabled: true
            },
        },
        stroke: {
            width: 2
        },
        series: [{
            data: randomizeArray(sparklineData)
        }],
        colors: ['#DCE6EC'],
        title: {
            text: '1,28,823',
            offsetX: 0,
            style: {
                fontSize: '24px',
                cssClass: 'apexcharts-yaxis-title'
            }
        },
        subtitle: {
            text: 'Page Impressions',
            offsetX: 0,
            style: {
                fontSize: '14px',
                cssClass: 'apexcharts-yaxis-title'
            }
        }
    }
    var spark1 = new ApexCharts(document.querySelector("#apex-chart-Facebook-3"), spark1);
    spark1.render();    
});

// basic-column
$(document).ready(function() {
    var options = {
        chart: {
            height: 350,
            type: 'bar',
        },
        colors: ['#6435c9', '#f66d9b'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'	
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series: [{
            name: 'Galned',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Lost',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }],
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },        
        fill: {
            opacity: 1

        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#apex-YouTube-Subscribers"),
        options
    );

    chart.render();
});

// LINKEDIN KEY METRICS
$(document).ready(function() {

    function generateData(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }
    var options = {
        chart: {
            height: 350,
            type: 'bubble',
            toolbar: {
                show: false,
            },
        },
        colors: ['#6435c9', '#f66d9b'],
        dataLabels: {
            enabled: false
        },
        series: [{
                name: 'Clicks',
                data: generateData(new Date('11 Feb 2019 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Likes',
                data: generateData(new Date('11 Feb 2019 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            }
        ],
        fill: {
            opacity: 0.8
        },
        xaxis: {
            tickAmount: 12,
            type: 'category',
        },
        yaxis: {
            max: 70
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#apex-linkedin-metrics"),
        options
    );

    chart.render();
});


// C3 Chart js
$(function(){
    "use strict";

    // We use an inline data source in the example, usually data would
    // be fetched from a server
    var data = [];
    var totalPoints = 200;
    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        // Do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;

            if (y < 0) {
                y = 0;
            } else if (y > 100) {
                y = 100;
            }

            data.push(y);
        }

        // Zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }
    var plot = $.plot('#flotChart', [ getRandomData() ], {
        series: {
            color: anchor.colors["indigo"],
            shadowSize: 0,
            lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: { colors: [ { opacity: 0 }, { opacity: 0.5 } ] }
            }
        },
        crosshair: {
            mode: 'x',
            color: anchor.colors["indigo-light"]
        },
        grid: { borderWidth: 0 },
        yaxis: {
            min: 0,
            max: 100,
            color: 'rgba(0,0,0,.06)',
            font: {
                size: 10,
                color: anchor.colors["gray-400"],
                family: 'Arial'
            },
            tickSize: 15
        },
        xaxis: { show: false }
    });
    function update() {
        plot.setData([getRandomData()]);
        // Since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        setTimeout(update, 2000);
    }
    update();
});
