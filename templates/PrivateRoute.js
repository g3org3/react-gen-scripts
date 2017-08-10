import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUserProfileAction } from 'reducers/authReducer'

const EnsureLoggedInContainer = (props) => {
  if (props.isLoggedIn) {
    return <Route path={props.path} component={props.component} />
  } else {
    props.getUserProfile();
    const loginUrl = `/login?returnUrl=${encodeURIComponent(props.currentURL)}`
    return <Redirect to={loginUrl} />;
  }
};

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.auth.user,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps, dispatch => {
  return {
    getUserProfile: () => getUserProfileAction()(dispatch)
  }
})(EnsureLoggedInContainer);