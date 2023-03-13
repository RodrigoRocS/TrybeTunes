import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    user: '',
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ user: name });
  }

  render() {
    const { user } = this.state;
    const userElement = <p data-testid="header-user-name">{user}</p>;
    return (
      <header data-testid="header-component">
        { user ? userElement : <Carregando />}
      </header>
    );
  }
}

export default Header;
