const headerNode = document.getElementById("headers");
const secretsHeaderNode = document.getElementById("secretsHeader");
const secretsFileNode = document.getElementById("secretsFile");
const parametersHeaderNode = document.getElementById("parametersHeader");
const parametersFileNode = document.getElementById("parametersFile");
const node = document.getElementById("loadedConfig");
const resultsNode = document.getElementById("results");

const parsed = (jsonText) => JSON.parse(jsonText);

const fileReader = new FileReader();

var secrets = {};
var parameters = {};
addTitle(headerNode, "h2", "Smartcontract Caller");
addText(headerNode, "Brought to you with care by : Alice in Cryptoland");
addHLine(headerNode);
addTitle(headerNode, "h4", "Please input the config files");
addTitle(secretsHeaderNode, "h3", "Secrets");
addTitle(parametersHeaderNode, "h3", "Parameters");

function handleFileSelect(evt) {
  fileReader.readAsText(evt.target.files[0]);
  fileReader.onload = (e) => {
    if (evt.target.matches("#inputFileSecrets")) {
      secrets = parsed(e.target.result);
      removeAllChildNodes(secretsFileNode);
      addText(secretsFileNode, "Loaded secrets : ");
      addLineBreak(secretsFileNode);
      prettyPrintJSON(secretsFileNode, secrets);
    } else if (evt.target.matches("#inputFileParameters")) {
      parameters = parsed(e.target.result);
      removeAllChildNodes(parametersFileNode);
      addText(parametersFileNode, "Loaded parameters : ");
      addLineBreak(parametersFileNode);
      prettyPrintJSON(parametersFileNode, parameters);
    } else {
      console.log("error");
    }
  };
}

document
  .getElementById("inputFileSecrets")
  .addEventListener("change", handleFileSelect, false);

document
  .getElementById("inputFileParameters")
  .addEventListener("change", handleFileSelect, false);

function addText(node, text) {
  var subnode = document.createElement("div");
  var textnode = document.createTextNode(text);
  subnode.appendChild(textnode);
  node.appendChild(subnode);
}
function addLineBreak(node) {
  var lineBreak = document.createElement("br");
  node.appendChild(lineBreak);
}
function addHLine(node) {
  var hLine = document.createElement("hr");
  node.appendChild(hLine);
}
function addTitle(node, titleType, text) {
  var subnode = document.createElement(titleType);
  var textnode = document.createTextNode(text);
  subnode.appendChild(textnode);
  node.appendChild(subnode);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function prettyPrintJSON(node, json) {
  Object.keys(json).forEach(function (key) {
    addText(node, key + "  :  " + json[key]);
  });
}
/*
function getObjects() {
  // Get the native path of the file selected by user
  var path = inputFile.value;

  // Read file with Node.js API
  var fs = nw.require("fs");
  fs.readFile(path, "utf8", function (err, txt) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(path);
  });
  return path;
}

/*const PRIVATE_KEY = 

var Web3 = require('web3');
var web3 = new Web3('https://bsc-dataseed.binance.org/');
const account = web3.eth.accounts.privateKeyToAccount(secrets.privateKey);
var contract = new web3.eth.Contract(abi, parameters.contractAddress);
*/
