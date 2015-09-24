import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addServer } from '../actions/servers';
import { setStatus, clearStatus } from '../actions/status';

import ServerForm from '../widgets/server-form';


class ServerAdd extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
    server: PropTypes.object,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  componentWillMount () {
    this.props.dispatch(setStatus('Add server information'));
  }

  componentWillReceiveProps ({ error, loading }) {
    const { dispatch } = this.props;
    if (error) dispatch(setStatus(error));
    if (loading) dispatch(setStatus('Adding server...'));
  }

  componentWillUnmount () {
    this.props.dispatch(clearStatus());
  }

  async onSubmit (server) {
    await this.props.dispatch(addServer(server));
    if (this.props.server) this.context.history.goBack();
  }

  render () {
    return (
      <box left="center" top="center" height={21} width={80} shadow="true">
        <ServerForm onSubmit={::this.onSubmit} />
      </box>
    );
  }

}


export default connect(
  state => state.addServer
)(ServerAdd);
