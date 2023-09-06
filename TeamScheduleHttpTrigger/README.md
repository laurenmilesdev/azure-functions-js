# TeamScheduleHttpTrigger function

## About

- Trigger type: HTTP
- Params: team (string), season (string, optional)

This function grabs an MLB team season schedule based on a specific team and season year. It is an HTTP trigger function that accepts a team parameter (team abbreviation) and an optional season parameter, in string form (ex. '2023'). If a season in not passed in, the current year is used.

## Execute

### Locally

There are two ways to trigger this function locally.

1. Navigate to the Azure tab, right click on the function name, and select **Execute Function Now**. This function requires a team parameter, so you will need to pass an object into the request body like so. Note that the date is optional.

   ```
   {
       "team": "DET",
       "season": "2023"
   }
   ```

2. You can use the generated URL for your function to trigger it within your web browser. To get the URL, you can navigate to the function in the Azure tab, right click on the function name, and select **Copy Function Url** or you can check the logs in your terminal once the app is running to get it. Copy and paste it into your web browser, add the team query paramter, and hit enter. An example of the URL is below.

   ```
   http://localhost:7071/api/TeamScheduleHttpTrigger?team=DET&season=2023
   ```
