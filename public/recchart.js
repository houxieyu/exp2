/**
 * Created by hxy on 2017/4/12.
 */

function showchart(datas)
{
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart'), 'shine');

    option = {
        title: {
            text: 'PM监控数据图表'
        },
        tooltip: {
            trigger: 'axis'
        },

        grid: {
            left: '0%',
            right: '3%',
            bottom: '10%',
            containLabel: true
        },
        dataZoom:[{
            type:'slider'
        },{
          type:'inside'
        }],
        legend: {
            data:['温度','湿度','PM2.5','PM10','风速','风向','噪声'],
            selected: {
                '温度' : false,
                '湿度' : false,
                '风速' : false,
                '风向' : false,
                '噪声' : false
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time'
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'温度',
                type:'line',
                data:[]//
            },
            {
                name:'湿度',
                type:'line',
                data:[]
            },
            {
                name:'PM2.5',
                type:'line',
                data:[]
            },
            {
                name:'PM10',
                type:'line',
                data:[]
            },
            {
                name:'风速',
                type:'line',
                data:[]
            },
            {
                name:'风向',
                type:'line',
                data:[]
            },
            {
                name:'噪声',
                type:'line',
                data:[]
            }
        ]
    };
    datas.forEach(function(value,index) {
        //option.xAxis.data.unshift(value.time);
        value.time = value.time.replace(',',' ');
        option.series[0].data.unshift([value.time,value.wendu]);
        option.series[1].data.unshift([value.time,value.shidu]);
        option.series[2].data.unshift([value.time,value.pm25]);
        option.series[3].data.unshift([value.time,value.pm10]);
        option.series[4].data.unshift([value.time,value.fengsu]);
        option.series[5].data.unshift([value.time,value.fengxiang]);
        option.series[6].data.unshift([value.time,value.zaosheng]);
    });

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}