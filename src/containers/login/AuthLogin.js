import { AuthLogin } from '../../components';
import { connect } from 'react-redux'

function mapStateToProps ({login}) {
    return {
        login
    }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(AuthLogin)
