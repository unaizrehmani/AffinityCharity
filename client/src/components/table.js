import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Table extends Component {
  render() {
    const data = [{
        name: 'Tanner Linsley',
        email: 'Tanner.linsley@gmail.com',
        numberofcauses: 20
      },
      {
        name: 'Jane Doe',
        email: 'Jane.Doe@gmail.com',
        numberofcauses: 2
      },
      {
        name: 'Jon Snow',
        email: 'Jon.snow@gmail.com',
        numberofcauses: 5
      }]

      const columns = [{
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
      }, {
        Header: 'Email',
        accessor: 'email',
      }, {
        Header: 'Number of Causes',
        accessor: 'numberofcauses',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      },]
    return (
        <CustomTable
        data={data}
        columns={columns}
    />
    );
    
  }
}

const CustomTable = styled(ReactTable)`
    width: 95%;
`;

export default Table;
