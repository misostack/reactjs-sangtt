import { User } from '../../components';
import { connect } from 'react-redux';
import { signUpAction, removeUserAction, changeInfoUserAction } from '../../actions/user';
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
  }
}
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(User)