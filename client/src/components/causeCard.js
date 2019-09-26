import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { Card, Icon, Image } from "semantic-ui-react";


const CardContainer = styled(Card)`

color: black;

-webkit-box-shadow: 0px 0px 3px 0px rgba(173,173,173,1);
    -moz-box-shadow: 0px 0px 3px 0px rgba(173,173,173,1);
    box-shadow: 0px 0px 3px 0px rgba(173,173,173,1); 

&:hover{
    -webkit-box-shadow: -5px 10px 35px 0px rgba(173,173,173,1);
    -moz-box-shadow: -5px 10px 35px 0px rgba(173,173,173,1);
    box-shadow: -5px 10px 35px 0px rgba(173,173,173,1);
  }
`;

class CauseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CardContainer>
        <Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            22 Friends
          </a>
        </Card.Content>
      </CardContainer>
    );
  }
}

CauseCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.string,
    users: PropTypes.number
  }

export default CauseCard;
