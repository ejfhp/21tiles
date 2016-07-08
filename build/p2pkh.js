'use strict';

/**
 * Created by diego on 13/06/16.
 */

var crypto = require('crypto');
var eccrypto = require('eccrypto');
var bs58 = require('bs58');

var MIN_PRIVATE_KEY = new Buffer('0000000000000000000000000000000000000000000000000000000000000001', 'hex');
var MAX_PRIVATE_KEY = new Buffer('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140', 'hex');

function validatePrivateKey(privateKey) {
    var isValid = true;

    // must be at least the minimum
    if (privateKey.compare(MIN_PRIVATE_KEY) < 0) {
        isValid = false;
    }

    //must not exceed the maximum
    if (privateKey.compare(MAX_PRIVATE_KEY) > 0) {
        isValid = false;
    }

    return isValid;
}

var privateKey = void 0;

do {
    privateKey = crypto.randomBytes(32);
} while (!validatePrivateKey(privateKey));
console.log("Private key:");
console.log(privateKey);

var publicKey = eccrypto.getPublic(privateKey);
console.log("Public key:");
console.log(publicKey);

var hash256 = crypto.createHash('sha256').update(publicKey).digest();
console.log("Hash sha256:");
console.log(hash256);

var hash160 = crypto.createHash('ripemd160').update(hash256).digest();
console.log("Hash ripemd160:");
console.log(hash160);

var version = new Buffer('00', 'hex');
var checksum = void 0;
checksum = Buffer.concat([version, hash160]);
checksum = crypto.createHash('sha256').update(checksum).digest();
checksum = crypto.createHash('sha256').update(checksum).digest();
checksum = checksum.slice(0, 4);

console.log("Checksum:");
console.log(checksum);

var address = Buffer.concat([version, hash160, checksum]);
console.log("Address:");
console.log(address);

var addressbs58 = bs58.encode(address);
console.log("Address (base58):");
console.log(addressbs58);

//# sourceMappingURL=p2pkh.js.map