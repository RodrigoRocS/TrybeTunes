import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    album: '',
    data: [],
    favorites: [],
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const results = await getMusics(params.id);
    const favorite = await getFavoriteSongs();
    const data = results.slice(1);
    this.setState({ album: data, data: results[0], favorites: favorite });
  }

  render() {
    const { album, data, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {album && <h1 data-testid="artist-name">{data.artistName}</h1>}
        {album && <h3 data-testid="album-name">{data.collectionName}</h3>}
        {album && <img src={ data.artworkUrl100 } alt={ data.collectionName } />}
        {album && album.map((e, i) => (
          <MusicCard
            key={ i }
            trackCensoredName={ e.trackCensoredName }
            previewUrl={ e.previewUrl }
            trackName={ e.trackName }
            trackId={ e.trackId }
            e={ e }
            favorites={ favorites }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Album;
