import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/input';
import TextArea from '../components/textArea';
import Button from '../components/button';
import colors from '../styles/colors';
import { createCause } from '../redux/actions/cause';
import FormData from '../../node_modules/form-data';

export class CreateCausePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      description: '',
      image: '',
      imagePreviewUrl: '',
      loading: false
    };
  }

  handleCreateCauseButton = () => {
    this.setState({ loading: true });
    let isFormValid =
      this.state.name &&
      this.state.location &&
      this.state.description &&
      this.state.image
        ? true
        : false;

    if (isFormValid) {
      this.handleRequestToCreateNewCause();
    } else {
      this.setState({ loading: false });
      console.log('Please fill out all required fields'); //TODO add error toast here
    }
  };

  handleRequestToCreateNewCause = async () => {
    let formData = new FormData();

    formData.append('name', this.state.name);
    formData.append('location', this.state.location);
    formData.append('description', this.state.description);
    formData.append('deleteable', true);
    formData.append('image', this.state.image);

    this.props
      .dispatch(createCause(formData, this.props.session.userToken))
      .then(() => {
        this.setState({ loading: false });
        if (
          !this.props.isCreatingCause &&
          this.props.creatingCauseError === undefined
        ) {
          this.props.history.push('/');
        }
      });
  };

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
    const { loading } = this.state;

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
            primary
            handleClick={this.handleCreateCauseButton}
            disabled={loading}
          >
            {loading && <i className="notched circle loading icon"></i>}
            {loading ? <span>Creating Cause</span> : <span>Create Cause</span>}
          </Button>
        </FormContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  session: state.authentication,
  isCreatingCause: state.cause.isCreatingCause,
  creatingCauseError: state.cause.creatingCauseError
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
