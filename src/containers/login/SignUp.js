import { SignUp } from '../../components';
import { connect } from 'react-redux'
import { signUpAction } from '../../actions/user';
import { bindActionCreators } from 'redux';
function mapStateToProps ({login}) {
    return {
        login
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