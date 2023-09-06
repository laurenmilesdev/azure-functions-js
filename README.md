# azure-functions-mlb

## About

This project contains multiple Azure functions used to get MLB statistics. These functions are:

1. **RealTimeStatsHttpTrigger** - an HTTP trigger function that returns game stats for a team in real time or past games. See the function's [README](GameStatsHttpTrigger/README.md) for more information on how to use this function.
2. **TeamScheduleHttpTrigger** - an HTTP trigger function that returns games schedule for a team based on the season. See the function's [README](TeamScheduleHttpTrigger/README.md) for more information on how to use this function.

## Local Development

To develop functions locally, there are some prerequisites to setup:

- Ensure Node.js 18.x or above is installed
- Install the [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) for VSCode
- Install [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Cwindows%2Ccsharp%2Cportal%2Cbash#install-the-azure-functions-core-tools)

## Run and Execture Functions Locally

### Run

Once the prerequisites are installed and working, you can now run your functions locally. To start your function, you can press the **F5** button while in VSCode, or you can open a terminal and run `func start`. If your environment is properly setup, you will see the function app starting up and a list of your functions and their corresponding URLs and method types.

### Execute

There are two ways you can execute your functions:

1. If you have installed the Azure Functions VSCode extension, navigate to the Azure tab, right click on your function name, and select **Execute Function Now**. Depending on the type of trigger and use of your function, you may need to specify the request body before it executes. To navigate to your function, follow the path below:

```
Workspace > Local Project > Functions > FUNCTION_NAME
```

2. You can use the generated URL for your function to trigger it within your web browser. To get the URL, you can navigate to the path above and select **Copy Function Url** or you can check the logs in your terminal once the app is running to get it. Copy and paste it into your web browser and press enter. Depending on the type of trigger and use of your function, you may need to specify query parameters within the URL.

## Testing

Testing has been configured with Jest. To run any tests, run `npm t` in the terminal. A GitHub workflow has been setup so that tests must pass before a pull request can be merged into the `main` branch.
