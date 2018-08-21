import React, { Component, Fragment } from 'react';
import { Tooltip, Progress  } from 'reactstrap';
import ReactPaginate from 'react-paginate';

import '../../styles/home.css';


class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      sName:"",
      sEmail:"",
      username:"",
      email:"", 
      password:"",
      repassword:"",
      firstTime: true,
      edit: -1,
      pagination:0,
      maxRow: 2,
      addNew: false,
    }
  }

  onChangePagination = ({selected}) => {
    this.setState({
      pagination: selected,
    });
  }


  toggleAddNew = () => {
    this.setState({
      addNew: !this.state.addNew,
      username:"",
      email:"", 
      password:"",
      edit: -1,
      firstTime: true,
    });
  }

  showEdit= (key) => {
    this.setState({
      edit: key === this.state.edit ? -1 : key,
      username:"",
      email:"", 
      password:"",
      firstTime: true,
      addNew: false
    });
  }
  onAddNewUser = () => {
    let { email, username, password, repassword } = this.state;
  }
  onDeleteUser = () => {
    let { email} = this.state;
  }
  onEditUser = () => {
    let { email, username, password } = this.state;
  }

  render(){

    let { user } = this.props;
    let { sName, sEmail, addNew, email, username, password, pagination, maxRow, edit, firstTime, repassword } = this.state;

    let filter = [...user];
    if(sName !== ""){
      filter = filter.filter(e=> e.username.indexOf(sName) !== -1 );
    }
    if(sEmail !== ""){
      filter = filter.filter(e=>e.email.indexOf(sEmail) !== -1);
    }
    return (
      <div>
        <h1 className="title">User</h1>
        <div className="filter">

          <div className="col-md-1 filter-title form-text pull-left">
            Filter
          </div>

          <div className="col-md-2 button-addnew pull-right">
            <button className="btn btn-primary" onClick={this.toggleAddNew}>+ Add new</button>
          </div>
          
            <div className="show-filter">
              <a href="#" id="button-filter"><i className="fa fa-bars"></i></a>
              
              <div className="col-md-9 filterBox pull-left">
                <div className="col-md-4 pull-left">
                  <input type="text" placeholder="Search By Name" className="form-control" value={ sName } onChange={e=>this.setState({sName: e.target.value})}/> 
                </div>
                <div className="col-md-4 pull-left">
                  <input type="text" placeholder="Search By Email" className="form-control" value={ sEmail } onChange={e=>this.setState({sEmail: e.target.value})}/> 
                </div>         
              </div>
            </div>
        </div>

        {addNew ? <div className="col-md-12 pull-right p-3 addnew">
          <div className="col-md-2 pull-left">
             <input type="text" placeholder="username" className="form-control" value={ username } onChange={e=>this.setState({username: e.target.value})}/> 
          </div>
          <div className="col-md-2 pull-left">
             <input type="email" placeholder="email" className="form-control" value={ email } onChange={e=>this.setState({email: e.target.value})}/> 
          </div>
          <div className="col-md-3 pull-left">
             <input type="password" placeholder="password"  className="form-control" value={password} onChange={e=>this.setState({password: e.target.value})}/> 
          </div>
          <div className="col-md-3 pull-left">
             <input type="password" placeholder="repassword"  className="form-control" value={repassword} onChange={e=>this.setState({repassword: e.target.value})}/> 
          </div>
          <button className="btn btn-success" onClick={this.onAddNewPresense}> Save</button>        
        </div>:null}

        <table className="table table-striped">
          <tbody>
            {filter.slice(pagination * maxRow , pagination *maxRow + 2).map((e, key)=>{
              return(

              <tr key={key}>
                <td width="10%">{key+1}</td>
                <td width="30%"><input type="text" className="form-control" style={{border:"none"}} value={e.username}/> </td>
                <td width="30%"><input type="text" disabled className="form-control" style={{border:"none"}} value={e.email}/></td>
                <td width="30%">
                    <button className="btn btn-warning">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                  
                </td>
                
              </tr>

              )}
            )}
          </tbody>
        </table>
        <ReactPaginate 
          onPageChange={this.onChangePagination} 
          marginPagesDisplayed={1}  
          pageRangeDisplayed={1} 
          pageCount={filter.length/ maxRow}/>
      </div>
    );
  }
}

export default User;
