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
        type: "day",
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
          units: [["week", [1]]],
        },
      },
      {
        type: "month",
        count: 1,
        text: "1m",
        title: "View 1 month",
        dataGrouping: {
          forced: true,
          units: [["month", [1]]],
        },
      },
      {
        type: "month",
        count: 6,
        text: "6m",
        title: "View 6 months",
        dataGrouping: {
          forced: true,
          units: [["month", [6]]],
        },
      },
      {
        type: "year",
        count: 1,
        text: "1y",
        title: "View 1 year",
        dataGrouping: {
          forced: true,
          units: [["year", [1]]],
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
      data: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
    },
  ],
};

export default highchartOptions;
