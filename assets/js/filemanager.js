window.Apex = {
    dataLabels: {
        enabled: false
    }
};
var optionsDonutTop = {
    chart: {
        height: 250,
        type: 'donut',
    },
    plotOptions: {
        pie: {
            size: 76,
            donut: {
                size: '72%',
            },
            dataLabels: {
                enabled: false
            }
        }
    },
    colors: ['#6435c9', '#2185d0', '#e03997', '#21ba45'],  
    series: [6, 8, 4, 3],
    labels: ['Images', 'Doc', 'PDF', 'Excel'],
    legend: {
        show: true,
    }
}

var chartDonut2 = new ApexCharts(document.querySelector('#Files_Statistics'), optionsDonutTop);
chartDonut2.render().then(function () {  
});