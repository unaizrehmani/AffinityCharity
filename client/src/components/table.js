import React, { Component } from 'react';
import colors from '../styles/colors';
import MaterialTable from 'material-table';
import axios from 'axios';
import FormData from 'form-data';
import generator from 'generate-password';

const { URL } = require('../util/baseURL');

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

  sendEmail = async (newData, password) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + this.props.userToken,
        'Content-Type': 'application/json'
      }
    };
    const { email, firstName } = newData;
    const bodyParameters = {
      email: email,
      html: `
        <h1> Congratulations ${firstName}! </h1>
        <p> You have been invited by HCI to collaborate with your team!</p>
        <p>Your credentials are as follows:</p>
        <p>Username: ${email}</p>
        <p>Password: ${password}</p>
        <p>You can login at: <a>${URL}</a></p>
      `,
      subject: 'Congratulations for joining Human Concern International!'
    };
    await axios.post(`${URL}/api/causes/send-email`, bodyParameters, config);
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
      this.sendEmail(newData, password);
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
  };

  onRowDelete = async oldData => {
    try {
      this.updateDeleteData(oldData);
    } catch (err) {
      console.log(err);
    }
  };

  renderTable = () => {
    if (this.props.isAdmin) {
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
    } else {
      return <div>You are not authorized to use the admin tab</div>;
    }
  };

  render() {
    return this.renderTable();
  }
}

export default Table;
