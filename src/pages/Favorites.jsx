import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favoritesArray: [],
  };

  componentDidMount() {
    this.takeFavorites();
  }

  takeFavorites = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({ favoritesArray: favorite });
  };

  render() {
    const { favoritesArray } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {favoritesArray && favoritesArray.map((e, i) => (
            <MusicCard
              key={ i }
              trackCensoredName={ e.trackCensoredName }
              previewUrl={ e.previewUrl }
              trackName={ e.trackName }
              trackId={ e.trackId }
              e={ e }
              favorites={ favoritesArray }
              onFavoriteUpdate={ this.takeFavorites }
            />
          ))}
        </div>
      </>
    );
  }
}

export default Favorites;
