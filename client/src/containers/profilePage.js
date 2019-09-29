import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div/>
    );
  }
}

const mapStateToProps = state => ({
  session: state.authentication
});
export default connect(mapStateToProps)(ProfilePage);
