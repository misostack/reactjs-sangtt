import { ForgotPassword } from '../../components';
import { connect } from 'react-redux'
import { changePassword } from '../../actions/login';
import { bindActionCreators } from 'redux'
function mapStateToProps ({login, user}) {
    return {
        login,
        user
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      changePassword: bindActionCreators(changePassword, dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForgotPassword)