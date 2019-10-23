import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/input';
import TextArea from '../components/textArea';
import Button from '../components/button';
import colors from '../styles/colors';

class CreateCausePage extends React.Component {

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

  handleCreateCauseButton = () =>{
    console.log("create cause");
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  };

  handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];
    console.log(image)
    reader.onloadend = () => {
      this.setState({
        image: image,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(image)
  }

  render() {
    const inputContainerStyleOverride = {
      marginBottom: '10px',
      borderRadius: '0px',
      height: '30px',
      width: '600px'
    }

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null

    if (imagePreviewUrl) {
      $imagePreview = (<ImagePreview src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <CreateCausePageContainer>
        <Header>
          <h1>Create a Cause</h1>
          <hr />
        </Header>
        <FormContainer>
          <InputContainer>
            <InputTitle>Title</InputTitle>
            <Input
              name="title"
              value={this.state.title}
              onChange={this.handleUserInput}
              style={inputContainerStyleOverride}
              noLabel={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>Type</InputTitle>
            <Input
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
              value={this.state.location}
              onChange={this.handleUserInput}
              name="location"
              style={inputContainerStyleOverride}
              noLabel={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>Description</InputTitle>
            <TextArea
              name="description"
              value={this.state.description}
              onChange={this.handleUserInput}
              style={{ width: '600px' }} />
          </InputContainer>
          <InputContainer>
            <InputTitle>Upload Image</InputTitle>
            <input
              type="file"
              name="image"
              onChange={(e) => this.handleImageChange(e)}
              style={inputContainerStyleOverride}
            />
          </InputContainer>
            <div className="imgPreview">
            {$imagePreview}
          </div>
          <Button title="Create Cause" primary handleClick={this.handleCreateCauseButton} />
        </FormContainer>
      </CreateCausePageContainer>
    );
  }
}

const mapStateToProps = state => ({
  session: state.authentication
});

CreateCausePage.propTypes = {};

const CreateCausePageContainer = styled.div`
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

export default connect(mapStateToProps)(CreateCausePage);
