import React from 'react'
import { connect } from 'react-redux'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.authentication.isLoggedIn
  }
}

export default connect(mapStateToProps)(App)
