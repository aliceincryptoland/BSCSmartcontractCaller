import constants from "../config/constants.mjs";

const headerNode = document.getElementById("headers");
const secretsHeaderNode = document.getElementById("secretsHeader");
const secretsFileNode = document.getElementById("secretsFile");
const parametersHeaderNode = document.getElementById("parametersHeader");
const parametersFileNode = document.getElementById("parametersFile");
const abiHeaderNode = document.getElementById("abiHeader");
const abiFileNode = document.getElementById("abiFile");
const resultsNode = document.getElementById("results");

const parsed = (jsonText) => JSON.parse(jsonText);

const fileReader = new FileReader();

var secrets = {};
var parameters = {};
var contractABI = {};
var correctSecrets = false;
var correctParameters = false;

addTitle(headerNode, "h2", "Smartcontract Caller");
addText(headerNode, "Brought to you with care by : Alice in Cryptoland");
addHLine(headerNode);
addTitle(headerNode, "h4", "Please input the config files");
addTitle(secretsHeaderNode, "h3", "Secrets");
addTitle(parametersHeaderNode, "h3", "Parameters");
addTitle(abiHeaderNode, "h3", "ABI");

function handleFileSelect(evt) {
  fileReader.readAsText(evt.target.files[0]);
  fileReader.onload = (e) => {
    if (evt.target.matches("#inputFileSecrets")) {
      secrets = parsed(e.target.result);
      removeAllChildNodes(secretsFileNode);
      if (keysEqual(secrets, constants.SECRETS_KEYS)) {
        correctSecrets = true;
        addText(secretsFileNode, "Loaded secrets : ");
        addLineBreak(secretsFileNode);
        prettyPrintJSON(secretsFileNode, secrets);
      } else {
        correctSecrets = false;
        addText(secretsFileNode, "This is not a correct secrets file.");
        addText(
          secretsFileNode,
          "Please ensure you have the following keys in your json file : " +
            constants.SECRETS_KEYS
        );
      }
    } else if (evt.target.matches("#inputFileParameters")) {
      parameters = parsed(e.target.result);
      removeAllChildNodes(parametersFileNode);
      if (keysEqual(parameters, constants.PARAMETERS_KEYS)) {
        correctParameters = true;
        addText(parametersFileNode, "Loaded parameters : ");
        addLineBreak(parametersFileNode);
        prettyPrintJSON(parametersFileNode, parameters);
      } else {
        correctParameters = false;
        addText(parametersFileNode, "This is not a correct parameters file.");
        addText(
          parametersFileNode,
          "Please ensure you have the following keys in your json file : " +
            constants.PARAMETERS_KEYS
        );
      }
    } else if (evt.target.matches("#inputFileABI")) {
      contractABI = parsed(e.target.result);
      removeAllChildNodes(abiFileNode);
      addText(abiFileNode, "Loaded ABI file.");
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

document
  .getElementById("inputFileABI")
  .addEventListener("change", handleFileSelect, false);

document
  .getElementById("execute")
  .addEventListener("click", executeWeb3Call, false);

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

function keysEqual(object, array) {
  return JSON.stringify(Object.keys(object)) === JSON.stringify(array);
}

function executeWeb3Call() {
  removeAllChildNodes(resultsNode);
  if (correctSecrets && correctParameters) {
    addText(
      resultsNode,
      "Files seem correct, proceeding to calling contract method."
    );
    var Web3 = require("web3");
    var web3 = new Web3(getRPCURL());
    var calledContract = new web3.eth.Contract(
      contractABI,
      parameters.CONTRACT_ADDRESS
    );
    console.log(calledContract);
    if (parameters.METHOD_TYPE === "read") {
      //calledContract.methods[parameters.METHOD_NAME](
      calledContract.methods
        //.balanceOf(parameters.METHOD_PARAMETERS)
        .balanceOf("0x6513a387E54fB25B803FaD72A8A2c6a46b738222")
        .call({ from: parameters.PUBLIC_ADDRESS })
        .on("sent", function (payload) {
          addText(resultsNode, "The transaction has been sent to the network.");
        })
        .on("transactionHash", function (hash) {
          addText(resultsNode, "The transaction hash is : " + hash);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          addText(
            resultsNode,
            "The transaction has been confirmed, the transaction receipt has been printed in the console."
          );
          console.log(receipt);
        })
        .on("error", function (error, receipt) {
          addText(
            resultsNode,
            "The transaction has failed, the transaction receipt has been printed in the console."
          );
          console.log(receipt);
        })
        .then(function (result) {
          addText(resultsNode, "The result of your call is : " + result);
        });
    } else if (parameters.METHOD_TYPE === "write") {
      calledContract.methods[parameters.METHOD_NAME](
        parameters.METHOD_PARAMETERS
      )
        .send({ from: parameters.PUBLIC_ADDRESS })
        .on("sent", function () {
          addText(resultsNode, "The transaction has been sent to the network.");
        })
        .on("transactionHash", function (hash) {
          addText(resultsNode, "The transaction hash is : " + hash);
          web3.eth.accounts
            .signTransaction(hash, secrets.PRIVATE_KEY)
            .then(
              addText(
                resultsNode,
                "The transaction has been signed with your private key."
              )
            );
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          addText(
            resultsNode,
            "The transaction has been confirmed, the transaction receipt has been printed in the console."
          );
          console.log(receipt);
        })
        .on("error", function (error, receipt) {
          addText(
            resultsNode,
            "The transaction has failed, the transaction receipt has been printed in the console."
          );
          console.log(receipt);
        });
    }
  } else {
    addText(resultsNode, "Error: Please upload all the correct files.");
  }
}

function getRPCURL() {
  var url;
  if (parameters.BLOCKCHAIN === "bsc-mainnet") {
    url = constants.BSC_MAINNET_URL;
  } else if (parameters.BLOCKCHAIN === "bsc-testnet") {
    url = constants.BSC_TESTNET_URL;
  } else {
    console.log("Error : incorrect BLOCKCHAIN parameter");
  }
  return url;
}
