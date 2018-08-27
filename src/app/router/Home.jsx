import React,{Component} from 'react';
import Notification from 'components/notifications'
import Pagination from 'components/pagination/Pagination'

class Home extends Component {
  state = {
    page:1
  }
  onChange = (selected) => {
    this.setState({page:selected})
  }
  render(){
    console.log(this.state.page)
    return(
      <div>      
        <button onClick={() => Notification.i('đc','dc')}>click</button>
        HomePage

        <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                pageCount={3}
                currentPage={3}
                onPageChange={this.onChange}
              />
          </div>
      </div>
    )
  }
}

export default Home;