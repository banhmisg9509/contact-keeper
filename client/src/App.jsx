import { NavBar, Home, About } from 'components';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ContactState, AuthState } from 'context';

function App() {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <NavBar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
}

export default App;
