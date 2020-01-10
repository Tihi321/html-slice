import React, { Component } from 'react';
import Masonry from 'react-masonry-css';
import uuidv4 from 'uuid/v4';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.getCategory = this.getCategory.bind(this);
    this.getAllGallery = this.getAllGallery.bind(this);
  }
  generateGallery(category, projects) {
    return projects.map(project => {
      return (
        <figure className="gallery-image" key={uuidv4()}>
          <img src={project} alt={category} />
          <figcaption className="gallery-overlay">
            <div>
              <h1>pinecone</h1>
              <p> {category} </p>
              <hr className="divider" />
            </div>
          </figcaption>
        </figure>
      );
    });
  }
  getCategory(projects) {
    const catProject = projects.filter(project => project.active);
    let gallery;
    if (catProject[0].category === 'all') {
      gallery = this.getAllGallery(projects);
      gallery = gallery.reduce(function(prev, curr) {
        return prev.concat(curr);
      });
    } else {
      gallery = this.generateGallery(
        catProject[0].category,
        catProject[0].projectUrls
      );
    }
    return gallery;
  }
  getAllGallery(projects) {
    let elements = [];
    projects.forEach(element => {
      if (element.category !== 'all') {
        elements.push(
          this.generateGallery(element.category, element.projectUrls)
        );
      }
    });
    return elements;
  }

  render() {
    const breakpointColumnsObj = {
      default: 5,
      1100: 3,
      700: 2,
      500: 1
    };
    let gallery = this.props.imagesLoaded
      ? this.getCategory(this.props.portfolio)
      : '';
    if (this.props.imagesLoaded) {
      return (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {gallery}
        </Masonry>
      );
    } else {
      return <div className="loading">Loading Gallery</div>;
    }
  }
}

export default Gallery;
