import { Login } from '../../components';
import { connect } from 'react-redux'
import { loginAction } from '../../actions/login';
import { bindActionCreators } from 'redux'
function mapStateToProps ({login, user}) {
    return {
        login,
        user
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      loginAction: bindActionCreators(loginAction, dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)