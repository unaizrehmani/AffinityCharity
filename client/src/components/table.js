import React, { Component } from 'react';
import colors from '../styles/colors';
import MaterialTable from 'material-table';
import axios from 'axios';
import FormData from 'form-data';

const { URL } = require('../util/baseURL');
var generator = require('generate-password');

class Table extends Component {
  updateEditData = async newData => {
    const data = [...this.props.data];
    const index = data.findIndex(x => x._id === newData._id && !x.isAdmin);
    const userID = newData._id;
    if (index !== -1) {
      data[index] = newData;
      this.props.setTableData(data);
      const config = {
        headers: {
          Authorization: 'Bearer ' + this.props.userToken,
          'Content-Type': 'application/json'
        }
      };
      await axios.patch(`${URL}/api/users/${userID}`, newData, config);
    }
  };

  onRowUpdate = async newData => {
    try {
      this.updateEditData(newData);
    } catch (err) {
      console.log(err);
    }
  };

  updateAddData = newData => {
    const data = [...this.props.data];
    data.push(newData);
    this.props.setTableData(data);
  };

  onRowAdd = async newData => {
    try {
      const { firstName, lastName, email } = newData;
      const isAdmin = newData.isAdmin ? true : false;
      const password = generator.generate({
        length: 8,
        numbers: true
      });

      const userData = new FormData();
      userData.append('firstName', firstName);
      userData.append('lastName', lastName);
      userData.append('email', email);
      userData.append('password', password);
      userData.append('isAdmin', isAdmin);

      const config = {
        headers: {
          Authorization: 'Bearer ' + this.props.userToken,
          'Content-Type': 'multipart/form-data'
        }
      };
      const result = await axios.post(`${URL}/api/users`, userData, config);
      this.updateAddData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  updateDeleteData = async oldData => {
    const data = [...this.props.data];
    const index = data.findIndex(x => x._id === oldData._id && !x.isAdmin);
    if (index !== -1 && data.length > 1) {
      data.splice(index, 1);
      this.props.setTableData(data);
      const userID = oldData._id;
      const config = {
        headers: {
          Authorization: 'Bearer ' + this.props.userToken
        }
      };
      await axios.delete(`${URL}/api/users/${userID}`, config);
    }
  }

  onRowDelete = async oldData => {
    try {
      this.updateDeleteData(oldData);
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div style={{ width: '90%' }}>
        <MaterialTable
          title={this.props.title}
          options={{
            pageSize: 10
          }}
          columns={this.props.columns}
          data={this.props.data}
          style={{ color: colors.primaryAccent }}
          editable={{
            onRowAdd: this.onRowAdd,
            onRowUpdate: this.onRowUpdate,
            onRowDelete: this.onRowDelete
          }}
        />
      </div>
    );
  }
}

export default Table;
