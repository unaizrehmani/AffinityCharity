import React from 'react';
import { connect } from 'react-redux';

function App() {
	return (
		<div className='App'>
			<h1>Home</h1>
		</div>
	);
}
const mapStateToProps = state => {
	return {
		isLoggedIn: state.authentication.isLoggedIn
	};
};

export default connect(mapStateToProps)(App);
