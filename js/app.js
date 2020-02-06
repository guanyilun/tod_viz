var vm = new Vue({
	el: '#app',
	data: {
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
		bl() {
			var that = this;
			var myChart = echarts.init(document.getElementById('main'));
			$.get('data/cases_echart.json', (json) => {
				that.option.series[0].data = json;
				that.option.title.text = "确诊病例";
				if (that.selected != "") {
					that.selected.style.backgroundColor = "black";
				}
				var opt = myChart.getOption();
				that.show_part(myChart, opt);
			})
		},
	},
	mounted() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));
        var self = this
        $.get("data/array.json", (json) => {
            self.option.dataset = json;
            console.log(self.option);
            myChart.setOption(self.option);

        })
		// myChart.setOption(this.option);
	}
})
