import * as config from "./configHandler.js";
import * as view from "./viewMethods.js";
import * as web3Handler from "./web3Handler.js";

view.renderHeaders();

const executeWeb3Call = () => {
  view.removeAllChildNodes(view.resultsNode);
  if (config.correctSecrets && config.correctParameters) {
    view.addText(
      view.resultsNode,
      "Files seem correct, proceeding to calling contract method."
    );
    web3Handler.web3Handle();
  } else {
    view.addText(
      view.resultsNode,
      "Error: Please upload all the correct files."
    );
  }
};

document
  .getElementById("inputFileSecrets")
  .addEventListener("change", config.handleFileSelect, false);

document
  .getElementById("inputFileParameters")
  .addEventListener("change", config.handleFileSelect, false);

document
  .getElementById("inputFileABI")
  .addEventListener("change", config.handleFileSelect, false);

document
  .getElementById("execute")
  .addEventListener("click", executeWeb3Call, false);
