import { decodeParameters, encodeFunctionCall, encodeParameters } from "web3-eth-abi";
import * as Utils from "web3-utils";
import * as functions from "./functions.json";

export type ABIDataTypes = "uint256" | "boolean" | "string" | "bytes" | string;
export interface IABIDefinition {
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

export interface IWeb3Helper {
    paramsToString(method: IABIDefinition, params: any[]): string;
    encodeMethod(method: IABIDefinition | string, params: any[]): string;
    decodeMethod(data: string): { method: IABIDefinition; params: { [key: string]: any } };
    isAddress(address: any): boolean;
    getMethod(methodName: string): IABIDefinition;
    getMethodNames(): string[];
    encodeParameters(inputAbi: string[], params: any[]): string;
}

class Web3HelperImpl implements IWeb3Helper {
    public paramsToString(method: IABIDefinition, params: any[]): string {
        let i = 0;
        return method.inputs ? method.inputs.reduce((res, input) => {
            return `${res}    ${input.name} (${input.type}): ${params[i++]}\n`;
        }, "") : "";
    }

    public encodeMethod(method: IABIDefinition | string, params: any[]): string {
        // If method is a string - try to fetch its input from the list of known methods.
        if (typeof method === "string") {
            method = this.getMethod(method);
        }

        return encodeFunctionCall(method, this.encodeNumbericParameters(params));
    }

    public decodeMethod(data: string): { method: IABIDefinition; params: { [key: string]: any }; } {
        const signature = `0x${data.substring(PREFIX_LENGTH, PREFIX_LENGTH + FUNCTION_NAME_LENGTH)}`;

        const abi = (functions as any)[signature] as IABIDefinition;
        if (!abi) {
            throw new Error(`Could not find function for signature: ${signature}!`);
        }

        abi.type = "function";

        const inputs = abi.inputs as Array<string | {}>;
        let decodedParams: { [key: string]: any } = [];
        if (inputs.length > 0) {
            const encodedParams = `0x${data.substring(PREFIX_LENGTH + FUNCTION_NAME_LENGTH)}`;
            decodedParams = decodeParameters(inputs, encodedParams);
        }

        return {
            method: abi,
            params: decodedParams,
        };
    }

    public isAddress(address: any): boolean {
        return Utils.isAddress(address);
    }

    public getMethod(methodName: string): IABIDefinition {
        const signature = Utils.sha3(methodName).substring(0, PREFIX_LENGTH + FUNCTION_NAME_LENGTH);
        const method = (functions as any)[signature] as IABIDefinition;
        if (!method) {
            throw new Error(`Could not find known method '${methodName}' from known methods list!`);
        }

        method.type = "function";
        return method;
    }

    public getMethodNames(): string[] {
        // tslint:disable-next-line max-line-length
        return (Object.entries(functions) as Array<[string, IABIDefinition]>).map((method: [string, IABIDefinition]) => {
            return method[1].name || "";
        });
    }

    public encodeParameters(inputAbi: string[], params: any[]): string {
        return encodeParameters(inputAbi, this.encodeNumbericParameters(params)).replace("0x", "");
    }

    // Convert numeric parameters to hex strings, due to https://github.com/ethereum/web3.js/issues/2077:
    private encodeNumbericParameters(params: any[]): any[] {
        return params.map((p: any) => Number.isFinite(p) ? Utils.numberToHex(p) : p);
    }
}

export const Web3Helper = new Web3HelperImpl() as IWeb3Helper;
