import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    login: '',
    buttonEnable: true,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.EnableBtn);
  };

  EnableBtn = () => {
    const MN = 3;
    const { login } = this.state;
    if (login.length >= MN) {
      this.setState({ buttonEnable: false });
    } else {
      this.setState({ buttonEnable: true });
    }
  };

  render() {
    const { login, buttonEnable } = this.state;
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              createUser={ createUser }
              onInputChange={ this.onInputChange }
              login={ login }
              buttonEnable={ buttonEnable }
            />) }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
