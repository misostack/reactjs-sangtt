import Home from 'components/home/Home';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { fetchUserAction } from 'actions/user';
import { fetchPresenseAction, addPresenseAction, editPresenseAction } from 'actions/presense';

function mapStateToProps ({user}) {
    return {
        user
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      fetchUserAction: bindActionCreators(fetchUserAction, dispatch),
      fetchPresenseAction: bindActionCreators(fetchPresenseAction, dispatch),
      addPresenseAction: bindActionCreators(addPresenseAction, dispatch),
      editPresenseAction: bindActionCreators(editPresenseAction, dispatch),
    }
  }
    
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)