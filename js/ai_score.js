var yAxis1List = [];
var yAxis2List = [];
function loadFunction(data2_select, data3_select, optimization) {
    var file_all = 'data/ai_score_all.txt';
    var file_genuine = 'data/ai_score_genuine.txt'
    var file_fraud = 'data/ai_score_fraud.txt'
    $.when(
        $.get(file_all),
        $.get(file_genuine),
        $.get(file_fraud)
    ).done(function(data1, data2, data3) {
        console.log(data2[0])
        var lines;
        var xData =[];
        var yData1 = [];
        var yData2 = [];
        var forceChange = 0;
        if (data2_select == 1 && data3_select == 1) {
            lines = data2[0].split('\n')
            for (var i = 0; i < lines.length; i++) {
                var parts = lines[i].split(',');
                xData.push(parts[0]);
                yData1.push(parseFloat(parts[1]));
            }
            lines = data3[0].split('\n');
            for (var i = 0; i < lines.length; i++) {
                var parts = lines[i].split(',');
                yData2.push(parseFloat(parts[1]));
            }
        }
        else {
            var lines = []
            if (data2_select == 1) {
                lines = data2[0].split('\n');
                for (var i = 0; i < lines.length; i++) {
                    var parts = lines[i].split(',');
                    xData.push(parts[0]);
                    yData1.push(parseFloat(parts[1]));
                }
            }
            else if (data3_select == 1) {
                lines = data3[0].split('\n');
                for (var i = 0; i < lines.length; i++) {
                    var parts = lines[i].split(',');
                    xData.push(parts[0]);
                    yData2.push(parseFloat(parts[1]));
                }
            }
        }

        yAxis1List = []
        yAxis2List = []
        maxData1 = Math.max(...yData1);
        minData1 = Math.min(...yData1);
        lenData1 = yData1.length;
        intervalData1 = (maxData1 - minData1) / lenData1;
       
        for (var i = minData1; i <= maxData1; i+=intervalData1*3) {
            yAxis1List.push(Math.round(i));
        }
        if (yAxis1List.includes(maxData1) == false) {
            yAxis1List.push(maxData1);
        }
        console.log(maxData1);
        console.log(minData1);
        console.log(intervalData1);
        console.log(yAxis1List);
        maxData2 = Math.max(...yData2);
        minData2 = Math.min(...yData2);
        lenData2 = yData2.length;
        intervalData2 = (maxData2 - minData2) / lenData2;


        for (var i = minData2; i <= maxData2; i+=intervalData2) {
            yAxis2List.push(Math.round(i));
        }
        console.log(maxData2);
        console.log(minData2);
        console.log(intervalData2);
        console.log(yAxis2List);
        chart = Highcharts.chart('container', {

            chart: {
                type: 'line',
            },

            title: {
                text: 'AIスコア分布'
            },

            xAxis: {
                categories: xData
            },

            yAxis: [{
                type: 'line',

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: '件数',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    formatter: function() {
                        return Highcharts.numberFormat(this.value, 0, '', '');
                    },
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: '件数',
                    style: {
                        color: Highcharts.getOptions().colors[3]
                    }
                },
                labels: {
                    formatter: function() {
                        return Highcharts.numberFormat(this.value, 0, '', '');
                    },
                    style: {
                        color: Highcharts.getOptions().colors[3]
                    }
                },
                tickPositions: yAxis2List,
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
                name: '真正',
                color: '#000099',
                yAxis: 1,
                color: Highcharts.getOptions().colors[0],
                data: yData1
            },
            {
                name: '不正',
                color: '#FF8000',
                yAxis: 2,
                color: Highcharts.getOptions().colors[3],
                data: yData2
            }]
        }, function(chart) {
            if (forceChange == 0 && optimization == true) {
                if (data2_select == 1 && data3_select == 1) {
                    maxVal = Math.max(...yData1);
                    minVal = Math.min(...yData2);
                }
                else  if (data2_select == 1) {
                    maxVal = Math.max(...yData1);
                    minVal = Math.min(...yData1);
                }
                else if (data3_select == 1) {
                    maxVal = Math.max(...yData2);
                    minVal = Math.min(...yData2);
                }
                console.log(maxVal);
                console.log(minVal);
                if (Math.log(maxVal) - Math.log(minVal) > 3) {
                    chart.yAxis[1].update({ type: 'logarithmic', tickPositions:yAxis1List.map((v) => Math.log10(v)) });
                    chart.yAxis[2].update({ type: 'logarithmic', tickPositions: yAxis2List.map((v) => Math.log10(v)) });
                    $("#button").text('最適化無効');
                }
                else {
                    chart.yAxis[1].update({ type: 'line', tickPositions: yAxis1List});
                    chart.yAxis[2].update({ type: 'line', tickPositions: yAxis2List});
                    $("#button").text('最適化有効');
                }
            }
        });
    })
}
$(document).ready(function() {
    loadFunction()
  
    var optimization = 1;
    // Handle checkbox change event
    $('.checkbox').change(function() {
      var data2_select = 0;
      var data3_select = 0;
      var checkedValues = $('.checkbox:checked').map(function() {
        return $(this).val();
      }).get();
      console.log('Checked values:', checkedValues);
      $.each(checkedValues, function(index, value) {
        console.log(value);
        if (value == 2) data2_select = 1;
        if (value == 3) data3_select = 1;
      })
    //   var isChecked = $("#optCheck").prop("checked")
    //   console.log(isChecked)
      loadFunction(data2_select, data3_select, true);
    });

    $("#button").click(function(){
        forceChange = 1;
        var type = chart.yAxis[1].options.type
        console.log(type)
        if (type === "logarithmic") {
            chart.yAxis[1].update({ type: 'line', tickPositions: yAxis1List});
            chart.yAxis[2].update({ type: 'line', tickPositions: yAxis2List});
            $("#button").text('最適化有効');
        }
        else {
            chart.yAxis[1].update({ type: 'logarithmic', tickPositions: yAxis1List.map((v) => Math.log10(v)) });       
            chart.yAxis[2].update({ type: 'logarithmic', tickPositions: yAxis2List.map((v) => Math.log10(v)) });       
            $("#button").text('最適化無効');
        }
    });
  });