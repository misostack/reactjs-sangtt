import { SignUp } from '../../components';
import { connect } from 'react-redux'
import { signUpAction } from '../../actions/login';
import { bindActionCreators } from 'redux';
function mapStateToProps ({login, user}) {
    return {
        login,
        user
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      signUpAction: bindActionCreators(signUpAction, dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)