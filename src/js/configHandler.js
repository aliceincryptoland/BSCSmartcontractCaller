import constants from "../config/constants.mjs";
import * as view from "./viewMethods.js";

export let secrets = {};
export let parameters = {};
export let contractABI = {};
export let correctSecrets = false;
export let correctParameters = false;
export const fileReader = new FileReader();

export const parsed = (jsonText) => {
  return JSON.parse(jsonText);
};

export const getRPCURL = () => {
  let url;
  if (parameters.BLOCKCHAIN === "bsc-mainnet") {
    url = constants.BSC_MAINNET_URL;
  } else if (parameters.BLOCKCHAIN === "bsc-testnet") {
    url = constants.BSC_TESTNET_URL;
  } else {
    console.log("Error : incorrect BLOCKCHAIN parameter");
  }
  return url;
};

export const formatParameters = () => {
  let params = [];
  parameters.METHOD_PARAMETERS.forEach((param) => {
    if (Number.isFinite(param)) {
      params.push(web3.utils.toWei(param, "ether"));
    } else {
      params.push(param);
    }
  });
  return params;
};

export const keysEqual = (object, array) => {
  return JSON.stringify(Object.keys(object)) === JSON.stringify(array);
};

export const handleFileSelect = (evt) => {
  fileReader.readAsText(evt.target.files[0]);
  fileReader.onload = (e) => {
    if (evt.target.matches("#inputFileSecrets")) {
      secrets = parsed(e.target.result);
      view.removeAllChildNodes(view.secretsFileNode);
      if (keysEqual(secrets, constants.SECRETS_KEYS)) {
        correctSecrets = true;
        view.addText(view.secretsFileNode, "Loaded secrets : ");
        view.addLineBreak(view.secretsFileNode);
        view.prettyPrintJSON(view.secretsFileNode, secrets);
      } else {
        correctSecrets = false;
        view.addText(
          view.secretsFileNode,
          "This is not a correct secrets file."
        );
        view.addText(
          view.secretsFileNode,
          "Please ensure you have the following keys in your json file : " +
            constants.SECRETS_KEYS
        );
      }
    } else if (evt.target.matches("#inputFileParameters")) {
      parameters = parsed(e.target.result);
      view.removeAllChildNodes(view.parametersFileNode);
      if (keysEqual(parameters, constants.PARAMETERS_KEYS)) {
        correctParameters = true;
        view.addText(view.parametersFileNode, "Loaded parameters : ");
        view.addLineBreak(view.parametersFileNode);
        view.prettyPrintJSON(view.parametersFileNode, parameters);
      } else {
        correctParameters = false;
        view.addText(
          view.parametersFileNode,
          "This is not a correct parameters file."
        );
        view.addText(
          view.parametersFileNode,
          "Please ensure you have the following keys in your json file : " +
            constants.PARAMETERS_KEYS
        );
      }
    } else if (evt.target.matches("#inputFileABI")) {
      contractABI = parsed(e.target.result);
      view.removeAllChildNodes(view.abiFileNode);
      view.addText(view.abiFileNode, "Loaded ABI file.");
    } else {
      console.log("error");
    }
  };
};
