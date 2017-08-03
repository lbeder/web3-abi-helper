const Web3Helper = require('../index');

let web3Helper = new Web3Helper();

let method = {
    name: 'transfer',
    type: 'function',
    inputs: [{
        type: 'address',
        name: 'to'
    },
    {
        type: 'uint256',
        name: 'value'
    }]
};

let params = ['0xff98336a9027A09355e7b4326CA79eFfE3660415', 500000000000000000];

let encoded = web3Helper.encodeMethod(method, params);
console.log(`Encoded function call is: ${encoded}\n`);

let decoded = web3Helper.decodeMethod(encoded);

console.log(
    `Decoded: \n` +
    `  Function: ${decoded.abi.name} \n` +
    `  Parameters: \n${web3Helper.paramsToString(decoded.abi, decoded.params) || '    N/A'}`
);
