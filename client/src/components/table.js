import React, { Component } from 'react';
import colors from '../styles/colors';
import MaterialTable from 'material-table';
import axios from 'axios';
import { connect } from 'react-redux';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: 'Name',
          field: 'firstName'
        },
        {
          title: 'Surname',
          field: 'lastName'
        },
        {
          title: 'Email',
          field: 'email'
        },
        {
          title: 'Causes',
          field: 'causes',
          type: 'numeric'
        }
      ]
    };
  }

  componentDidMount = async () => {
    const AuthStr = 'Bearer '.concat(this.props.session.userToken);

    axios
      .get('https://social-charity-server.herokuapp.com/api/users', {
        params: {},
        headers: { Authorization: AuthStr }
      })
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  render() {
    return (
      <div style={{ width: '95%' }}>
        <MaterialTable
          title="Agents"
          columns={this.state.columns}
          data={this.state.data}
          style={{ color: colors.primaryAccent }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    console.log(reject);
                    const data = this.state.data;
                    data.push(newData);
                    this.setState({ data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    console.log(reject);
                    const data = this.state.data;
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
                    let data = this.state.data;
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

const mapStateToProps = state => {
  return {
    session: state.authentication
  };
};
export default connect(mapStateToProps)(Table);
