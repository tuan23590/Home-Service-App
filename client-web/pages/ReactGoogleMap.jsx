// eslint-disable-next-line no-unused-vars
import React from 'react';
import './MyTable.css'; // Import file CSS

function MyTable() {
  return (
    <table className="my-table">
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
        </tr>
        <tr>
          <td>Data 4</td>
          <td>Data 5</td>
          <td>Data 6</td>
        </tr>
      </tbody>
    </table>
  );
}

export default MyTable;
