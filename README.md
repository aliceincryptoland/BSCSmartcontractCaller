# Smartcontract Caller ![License](https://img.shields.io/github/license/aliceincryptoland/smartcontract-caller) [![Smartcontract Caller Build & Deploy](https://img.shields.io/github/workflow/status/aliceincryptoland/smartcontract-caller/Build%20&%20Release)](https://github.com/aliceincryptoland/smartcontract-caller/actions/workflows/main.yml) [![GitHub release](https://img.shields.io/github/v/release/aliceincryptoland/smartcontract-caller)](https://github.com/aliceincryptoland/smartcontract-caller/releases)

> Disclaimer : This is a badly and quickly written with uneccesary machinery and very client-heavy release.

This is a standalone node-webkit app, that enables users to call a contract method on an EVM compatible blockchain from input configuration files.

<hr>

## Supported Blockchains:

- Binance Smart Chain - Mainnet
- Binance Smart Chain - Testnet

## Instructions

1. Download the latest release. Choose version accordingly.
1. Unzip the downloaded app folder.
1. Download the configuration template files (Release>config-template.zip).
1. Edit the configuration templates. References for parameter format are given below.
1. Launch the .exe in the app folder.
1. Upload the edited configuration files in the launched app.
1. Execute and wait for your call result or transaction hash.

## Configuration files format

All files should be in JSON format.

### Secrets

'''PRIVATE_KEY''' : the private key that you wish to sign transactions with.

### Parameters

'BLOCKCHAIN': "'bsc-mainnet' or 'bsc-testnet'",
'''PUBLIC_ADDRESS''': "your public address",
'''CONTRACT_ADDRESS''': "e.g. 0xe9e7cea3dedca5984780bafc599bd69add087d56",
'''METHOD_NAME''': "name of method you want to call with parameter types e.g. 'transfer(address,uint256)'",
'''METHOD_TYPE''': "the method type : 'read' (does not alter contract state) or 'write' (alters the contract state)",
'''METHOD_PARAMETERS''': "they should be placed in an array e.g. ' ['0x437C2AD9E62e3f9Ef8d76Dd6Bb1A5deF35B37Cc7', 123]' "

### ABI

> Copy-paste the ABI of the contract you wish to call from a blockscanner (e.g. Etherscan, BSCScan, ...). in the templateABI.json file.
