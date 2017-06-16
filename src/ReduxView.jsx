import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import isEqual from 'lodash/isEqual';

export default class extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;

    this.connect = this.connect || connect;
  }

  static contextTypes = {
    store: PropTypes.object
  }

  component = <div />;

  initialize = () => {};

  terminate = () => {};

  componentWillMount = () => {
    this.initialize(this.store, this.props);
  }

  componentWillReceiveProps = ({ params, location }) => {
    // If params or location have changed we are on a new page.
    if (!isEqual(params, this.props.params) || location !== this.props.location) {
      this.terminate(this.store, this.props);
      this.initialize(this.store, this.props);
    }
  }

  componentWillUnmount = () => {
    this.terminate(this.store, this.props);
  }

  render = () => {
    const Component = this.connect(
      this.mapStateToProps,
      this.mapDispatchToProps,
      this.mergeProps,
      this.options
    )(this.component);
    return <Component { ...this.props }></Component>;
  }
}