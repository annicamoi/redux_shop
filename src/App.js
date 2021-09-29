import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

//layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

//pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import './default.scss';

//changed functional component to class component due to authentification // 

const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  //our Event listener for auth subscribtion//

authListener = null;

//lifecycle hook//

componentDidMount() {
this.authListener = auth.onAuthStateChanged(async userAuth => {
  if (userAuth) {
    const userRef = await handleUserProfile(userAuth);
    userRef.onSnapshot(snapshot => {
      this.setState({
        currentUser: {
          id: snapshot.id,
          ...snapshot.data()
        }
      })
    })
  }

this.setState({
...initialState
});

});
}

componentWillUnmount () {
this.authListener();
//this will unsubscribe//
}


  render () {
const { currentUser } = this.state;

  return (
    <div className="App">
     <Switch>
     <Route exact path="/" render={() => (
       <HomepageLayout currentUser={currentUser}>
         <Homepage />
       </HomepageLayout>
     )} />
     <Route path="/registration" render={() => currentUser ? <Redirect to="/" /> : (
       <MainLayout currentUser={currentUser}>
         <Registration />
       </MainLayout>
     )} />
     <Route path="/login" 
      render={() => currentUser ? <Redirect to="/" /> : (
        <MainLayout currentUser={currentUser}>
          <Login />
        </MainLayout>
      )} />
     </Switch>
      </div>
  );
}
}

export default App;
