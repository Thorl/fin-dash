const HighchartsConfig = {
  plotOptions: {
    candlestick: {
      color: "red",
      upColor: "green",
    },
  },
  chart: {
    marginLeft: 7,
    marginRight: 7,
    borderWidth: 1,
    borderColor: "#0a8e26",
    height: 500,
    width: 699,
  },
  rangeSelector: {
    buttons: [
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
        dataGrouping: {
          forced: true,
          units: [["day", [1]]],
        },
      },
      {
        type: "all",
        text: "All",
        title: "View all",
        dataGrouping: {
          forced: true,
          units: [["month", [3]]],
        },
      },
    ],
  },
};

export default HighchartsConfig;
