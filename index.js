const axios = require('axios');
const fs = require('fs');
const { parse } = require('json2csv');
const moment = require('moment');
const readline = require('readline');

const WRITE_JSON_FILE = false; // Set this to false if you don't want to write the JSON file

let inquirer;

// Function to format rules
function formatRules(rules) {
  return rules.map(rule => {
    const clauses = rule.clauses.map(clause =>
      `${clause.attribute} ${clause.op} ${clause.values.join(', ')}`
    ).join('; ');
    return `Clauses: [${clauses}], TrackEvents: ${rule.trackEvents}, Variation: ${rule.variation}, ID: ${rule._id}`;
  }).join(' | ');
}

// Function to format feature flags
function formatFeatureFlags(items, env) {
  return items.map(i => ({
    name: i.name,
    key: i.key,
    kind: i.kind,
    creationDate: moment(i.creationDate).format('YYYY-MM-DD HH:mm:ss'),
    lastModified: moment(i.environments[env].lastModified).format('YYYY-MM-DD HH:mm:ss'),
    flagValue: i.environments[env].on.toString(),
    rules: formatRules(i.environments[env].rules),
    email: i._maintainer ? i._maintainer.email : 'NA'
  }));
}

// Function to write JSON and CSV files
async function writeFiles(env, data) {
  const dir = './data';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  if (WRITE_JSON_FILE) {
    const jsonFile = `${dir}/feature_flag_list_${env}.json`;
    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 4));
    console.log(`file ${jsonFile} created!`);
  }

  const featureFlagList = formatFeatureFlags(data.items, env);
  const csvFile = `${dir}/feature_flag_list_${env}.csv`;
  const csv = parse(featureFlagList, { fields: ['name', 'key', 'kind', 'creationDate', 'lastModified', 'flagValue', 'rules', 'email'] });
  fs.writeFileSync(csvFile, csv);
  console.log(`Done! file saved: ${csvFile}`);
}

// Function to get authentication method and value
async function getAuth() {
  if (!inquirer) {
    inquirer = (await import('inquirer')).default;
  }

  const { authMethod } = await inquirer.prompt({
    type: 'list',
    name: 'authMethod',
    message: 'Please select the authentication method:',
    choices: ['Cookie', 'Token']
  });

  const { authValue } = await inquirer.prompt({
    type: 'input',
    name: 'authValue',
    message: `Please enter the ${authMethod} value:`
  });

  return { method: authMethod, value: authValue };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter the environment: ', async (env) => {
  const { method, value } = await getAuth();

  const url = `https://app.launchdarkly.com/api/v2/flags/default?env=${env}&summary=false`;
  const headers = { 'Content-Type': 'application/json' };
  if (method.toLowerCase() === 'cookie') {
    headers.Cookie = value;
  } else if (method.toLowerCase() === 'token') {
    headers.Authorization = value;
  }

  try {
    const response = await axios.get(url, { headers });
    console.log(response.status);
    await writeFiles(env, response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('The environment does not exist. Please check your input and try again.');
    } else {
      console.error(error);
    }
  }

  rl.close();
});
