import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/input';
import TextArea from '../components/textArea';
import Button from '../components/button';
import colors from '../styles/colors';

export class CreateCausePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      type: '',
      location: '',
      description: '',
      image: '',
      imagePreviewUrl: ''
    };
  }

  // handleCreateCauseButton = () => {
  //   if (
  //     this.state.title !== '' &&
  //     this.state.type !== '' &&
  //     this.state.location !== '' &&
  //     this.state.description !== ''
  //   ) {
  //     //Create cause
  //   } else {
  //     //display error indicated that fields need to be filled
  //   }
  // };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleImageChange = e => {
    // e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        image: image,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(image);
  };

  render() {
    const inputContainerStyleOverride = {
      marginBottom: '10px',
      borderRadius: '0px',
      height: '30px',
      width: '600px'
    };

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = <ImagePreview src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <Container>
        <Header>
          <h1>Create a Cause</h1>
          <hr />
        </Header>
        <FormContainer>
          <InputContainer>
            <InputTitle>Title</InputTitle>
            <Input
              id="input-title"
              name="title"
              size="medium"
              value={this.state.title}
              onChange={this.handleUserInput}
              style={inputContainerStyleOverride}
              noLabel={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>Type</InputTitle>
            <Input
              id="input-type"
              name="type"
              size="medium"
              value={this.state.type}
              onChange={this.handleUserInput}
              style={inputContainerStyleOverride}
              noLabel={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>Location</InputTitle>
            <Input
              id="input-location"
              value={this.state.location}
              onChange={this.handleUserInput}
              name="location"
              size="medium"
              style={inputContainerStyleOverride}
              noLabel={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>Description</InputTitle>
            <TextArea
              id="input-description"
              name="description"
              value={this.state.description}
              onChange={this.handleUserInput}
              style={{ width: '600px' }}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>Upload Image</InputTitle>
            <input
              id="input-image"
              type="file"
              name="image"
              onChange={e => this.handleImageChange(e)}
              style={inputContainerStyleOverride}
            />
          </InputContainer>
          <div className="imgPreview">{$imagePreview}</div>
          <Button id="button-createCause" title="Create Cause" primary />
        </FormContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  session: state.authentication
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  margin-bottom: 20px;
  margin-top: 50px;
  h1 {
    font-size: 40px !important;
  }
  hr {
    height: 0.2rem;
    width: 80%;
    background: ${colors.primary};
    border: none;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.2rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  width: 600px;
  margin: 5px;
`;

const InputTitle = styled.h5`
  text-align: left;
  width: 100%;
  margin: 0px;
`;

const ImagePreview = styled.img`
  height: 150px;
  width: 260px;
`;

export const CreateCausePage = connect(mapStateToProps)(
  CreateCausePageContainer
);
