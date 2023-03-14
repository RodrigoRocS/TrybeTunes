import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    album: '',
    data: [],
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const results = await getMusics(params.id);
    const data = results.slice(1);
    this.setState({ album: data, data: results[0] });
  }

  render() {
    const { album, data } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {album && <h1 data-testid="artist-name">{data.artistName}</h1>}
        {album && <h3 data-testid="album-name">{data.collectionName}</h3>}
        <MusicCard album={ album } />
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
