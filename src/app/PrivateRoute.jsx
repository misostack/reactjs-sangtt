import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class PrivateRoute extends Component{

    render(){
      let { component: Component, auth, ...rest } = this.props;

      return(
        <Route {...rest} 
          render={(props) => {
            if (!!auth && auth.token !== "") {
              return <Component {...props} />
            }
            if (!props.history.location.pathname.startsWith('/login')) {
              return <Redirect to="/login" />
            }
            return null
          }}
        />
      )
    }
}
 
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

function mapStateToProps ({ auth }) {
  return {
    auth
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
