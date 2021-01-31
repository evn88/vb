import React from 'react';
import { Link } from "react-router-dom";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Export({ name = "export", data = [] }) {
  const handleClick = (event) => {
    event.preventDefault();
    console.log(event);
    let json = [{
      foo: 'bar',
      qux: 'moo',
      poo: 123,
      stux: new Date()
    }];

    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(json), "sample");
    const data = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([data], {type: "application/vnd.ms-excel;charset=utf-8"});
    FileSaver.saveAs(blob, 'test.xls');
  }

  return (
    <button className="btn btn-default" onClick={handleClick}>
      <FontAwesomeIcon icon="file-download" />  {name}
    </button>
  );
}