import React, { Component } from 'react';
import colors from '../styles/colors';
import MaterialTable from 'material-table';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Name', field: 'name' },
        {
          title: 'Surname',
          field: 'surname',
          initialEditValue: 'initial edit value'
        },
        { title: 'Email', field: 'email' },
        { title: 'Causes', field: 'causes', type: 'numeric' }
      ],
      data: [
        {
          name: 'Tanner',
          surname: 'Linsley',
          email: 'Tanner.linsley@gmail.com',
          causes: 20
        },
        {
          name: 'Jane',
          surname: 'Doe',
          email: 'Jane.Doe@gmail.com',
          causes: 2
        },
        {
          name: 'Jon',
          surname: 'Snow',
          email: 'Jon.snow@gmail.com',
          causes: 5
        }
      ]
    };
  }
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

export default Table;