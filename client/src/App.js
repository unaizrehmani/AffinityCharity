import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmailEditor from 'react-email-editor';

class App extends Component {
	render = () => {
		return (
		<div>
			<h1>hello world</h1>
			<div>
				<button onClick={this.exportHtml}>Export HTML</button>
			</div>

			<EmailEditor
				ref={editor => this.editor = editor}
			/>
		</div>);
	}

	exportHtml = () => {
		this.editor.exportHtml(data => {
		  const { design, html } = data
		  console.log('exportHtml', html)
		})
	  }
}
const mapStateToProps = state => {
	return {
		isLoggedIn: state.authentication.isLoggedIn
	};
};

export default connect(mapStateToProps)(App);
