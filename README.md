# Web3 API Helper

This module contains a couple of helper methods which extend the standard web3.js API (1.0.0 and above).

## Encode Method

In order to encode a method, you'd need to provide its ABI and a list of parameters:

```js
const Web3Helper = require('web3-api-helper');

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
```

The output should be:

```
Encoding:
  Function: transfer
  Parameters:
    to (address): 0xff98336a9027A09355e7b4326CA79eFfE3660415
    value (uint256): 500000000000000000

Encoded function call is: 0xa9059cbb000000000000000000000000ff98336a9027a09355e7b4326ca79effe366041500000000000000000000000000000000000000000000000006f05b59d3b20000
```

## Decode Method

In order to encode a method, you'd need to provide the encoded data. The helper will looks for an existing signature which matches it and then parse it accordingly:

```js
const Web3Helper = require('web3-api-helper');

let web3Helper = new Web3Helper();

let decoded = web3Helper.decodeMethod("0xa9059cbb000000000000000000000000ff98336a9027a09355e7b4326ca79effe366041500000000000000000000000000000000000000000000000006f05b59d3b20000");

console.log(
    `Decoded: \n` +
    `  Function: ${decoded.abi.name} \n` +
    `  Parameters: \n${web3Helper.paramsToString(decoded.abi, decoded.params) || '    N/A'}`
);

```

The output should be:

```
Decoding:
0xa9059cbb000000000000000000000000ff98336a9027a09355e7b4326ca79effe366041500000000000000000000000000000000000000000000000006f05b59d3b20000

Decoded:
  Function: transfer(address,uint256)
  Parameters:
    to (address): 0xff98336a9027A09355e7b4326CA79eFfE3660415
    value (uint256): 500000000000000000
```


