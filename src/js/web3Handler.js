import * as view from "./viewMethods.js";
import * as config from "./configHandler.js";

export const web3Handle = () => {
  let Web3 = require("web3");
  let web3 = new Web3(config.getRPCURL());
  const toWei = (param) => {
    return web3.utils.toBN(param * Math.pow(10, 18));
  };
  let Accounts = require("web3-eth-accounts");
  const myAccount = web3.eth.accounts.privateKeyToAccount(
    config.secrets.PRIVATE_KEY
  );
  web3.eth.defaultAccount = myAccount.address;
  let params = [];
  config.parameters.METHOD_PARAMETERS.forEach((param) => {
    if (Number.isFinite(param)) {
      params.push(toWei(param));
    } else {
      params.push(param);
    }
  });
  let calledContract = new web3.eth.Contract(
    config.contractABI,
    config.parameters.CONTRACT_ADDRESS
  );
  if (config.parameters.METHOD_TYPE === "read") {
    calledContract.methods[config.parameters.METHOD_NAME](...params)
      .call()
      .then((result) => {
        view.addText(
          view.resultsNode,
          "The result of your call is : " + result
        );
      });
  } else if (config.parameters.METHOD_TYPE === "write") {
    view.addText(
      view.resultsNode,
      "Generating transaction to call contract method..."
    );
    web3.eth
      .getTransactionCount(config.parameters.PUBLIC_ADDRESS)
      .then((count) => {
        web3.eth.accounts
          .signTransaction(
            {
              from: config.parameters.PUBLIC_ADDRESS,
              to: config.parameters.CONTRACT_ADDRESS,
              value: 0x0,
              gasPrice: web3.utils.toHex(20 * 1e9),
              gasLimit: web3.utils.toHex(210000),
              data: calledContract.methods[config.parameters.METHOD_NAME](
                ...params
              ).encodeABI(),
              nonce: web3.utils.toHex(count),
            },
            config.secrets.PRIVATE_KEY
          )
          .then((tx) => {
            console.log(tx);
            view.addText(
              view.resultsNode,
              "The transaction has been generated and signed with your private key, now sending the transaction to the network..."
            );
            web3.eth
              .sendSignedTransaction(tx.rawTransaction)
              .on("error", (error, receipt) => {
                view.addText(
                  view.resultsNode,
                  "The transaction has failed, information available in the console."
                );
                console.log(error, receipt);
              })
              .then((receipt) => {
                console.log(receipt);
                view.addText(
                  view.resultsNode,
                  "The transaction has been sent, it's hash is : " +
                    receipt.transactionHash
                );
              });
          });
      });
  }
};
