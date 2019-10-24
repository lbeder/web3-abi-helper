/** Declaration file generated by dts-gen */

export class BN {
    constructor(number: any, base: any, endian: any);

    abs(): any;

    add(num: any): any;

    addn(num: any): any;

    and(num: any): any;

    andln(num: any): any;

    bincn(bit: any): any;

    bitLength(): any;

    byteLength(): any;

    clone(): any;

    cmp(num: any): any;

    cmpn(num: any): any;

    copy(dest: any): void;

    div(num: any): any;

    divRound(num: any): any;

    divmod(num: any, mode: any, positive: any): any;

    divn(num: any): any;

    egcd(p: any): any;

    eq(num: any): any;

    eqn(num: any): any;

    forceRed(ctx: any): any;

    fromRed(): any;

    fromTwos(width: any): any;

    gcd(num: any): any;

    gt(num: any): any;

    gte(num: any): any;

    gten(num: any): any;

    gtn(num: any): any;

    iabs(): any;

    iadd(num: any): any;

    iaddn(num: any): any;

    iand(num: any): any;

    idivn(num: any): any;

    imaskn(bits: any): any;

    imul(num: any): any;

    imuln(num: any): any;

    ineg(): any;

    inotn(width: any): any;

    inspect(): any;

    invm(num: any): any;

    ior(num: any): any;

    isEven(): any;

    isNeg(): any;

    isOdd(): any;

    isZero(): any;

    ishln(bits: any): any;

    ishrn(bits: any, hint: any, extended: any): any;

    isqr(): any;

    isub(num: any): any;

    isubn(num: any): any;

    iuand(num: any): any;

    iuor(num: any): any;

    iushln(bits: any): any;

    iushrn(bits: any, hint: any, extended: any): any;

    iuxor(num: any): any;

    ixor(num: any): any;

    lt(num: any): any;

    lte(num: any): any;

    lten(num: any): any;

    ltn(num: any): any;

    maskn(bits: any): any;

    mod(num: any): any;

    modn(num: any): any;

    mul(num: any): any;

    mulTo(num: any, out: any): any;

    mulf(num: any): any;

    muln(num: any): any;

    neg(): any;

    notn(width: any): any;

    or(num: any): any;

    pow(num: any): any;

    redAdd(num: any): any;

    redIAdd(num: any): any;

    redIMul(num: any): any;

    redISqr(): any;

    redISub(num: any): any;

    redInvm(): any;

    redMul(num: any): any;

    redNeg(): any;

    redPow(num: any): any;

    redShl(num: any): any;

    redSqr(): any;

    redSqrt(): any;

    redSub(num: any): any;

    setn(bit: any, val: any): any;

    shln(bits: any): any;

    shrn(bits: any): any;

    sqr(): any;

    strip(): any;

    sub(num: any): any;

    subn(num: any): any;

    testn(bit: any): any;

    toArray(endian: any, length: any): any;

    toArrayLike(ArrayType: any, endian: any, length: any): any;

    toBuffer(endian: any, length: any): any;

    toJSON(): any;

    toNumber(): any;

    toRed(ctx: any): any;

    toString(base: any, padding: any): any;

    toTwos(width: any): any;

    uand(num: any): any;

    ucmp(num: any): any;

    umod(num: any): any;

    uor(num: any): any;

    ushln(bits: any): any;

    ushrn(bits: any): any;

    uxor(num: any): any;

    xor(num: any): any;

    zeroBits(): any;

    static BN: any;

    static isBN(num: any): any;

    static max(left: any, right: any): any;

    static min(left: any, right: any): any;

    static mont(num: any): any;

    static red(num: any): any;

    static wordSize: number;

}

export const unitMap: {
    Gwei: string;
    Kwei: string;
    Mwei: string;
    babbage: string;
    ether: string;
    femtoether: string;
    finney: string;
    gether: string;
    grand: string;
    gwei: string;
    kether: string;
    kwei: string;
    lovelace: string;
    mether: string;
    micro: string;
    microether: string;
    milli: string;
    milliether: string;
    mwei: string;
    nano: string;
    nanoether: string;
    noether: string;
    picoether: string;
    shannon: string;
    szabo: string;
    tether: string;
    wei: string;
};

export function asciiToHex(str: any): any;

export function bytesToHex(bytes: any): any;

export function checkAddressChecksum(address: any): any;

export function fromAscii(str: any): any;

export function fromDecimal(value: any): any;

export function fromUtf8(str: any): any;

export function fromWei(number: any, unit: any): any;

export function hexToAscii(hex: any): any;

export function hexToBytes(hex: any): any;

export function hexToNumber(value: any): any;

export function hexToNumberString(value: any): any;

export function hexToString(hex: any): any;

export function hexToUtf8(hex: any): any;

export function isAddress(address: any): any;

export function isBN(object: any): any;

export function isBigNumber(object: any): any;

export function isHex(hex: any): any;

export function isHexStrict(hex: any): any;

export function keccak256(value: any): any;

export function leftPad(string: any, chars: any, sign: any): any;

export function numberToHex(value: any): any;

export function padLeft(string: any, chars: any, sign: any): any;

export function padRight(string: any, chars: any, sign: any): any;

export function randomHex(size: any, callback: any): any;

export function rightPad(string: any, chars: any, sign: any): any;

export function sha3(value: any): any;

export function soliditySha3(...args: any[]): any;

export function stringToHex(str: any): any;

export function toAscii(hex: any): any;

export function toBN(number: any, ...args: any[]): any;

export function toChecksumAddress(address: any): any;

export function toDecimal(value: any): any;

export function toHex(value: any, returnType: any): any;

export function toTwosComplement(number: any): any;

export function toUtf8(hex: any): any;

export function toWei(number: any, unit: any): any;

export function utf8ToHex(str: any): any;

export namespace BN {
    namespace isBN {
        const prototype: {
        };

    }

    namespace max {
        const prototype: {
        };

    }

    namespace min {
        const prototype: {
        };

    }

    namespace mont {
        const prototype: {
        };

    }

    namespace prototype {
        function abs(): any;

        function add(num: any): any;

        function addn(num: any): any;

        function and(num: any): any;

        function andln(num: any): any;

        function bincn(bit: any): any;

        function bitLength(): any;

        function byteLength(): any;

        function clone(): any;

        function cmp(num: any): any;

        function cmpn(num: any): any;

        function copy(dest: any): void;

        function div(num: any): any;

        function divRound(num: any): any;

        function divmod(num: any, mode: any, positive: any): any;

        function divn(num: any): any;

        function egcd(p: any): any;

        function eq(num: any): any;

        function eqn(num: any): any;

        function forceRed(ctx: any): any;

        function fromRed(): any;

        function fromTwos(width: any): any;

        function gcd(num: any): any;

        function gt(num: any): any;

        function gte(num: any): any;

        function gten(num: any): any;

        function gtn(num: any): any;

        function iabs(): any;

        function iadd(num: any): any;

        function iaddn(num: any): any;

        function iand(num: any): any;

        function idivn(num: any): any;

        function imaskn(bits: any): any;

        function imul(num: any): any;

        function imuln(num: any): any;

        function ineg(): any;

        function inotn(width: any): any;

        function inspect(): any;

        function invm(num: any): any;

        function ior(num: any): any;

        function isEven(): any;

        function isNeg(): any;

        function isOdd(): any;

        function isZero(): any;

        function ishln(bits: any): any;

        function ishrn(bits: any, hint: any, extended: any): any;

        function isqr(): any;

        function isub(num: any): any;

        function isubn(num: any): any;

        function iuand(num: any): any;

        function iuor(num: any): any;

        function iushln(bits: any): any;

        function iushrn(bits: any, hint: any, extended: any): any;

        function iuxor(num: any): any;

        function ixor(num: any): any;

        function lt(num: any): any;

        function lte(num: any): any;

        function lten(num: any): any;

        function ltn(num: any): any;

        function maskn(bits: any): any;

        function mod(num: any): any;

        function modn(num: any): any;

        function mul(num: any): any;

        function mulTo(num: any, out: any): any;

        function mulf(num: any): any;

        function muln(num: any): any;

        function neg(): any;

        function notn(width: any): any;

        function or(num: any): any;

        function pow(num: any): any;

        function redAdd(num: any): any;

        function redIAdd(num: any): any;

        function redIMul(num: any): any;

        function redISqr(): any;

        function redISub(num: any): any;

        function redInvm(): any;

        function redMul(num: any): any;

        function redNeg(): any;

        function redPow(num: any): any;

        function redShl(num: any): any;

        function redSqr(): any;

        function redSqrt(): any;

        function redSub(num: any): any;

        function setn(bit: any, val: any): any;

        function shln(bits: any): any;

        function shrn(bits: any): any;

        function sqr(): any;

        function strip(): any;

        function sub(num: any): any;

        function subn(num: any): any;

        function testn(bit: any): any;

        function toArray(endian: any, length: any): any;

        function toArrayLike(ArrayType: any, endian: any, length: any): any;

        function toBuffer(endian: any, length: any): any;

        function toJSON(): any;

        function toNumber(): any;

        function toRed(ctx: any): any;

        function toString(base: any, padding: any): any;

        function toTwos(width: any): any;

        function uand(num: any): any;

        function ucmp(num: any): any;

        function umod(num: any): any;

        function uor(num: any): any;

        function ushln(bits: any): any;

        function ushrn(bits: any): any;

        function uxor(num: any): any;

        function xor(num: any): any;

        function zeroBits(): any;

        namespace abs {
            const prototype: {
            };

        }

        namespace add {
            const prototype: {
            };

        }

        namespace addn {
            const prototype: {
            };

        }

        namespace and {
            const prototype: {
            };

        }

        namespace andln {
            const prototype: {
            };

        }

        namespace bincn {
            const prototype: {
            };

        }

        namespace bitLength {
            const prototype: {
            };

        }

        namespace byteLength {
            const prototype: {
            };

        }

        namespace clone {
            const prototype: {
            };

        }

        namespace cmp {
            const prototype: {
            };

        }

        namespace cmpn {
            const prototype: {
            };

        }

        namespace copy {
            const prototype: {
            };

        }

        namespace div {
            const prototype: {
            };

        }

        namespace divRound {
            const prototype: {
            };

        }

        namespace divmod {
            const prototype: {
            };

        }

        namespace divn {
            const prototype: {
            };

        }

        namespace egcd {
            const prototype: {
            };

        }

        namespace eq {
            const prototype: {
            };

        }

        namespace eqn {
            const prototype: {
            };

        }

        namespace forceRed {
            const prototype: {
            };

        }

        namespace fromRed {
            const prototype: {
            };

        }

        namespace fromTwos {
            const prototype: {
            };

        }

        namespace gcd {
            const prototype: {
            };

        }

        namespace gt {
            const prototype: {
            };

        }

        namespace gte {
            const prototype: {
            };

        }

        namespace gten {
            const prototype: {
            };

        }

        namespace gtn {
            const prototype: {
            };

        }

        namespace iabs {
            const prototype: {
            };

        }

        namespace iadd {
            const prototype: {
            };

        }

        namespace iaddn {
            const prototype: {
            };

        }

        namespace iand {
            const prototype: {
            };

        }

        namespace idivn {
            const prototype: {
            };

        }

        namespace imaskn {
            const prototype: {
            };

        }

        namespace imul {
            const prototype: {
            };

        }

        namespace imuln {
            const prototype: {
            };

        }

        namespace ineg {
            const prototype: {
            };

        }

        namespace inotn {
            const prototype: {
            };

        }

        namespace inspect {
            const prototype: {
            };

        }

        namespace invm {
            const prototype: {
            };

        }

        namespace ior {
            const prototype: {
            };

        }

        namespace isEven {
            const prototype: {
            };

        }

        namespace isNeg {
            const prototype: {
            };

        }

        namespace isOdd {
            const prototype: {
            };

        }

        namespace isZero {
            const prototype: {
            };

        }

        namespace ishln {
            const prototype: {
            };

        }

        namespace ishrn {
            const prototype: {
            };

        }

        namespace isqr {
            const prototype: {
            };

        }

        namespace isub {
            const prototype: {
            };

        }

        namespace isubn {
            const prototype: {
            };

        }

        namespace iuand {
            const prototype: {
            };

        }

        namespace iuor {
            const prototype: {
            };

        }

        namespace iushln {
            const prototype: {
            };

        }

        namespace iushrn {
            const prototype: {
            };

        }

        namespace iuxor {
            const prototype: {
            };

        }

        namespace ixor {
            const prototype: {
            };

        }

        namespace lt {
            const prototype: {
            };

        }

        namespace lte {
            const prototype: {
            };

        }

        namespace lten {
            const prototype: {
            };

        }

        namespace ltn {
            const prototype: {
            };

        }

        namespace maskn {
            const prototype: {
            };

        }

        namespace mod {
            const prototype: {
            };

        }

        namespace modn {
            const prototype: {
            };

        }

        namespace mul {
            const prototype: {
            };

        }

        namespace mulTo {
            const prototype: {
            };

        }

        namespace mulf {
            const prototype: {
            };

        }

        namespace muln {
            const prototype: {
            };

        }

        namespace neg {
            const prototype: {
            };

        }

        namespace notn {
            const prototype: {
            };

        }

        namespace or {
            const prototype: {
            };

        }

        namespace pow {
            const prototype: {
            };

        }

        namespace redAdd {
            const prototype: {
            };

        }

        namespace redIAdd {
            const prototype: {
            };

        }

        namespace redIMul {
            const prototype: {
            };

        }

        namespace redISqr {
            const prototype: {
            };

        }

        namespace redISub {
            const prototype: {
            };

        }

        namespace redInvm {
            const prototype: {
            };

        }

        namespace redMul {
            const prototype: {
            };

        }

        namespace redNeg {
            const prototype: {
            };

        }

        namespace redPow {
            const prototype: {
            };

        }

        namespace redShl {
            const prototype: {
            };

        }

        namespace redSqr {
            const prototype: {
            };

        }

        namespace redSqrt {
            const prototype: {
            };

        }

        namespace redSub {
            const prototype: {
            };

        }

        namespace setn {
            const prototype: {
            };

        }

        namespace shln {
            const prototype: {
            };

        }

        namespace shrn {
            const prototype: {
            };

        }

        namespace sqr {
            const prototype: {
            };

        }

        namespace strip {
            const prototype: {
            };

        }

        namespace sub {
            const prototype: {
            };

        }

        namespace subn {
            const prototype: {
            };

        }

        namespace testn {
            const prototype: {
            };

        }

        namespace toArray {
            const prototype: {
            };

        }

        namespace toArrayLike {
            const prototype: {
            };

        }

        namespace toBuffer {
            const prototype: {
            };

        }

        namespace toJSON {
            const prototype: {
            };

        }

        namespace toNumber {
            const prototype: {
            };

        }

        namespace toRed {
            const prototype: {
            };

        }

        namespace toString {
            const prototype: {
            };

        }

        namespace toTwos {
            const prototype: {
            };

        }

        namespace uand {
            const prototype: {
            };

        }

        namespace ucmp {
            const prototype: {
            };

        }

        namespace umod {
            const prototype: {
            };

        }

        namespace uor {
            const prototype: {
            };

        }

        namespace ushln {
            const prototype: {
            };

        }

        namespace ushrn {
            const prototype: {
            };

        }

        namespace uxor {
            const prototype: {
            };

        }

        namespace xor {
            const prototype: {
            };

        }

        namespace zeroBits {
            const prototype: {
            };

        }

    }

    namespace red {
        const prototype: {
        };

    }

}

export namespace asciiToHex {
    const prototype: {
    };

}

export namespace bytesToHex {
    const prototype: {
    };

}

export namespace checkAddressChecksum {
    const prototype: {
    };

}

export namespace fromAscii {
    const prototype: {
    };

}

export namespace fromDecimal {
    const prototype: {
    };

}

export namespace fromUtf8 {
    const prototype: {
    };

}

export namespace fromWei {
    const prototype: {
    };

}

export namespace hexToAscii {
    const prototype: {
    };

}

export namespace hexToBytes {
    const prototype: {
    };

}

export namespace hexToNumber {
    const prototype: {
    };

}

export namespace hexToNumberString {
    const prototype: {
    };

}

export namespace hexToString {
    const prototype: {
    };

}

export namespace hexToUtf8 {
    const prototype: {
    };

}

export namespace isAddress {
    const prototype: {
    };

}

export namespace isBN {
    const prototype: {
    };

}

export namespace isBigNumber {
    const prototype: {
    };

}

export namespace isHex {
    const prototype: {
    };

}

export namespace isHexStrict {
    const prototype: {
    };

}

export namespace keccak256 {
    const prototype: {
    };

}

export namespace leftPad {
    const prototype: {
    };

}

export namespace numberToHex {
    const prototype: {
    };

}

export namespace padLeft {
    const prototype: {
    };

}

export namespace padRight {
    const prototype: {
    };

}

export namespace randomHex {
    const prototype: {
    };

}

export namespace rightPad {
    const prototype: {
    };

}

export namespace sha3 {
    const prototype: {
    };

}

export namespace soliditySha3 {
    const prototype: {
    };

}

export namespace stringToHex {
    const prototype: {
    };

}

export namespace toAscii {
    const prototype: {
    };

}

export namespace toBN {
    const prototype: {
    };

}

export namespace toChecksumAddress {
    const prototype: {
    };

}

export namespace toDecimal {
    const prototype: {
    };

}

export namespace toHex {
    const prototype: {
    };

}

export namespace toTwosComplement {
    const prototype: {
    };

}

export namespace toUtf8 {
    const prototype: {
    };

}

export namespace toWei {
    const prototype: {
    };

}

export namespace utf8ToHex {
    const prototype: {
    };

}
