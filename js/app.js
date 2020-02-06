var vm = new Vue({
	el: '#app',
	data: {
        chart: {},
        option: {
            // cannot omit the axis definition here
            xAxis: {},
            yAxis: {},
            // define series
            series: [{
                type: 'scatter',
                encode: {
                    x: 'array_y',
                    y: 'array_x'
                },
                symbolSize: 15,
            }]
        }
    },
    methods: {
        bl() {},
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById('main'));
        var self = this
        $.get("data/array.json", (json) => {
            self.option.dataset = json;
            console.log(self.option);
            self.chart.setOption(self.option);

        })
    }
})
