import * as view from "./viewMethods.js";
import * as config from "./configHandler.js";

export const web3Handle = () => {
  let Web3 = require("web3");
  let web3 = new Web3(config.getRPCURL());
  let calledContract = new web3.eth.Contract(
    config.contractABI,
    config.parameters.CONTRACT_ADDRESS
  );
  if (config.parameters.METHOD_TYPE === "read") {
    calledContract.methods
      [config.parameters.METHOD_NAME]
      //config.formatParameters()
      ()
      .call()
      .then((result) => {
        view.addText(
          view.resultsNode,
          "The result of your call is : " + result
        );
      });
  } else if (config.parameters.METHOD_TYPE === "write") {
    calledContract.methods[config.parameters.METHOD_NAME](
      config.formatParameters()
    )
      .send({ from: config.parameters.PUBLIC_ADDRESS })
      .on("sent", () => {
        view.addText(
          view.resultsNode,
          "The transaction has been sent to the network."
        );
      })
      .on("transactionHash", (hash) => {
        view.addText(view.resultsNode, "The transaction hash is : " + hash);
        web3.eth.accounts
          .signTransaction(hash, config.secrets.PRIVATE_KEY)
          .then(
            view.addText(
              view.resultsNode,
              "The transaction has been signed with your private key."
            )
          );
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        view.addText(
          view.resultsNode,
          "The transaction has been confirmed, the transaction receipt has been printed in the console."
        );
        console.log(receipt);
      })
      .on("error", (error, receipt) => {
        view.addText(
          view.resultsNode,
          "The transaction has failed, the transaction receipt has been printed in the console."
        );
        console.log(receipt);
      });
  }
};
