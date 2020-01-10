import React, { Component } from 'react';
import Menu from './Menu.jsx';
import Gallery from './Gallery.jsx';

class App extends Component {
  handleOnClick() {
    this.props.context.api.setMaxHeight();
  }
  render() {
    const {
      portfolio,
      filter,
      setActive,
      imagesLoaded,
      maxHeight
    } = this.props.context.api;
    let gallerWrapperClass = '';
    if (imagesLoaded) {
      gallerWrapperClass = maxHeight
        ? 'gallery-max-height'
        : 'gallerry-no-max-height';
    } else {
      gallerWrapperClass = 'loading-wrapper';
    }
    return (
      <div className="portfolio-container">
        <Menu setActive={setActive} portfolio={portfolio} />
        <div className={gallerWrapperClass}>
          <Gallery
            imagesLoaded={imagesLoaded}
            portfolio={portfolio}
            filter={filter}
          />
        </div>
        <div className="btn-wrapper">
          <button
            onClick={this.handleOnClick.bind(this)}
            disabled={!maxHeight}
            className="view-all-btn"
          >
            view all
          </button>
        </div>
      </div>
    );
  }
}

export default App;
