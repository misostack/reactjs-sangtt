import { User } from '../../components';
import { connect } from 'react-redux'

function mapStateToProps ({user}) {
    return {
        user
    }
  }


  
  export default connect(
    mapStateToProps,
    null
  )(User)