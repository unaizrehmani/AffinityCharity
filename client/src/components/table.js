import React, { Component } from 'react';
import colors from '../styles/colors';
import MaterialTable from 'material-table';
import axios from 'axios';
import FormData from 'form-data';

const { URL } = require('../util/baseURL');
var generator = require('generate-password');

class Table extends Component {
  updateData = newData => {
    const newDataParent = [...this.props.data];
    newDataParent.push(newData);
    this.props.setTableData(newDataParent);
  };

  onRowAdd = async newData => {
    console.log('newData: ', newData);
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
      await axios.post(`${URL}/api/users`, userData, config);

      this.updateData(newData);
    } catch (err) {
      console.log(err);
    }
  };

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
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    console.log(reject);
                    const data = this.props.data;
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    this.setState({ data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    console.log(reject);
                    let data = this.props.data;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.setState({ data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              })
          }}
        />
      </div>
    );
  }
}

export default Table;
