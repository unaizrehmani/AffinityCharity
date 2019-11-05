import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/input';
import TextArea from '../components/textArea';
import Button from '../components/button';
import colors from '../styles/colors';
import { createCause } from '../redux/actions/cause';

export class CreateCausePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      location: '',
      description: '',
      image: '',
      imagePreviewUrl: ''
    };
  }

  handleCreateCauseButton = () => {
    let isFormValid =
      this.state.name &&
      this.state.type &&
      this.state.location &&
      this.state.description &&
      this.state.image
        ? true
        : false;

    console.log(this.state.image);
    if (isFormValid) {
      this.handleRequestToCreateNewCause();
    } else {
      console.log('Please fill out all required fields');
    }
  };

  handleRequestToCreateNewCause = async () => {
    let cause = {
      name: this.state.name,
      location: this.state.location,
      description: this.state.description,
      image: this.state.image,
      deletable: true
    };
    this.props.dispatch(createCause(cause, this.props.session.userToken));
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleImageChange = e => {
    e.preventDefault();

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
            <InputTitle>Name</InputTitle>
            <Input
              id="input-name"
              name="name"
              value={this.state.name}
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
              name="location"
              value={this.state.location}
              onChange={this.handleUserInput}
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
              accept="image/png, image/jpeg"
              onChange={e => this.handleImageChange(e)}
              style={inputContainerStyleOverride}
            />
          </InputContainer>
          <div className="imgPreview">{$imagePreview}</div>
          <Button
            id="button-createCause"
            title="Create Cause"
            primary
            handleClick={this.handleCreateCauseButton}
          />
        </FormContainer>
      </Container>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     createCause: (cause, userToken) => dispatch(createCause(cause, userToken))
//   }
// }

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
