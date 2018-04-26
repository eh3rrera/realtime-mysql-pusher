import React, { Component } from 'react';
import './App.css';

export default class Table extends Component {
    render() {
      const rowsMapped =this.props.rows.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
               <td>{row.price}</td>
            </tr>
          ));
      
      return (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rowsMapped}
          </tbody>
        </table>
      );
    }
}