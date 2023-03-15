import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends Component {
  state = {
    user: {},
    loading: false,
  };

  async componentDidMount() {
    const takeUser = await getUser();
    this.setState({ user: takeUser, loading: true });
  }

  render() {
    const { user: { description, email, image, name }, loading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading
          ? (
            <div>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <Link to="/profile/edit">Editar perfil</Link>
              <h3>
                Nome:
                <p>{name}</p>
              </h3>
              <h3>
                Email:
                <p>{email}</p>
              </h3>
              <h3>
                Descrição:
                <p>{description}</p>
              </h3>
            </div>)
          : <Carregando />}
      </div>
    );
  }
}

export default Profile;
