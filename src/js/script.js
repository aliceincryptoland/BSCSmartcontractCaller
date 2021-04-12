import {parameters, secrets} from './config.mjs';
//console.log(parameters);
const anchor = document.getElementById('anchor');

addText("Loading parameters :");
addText(JSON.stringify(parameters));
addText("Loading secrets :");
addText(JSON.stringify(secrets));
function addText(text){
    var node = document.createElement("p");
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    anchor.appendChild(node);
}

const parametersFile = document.getElementById('parameters');
document.getElementById('submit').addEventListener('click', e => {
    getObjects();
});


function getObjects(){
    // Get the native path of the file selected by user
    var path = parametersFile.value;

    // Read file with Node.js API
    var fs = nw.require('fs');
    fs.readFile(path, 'utf8', function(err, txt) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(path);
    });
}


/*const PRIVATE_KEY = 

var Web3 = require('web3');
var web3 = new Web3('https://bsc-dataseed.binance.org/');
const account = web3.eth.accounts.privateKeyToAccount(secrets.privateKey);
var contract = new web3.eth.Contract(abi, parameters.contractAddress);
*/
