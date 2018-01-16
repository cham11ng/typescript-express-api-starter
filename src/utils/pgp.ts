import * as openpgp from 'openpgp';

import { PUBLIC_KEY, PRIVATE_KEY, PRIVATE_KEY_PASSPHRASE, RSA_KEY_SIZE } from '../constants/constants';

const privateKeyObj = openpgp.key.readArmored(PRIVATE_KEY).keys[0];
privateKeyObj.decrypt(PRIVATE_KEY_PASSPHRASE);

/**
 * Generate PGP public key and private key
 *
 * @returns Promise
 */
export function generatePGPKeys(data: { name: string; email: string }): Promise<any> {
  const options = {
    userIds: [data],
    numBits: RSA_KEY_SIZE,
    passphrase: PRIVATE_KEY_PASSPHRASE
  }; // multiple user IDs // protects the private key
  return openpgp.generateKey(options).then((key: openpgp.KeyPair) => ({
    publicKey: key.publicKeyArmored,
    privateKey: key.privateKeyArmored
  }));
}

/**
 * Encrypt the given data
 *
 * @param  {string} data
 * @returns Promise
 */
export function encrypt(data: string): Promise<any> {
  return openpgp
    .encrypt({
      data,
      publicKeys: openpgp.key.readArmored(PUBLIC_KEY).keys,
      privateKeys: privateKeyObj
    }) // input as String (or Uint8Array) // for encryption // for signing (optional)
    .then((ciphertext: { data: string }) => ({ ciphertext: ciphertext.data }));
}

/**
 * Decrypt given data
 *
 * @param  {string} encryptedData
 * @returns Promise
 */
export function decrypt(encryptedData: string): Promise<any> {
  return openpgp
    .decrypt({
      publicKeys: openpgp.key.readArmored(PUBLIC_KEY).keys,
      message: openpgp.message.readArmored(encryptedData),
      privateKey: privateKeyObj
    }) // parse armored message // for verification (optional) // for decryption
    .then((plaintext: { data: string }) => ({ plaintext: plaintext.data }));
}
