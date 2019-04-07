const chai = require('chai');
const Utils = require('web3-utils');
const web3Helper = require('../scripts/bin/index').Web3Helper;
const functions = require('../scripts/bin/functions.json');

const { expect } = chai;

const FUNCTION_NAME_LENGTH = 10;

describe('Web3Helper', () => {
  describe('encodeMethod', () => {
    Object.entries(functions).forEach((entry) => {
      const [signature, method] = entry;

      it(`${method.name} should have the signature ${signature}`, () => {
        const derivedSignature = Utils.sha3(method.name).substring(0, FUNCTION_NAME_LENGTH);
        expect(derivedSignature).to.eql(signature);
      });
    });
  });

  describe('encodeMethod', () => {
    [
      {
        method: {
          name: 'transfer',
          type: 'function',
          inputs: [{
            type: 'address',
            name: 'to',
          },
          {
            type: 'uint256',
            name: 'value',
          }],
        },
        params: ['0xff98336a9027A09355e7b4326CA79eFfE3660415', 500000000000000000],
        expectedResult: '0xa9059cbb000000000000000000000000ff98336a9027a09355e7b4326ca79effe366041500000000000000000000000000000000000000000000000006f05b59d3b20000',
      },
      {
        method: {
          name: 'totalSupply',
          type: 'function',
          inputs: [],
        },
        params: [],
        expectedResult: '0x18160ddd',
      },
      {
        method: {
          name: 'acceptOwnership',
          type: 'function',
          inputs: [],
        },
        params: [],
        expectedResult: '0x79ba5097',
      },
      {
        method: {
          name: 'transferOwnership',
          type: 'function',
          inputs: [{
            type: 'address',
            name: 'newOwnerCandidate',
          }],
        },
        params: ['0xff98336a9027A09355e7b4326CA79eFfE3660415'],
        expectedResult: '0xf2fde38b000000000000000000000000ff98336a9027a09355e7b4326ca79effe3660415',
      },
    ].forEach((spec) => {
      it(`should encode method ${JSON.stringify(spec.method)} with ${spec.params.length === 0 ? 'empty' : spec.params} params`, () => {
        expect(web3Helper.encodeMethod(spec.method, spec.params)).to.eql(spec.expectedResult);
      });
    });

    [
      {
        methodName: 'transfer(address,uint256)',
        params: ['0xff98336a9027A09355e7b4326CA79eFfE3660415', 500000000000000000],
        expectedResult: '0xa9059cbb000000000000000000000000ff98336a9027a09355e7b4326ca79effe366041500000000000000000000000000000000000000000000000006f05b59d3b20000',
      },
      {
        methodName: 'totalSupply()',
        params: [],
        expectedResult: '0x18160ddd',
      },
      {
        methodName: 'acceptOwnership()',
        params: [],
        expectedResult: '0x79ba5097',
      },
      {
        methodName: 'transferOwnership(address)',
        params: ['0xff98336a9027A09355e7b4326CA79eFfE3660415'],
        expectedResult: '0xf2fde38b000000000000000000000000ff98336a9027a09355e7b4326ca79effe3660415',
      },
    ].forEach((spec) => {
      it(`should encode method name ${spec.methodName} with ${spec.params.length === 0 ? 'empty' : spec.params} params`, () => {
        expect(web3Helper.encodeMethod(spec.methodName, spec.params)).to.eql(spec.expectedResult);
      });
    });
  });

  describe('decodeMethod', () => {
    [
      {
        encoded: '0xa9059cbb000000000000000000000000ff98336a9027a09355e7b4326ca79effe366041500000000000000000000000000000000000000000000000006f05b59d3b20000',
        expectedResult: {
          method: {
            name: 'transfer(address,uint256)',
            type: 'function',
            inputs: [{
              type: 'address',
              name: 'to',
            },
            {
              type: 'uint256',
              name: 'value',
            }],
          },
          params: {
            to: '0xff98336a9027A09355e7b4326CA79eFfE3660415',
            value: 500000000000000000,
          },
        },
      },
      {
        encoded: '0x18160ddd',
        expectedResult: {
          method: {
            name: 'totalSupply()',
            type: 'function',
            inputs: [],
          },
          params: {},
        },
      },
      {
        encoded: '0x79ba5097',
        expectedResult: {
          method: {
            name: 'acceptOwnership()',
            type: 'function',
            inputs: [],
          },
          params: {},
        },
      },
      {
        encoded: '0xf2fde38b000000000000000000000000ff98336a9027a09355e7b4326ca79effe3660415',
        expectedResult: {
          method: {
            name: 'transferOwnership(address)',
            type: 'function',
            inputs: [{
              type: 'address',
              name: 'newOwnerCandidate',
            }],
          },
          params: {
            newOwnerCandidate: '0xff98336a9027A09355e7b4326CA79eFfE3660415',
          },
        },
      },
    ].forEach((spec) => {
      it(`should decode data ${spec.encoded}`, () => {
        const decoded = web3Helper.decodeMethod(spec.encoded);

        expect(decoded.method).to.eql(spec.expectedResult.method);
        Object.keys(spec.expectedResult.params).forEach((key) => {
          expect(decoded.params[key]).to.eql(spec.expectedResult.params[key].toString());
        });
      });
    });
  });

  describe('isAddress', () => {
    [
      { address: 0, result: false },
      { address: '0x', result: false },
      { address: '0xff98336a9027B09355e7b4326CA79eFfE3660415', result: false },
      { address: '0x02C2653E06fC2c848555a5418A554bE9fC63a250', result: true },
      { address: '0xEe08D2cC697e9dc4D65fE4d9a6CbBD936776805F', result: false },
      { address: '0xff98336a9027A09355e7b4326CA79eFfE3660415', result: true },
      { address: '0xebfbfbdb8cbef890e8ca0143b5d9ab3fe15056c8', result: true },
      { address: '0xf3bf7e748e954441bbbd4446062554f881bf89d5', result: true },
      { address: '0xfCB65431F172Bb1E761976cF1617D706b2EE2550', result: true },
      { address: '0x564FbA0d2fd90e3c98B9372e269bFf2409ebD359', result: false },
    ].forEach((spec) => {
      it(`should return ${spec.result} for ${spec.address}`, () => {
        expect(web3Helper.isAddress(spec.address)).to.eql(spec.result);
      });
    });
  });

  describe('getMethod', () => {
    [
      {
        name: 'approve(address,uint256)',
        method: {
          inputs: [
            {
              name: 'spender',
              type: 'address',
            },
            {
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'approve(address,uint256)',
          type: 'function',
        },
      },
      {
        name: 'grant(address,uint256,uint256,uint256,uint256,bool)',
        method: {
          inputs: [
            {
              name: 'to',
              type: 'address',
            },
            {
              name: 'value',
              type: 'uint256',
            },
            {
              name: 'start',
              type: 'uint256',
            },
            {
              name: 'cliff',
              type: 'uint256',
            },
            {
              name: 'end',
              type: 'uint256',
            },
            {
              name: 'revokable',
              type: 'bool',
            },
          ],
          name: 'grant(address,uint256,uint256,uint256,uint256,bool)',
          type: 'function',
        },
      },
    ].forEach((spec) => {
      it(`should return method definition for ${spec.name}`, () => {
        expect(web3Helper.getMethod(spec.name)).to.eql(spec.method);
      });
    });
  });

  describe('getMethodNames', () => {
    Object.entries(functions).forEach((entry) => {
      const [, method] = entry;

      it(`should include ${method.name}`, () => {
        expect(web3Helper.getMethodNames()).to.include(method.name);
      });
    });
  });
});
