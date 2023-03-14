import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

export default class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  };

  async componentDidMount() {
    await this.favoriteCall();
  }

  favoriteCall = () => {
    const { favorites, e } = this.props;
    favorites.forEach((el) => {
      if (e.trackId === el.trackId) {
        this.setState({ isChecked: true });
      }
    });
  };

  render() {
    const { previewUrl, trackName,
      trackId, e, trackCensoredName } = this.props;
    const { loading, isChecked } = this.state;
    if (loading) return <Carregando />;
    return (
      <div>
        <div>
          <p>{trackCensoredName}</p>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            {'O seu navegador não suporta o elemento{" "}'}
            <code>{trackName}</code>
          </audio>
          <label data-testid={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              name="isChecked"
              checked={ isChecked }
              onChange={ async () => {
                this.setState({ loading: true });
                await addSong(e);
                this.setState({ loading: false });
                if (!isChecked) {
                  this.setState({ isChecked: true });
                } else {
                  this.setState({ isChecked: false });
                }
              } }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackCensoredName: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  e: PropTypes.shape(PropTypes.string).isRequired,
  favorites: PropTypes.shape(PropTypes.string).isRequired,
};
