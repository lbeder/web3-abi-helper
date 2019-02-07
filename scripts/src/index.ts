import * as YAML from "yamljs";
import * as path from "path";
const Web3 = require("web3");

type ABIDataTypes = "uint256" | "boolean" | "string" | "bytes" | string;
interface ABIDefinition {
    constant?: boolean;
    payable?: boolean;
    stateMutability?: "pure" | "view" | "nonpayable" | "payable";
    anonymous?: boolean;
    inputs?: Array<{ name: string; type: ABIDataTypes; indexed?: boolean }>;
    name?: string;
    outputs?: Array<{ name: string; type: ABIDataTypes }>;
    type: "function" | "constructor" | "event" | "fallback";
}

const web3 = new Web3("http://");

const FUNCTIONS = YAML.load(path.join(__dirname, "../../functions.yml")) as { [name: string]: ABIDefinition };
const FUNCTION_NAME_LENGTH = 10;

export interface Web3Helper {
    paramsToString(method: ABIDefinition, params: any[]): string;
    encodeMethod(method: ABIDefinition | string, params: any[]): string;
    decodeMethod(data: string): { method: ABIDefinition; params: { [key: string]: any } };
    isAddress(address: any): boolean;
    encodeParameters(inputAbi: string[], params: any[]): string;
}

class Web3HelperImpl implements Web3Helper {
    paramsToString(method: ABIDefinition, params: any[]): string {
        let i = 0;
        return method.inputs ? method.inputs.reduce((res, input) => {
            return `${res}    ${input.name} (${input.type}): ${params[i++]}\n`;
        }, '') : '';
    }

    encodeMethod(method: ABIDefinition | string, params: any[]): string {
        // If method is a string - try to fetch its input from the list of known methods.
        if (typeof method === "string") {
            let methodName = method;

            let sha3 = web3.utils.sha3(methodName).substring(0, FUNCTION_NAME_LENGTH);
            method = FUNCTIONS[sha3];
            if (!method) {
                throw new Error(`Could not find known method '${methodName}' from known methods list!`);
            }

            method.type = "function";
        }

        return web3.eth.abi.encodeFunctionCall(method, params);
    }

    decodeMethod(data: string): { method: ABIDefinition; params: { [key: string]: any }; } {
        const signature = data.substring(0, FUNCTION_NAME_LENGTH);
        const encodedParams = data.substring(FUNCTION_NAME_LENGTH);

        let abi = FUNCTIONS[signature];
        if (!abi) {
            throw new Error(`Could not find function for signature: ${signature}!`);
        }

        abi.type = "function";

        return {
            method: abi,
            params: web3.eth.abi.decodeParameters(abi.inputs, encodedParams)
        };
    }

    isAddress(address: any): boolean {
        return web3.utils.isAddress(address);
    }

    encodeParameters(inputAbi: string[], params: any[]): string {
        return web3.eth.abi.encodeParameters(inputAbi, params).replace("0x", "");
    }
}

export const Web3Helper = new Web3HelperImpl() as Web3Helper;
