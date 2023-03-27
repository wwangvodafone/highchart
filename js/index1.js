$(document).ready(function() {
    var options = {
            chart: {
                 type: 'bar',
                 renderTo: 'container',
                 events: {
                    load: function() {
                    // maintain a reference to the chart
                    var self = this;
                    $.ajax('http://10.27.114.46:8000/jsonp/series', {
                        dataType: 'jsonp',
                        success: function(data) {
                            self.series[0].setData(data);
                        }
                    });
                 }
                },
            },
            title: {
                text: 'Using AJAX for polling charts'
            },
            series: [{
                name: 'AJAX data (series)',
                data: []
            }]
        };

    var chart = new Highcharts.Chart(options);
});