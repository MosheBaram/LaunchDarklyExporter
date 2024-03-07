# LaunchDarkly Feature Flag Exporter

This project is a utility for exporting feature flags from LaunchDarkly. It fetches feature flags from a specified environment and writes them to a CSV file. If desired, it can also write the raw JSON data to a file.

## Features

- Fetches feature flags from a specified LaunchDarkly environment
- Formats feature flags into a human-readable format
- Writes feature flags to a CSV file
- Optionally writes raw JSON data to a file

## How It Works

1. The user is prompted to enter the environment from which to fetch feature flags.
2. The user is prompted to select an authentication method (either Cookie or Token) and enter the corresponding value.
3. The program sends a GET request to the LaunchDarkly API to fetch the feature flags.
4. The feature flags are formatted into a human-readable format.
5. The formatted feature flags are written to a CSV file.
6. If the `WRITE_JSON_FILE` constant is set to `true`, the raw JSON data is also written to a file.

## Usage

1. Clone the repository.
2. Run `npm install` to install the required dependencies.
3. Run the program with `node index.js`.
4. Follow the prompts to fetch and export feature flags.

## Extra information

- Currently we extract the following columns: 'name', 'key', 'kind', 'creationDate', 'lastModified', 'deprecated', 'flagValue', 'rules', 'email'.
That list is far from being the complete information being returned. In order to get the full raw JSON response, you can set the variable WRITE_JSON_FILE in index.js to true. In order to add more fields to the export, you would need to map the relevant piece of information in the formatFeatureFlags function, and add a title for it in the csvFieldsArray constant. Please note order of items is important, so if you add a new column in the end, make sure to add the new column name in the end as well.

## Authentication

- In order to authenticate yourself, you would need an API key or a Cookie. A Cookie can be easily achieved when visiting a webpage of LaunchDarkly that is making API requests. For example, if I visit this webpage: <https://app.launchdarkly.com/default/production-nl/features> with my DevTools open, I  will see a request to this URL: <https://app.launchdarkly.com/internal/command-bar-accesses>. In the request headers, under the Cookie section, you will find the Cookie's value. Just copy the whole value, and paste it in the tool when being asked to, and then press enter. The Cookie / Key are never being persistently stored and are used only during the run of the application in memory to be able to make API requests.

## Dependencies

- axios: Used to send HTTP requests to the LaunchDarkly API.
- fs: Used to write data to files.
- json2csv: Used to convert JSON data to CSV format.
- moment: Used to format dates.
- readline: Used to read user input from the command line.
- inquirer: Used to prompt the user for input.

## Contributing

Contributions are welcome! Please submit a pull request or create an issue to get started.