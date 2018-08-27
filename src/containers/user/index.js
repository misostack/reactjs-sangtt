import User from 'components/user/User';
import { connect } from 'react-redux';
import { signUpAction, removeUserAction, changeInfoUserAction, fetchUserAction } from 'actions/user';
import { bindActionCreators } from 'redux';

function mapStateToProps ({user}) {
    return {
        user
    }
  }

function mapDispatchToProps (dispatch) {
  return {
    signUpAction: bindActionCreators(signUpAction, dispatch),
    removeUserAction: bindActionCreators(removeUserAction, dispatch),
    changeInfoUserAction: bindActionCreators(changeInfoUserAction, dispatch),
    fetchUserAction: bindActionCreators(fetchUserAction, dispatch),
  }
}
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(User)