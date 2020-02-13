var vm = new Vue({
	el: '#app',
    chart: null,
	data: {
        metadata: {
            // fields that can be used for visual mapping
            fields: ["det_uid", "array_x", "array_y", "row", "col", "MFELive",
                     "skewLive", "corrLive", "rmsLive", "gainLive", "DELive",
                     "normLive", "kurtLive", "ff", "resp", "presel", "sel"],
            // shortter name for plot display and use as look up table
            variables: {
                MFE: 'MFELive',
                skew: 'skewLive',
                corr: 'corrLive',
                rms: 'rmsLive',
                gain: 'gainLive',
                DE: 'DELive',
                norm: 'normLive',
                kurt: 'kurtLive',
                ff: 'ff',
                resp: 'resp'
            },
            // plot ranges definition
            ranges: {
                MFE: {dim: 5, min: 2, max: 20},
                skew: {dim: 6, min: -4, max: 4},
                corr: {dim: 7, min: 0.95, max: 1},
                rms: {dim: 8, min: 0, max: 6},
                gain: {dim: 9, min: 0, max: 2},
                DE: {dim: 10, min: 0.1, max:1000},
                norm: {dim: 11, min: 0, max:10000},
                kurt: {dim: 12, min: -10, max: 10},
                ff: {dim:13, min:-2, max:4},
                resp: {dim: 14, min: 1.3, max: 1.8},
            },
            // plot axis definition
            plots: [
                {gridIndex: 2, x: 'rms', y: 'gain'},
                {gridIndex: 3, x: 'rms', y: 'ff'},
                {gridIndex: 4, x: 'skew', y: 'MFE'},
                {gridIndex: 5, x: 'corr', y: 'gain'}
            ],
        },
        vmap: "gainLive",
        vmin: 0.3,
        vmax: 2,
        todname: '1503213945.1503413441.ar4',
        todList: [],
        todIndex: 0,
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
                {show: false, gridIndex: 1, name: 'col'},
                {show: true, gridIndex: 2, name: 'rms', min: 0, max: 6},
                {show: true, gridIndex: 3, name: 'rms', min: 0, max: 6},
                {show: true, gridIndex: 4, name: 'skew', min:-4, max:4},
                {show: true, gridIndex: 5, name: 'corr', min:0.95, max:1},
            ],
            yAxis: [
                {show: false, gridIndex: 0},
                {show: false, gridIndex: 1, name: 'row'},
                {show: true, gridIndex: 2, name: 'gain'},
                {show: true, gridIndex: 3, name: 'ff'},
                {show: true, gridIndex: 4, name: 'MFE', min:2, max:20},
                {show: true, gridIndex: 5, name: 'gain'},
            ],
            tooltip: {
                formatter: (param) => {
                    return "ID: " + param.data[0] + "<br>"
                        + "Row: " + param.data[3] + "<br>"
                        + "Col: " + param.data[4] + "<br>"
                        + "Pol-family: " + param.data[16] + "<br>"
                        + "Bias-line: " + param.data[17] + "<br>"
                        + "Optical-sign: " + param.data[18] + "<br>"
                }
            },
            brush: {
                brushLink: 'all',
                xAxisIndex: [],
                yAxisIndex: [],
                inBrush: {
                    opacity: 1
                },
                throttleType: 'debounce',
                throttleDelay: 2000,
            },
            visualMap: [
                {
                    type: 'piecewise',
                    selectedMode: 'multiple',
                    categories: ['A', 'B'],
                    dimension: 'pol_family',
                    left: 'right',
                    label: true,
                    bottom: 250,
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
                    bottom: 50,
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
                        x: 'col',
                        y: 'row'
                    },
                    symbolSize: 10,
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
                {dim: 9, name: 'gain', realtime: false, min: 0, max: 2},
                {dim: 10, name: 'DE', realtime: false, min: 0.1, max:1000},
                {dim: 11, name: 'norm', realtime: false, min: 0, max:10000},
                {dim: 12, name: 'kurt', realtime: false, min:-10, max:10},
                {dim: 13, name: 'ff', realtime: false, min:-2, max: 4},
                {dim: 14, name: 'resp', realtime: false, min: 1.3, max: 1.8},
                {dim: 15, name: 'presel', realtime: false, type: 'category', data: [0, 1]},
                {dim: 19, name: 'sel', realtime: false, type: 'category', data: [0, 1]},
            ],
        }
    },
    methods: {
        updateVmap () {
            let option = {
                // first element is to ensure the first visual map remains unchanged
                visualMap: [{},{
                    dimensions: this.vmap,
                    text: [this.vmap],
                    min: parseFloat(this.vmin),
                    max: parseFloat(this.vmax),
                }]
            }
            this.chart.setOption(option);
        },
        loadTOD () {
            let self = this
            $.get("data/" + this.todname + ".json", (json) => {
                let option = {
                    dataset: {
                        dimensions: self.option.dataset.dimensions,
                        source: json.source
                    },
                    title: {
                        subtext: "TOD: " + self.todname + "\nTag: " + json.tag,
                    }
                }
                self.chart.setOption(option);
            })
        },
        loadNextTod (i) {
            this.todIndex = Math.min(this.todIndex + i, this.todList.length-1);
            this.todname = this.todList[this.todIndex];
            this.loadTOD();
        },
        loadPrevTod (i) {
            this.todIndex = Math.max(this.todIndex - i, 0);
            this.todname = this.todList[this.todIndex];
            this.loadTOD();
        },
        updateRanges () {
            let xAxis = [];
            let yAxis = [];
            let parallelAxis = [];
            let self = this;
            this.option.parallelAxis.forEach((p,i) => {
                if (p.name in self.metadata.ranges) {
                    p.min = self.metadata.ranges[p.name].min;
                    p.max = self.metadata.ranges[p.name].max;
                    parallelAxis.push(p)
                } else {
                    parallelAxis.push(p)
                }
            })
            this.option.xAxis.forEach((a,i) => {
                if (a.name in self.metadata.ranges) {
                    a.min = self.metadata.ranges[a.name].min;
                    a.max = self.metadata.ranges[a.name].max
                    xAxis.push(a);
                } else {
                    xAxis.push(a);
                }
            })
            this.option.yAxis.forEach((a,i) => {
                if (a.name in self.metadata.ranges) {
                    a.min = self.metadata.ranges[a.name].min;
                    a.max = self.metadata.ranges[a.name].max
                    yAxis.push(a);
                } else {
                    yAxis.push(a);
                }
            })
            let option = {
                xAxis: xAxis,
                yAxis: yAxis,
                parallelAxis: parallelAxis
            };
            this.chart.setOption(option);
            // update this.option to make sure other methods
            // share the same options
            this.option.xAxis = xAxis;
            this.option.yAxis = yAxis;
            this.option.parallelAxis = parallelAxis;
        },
        updatePlots () {
            let xAxis = [];
            let yAxis = [];
            let series = [];
            let self = this;
            // update x axis
            this.option.xAxis.forEach((a,i) => {
                // metadata.plots has an offset of 2
                if (i >= 2) {
                    let ax = {
                        show: true,
                        gridIndex: i,
                        name: self.metadata.plots[i-2].x
                    };
                    // add bounds if it is specified
                    if (ax.name in self.metadata.ranges) {
                        ax.min = self.metadata.ranges[ax.name].min;
                        ax.max = self.metadata.ranges[ax.name].max;
                    }
                    xAxis.push(ax)
                } else {
                    xAxis.push(a);
                }
            });
            // update y axis
            this.option.yAxis.forEach((a,i) => {
                // metadata.plots has an offset of 2
                if (i >= 2) {
                    let ax = {
                        show: true,
                        gridIndex: i,
                        name: self.metadata.plots[i-2].y
                    };
                    // add bounds if it is specified
                    if (ax.name in self.metadata.ranges) {
                        ax.min = self.metadata.ranges[ax.name].min;
                        ax.max = self.metadata.ranges[ax.name].max;
                    }
                    yAxis.push(ax)
                } else {
                    yAxis.push(a);
                }
            });
            // update series
            this.option.series.forEach((s,i) => {
                if (i >= 2 && s.type == 'scatter') {
                    series.push({
                        type: 'scatter',
                        encode: {
                            x: self.metadata.variables[self.metadata.plots[i-2].x],
                            y: self.metadata.variables[self.metadata.plots[i-2].y],
                        },
                        symbolSize: 5,
                        xAxisIndex: i,
                        yAxisIndex: i,
                    })
                } else {
                    series.push(s)
                }
            });
            let option = this.chart.getOption()
            option.xAxis = xAxis;
            option.yAxis = yAxis;
            option.series = series;
            // just use setOption sometimes doesn't update the axis
            // i am forced to dispose the existing chart and recreate a new one
            // this is also equivalent to this.chart.clear()
            // this.chart.dispose();
            // this.chart = echarts.init(document.getElementById('main'));
            // this.chart.clear()
            // update: found a better approach that is to set notMerge to true
            // and replace the entire option object
            this.chart.setOption(option, notMerge=true);
            // update this.option to make sure other methods
            // share the same options
            this.option.xAxis = xAxis;
            this.option.yAxis = yAxis;
            this.option.series = series;
        }
    },
    mounted() {
        // initialize materialcss
        $('select').formSelect();

        // initialize echarts
        this.chart = echarts.init(document.getElementById('main'));
        this.chart.showLoading()
        // get metadata
        let self = this
        $.get("data/metadata.json", (json) => {
            self.option.dataset = {
                dimensions: json.dimensions,
                source: null
            };
            self.todname = json.tod_list[0];
            self.todList = json.tod_list;
            // also load the first tod
            $.get("data/" + self.todname + ".json", (json) => {
                self.option.dataset.source = json.source;
                self.option.title.subtext = "TOD: " + self.todname + "\nTag: " + json.tag
                self.chart.setOption(self.option)
                self.chart.hideLoading()
            })
        })
        // setup chart report when brush is used
        this.chart.on('brushSelected', function (params) {
            let brushComponent = params.batch[0];
            // all of the plots are linked to the same dataset so
            // i only need the first plot here
            let dataIndex = brushComponent.selected[0].dataIndex;
            let option = self.chart.getOption();
            let outputStr = ""
            for (var i=0; i< dataIndex.length; i++) {
                let d = option.dataset[0].source[dataIndex[i]];
                if (i == 0) {
                    outputStr += "det_uid=[" + d[0] + ",";
                } else if (i != dataIndex.length-1) {
                    outputStr += d[0] + ",";
                } else {
                    outputStr += d[0] + "]";
                    console.log(outputStr);
                }
            }
        });
        // setup keyboard short-cuts
        $(document).keyup(function(event) {
	    if (event.keyCode == 74) {
                if (event.shiftKey) self.loadNextTod(10);
                else self.loadNextTod(1);
	    } else if (event.keyCode == 75) {
                if (event.shiftKey) self.loadPrevTod(10);
                else self.loadPrevTod(1);
	    }
	});
    }
})
