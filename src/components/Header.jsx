import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        { user ? userElement : <Carregando />}
      </header>
    );
  }
}

export default Header;
