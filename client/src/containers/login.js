import React from 'react';
class Login extends React.Component {
	onSubmit = () => {
		this.props.history.push('/');
	};
	render() {
		return (
			<div>
				<h1>Login</h1>
				<form>
					<input placeholder='email' type='email' />
					<input placeholder='password' type='password' />
					<button onClick={this.onSubmit}>Submit</button>
				</form>
			</div>
		);
	}
}
export default Login;
