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

## Dependencies

- axios: Used to send HTTP requests to the LaunchDarkly API.
- fs: Used to write data to files.
- json2csv: Used to convert JSON data to CSV format.
- moment: Used to format dates.
- readline: Used to read user input from the command line.
- inquirer: Used to prompt the user for input.

## Contributing

Contributions are welcome! Please submit a pull request or create an issue to get started.