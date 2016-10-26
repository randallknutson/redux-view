import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.router = context.router;
    this.store = context.store;
  }

  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
  }

  componentWillMount = () => {
    if (typeof this.initialize === 'function') {
      this.initialize(this.store, this.props, this.router);
    }
  }

  componentWillReceiveProps = ({ params, location }) => {
    // If params or location have changed we are on a new page.
    if (!isEqual(params, this.props.params) || location !== this.props.location) {
      if(typeof this.terminate === 'function') {
        this.terminate(this.store, this.props, this.router);
      }
      if(typeof this.initialize === 'function') {
        this.initialize(this.store, this.props, this.router);
      }
    }
  }

  componentWillUnmount = () => {
    if (typeof this.terminate === 'function') {
      this.terminate(this.store, this.props, this.router);
    }
  }

  render = () => {
    const Component = connect(
      this.mapStateToProps,
      // Adds router to the end of mapDispatchToProps.
      (...args) => {
        if (typeof this.mapDispatchToProps === 'function') {
          return this.mapDispatchToProps(...args, this.router);
        }
        return {};
      },
      this.mergeProps,
      this.options
    )(this.container);
    return <Component { ...this.props }></Component>;
  }
}