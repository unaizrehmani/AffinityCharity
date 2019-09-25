import React from 'react';
import { connect } from 'react-redux';
import HomePage from './containers/homePage';

function App() {
	return (
		<div className='App'>
			<HomePage/>
		</div>
	);
}
const mapStateToProps = state => {
	return {
		isLoggedIn: state.authentication.isLoggedIn
	};
};

export default connect(mapStateToProps)(App);
