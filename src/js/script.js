const headerNode = document.getElementById("headers");
const loadedConfigNode = document.getElementById("loadedConfig");
const resultsNode = document.getElementById("results");

const parsed = (jsonText) => JSON.parse(jsonText);

const fileReader = new FileReader();

function handleFileSelect(evt) {
  fileReader.readAsText(evt.target.files[0]);
}

fileReader.onload = (e) => {
  printLoadedConfig(parsed(e.target.result));
};

document
  .getElementById("inputFile")
  .addEventListener("change", handleFileSelect, false);

function printLoadedConfig(config) {
  removeAllChildNodes(loadedConfigNode);
  addText(loadedConfigNode, "Loading configuration file : Success");
  addLineBreak(loadedConfigNode);
  addLineBreak(loadedConfigNode);
  addText(loadedConfigNode, "Secrets currently loaded");
  addLineBreak(loadedConfigNode);
  prettyPrintJSON(loadedConfigNode, config.secrets);
  addLineBreak(loadedConfigNode);
  addLineBreak(loadedConfigNode);
  addText(loadedConfigNode, "Parameters currently loaded");
  addLineBreak(loadedConfigNode);
  prettyPrintJSON(loadedConfigNode, config.parameters);
  addLineBreak(loadedConfigNode);
}

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
