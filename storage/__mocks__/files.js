'use strict';

import jest from 'jest';
import path from 'path';


const fs = jest.createMockFromModule('fs');
let mockFiles = Object.create(null);


function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for( const file in newMockFiles ) {
    const dir = path.dirname(file);

    if(!mockFiles[dir]) {
      mockFiles[dir] = [];
    }

    mockFiles[dir].push(path.basename(file));
  }
}


function readDirSync(pathToDirectory){
  return mockFiles[pathToDirectory] || [];
}


fs.__setMockFiles = __setMockFiles
fs.readDirSync = readDirSync
export default fs;