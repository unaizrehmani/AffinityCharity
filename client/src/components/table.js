import React, { Component } from 'react';
import colors from '../styles/colors';
import MaterialTable from 'material-table';

class Table extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    let data = this.props.data;
    let columns = this.props.columns;
    this.state = {
      data: data,
      columns: columns
    };
  }

  render() {
    return (
      <div style={{ width: '90%' }}>
        <MaterialTable
          title={this.props.title}
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
