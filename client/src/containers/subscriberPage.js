import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { URL } from '../util/baseURL';
import { Image, List, Form, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Button from '../components/button';

class SubscriberPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: undefined
    };
  }

  listFloated = () => (
    <List divided verticalAlign="middle">
      {this.state.data.map(cause => {
        return (
          <List.Item key={cause._id}>
            <List.Content floated="right">
              <ButtonStyle>
                <Button
                  primary
                  handleClick={() => {
                    this.props.history.push(`/register/${cause._id}`);
                  }}
                >
                  <Icon name="add"></Icon>
                  Add
                </Button>
                <Button
                  primary
                  handleClick={() => {
                    this.props.history.push(`/unsubscribe/${cause._id}`);
                  }}
                >
                  <Icon name="minus"></Icon>
                  Remove
                </Button>
              </ButtonStyle>
            </List.Content>
            <Image avatar src={cause.mediaURL} />
            <List.Content>{`${cause.name} - ${cause.location}`}</List.Content>
          </List.Item>
        );
      })}
    </List>
  );

  componentDidMount = async () => {
    try {
      this.setState({ loading: true });
      const result = await axios.get(`${URL}/api/causes`);
      const { data } = result;
      this.setState({ data, loading: false });
    } catch (err) {
      console.log(err);
    }
  };

  render = () => {
    return (
      <SubscriberPageStyle>
        <Header>
          <h2 className="ui center aligned icon header">
            <i className="circular icon users"> </i>
            Subscribers
          </h2>
        </Header>
        {this.props.session.isAdmin ? (
          <Form loading={this.state.loading}>
            {this.state.data && this.listFloated()}
          </Form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            You are not authorized to edit subscribers
          </div>
        )}
      </SubscriberPageStyle>
    );
  };
}

const SubscriberPageStyle = styled.div`
  margin-bottom: 20px;
`;

const Header = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ButtonStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const mapStateToProps = state => ({
  session: state.authentication
});

export default connect(mapStateToProps)(SubscriberPage);
