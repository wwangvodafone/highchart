$(document).ready(function() {
    $.get('data/quality_report.txt', function(data){
        var lines = data.split('\n')
        var xData =[]
        var yData1 = []
        var yData2 = []
        for (var i = 0; i < lines.length; i++) {
            var parts = lines[i].split(',')
            xData.push(parts[0])
            yData1.push(parseFloat(parts[1]))
            yData2.push(parseFloat(parts[2]))
        }
        Highcharts.chart('container', {

            chart: {
                type: 'line',
            },

            title: {
                text: '品質レポート'
            },

            xAxis: {
                categories: xData,
                crosshair: true
            },

            yAxis: [{
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: "累積比率",
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true
            },
            {
                gridLineWidth: 0,
                max: 20,
                min: 1,
                tickInterval: 5,
                title: {
                    text: "バッグ件数",
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }
            }],

            tooltip: {
                crosshairs: true,
                shared: true,
            },

            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                x: 0,
                y: 0
            },

            series: [{
                name: '累積比率',
                type: 'spline',
                color: '#000099',
          
                data: yData2,
                tooltip: {
                    valueSuffix: '%'
                }
            },
            {
                name: 'バック件数',
                type: 'column',
                color: '#FF8000',
                yAxis: 1,
                data: yData1

            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        yAxis: [{
                            labels: {
                                align: 'right',
                                x: 0,
                                y: -6
                            },
                            showLastLabel: false
                        }, {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -6
                            },
                            showLastLabel: false
                        }, {
                            visible: false
                        }]
                    }
                }]
            }

        });
    })
});