const chai = require('chai');

const { expect } = chai;

const web3Helper = require('../scripts/bin/index').Web3Helper;

describe('Web3Helper', () => {
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
});
