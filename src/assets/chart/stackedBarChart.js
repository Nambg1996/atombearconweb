import Chart from "chart.js/dist/Chart.bundle";
import $ from "jquery";




export const stackedBarChart  = (inputChartData) => {

 /*  const inputChartData={
    id: "myChart",
    prefix:"Kg",
    lables:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    data1:[1, 3, 5, 6, 7, 8],
    data2:[1, 4, 10, "", 15, 8],
    data3:[0, 3, 5, 7, 9, 8],
    nameChart1: "chat 1",
    nameChart2: "chat 2",
    nameChart3: "chat 3",
    classChart:"custom_chart",
    getMaxYaxis() {
      return Math.max(...this.data1,...this.data2,...this.data3);
  }
}
    stackedBarChart(inputChartData)
   */
  
    const {id,prefix,lables,data1,data2,data3,classChart,nameChart1,nameChart2,nameChart3}=inputChartData

  // ---reset chart if not repeat old chart --//
  $("#" + id).remove();
  $("."+classChart).append(`<canvas id="${id}"><canvas>`);
  // -------- --------------------------------//

  const ctx = document.getElementById(id);
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: lables,
      datasets: [
        {
          type: "bar",
          label: nameChart1,
          yAxisID: "A",
          data: data1,
          backgroundColor: "rgb(65,108,186,.7)",
          borderColor: ["rgb(65,108,186,.7)"],
          borderWidth: 1,
        },
        {
          type: "line",
          label: nameChart2,
          yAxisID: "A",
          data: data2,
          backgroundColor: "transparent",
          borderColor: ["rgb(250,200,88)"],
          borderWidth: 2,
        },

        {
          type: "bar",
          label: nameChart3,
          yAxisID: "A",
          data: data3,
          backgroundColor: "green",
          borderColor: "green",
          borderWidth: 2,
        },

      ],
    },

    options: {
      tooltips: {
        mode: "nearest",
      },
      scales: {
        yAxes: [
          {
            id: "A",
            type: "linear",
            position: "left",
            ticks: {
              fontColor: "#989898",
              callback: function (value) {
                return value + prefix;
              },
            },
            stacked: true
          },
         
        ],
        xAxes: [{
          stacked: true,
       }]
      },
      elements: {
        line: {
          tension: 0,
        },
        point: {
          radius: 4,
          borderWidth: 2,
          pointStyle: "circle",
        },
      },
    },
  });

 
  eventClickOnchart(id, myChart);

// configure max Min yaxis  chart 
  myChart.options.scales.yAxes[0].ticks.max = inputChartData.getMaxYaxis()*1.2;
  myChart.options.scales.yAxes[0].ticks.min = 0;
  myChart.update();

};

export function eventClickOnchart(id, myChart) {
  document.getElementById(id).onclick = function (evt) {
    var activePoints = myChart.getElementsAtEventForMode(evt, 'point', myChart.options);
    var firstPoint = activePoints[0];
    var label = myChart.data.labels[firstPoint._index];
    var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
    console.log(label + ": " + value);





  };
}
