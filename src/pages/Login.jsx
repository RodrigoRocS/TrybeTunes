import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';

class Login extends Component {
  state = {
    loading: false,
  };

  render() {
    const { loading } = this.state;
    const { createUser, onInputChange, login, buttonEnable, history } = this.props;
    return (
      <div data-testid="page-login">
        <label htmlFor="login">
          <input
            type="text"
            name="login"
            value={ login }
            onChange={ onInputChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          onClick={ async () => {
            this.setState({ loading: true });
            await createUser({ name: login });
            history.push('/search');
            this.setState({ loading: false });
          } }
          disabled={ buttonEnable }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
        {loading && <Carregando />}
      </div>
    );
  }
}

Login.propTypes = {
  createUser: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
  buttonEnable: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Login;
