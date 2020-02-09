var vm = new Vue({
	el: '#app',
    chart: null,
	data: {
        fields: ["det_uid", "array_x", "array_y", "row", "col", "MFELive",
                 "skewLive", "corrLive", "rmsLive", "gainLive", "DELive",
                 "normLive", "kurtLive", "ff", "resp", "presel"],
        vmap: "gainLive",
        vmin: 0.3,
        vmax: 2,
        todname: '',
        option: {
            title: {
                text: 'TOD Visualizer',
                subtext: '',
            },
            grid: [
                // array x, y scatter plot
                {top: 50, height: 400, left: 50, width: 400},
                // row, col scatter plot
                {top: 450, height: 400, left: 50, width: 400},
                // scatter plot
                {top: 50, height: 400, left: 500, width: 400},
                // scatter plot
                {top: 50, height: 400, left: 950, width: 400},
                // scatter plot
                {top: 50, height: 400, left: 1400, width: 400},
                // scatter plot
                {top: 500, height: 400, left: 1400, width: 400},
            ],
            // pathological parameter parallel axis plot
            parallel: {top: 500, height: 400, left: 500, width: 850},

            // define plot axes: cannot omit these definitions here
            xAxis: [
                {show: false, gridIndex: 0},
                {show: false, gridIndex: 1, name: 'row'},
                {show: true, gridIndex: 2, name: 'rms', min: 0, max: 6},
                {show: true, gridIndex: 3, name: 'rms', min: 0, max: 6},
                {show: true, gridIndex: 4, name: 'skew', min:-4, max:4},
                {show: true, gridIndex: 5, name: 'corr', min:0.95, max:1},
            ],
            yAxis: [
                {show: false, gridIndex: 0},
                {show: false, gridIndex: 1, name: 'col'},
                {show: true, gridIndex: 2, name: 'gain'},
                {show: true, gridIndex: 3, name: 'ff'},
                {show: true, gridIndex: 4, name: 'MFE', min:2, max:20},
                {show: true, gridIndex: 5, name: 'gain'},
            ],
            tooltip: {
                formatter: (param) => {
                    return "ID: " + param.data[0];
                }
            },
            brush: {
                brushLink: 'all',
                xAxisIndex: [],
                yAxisIndex: [],
                inBrush: {
                    opacity: 1
                }
            },
            visualMap: [
                {
                    type: 'piecewise',
                    selectedMode: 'multiple',
                    categories: ['A', 'B'],
                    dimension: 'pol_family',
                    left: 'right',
                    label: true,
                    bottom: 200,
                    inRange: {
                        opacity: {
                            'A': 1,
                            'B': 1,
                        },
                    },
                    outOfRange: {
                        opacity: {
                            'A': 0,
                            'B': 0,
                        },
                        color: '#ffffff',
                    },
                    //seriesIndex: [0,1],
                },
                {
                    type: 'continuous',
                    left: 'right',
                    min: 0.3,
                    max: 2.0,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    },
                    text: ['gainLive'],           // 文本，默认为数值文本
                    calculable: true,
                    dimension: 'gainLive',
                    precision: 2,
                    realtime: false,
                },
            ],
            // define series
            series: [
                {
                    type: 'scatter',
                    encode: {
                        x: 'array_x',
                        y: 'array_y'
                    },
                    symbolSize: 15,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                },
                {
                    type: 'scatter',
                    encode: {
                        x: 'row',
                        y: 'col'
                    },
                    symbolSize: 7,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                },
                {
                    type: 'scatter',
                    encode: {
                        x: 'rmsLive',
                        y: 'gainLive'
                    },
                    symbolSize: 5,
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                },
                {
                    type: 'scatter',
                    encode: {
                        x: 'rmsLive',
                        y: 'ff'
                    },
                    symbolSize: 5,
                    xAxisIndex: 3,
                    yAxisIndex: 3,
                },
                {
                    type: 'scatter',
                    encode: {
                        x: 'skewLive',
                        y: 'MFELive'
                    },
                    symbolSize: 5,
                    xAxisIndex: 4,
                    yAxisIndex: 4,
                },
                {
                    type: 'scatter',
                    encode: {
                        x: 'corrLive',
                        y: 'gainLive'
                    },
                    symbolSize: 5,
                    xAxisIndex: 5,
                    yAxisIndex: 5,
                },
                {
                    type: 'parallel'
                }
            ],
            parallelAxis: [
                {dim: 5, name: 'MFE', realtime: false, min:2, max:20},
                {dim: 6, name: 'skew', realtime: false, min:-4, max:4},
                {dim: 7, name: 'corr', realtime: false, min: 0.95, max: 1},
                {dim: 8, name: 'rms', realtime: false, min: 0.1, max: 6},
                {dim: 9, name: 'gain', realtime: false},
                {dim: 10, name: 'DE', realtime: false, min: 0.1, max:1000,},
                {dim: 11, name: 'norm', realtime: false},
                {dim: 12, name: 'kurt', realtime: false, min:-10, max:10},
                {dim: 13, name: 'ff', realtime: false},
                {dim: 14, name: 'resp', realtime: false, min: 1.3, max: 1.8},
                {dim: 15, name: 'presel', realtime: false, type: 'category', data: [0, 1]},
            ],
        }
    },
    methods: {
        updateVmap () {
            let option = {
                // first element is to ensure the first visual map remains unchanged
                visualMap: [{},{
                    dimension: this.vmap,
                    text: [this.vmap],
                    min: parseFloat(this.vmin),
                    max: parseFloat(this.vmax),
                }]
            }
            this.chart.setOption(option);
        },
        loadTOD () {
            this.chart.showLoading()
            let self = this
            $.get("data/" + this.todname + ".json", (json) => {
                let option = {
                    dataset: json,
                    title: {
                        subtext: "TOD: " + json.tod_name + "\nTag: " + json.tag,
                    }
                }
                self.fields = json.dimensions;
                self.chart.setOption(option);
                self.chart.hideLoading()
            })
        }
    },
    mounted() {
        // initialize materialcss
        $('select').formSelect();

        // initialize echarts
        this.chart = echarts.init(document.getElementById('main'));
        this.chart.setOption(this.option);
    }
})
