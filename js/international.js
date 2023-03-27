$(document).ready(function() {
    var options = {
        chart: {
            type: 'spline',
            renderTo: 'container'
        },
        xAxis: {
            type: 'dtetime',
            dateTimeLabelFormats: {
                month: '%B'
            }
        },
        title: {
            text: 'Making charts internationalizable / localizable'
        },
        series: [{
            name: 'Temperature?',
            data: [
                [Date.UTC(2023, 0, 1), 1],
                [Date.UTC(2023, 1, 1), 10],
                [Date.UTC(2023, 2, 1), 100],
                [Date.UTC(2023, 3, 1), 1000],
                [Date.UTC(2023, 4, 1), 10000],
                [Date.UTC(2023, 5, 1), 1000],
                [Date.UTC(2023, 6, 1), 100],
                [Date.UTC(2023, 7, 1), 1000],
                [Date.UTC(2023, 8, 1), 10000],
                [Date.UTC(2023, 9, 1), 1000],
                [Date.UTC(2023, 10, 1), 100],
                [Date.UTC(2023, 11, 1), 1],
            ]
          }]
    };
    var lang = {
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        thousandsSep: ' ',
        numericSymbols: [' mille']
    }
    var myTheme = {};
    myTheme.colors = ["#000000", "#ff0000", "#00ff00", "#0000ff"];
    myTheme.chart = {
        backgroundColor: '#cccccc'
    }
    myTheme.title = {
        style: {
            fontSize: '20px',
            fontFamily: '"Georgia", "Verdana", sans-serif'
        }
    }
    Highcharts.setOptions({lang: lang});
    var chart = new Highcharts.Chart(options);
});