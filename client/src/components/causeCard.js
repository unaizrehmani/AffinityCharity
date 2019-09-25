import React from 'react';
import styled from 'styled-components';

const CauseCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    justify-content: center

    height: 400px;
    width: 300px;
    -webkit-box-shadow: 0px 0px 3px 0px rgba(173,173,173,1);
    -moz-box-shadow: 0px 0px 3px 0px rgba(173,173,173,1);
    box-shadow: 0px 0px 3px 0px rgba(173,173,173,1); 
    position: relative;
    cursor: pointer;
    transition: box-shadow 0.2s linear;
    -webkit-transition: box-shadow 0.2s linear;
    -moz-transition: box-shadow 0.2s linear;
    &:hover{
      -webkit-box-shadow: -5px 10px 35px 0px rgba(173,173,173,1);
      -moz-box-shadow: -5px 10px 35px 0px rgba(173,173,173,1);
      box-shadow: -5px 10px 35px 0px rgba(173,173,173,1);
    }
`;




class CauseCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
    }

	render() {
		return (
			<CauseCardContainer>
                
            </CauseCardContainer>
		);
	}
}
export default CauseCard;
