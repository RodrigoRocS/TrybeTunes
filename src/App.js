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

const MN = 3;

class App extends React.Component {
  state = {
    login: '',
    search: '',
    buttonEnable: true,
    buttonEnable2: true,
  };

  cleanSearch = () => {
    this.setState({ search: '' });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    let btn = '';
    let mn = '';
    if (name === 'login') {
      btn = 'buttonEnable';
      mn = MN;
    } else {
      btn = 'buttonEnable2';
      mn = 2;
    }
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
      () => this.EnableBtn(mn, btn, name),
    );
  };

  EnableBtn = (num, states, input) => {
    const { state } = this;
    if (state[input].length >= num) {
      this.setState({ [states]: false });
    } else {
      this.setState({ [states]: true });
    }
  };

  render() {
    const { login, buttonEnable, search, buttonEnable2 } = this.state;
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
          <Route
            exact
            path="/search"
            render={ () => (<Search
              search={ search }
              onInputChange={ this.onInputChange }
              buttonEnable2={ buttonEnable2 }
              cleanSearch={ this.cleanSearch }
            />) }
          />
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
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
