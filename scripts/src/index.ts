import { AbiCoder } from "web3-eth-abi";
import * as Utils from "web3-utils";
import * as functions from "./functions.json";

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

const PREFIX_LENGTH = 2;
const FUNCTION_NAME_LENGTH = 8;

export interface Web3Helper {
    paramsToString(method: ABIDefinition, params: any[]): string;
    encodeMethod(method: ABIDefinition | string, params: any[]): string;
    decodeMethod(data: string): { method: ABIDefinition; params: { [key: string]: any } };
    isAddress(address: any): boolean;
    getMethod(methodName: string): ABIDefinition;
    getMethodNames(): string[];
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
            method = this.getMethod(method);
        }

        const coder = new AbiCoder();
        return coder.encodeFunctionCall(method, this._encodeNumbericParameters(params));
    }

    decodeMethod(data: string): { method: ABIDefinition; params: { [key: string]: any }; } {
        const signature = `0x${data.substring(PREFIX_LENGTH, PREFIX_LENGTH + FUNCTION_NAME_LENGTH)}`;

        let abi = (<any>functions)[signature] as ABIDefinition;
        if (!abi) {
            throw new Error(`Could not find function for signature: ${signature}!`);
        }

        abi.type = "function";

        const coder = new AbiCoder();
        const inputs = abi.inputs as Array<string | {}>;
        let decodedParams: { [key: string]: any } = [];
        if (inputs.length > 0) {
            const encodedParams = `0x${data.substring(PREFIX_LENGTH + FUNCTION_NAME_LENGTH)}`;
            decodedParams = coder.decodeParameters(inputs, encodedParams);
        }

        return {
            method: abi,
            params: decodedParams
        };
    }

    isAddress(address: any): boolean {
        return Utils.isAddress(address);
    }

    getMethod(methodName: string): ABIDefinition {
        const signature = Utils.sha3(methodName).substring(0, PREFIX_LENGTH + FUNCTION_NAME_LENGTH);
        const method = (<any>functions)[signature] as ABIDefinition;
        if (!method) {
            throw new Error(`Could not find known method '${methodName}' from known methods list!`);
        }

        method.type = "function";
        return method;
    }

    getMethodNames(): string[] {
        return (Object.entries(functions) as [string, ABIDefinition][]).map((method: [string, ABIDefinition]) => {
            return method[1].name || '';
        });
    }

    encodeParameters(inputAbi: string[], params: any[]): string {
        const coder = new AbiCoder();
        return coder.encodeParameters(inputAbi, this._encodeNumbericParameters(params)).replace("0x", "");
    }

    // Convert numeric parameters to hex strings, due to https://github.com/ethereum/web3.js/issues/2077:
    _encodeNumbericParameters(params: any[]): any[] {
        return params.map((p: any) => Number.isFinite(p) ? Utils.numberToHex(p) : p);
    }
}

export const Web3Helper = new Web3HelperImpl() as Web3Helper;
