import React, { Component } from 'react';

// first we will make a new context
export const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      portfolio: [],
      imagesLoaded: false,
      maxHeight: true
    };
    this.imagesLoaded = this.imagesLoaded.bind(this);
    this.setPotrolioState = this.setPotrolioState.bind(this);
    this.setActive = this.setActive.bind(this);
    this.setMaxHeight = this.setMaxHeight.bind(this);
  }

  componentDidMount() {
    fetch('./assets/data/portfolio.json')
      .then(res => res.json())
      .then(res => {
        const projects = res.map(value => {
          const imageArray = this.getImageUrls(value.images);
          const imageArrayPromises = imageArray.map(value => fetch(value));
          return {
            promises: imageArrayPromises,
            projects: {
              category: value.menu,
              projectUrls: imageArray,
              active: false
            }
          };
        });
        this.setPotrolioState(projects.map(value => value.projects));
        let promisesArray = [];
        projects.forEach(el => {
          el.promises.forEach(promises => {
            promisesArray.push(promises);
          });
        });
        return { that: this, imagePromises: promisesArray };
      })
      .then(res => {
        Promise.all(res.imagePromises)
          .then(function(values) {
            res.that.imagesLoaded(true);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
  }

  setPotrolioState(projects) {
    let all = [
      {
        category: 'all',
        active: true,
        projectUrls: []
      }
    ];
    all = all.concat(projects);
    this.setState({
      portfolio: all,
      setActive: this.setActive,
      setMaxHeight: this.setMaxHeight
    });
  }

  setActive(name) {
    const filter = name !== 'all';
    const portfolio = this.state.portfolio.map(value => {
      let category = value;
      category.active = value.category === name;
      return category;
    });
    this.setState({
      filter: filter,
      portfolio: portfolio
    });
  }

  setMaxHeight() {
    this.setState({
      maxHeight: false
    });
  }

  imagesLoaded(value) {
    this.setState({
      imagesLoaded: value
    });
  }

  getImageUrls(values) {
    return values.map(value => `https://picsum.photos/${value[0]}/${value[1]}`);
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          api: this.state
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
export default MyProvider;
