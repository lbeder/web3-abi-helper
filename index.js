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
        // If method is a string - try to fetch its input from the list of known methods.
        if (typeof method === 'string' || method instanceof String) {
            let methodName = method;

            let sha3 = web3.utils.sha3(methodName).substring(0, FUNCTION_NAME_LENGTH);
            method = FUNCTIONS[sha3];
            if (!method) {
                throw new Error(`Could not find known method '${methodName}' from known methods list!`);
            }
        }

        return web3.eth.abi.encodeFunctionCall(method, params);
    }

    decodeMethod(data) {
        let signature = data.substring(0, FUNCTION_NAME_LENGTH);
        let encodedParams = data.substring(FUNCTION_NAME_LENGTH);

        let abi = FUNCTIONS[signature];
        if (!abi) {
            throw new Error(`Could not find function for signature: ${signature})!`);
        }

        return {
            method: abi,
            params: web3.eth.abi.decodeParameters(abi.inputs, encodedParams)
        };
    }
}

module.exports = Web3Helper;
