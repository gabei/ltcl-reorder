'use strict';

import jest, {describe, expect, beforeEach, spyOn } from 'jest';
import { storage, fileFilterOptions } from "./storage";


describe("Multer's file filter", () => {

  const MOCK_FILES = {
    js: "/path/to/js-file.js", 
    pdf: "/path/to/pdf-file.pdf",
    txt: "/path/to/txt-file.txt",
    csv: "/path/to/csv-file.csv"
  }

  const mockFilter = jest.fn(fileFilterOptions);
  const errorArg = new Error('Invalid file type');


  test('should use callback with truthy values when CSV files are passed.', () => {
    const multerCallback = jest.fn();

    mockFilter(req, MOCK_FILES.csv, multerCallback);
    expect(multerCallback).toHaveBeenCalledWith(null, true);
  });
})

