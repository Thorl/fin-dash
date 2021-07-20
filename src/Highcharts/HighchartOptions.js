const dummyData = [];

for (let i = 0; i <= 366; i++) {
  dummyData.push(i);
}

const highchartOptions = {
  title: {
    text: "Dummy Chart",
  },
  chart: {
    marginLeft: 7,
    marginRight: 7,
    borderWidth: 1,
    borderColor: "#0a8e26",
    height: 500,
    width: 599,
  },
  rangeSelector: {
    buttons: [
      {
        type: "year",
        count: 1,
        text: "1d",
        title: "View 1 day",
        dataGrouping: {
          forced: true,
          units: [["day", [1]]],
        },
      },
      {
        type: "week",
        count: 1,
        text: "1w",
        title: "View 1 week",
        dataGrouping: {
          forced: true,
          units: [["day", [1]]],
        },
      },
      {
        type: "month",
        count: 1,
        text: "1m",
        title: "View 1 month",
        dataGrouping: {
          forced: true,
          units: [["day", [1]]],
        },
      },
      {
        type: "month",
        count: 3,
        text: "3m",
        title: "View 3 months",
        dataGrouping: {
          forced: true,
          units: [["day", [1]]],
        },
      },
      {
        type: "year",
        count: 1,
        text: "1y",
        title: "View 1 year",
        dataGrouping: {
          forced: true,
          units: [["day", [1]]],
        },
      },
      {
        type: "ytd",
        text: "YTD",
        title: "View year to date",
      },
      {
        type: "all",
        text: "All",
        title: "View all",
      },
    ],
  },
  series: [
    {
      name: "Dummy Corp",
      pointStart: Date.UTC(2020, 0, 1),
      pointInterval: 24 * 3600 * 1000,
      data: dummyData,
    },
  ],
};

export default highchartOptions;
