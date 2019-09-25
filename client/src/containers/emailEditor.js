import React, { Component } from 'react';
import EmailEditor from 'react-email-editor';
class Emailer extends Component {
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
		  const { html } = data
		  console.log('exportHtml', html)
		})
    }
}

export default Emailer;