require('babel-register');
require('babel-polyfill');

const YAML = require('yamljs');
const Web3 = require('web3');
const web3 = new Web3();

const FUNCTIONS = YAML.load('./functions.yml');
const FUNCTION_NAME_LENGTH = 10;

class Web3Helper {
    paramsToString(method, params) {
        let i = 0;
        return method.inputs.reduce((res, input) => {
            return `${res}    ${input.name} (${input.type}): ${params[i++]}\n`;
        }, '');
    }

    encodeMethod(method, params) {
        console.log(
            `Encoding: \n` +
            `  Function: ${method.name} \n` +
            `  Parameters: \n${this.paramsToString(method, params) || '    N/A'}`
        );

        return web3.eth.abi.encodeFunctionCall(method, params);
    }

    decodeMethod(data) {
        console.log(
            `Decoding: \n` +
            `${data}\n`
        );

        let signature = data.substring(0, FUNCTION_NAME_LENGTH);
        let encodedParams = data.substring(FUNCTION_NAME_LENGTH);

        let abi = FUNCTIONS[signature];
        if (!abi) {
            throw new Error(`Could not find function for signature: ${signature})!`);
        }

        return {
            abi: abi,
            params: web3.eth.abi.decodeParameters(abi.inputs, encodedParams)
        };
    }
}

module.exports = Web3Helper;
