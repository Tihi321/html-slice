import React, { Component } from 'react';

class Menu extends Component {
  generateMenu(categories) {
    return categories.map((cat, index) => {
      const active = cat.active ? 'active' : '';
      return (
        <li
          className={active}
          onClick={this.handleOnClick.bind(this, cat.category)}
          key={index}
        >
          {cat.category}
        </li>
      );
    });
  }
  handleOnClick(category) {
    this.props.setActive(category);
  }
  render() {
    const menu = this.generateMenu(this.props.portfolio);
    return <ul className="postfolio-menu">{menu}</ul>;
  }
}

export default Menu;
