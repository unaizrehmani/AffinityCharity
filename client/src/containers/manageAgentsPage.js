import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { connect } from 'react-redux';
import CircularImage from '../components/circularImage';
import Button from '../components/button';
import PostCard from '../components/postCard';
import PropTypes from 'prop-types';

class ManageAgentsPage extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.authentication
});

ManageAgentsPage.propTypes = {
};

export default connect(mapStateToProps)(ManageAgentsPage);
