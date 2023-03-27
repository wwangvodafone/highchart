$(document).ready(function() {
    ajaxFunction = function(gallery) {
        $.ajax({
            url: gallery.full,
            type: "GET",
            dataType: "text",
            success: function(data) {
                console.log(data)
                var lines = data.split('\n')
                var xData =[]
                var yData1 = []
                var yData2 = []
                var series = [{
                        name: 'ルールヒット適合率',
                        color: '#000099',
                        data: []
                    },
                    {
                        name: 'ルールヒット適合率(信頼度込み)',
                        color: '#FF8000',
                        data: []
                    }];
                for (var i = 0; i < lines.length; i++) {
                    var parts = lines[i].split(',')
                    xData.push(parts[0])
                    yData1.push(parseFloat(parts[1]))
                    yData2.push(parseFloat(parts[2]))
                    series[0].data.push(parseFloat(parts[1]))
                    series[1].data.push(parseFloat(parts[2]))
                }     
            const platOptions = {
                series: {
                    marker: {
                        radius: 5,
                        fillColor: 'steelblue'
                    }
                },
                yAxis:{
                    type: 'logarithmic'
                }
            }
            chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
                    type: 'line',
                },
                title: {
                    text: '不正検知機能情報表示'
                },
                xAxis: {
                    categories: xData
                },
                yAxis: {
                    title: {
                        text: "適合率"
                    }
                },

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

                series: series,
                platOptions: platOptions,
                exporting: {
                    buttons: {
                        contextButton: {
                            menuItems: ["viewFullscreen", "printChart"]
                        }
                    }
                }
            })
        }
        });
    }
    gallery = [];
    gallery[0] = {
      full: "http://localhost:3000/data"
    }
    gallery[1] = {
      full: "http://localhost:3000/data?value=1"
    }
    gallery[2] = {
        full: "http://localhost:3000/data?value=2"
      }
    counter = 0;
    $("#button").click( function() {
        counter = counter + 1;
        console.log(counter)
        ajaxFunction(gallery[counter % 3]);
    });
   dosomething = function() {
        ajaxFunction(gallery[counter]);
        }
});
   
