import { ForgotPassword } from '../../components';
import { connect } from 'react-redux'
import { changeInfoUserAction } from '../../actions/user';
import { bindActionCreators } from 'redux'
function mapStateToProps ({login, user}) {
    return {
        login,
        user
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      changeInfoUserAction: bindActionCreators(changeInfoUserAction, dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForgotPassword)