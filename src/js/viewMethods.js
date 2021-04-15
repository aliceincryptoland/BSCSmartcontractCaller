export const headerNode = document.getElementById("headers");
export const secretsHeaderNode = document.getElementById("secretsHeader");
export const secretsFileNode = document.getElementById("secretsFile");
export const parametersHeaderNode = document.getElementById("parametersHeader");
export const parametersFileNode = document.getElementById("parametersFile");
export const abiHeaderNode = document.getElementById("abiHeader");
export const abiFileNode = document.getElementById("abiFile");
export const resultsNode = document.getElementById("results");

export const addText = (node, text) => {
  let subnode = document.createElement("div");
  let textnode = document.createTextNode(text);
  subnode.appendChild(textnode);
  node.appendChild(subnode);
};

export const addLineBreak = (node) => {
  let lineBreak = document.createElement("br");
  node.appendChild(lineBreak);
};

export const addHLine = (node) => {
  let hLine = document.createElement("hr");
  node.appendChild(hLine);
};

export const addTitle = (node, titleType, text) => {
  let subnode = document.createElement(titleType);
  let textnode = document.createTextNode(text);
  subnode.appendChild(textnode);
  node.appendChild(subnode);
};

export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export const prettyPrintJSON = (node, json) => {
  Object.keys(json).forEach((key) => {
    addText(node, key + "  :  " + json[key]);
  });
};

export const renderHeaders = () => {
  addTitle(headerNode, "h2", "Smartcontract Caller");
  addText(headerNode, "Brought to you with care by : Alice in Cryptoland");
  addHLine(headerNode);
  addTitle(headerNode, "h4", "Please input the config files");
  addTitle(secretsHeaderNode, "h3", "Secrets");
  addTitle(parametersHeaderNode, "h3", "Parameters");
  addTitle(abiHeaderNode, "h3", "ABI");
};
