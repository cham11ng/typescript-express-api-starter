import * as fs from 'fs';
import lang from '../utils/lang';

/**
 * Create new file
 *
 * @param  {string} path
 * @param  {string} data
 */
export async function createFile(path: string, data: string) {
  fs.writeFile(path, data, (err: {}) => console.log(err ? err : lang.fileCreated));
}

/**
 * Delete file
 *
 * @param  {string} path
 */
export function deleteFile(path: string) {
  fs.unlink(path, (err: {}) => console.log(err ? err : lang.fileCreated));
}

/**
 * Read file content
 *
 * @param  {string} path
 */
export function readFile(path: string) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}
