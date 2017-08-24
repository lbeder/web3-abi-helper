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

console.log(
    `Encoding: \n` +
    `  Function: ${method.name} \n` +
    `  Parameters: \n${web3Helper.paramsToString(method, params)}`
);

let encoded = web3Helper.encodeMethod(method, params);

console.log(`Encoded 'transfer' call is: ${encoded}\n`);

let decoded = web3Helper.decodeMethod(encoded);

console.log(
    `Decoded: \n` +
    `  Function: ${decoded.abi.name} \n` +
    `  Parameters: \n${web3Helper.paramsToString(decoded.abi, decoded.params)}`
);

let params2 = ['0xff98336a9027A09355e7b4326CA79eFfE3660415', '0xb3F636caE9E8AD9795d14D3BDDa3E382dba47C73', 1000];

console.log(
    `Encoding: \n` +
    `  Function: transferFrom(address,address,uint256)\n` +
    `  Parameters: \n${params2}\n`
);

let encodedByName = web3Helper.encodeMethod('transferFrom(address,address,uint256)', params2);

console.log(`Encoded 'transferFrom' call is: ${encodedByName}\n`);

let decoded2 = web3Helper.decodeMethod(encodedByName);

console.log(
    `Decoded: \n` +
    `  Function: ${decoded2.abi.name} \n` +
    `  Parameters: \n${web3Helper.paramsToString(decoded2.abi, decoded2.params) || '    N/A'}`
);
