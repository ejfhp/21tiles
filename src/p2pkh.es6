/**
 * Created by diego on 13/06/16.
 */

const crypto = require('crypto');
const eccrypto = require('eccrypto');
const bs58 = require('bs58');

const MIN_PRIVATE_KEY = new Buffer('0000000000000000000000000000000000000000000000000000000000000001', 'hex');
const MAX_PRIVATE_KEY = new Buffer('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140', 'hex');

function validatePrivateKey(privateKey) {
    let isValid = true;

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

let privateKey;

do {
    privateKey = crypto.randomBytes(32);
} while (!validatePrivateKey(privateKey));
console.log("Private key:");
console.log(privateKey);

let publicKey = eccrypto.getPublic(privateKey);
console.log("Public key:");
console.log(publicKey);

let hash256 = crypto.createHash('sha256').update(publicKey).digest();
console.log("Hash sha256:");
console.log(hash256);

let hash160 = crypto.createHash('ripemd160').update(hash256).digest();
console.log("Hash ripemd160:");
console.log(hash160);



let version = new Buffer('00', 'hex');
let checksum;
checksum = Buffer.concat([version, hash160]);
checksum = crypto.createHash('sha256').update(checksum).digest();
checksum = crypto.createHash('sha256').update(checksum).digest();
checksum = checksum.slice(0, 4);

console.log("Checksum:");
console.log(checksum);

let address = Buffer.concat([version, hash160, checksum]);
console.log("Address:");
console.log(address);

let addressbs58 = bs58.encode(address);
console.log("Address (base58):");
console.log(addressbs58);

