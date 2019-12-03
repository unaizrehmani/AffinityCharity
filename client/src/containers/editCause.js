import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Message, Icon, Header } from 'semantic-ui-react';
import { URL } from '../util/baseURL';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../components/button';

class EditCause extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      errorHeader: '',
      errorContent: '',
      success: false,
      name: '',
      location: '',
      description: '',
      image: null
    };
  }

  renderHeader = () => {
    return (
      <HeaderStyle>
        <Header>
          <h2 className="ui center aligned icon header">
            <i className="circular icon edit"> </i>
            Edit Cause
          </h2>
        </Header>
      </HeaderStyle>
    );
  };

  handleUpdate = async () => {
    const { name, location, description } = this.state;
    const body = Object.assign(
      {},
      name && { name },
      location && { location },
      description && { description }
    );
    const { id } = this.props.match.params;
    this.setState({ loading: true });
    if (Object.keys(body).length) {
      try {
        const result = await axios.patch(`${URL}/api/causes/${id}`, body, {
          headers: { Authorization: 'Bearer ' + this.props.session.userToken }
        });
        this.setState({
          loading: false,
          error: false,
          success: true
        });
        this.props.history.push('/');
      } catch (err) {
        this.setState({
          loading: false,
          error: true,
          success: false,
          errorHeader: 'Server error, please contact tech support'
        });
      }
    } else {
      this.setState({
        loading: false,
        error: true,
        success: false,
        errorHeader: 'You must change at least one field'
      });
    }
  };

  handleDelete = async () => {
    // TODO: add a confirmation dialog component
    this.setState({
      loading: true
    });
    try {
      const { id } = this.props.match.params;
      const result = await axios.delete(`${URL}/api/causes/${id}`, {
        headers: { Authorization: 'Bearer ' + this.props.session.userToken }
      });
      this.setState({
        loading: false,
        error: false,
        success: true
      });
      this.props.history.push('/');
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
        success: false,
        errorHeader: 'You must change at least one field'
      });
    }
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  renderForm = () => {
    const { name, location, description } = this.state;
    const { cause } = this.props.location.state;
    // TODO: allow donor, editor JSON and image change
    return (
      <Form
        loading={this.state.loading}
        error={this.state.error}
        success={this.state.success}
      >
        <Form.Input
          placeholder="New name"
          label={`Name: ${cause.name}`}
          name="name"
          onChange={this.handleChange}
          value={name}
        />
        <Form.Input
          placeholder="New location"
          label={`Location: ${cause.location}`}
          name="location"
          onChange={this.handleChange}
          value={location}
        />
        <Form.Input
          placeholder="New description"
          label={`Description: ${cause.description}`}
          name="description"
          onChange={this.handleChange}
          value={description}
        />
        <Message
          error
          header={this.state.errorHeader}
          content={this.state.errorContent}
        />
        <Message
          success
          header={'You have successfully changed your settings!'}
        />
        <ButtonStyle>
          <Button primary handleClick={this.handleUpdate}>
            <Icon name="edit"></Icon>
            Update
          </Button>
          {this.renderDelete()}
        </ButtonStyle>
      </Form>
    );
  };

  renderDelete = () => {
    return (
      <Button primary handleClick={this.handleDelete}>
        <Icon name="trash"></Icon>
        Delete
      </Button>
    );
  };

  render = () => {
    return (
      <div>
        {this.renderHeader()}
        {this.renderForm()}
      </div>
    );
  };
}

const HeaderStyle = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonStyle = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(EditCause);
