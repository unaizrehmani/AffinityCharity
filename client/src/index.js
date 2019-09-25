import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
	Route,
	NavLink,
	BrowserRouter as Router,
	Switch
} from 'react-router-dom';
import './stylesheets/index.css';
import App from './App';
import Login from './containers/login';
import NotFound from './components/notfound';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<ul>
					<li>
						<NavLink exact activeClassName='active' to='/'>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName='active' to='/login'>
							Login
						</NavLink>
					</li>
				</ul>
				<hr />
				<Switch>
					<Route exact path='/' component={App} />
					<Route exact path='/login' component={Login} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</Router>
	</Provider>,
	document.getElementById('root')
);
