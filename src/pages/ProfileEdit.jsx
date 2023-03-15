import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
  };

  async componentDidMount() {
    const { name, email, image, description } = await getUser();
    this.setState({ name, email, image, description });
    this.setState({ loading: true });
  }

  isFormValid = () => {
    const { name, email, image, description } = this.state;
    const isValid = name.length > 0
    && email.length > 0
    && image.length > 0
    && description.length > 0;
    return isValid;
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  btnFunc = async () => {
    const { history } = this.props;
    const { description, email, image, name } = this.state;
    history.push('/profile');
    await updateUser(({ description, email, image, name }));
  };

  render() {
    const isSaveButtonDisabled = this.isFormValid();
    const { description, email, image, name, loading } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading
          ? (
            <form>
              <label>
                <img src={ image } alt={ name } />
                <input
                  type="url"
                  data-testid="edit-input-image"
                  name="image"
                  value={ image }
                  onChange={ this.onInputChange }
                />
              </label>
              <label>
                Nome:
                <input
                  type="text"
                  data-testid="edit-input-name"
                  placeholder={ name }
                  name="name"
                  value={ name }
                  onChange={ this.onInputChange }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  data-testid="edit-input-email"
                  placeholder={ email }
                  name="email"
                  value={ email }
                  onChange={ this.onInputChange }
                />
              </label>
              <label>
                Descrição:
                <textarea
                  data-testid="edit-input-description"
                  placeholder={ description }
                  name="description"
                  value={ description }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                onClick={ this.btnFunc }
                disabled={ !isSaveButtonDisabled }
              >
                Salvar
              </button>
            </form>)
          : <Carregando />}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default ProfileEdit;
