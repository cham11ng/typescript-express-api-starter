import * as openpgp from 'openpgp';

/**
 * Decrypt private key from it's respective passpharse
 *
 * @param  {string} privateKey
 * @param  {string} privateKeyPassphrase
 * @returns openpgp.key.Key
 */
export function decryptPrivateKey(privateKey: string, privateKeyPassphrase: string): openpgp.key.Key {
  const privateKeyObj = openpgp.key.readArmored(privateKey).keys[0];
  privateKeyObj.decrypt(privateKeyPassphrase);

  return privateKeyObj;
}

/**
 * Generate PGP public key and private key
 *
 * @param  {{name:string;email:string}} data
 * @param  {string} privateKeyPassphrase
 * @param  {number=4096} rsaKeySize
 * @returns Promise
 */
export function generatePGPKeys(
  data: { name: string; email: string },
  privateKeyPassphrase: string,
  rsaKeySize: number = 4096
): Promise<any> {
  return openpgp
    .generateKey({
      userIds: [data],
      numBits: rsaKeySize,
      passphrase: privateKeyPassphrase
    }) // multiple user IDs // protects the private key
    .then((key: openpgp.KeyPair) => ({ publicKey: key.publicKeyArmored, privateKey: key.privateKeyArmored }));
}

/**
 * Encrypt the given data
 *
 * @param  {string} publicKey
 * @param  {openpgp.key.Key} privateKeyObj
 * @param  {string} data
 * @returns Promise
 */
export function encrypt(publicKey: string, privateKeyObj: openpgp.key.Key, data: string): Promise<any> {
  return openpgp
    .encrypt({
      data,
      publicKeys: openpgp.key.readArmored(publicKey).keys,
      privateKeys: privateKeyObj
    }) // input as String (or Uint8Array) // for encryption // for signing (optional)
    .then((ciphertext: { data: string }) => ({ ciphertext: ciphertext.data }));
}

/**
 * Decrypt given data
 *
 * @param  {string} publicKey
 * @param  {openpgp.key.Key} privateKeyObj
 * @param  {string} encryptedData
 * @returns Promise
 */
export function decrypt(publicKey: string, privateKeyObj: openpgp.key.Key, encryptedData: string): Promise<any> {
  return openpgp
    .decrypt({
      publicKeys: openpgp.key.readArmored(publicKey).keys,
      message: openpgp.message.readArmored(encryptedData),
      privateKey: privateKeyObj
    }) // parse armored message // for verification (optional) // for decryption
    .then((plaintext: { data: string }) => ({ plaintext: plaintext.data }));
}
