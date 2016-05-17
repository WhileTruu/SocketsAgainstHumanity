import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    route: PropTypes.object.isRequired,
  };

  render() {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default connect((value) => value)(App)
