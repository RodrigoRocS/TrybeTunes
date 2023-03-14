import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { album } = this.props;
    return (
      <div>
        {album && album?.map((e) => (
          <div key={ e.trackId }>
            <audio
              data-testid="audio-component"
              src={ e.previewUrl }
              controls
            >
              <track kind="captions" />
              {'O seu navegador não suporta o elemento{" "} '}
              <code>{ e.trackName }</code>
              .
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.string.isRequired,
};
export default MusicCard;
