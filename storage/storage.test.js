'use strict';


import jest from 'jest-mock';
import { fileFilterOptions } from "./storage";
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
const mockMulterCallback = jest.fn();
const filePassed = [null, true];
const fileDidNotPass = new Error('Invalid file type');


describe("Multer's file filter", () => {


  // json file should fail
  test('should employ an error callback when json files are passed', () => {
    mockFilter(mockRequest, MOCK_FILES.json, mockMulterCallback);
    expect(mockMulterCallback).toHaveBeenCalledWith(fileDidNotPass);
  });


  // jpg file should fail
  test('should employ an error callback when jpg files are passed', () => {
    mockFilter(mockRequest, MOCK_FILES.jpg, mockMulterCallback);
    expect(mockMulterCallback).toHaveBeenCalledWith(fileDidNotPass);
  });


  // gif file should fail
  test('should employ an error callback when gif files are passed', () => {
    mockFilter(mockRequest, MOCK_FILES.gif, mockMulterCallback);
    expect(mockMulterCallback).toHaveBeenCalledWith(fileDidNotPass);
  });


  // pdf file should fail
  test('should employ an error callback when pdf files are passed', () => {
    mockFilter(mockRequest, MOCK_FILES.pdf, mockMulterCallback);
    expect(mockMulterCallback).toHaveBeenCalledWith(fileDidNotPass);
  });


  // php file should fail
  test('should employ an error callback when php files are passed', () => {
    mockFilter(mockRequest, MOCK_FILES.php, mockMulterCallback);
    expect(mockMulterCallback).toHaveBeenCalledWith(fileDidNotPass);
  });


  // csv file should pass
  test('should employ a truthy callback for CSV files', () => {
    mockFilter(mockRequest, MOCK_FILES.csv, mockMulterCallback);
    expect(mockMulterCallback).toHaveBeenCalledWith(...filePassed);
  });
})

