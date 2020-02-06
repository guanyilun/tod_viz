var vm = new Vue({
	el: '#app',
	data: {
        chart: {},
        option: {
            // cannot omit the axis definition here
            grid: [{
                top: 10,
                height: 400,
                left: 10,
                width: 400,
            }],
            xAxis: {
                show: false,
            },
            yAxis: {
                show: false,
            },
            brush: {
                brushLink: 'all',
                xAxisIndex: [],
                yAxisIndex: [],
                inBrush: {
                    opacity: 1
                },
            },
            visualMap: {
                type: 'continuous',
                left: 'right',
                min: 0.6,
                max: 1.6,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                },
                text: ['gainLive'],           // 文本，默认为数值文本
                calculable: true,
                dimension: 'gainLive'
            },
            // define series
            series: [
                {
                    type: 'scatter',
                    encode: {
                        x: 'array_x',
                        y: 'array_y'
                    },
                    symbolSize: 15,
                },
                {
                    type: 'parallel'
                }
            ],
            parallelAxis: [
                {dim: 5, name: 'MFE'},
                {dim: 6, name: 'skew'},
                {dim: 7, name: 'corr'},
                {dim: 8, name: 'rms'},
                {dim: 9, name: 'gain'},
                {dim: 10, name: 'DE'},
                {dim: 11, name: 'jump'},
                {dim: 12, name: 'norm'}
            ],
            parallel: {
                top: 10,
                height: 400,
                left: 500,
                width: 800,
            },
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
            self.chart.setOption(self.option);

        })
    }
})
