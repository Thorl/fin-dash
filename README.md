# finDash

Hello! My name is Thor, and you’re currently reading the first readme, of the first website, that I’ve ever built. The motivation to build this web app is to learn web development and the React library, so that I can get a job as a frontend developer.

The best way to learn coding is to create something, and this is what I chose as my first project. I was inspired by the website Dashboard.io, which serves the same kind of purpose as finDash, but lacks charts, which made me think it would be great to build a website that provides this functionality. It also just so happens that I’m interested in the areas of investing and visualizing data, so it was a perfect match.

But I’m getting a bit ahead of myself. What is finDash exactly, and what does it do?

## Description

finDash is a web app that lets the user make a dashboard consisting of candlestick charts of stock, currency, and cryptocurrency prices.

It’s made up of a header, where an “Add chart” button is located, and the dashboard area below, where the added charts show up.

Clicking the “Add chart” button opens up a modal, which consists of an input field for search queries, and a field below for outputting the search results. Each search result is made up of four parts: the type of result (stock, currency, or crypto), symbol(s) (the stock ticker, or currency/crypto codes), full name(s) of the ticker, or currency/crypto symbols, and a “+” button to add the chart to the dashboard. This is denoted by the headers “Type”, “Symbol”, and “Name”.

After a chart has been added to the dashboard, the user can enter the time period they’d like to look at prices for by clicking the date input fields. Alternatively, they can use one of the preconfigured ranges in the chart by clicking its corresponding button. The available options are: 1 day (1d), 1 week (1w), 1 month (1m), 3 months (3m), 1 year (1y), year-to-date (YTD), and the entire available time period (All).

A chart can be removed by clicking the “X” button in its top right corner.

## Technologies

Like previously mentioned, the main reason for building this app is to learn the React library. I picked it, because it’s the most popular Javascript library in the world, and therefore I figured, knowing it would give me the best chances of getting a frontend developer job. Which is my ultimate goal.

With the purpose of the app being to display charts with stock, currency, and crypto prices, I knew I needed to find a charting library to create the charts, and an API to get the price data. In the process of selecting these, I set up some criteria:

- They both needed to be free, easy to use, and have good documentation.

- The charting library needed to be able to create candlestick charts, and use range selectors for predefined time periods.

- The API should provide 10+ years of historical prices (more on this later, and why I should’ve had some more criteria here).

With these criteria in mind, I chose [Highcharts](https://www.highcharts.com/) as my charting library, and [Alpha Vantage](https://www.alphavantage.co/) as my API.

Highcharts is quite easy to use, has a tonne of customization options, detailed documentation with live examples, a super-good support forum, and a wrapper for React, which means you can use the charts as components. The fact that the free version is so comprehensive, and that you can even get the full version for free if your use case is non-commercial, makes this the ideal choice for a personal project.

Alpha Vantage is on the one hand very easy to use, and you get 20 years of historical prices, but on the other hand, the free version has some clear limitations. It only gives you 5 calls per minute. As a beginner, this was something I failed to consider when picking my API. I only realized what the limit was well after I had implemented it in my project, and that it wouldn’t be enough. This point should’ve been a part of my initial choosing criteria. If you want to get more calls, you have to buy the premium version, which starts at 50$/month. Quite expensive for a personal project. Another drawback is that it doesn’t provide an endpoint for searching for currencies or cryptocurrencies. Instead, there’s only a link to a .CSV file with the supported currencies. Among all the free APIs out there, it definitely is one of the best ones. However, for my specific project, its limitations are a bit too big to make it the optimal choice. Still, it’s acceptable as a first version and “proof-of-concept” for the app.

## Future plans

These are the main plans for the near future:

- Change the API: The current API doesn’t provide enough calls per minute for an optimal user experience. It also doesn’t have an endpoint for searching currencies and cryptos. That means I have to use a hard-coded solution, which is far from ideal. The next API has to address both of these issues.

- Add a “greeting modal”: Currently, there’s only a prompt on the empty dashboard telling the user to “Press the ‘Add chart’ button to start adding charts”. I want first-time visitors to be greeted with a pop-up window that explains the app in more detail.
