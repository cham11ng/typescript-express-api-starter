import { expect } from 'chai';
import * as fileService from '../../src/services/fileService';

const hello = '# Hello World';
const filePath = './keys/test.md';

describe('File services testing, createFile, removeFile and readFile', () => {
  before(async () => {
    fileService.createFile(filePath, hello);
  });

  it('should read file', async () => {
    const content = fileService.readFile(filePath);

    expect(content).to.be.equal(hello);
  });

  it('should delete file', () => {
    fileService.deleteFile(filePath);
  });
});
