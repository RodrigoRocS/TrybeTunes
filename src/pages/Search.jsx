import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends Component {
  state = {
    loading: false,
    busca: '',
    artistName: '',
    searched: false,
  };

  render() {
    const { search, onInputChange, buttonEnable2, cleanSearch } = this.props;
    const { loading, busca, artistName, searched } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <Carregando />
        ) : (
          <>
            <input
              type="text"
              data-testid="search-artist-input"
              name="search"
              value={ search }
              onChange={ onInputChange }
            />
            <button
              data-testid="search-artist-button"
              disabled={ buttonEnable2 }
              onClick={ async () => {
                this.setState({ loading: true });
                const pega = await searchAlbumsAPI(search);
                this.setState({
                  loading: false,
                  busca: pega,
                  artistName: search,
                  searched: true });
                cleanSearch();
              } }
            >
              Pesquisar
            </button>
          </>
        )}
        {busca && <span>{`Resultado de álbuns de: ${artistName}`}</span>}
        {busca.length === 0 && searched && <span>Nenhum álbum foi encontrado</span>}
        {busca.length > 0 && busca?.map((e, i) => (
          <div key={ i }>
            <img src={ e.artworkUrl100 } alt={ e.collectionName } />
            <h3>{ e.collectionName }</h3>
            <h4>{ e.artistName }</h4>
            <Link
              to={ `/album/${e.collectionId}` }
              data-testid={ `link-to-album-${e.collectionId}` }
            >
              More
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

Search.propTypes = {
  search: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  cleanSearch: PropTypes.func.isRequired,
  buttonEnable2: PropTypes.bool.isRequired,
};
export default Search;
// `Resultado de álbuns de: ${artistName}`
