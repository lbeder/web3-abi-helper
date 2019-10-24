import { expect } from "chai";
import * as Utils from "web3-utils";
import { IABIDefinition, Web3Helper } from "../src";
import * as functions from "../src/functions.json";

const FUNCTION_NAME_LENGTH = 10;

describe("Web3Helper", () => {
  describe("encodeMethod", () => {
    Object.entries(functions).forEach((entry: any) => {
      const [signature, method] = entry;

      it(`${method.name} should have the signature ${signature}`, () => {
        const derivedSignature = Utils.sha3(method.name).substring(0, FUNCTION_NAME_LENGTH);
        expect(derivedSignature).to.eql(signature);
      });
    });
  });

  describe("encodeMethod", () => {
    [
      {
        expectedResult: "0xa9059cbb000000000000000000000000ff98336a9027a09355e7b4326ca79effe366041500000000000000000000000000000000000000000000000006f05b59d3b20000", // eslint-disable-line max-len
        method: {
          inputs: [{
            name: "to",
            type: "address",
          },
          {
            name: "value",
            type: "uint256",
          }],
          name: "transfer",
          type: "function",
        },
        params: ["0xff98336a9027A09355e7b4326CA79eFfE3660415", 500000000000000000],
      },
      {
        expectedResult: "0x18160ddd",
        method: {
          inputs: [],
          name: "totalSupply",
          type: "function",
        },
        params: [],
      },
      {
        expectedResult: "0x79ba5097",
        method: {
          inputs: [],
          name: "acceptOwnership",
          type: "function",
        },
        params: [],
      },
      {
        expectedResult: "0xf2fde38b000000000000000000000000ff98336a9027a09355e7b4326ca79effe3660415",
        method: {
          inputs: [{
            name: "newOwnerCandidate",
            type: "address",
          }],
          name: "transferOwnership",
          type: "function",
        },
        params: ["0xff98336a9027A09355e7b4326CA79eFfE3660415"],
      },
    ].forEach((spec) => {
      const { method, params, expectedResult } = spec;
      it(`should encode method ${JSON.stringify(method)} with ${params.length === 0 ? "empty" : params} params`, () => {
        expect(Web3Helper.encodeMethod(method as IABIDefinition, params)).to.eql(expectedResult);
      });
    });

    [
      {
        expectedResult: "0xa9059cbb000000000000000000000000ff98336a9027a09355e7b4326ca79effe366041500000000000000000000000000000000000000000000000006f05b59d3b20000", // eslint-disable-line max-len
        methodName: "transfer(address,uint256)",
        params: ["0xff98336a9027A09355e7b4326CA79eFfE3660415", 500000000000000000],
      },
      {
        expectedResult: "0x18160ddd",
        methodName: "totalSupply()",
        params: [],
      },
      {
        expectedResult: "0x79ba5097",
        methodName: "acceptOwnership()",
        params: [],
      },
      {
        expectedResult: "0xf2fde38b000000000000000000000000ff98336a9027a09355e7b4326ca79effe3660415",
        methodName: "transferOwnership(address)",
        params: ["0xff98336a9027A09355e7b4326CA79eFfE3660415"],
      },
    ].forEach((spec) => {
      const { methodName, params } = spec;
      it(`should encode method name ${methodName} with ${params.length === 0 ? "empty" : params} params`, () => {
        expect(Web3Helper.encodeMethod(methodName, params)).to.eql(spec.expectedResult);
      });
    });
  });

  describe("decodeMethod", () => {
    [
      {
        encoded: "0xa9059cbb000000000000000000000000ff98336a9027a09355e7b4326ca79effe366041500000000000000000000000000000000000000000000000006f05b59d3b20000", // eslint-disable-line max-len
        expectedResult: {
          method: {
            inputs: [{
              name: "to",
              type: "address",
            },
            {
              name: "value",
              type: "uint256",
            }],
            name: "transfer(address,uint256)",
            type: "function",
          },
          params: {
            to: "0xff98336a9027A09355e7b4326CA79eFfE3660415",
            value: 500000000000000000,
          },
        },
      },
      {
        encoded: "0x18160ddd",
        expectedResult: {
          method: {
            inputs: [],
            name: "totalSupply()",
            type: "function",
          },
          params: {},
        },
      },
      {
        encoded: "0x79ba5097",
        expectedResult: {
          method: {
            inputs: [],
            name: "acceptOwnership()",
            type: "function",
          },
          params: {},
        },
      },
      {
        encoded: "0xf2fde38b000000000000000000000000ff98336a9027a09355e7b4326ca79effe3660415",
        expectedResult: {
          method: {
            inputs: [{
              name: "newOwnerCandidate",
              type: "address",
            }],
            name: "transferOwnership(address)",
            type: "function",
          },
          params: {
            newOwnerCandidate: "0xff98336a9027A09355e7b4326CA79eFfE3660415",
          },
        },
      },
    ].forEach((spec) => {
      it(`should decode data ${spec.encoded}`, () => {
        const decoded = Web3Helper.decodeMethod(spec.encoded);
        const { method, params } = spec.expectedResult;

        expect(decoded.method).to.eql(method);
        Object.keys(params).forEach((key) => {
          expect(decoded.params[key]).to.eql((params as any)[key].toString());
        });
      });
    });
  });

  describe("isAddress", () => {
    [
      { address: 0, result: false },
      { address: "0x", result: false },
      { address: "0xff98336a9027B09355e7b4326CA79eFfE3660415", result: false },
      { address: "0x02C2653E06fC2c848555a5418A554bE9fC63a250", result: true },
      { address: "0xEe08D2cC697e9dc4D65fE4d9a6CbBD936776805F", result: false },
      { address: "0xff98336a9027A09355e7b4326CA79eFfE3660415", result: true },
      { address: "0xebfbfbdb8cbef890e8ca0143b5d9ab3fe15056c8", result: true },
      { address: "0xf3bf7e748e954441bbbd4446062554f881bf89d5", result: true },
      { address: "0xfCB65431F172Bb1E761976cF1617D706b2EE2550", result: true },
      { address: "0x564FbA0d2fd90e3c98B9372e269bFf2409ebD359", result: false },
    ].forEach((spec) => {
      it(`should return ${spec.result} for ${spec.address}`, () => {
        expect(Web3Helper.isAddress(spec.address)).to.eql(spec.result);
      });
    });
  });

  describe("getMethod", () => {
    [
      {
        method: {
          inputs: [
            {
              name: "spender",
              type: "address",
            },
            {
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve(address,uint256)",
          type: "function",
        },
        name: "approve(address,uint256)",
      },
      {
        method: {
          inputs: [
            {
              name: "to",
              type: "address",
            },
            {
              name: "value",
              type: "uint256",
            },
            {
              name: "start",
              type: "uint256",
            },
            {
              name: "cliff",
              type: "uint256",
            },
            {
              name: "end",
              type: "uint256",
            },
            {
              name: "revokable",
              type: "bool",
            },
          ],
          name: "grant(address,uint256,uint256,uint256,uint256,bool)",
          type: "function",
        },
        name: "grant(address,uint256,uint256,uint256,uint256,bool)",
      },
    ].forEach((spec) => {
      const { name, method } = spec;
      it(`should return method definition for ${name}`, () => {
        expect(Web3Helper.getMethod(name as string)).to.eql(method);
      });
    });
  });

  describe("getMethodNames", () => {
    Object.entries(functions).forEach((entry) => {
      const [, method] = entry as any;

      it(`should include ${method.name}`, () => {
        expect(Web3Helper.getMethodNames()).to.include(method.name);
      });
    });
  });
});
