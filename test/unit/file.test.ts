import { expect } from 'chai';
import { createFile, readFile, deleteFile } from '../../src/utils/file';

const hello = '# Hello World';
const filePath = './keys/test.md';

describe('File services testing, createFile, removeFile and readFile', () => {
  before(async () => {
    createFile(filePath, hello);
  });

  it('should read file', async () => {
    const content = readFile(filePath);

    expect(content).to.be.equal(hello);
  });

  it('should delete file', () => {
    deleteFile(filePath);
  });
});
