$(document).ready(function() {
    $.get('data/fraud_detect_big.txt', function(data){
        var lines = data.split('\n')
        var xData =[]
        var yData1 = []
        var yData2 = []
        var forceChange = 0;
        for (var i = 0; i < lines.length; i++) {
            var parts = lines[i].split(',')
            xData.push(parts[0])
            yData1.push(parseFloat(parts[1]))
            yData2.push(parseFloat(parts[2]))
        }

        chart = Highcharts.chart('container', {

            chart: {
                type: 'line',
            },

            title: {
                text: '不正検知機能情報表示'
            },

            xAxis: {
                categories: xData
            },

            yAxis: [{
                type: 'line',

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: '適合率',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: '適合率',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
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
                name: 'ルールヒット適合率',
                color: '#000099',
                yAxis: 1,
                data: yData1
            },
            {
                name: 'ルールヒット適合率(信頼度込み)',
                color: '#FF8000',
                yAxis: 2,
                data: yData2
            }]
        }, function(chart) {
            if (forceChange == 0) {
                maxVal = Math.max(...yData1);
                minVal = Math.min(...yData1);
                if (Math.log(maxVal) - Math.log(minVal) > 3) {
                    chart.yAxis[1].update({ type: 'logarithmic'});
                    $("#button").text('Change to Line');
                }
                else {
                    chart.yAxis[1].update({ type: 'line'});
                    $("#button").text('Change to Logarithmic');
                }
                maxVal = Math.max(...yData2);
                minVal = Math.min(...yData2);
                if (Math.log(maxVal) - Math.log(minVal) > 3) {
                    chart.yAxis[2].update({ type: 'logarithmic'});
                    $("#button").text('Change to Line');
                }
                else {
                    chart.yAxis[2].update({ type: 'line'});
                    $("#button").text('Change to Logarithmic');
                }
            }
        });
    })

    $("#button").click(function(){
        forceChange = 1;

        var type = chart.yAxis[0].options.type
        if (type === "logarithmic") {
            chart.yAxis[0].update({ type: 'line'});
            $("#button").text('Change to logarithmic');
        }
        else {
            chart.yAxis[0].update({ type: 'logarithmic'});       
            $("#button").text('Change to line');
        }
    });
});