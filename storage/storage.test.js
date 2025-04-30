'use strict';


import jest from 'jest-mock';
import { fileFilterOptions, filterCallback } from "./storage";
import { Blob } from 'buffer';


const MOCK_FILES = {
  json: new Blob([""], {type: "application/json"}), 
  jpg: new Blob([""], {type: "image/jpeg"}), 
  gif: new Blob([""], {type: "image/gif"}),
  pdf: new Blob([""], {type: "application/pdf"}),
  php: new Blob([""], {type: "application/x-httpd-php"}),
  csv: new Blob([""], {type: "text/csv"})
}


const mockRequest = {
  body: { name: "John Smith",email: "john@example.com" }
}


const mockFilter = jest.fn(fileFilterOptions);
const mockCallback = jest.fn(filterCallback);
const filePassed = [null, true];
const fileDidNotPass = new Error('Invalid file type');


describe("Multer's file filter", () => {

  test.each([
    [MOCK_FILES.json], 
    [MOCK_FILES.jpg], 
    [MOCK_FILES.gif],
    [MOCK_FILES.pdf],
    [MOCK_FILES.php],
  ])('should throw an error when %o file types are passed',
    (file) => {
      expect(()=> {
        mockFilter(mockRequest, file, mockCallback);
      }).toThrow(fileDidNotPass);
    },
  );


  // csv file should pass
  test('should employ a truthy callback for CSV files', () => {
    mockFilter(mockRequest, MOCK_FILES.csv, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(...filePassed);
  });
});

