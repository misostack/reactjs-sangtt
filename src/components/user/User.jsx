import React, { Component, Fragment } from 'react';
import Pagination from 'components/pagination/Pagination'
import Notification from 'components/notifications'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import 'styles/User.scss';


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sName: "",
      sEmail: "",
      username: "",
      email: "",
      password: "",
      repassword: "",
      firstTime: true,
      edit: -1,
      pagination: 1,
      maxRow: 2,
      addNew: false,
      dataUser : [],
      timeOut: 0
    }
  }
  componentDidMount(){
    this.props.fetchUserAction()
    .then(
      lst => {
        this.setState({dataUser: lst})
      }
    )
  }
  
  changeInput = (key, value) => {
    let { timeOut } =  this.state;
    let self = this ;
    if (timeOut) {
      clearTimeout(self.state.timeOut);
    }

    self.setState({
      [key]: value,
      timeOut: setTimeout(function () {
        self.searchUser(key, value);
        }, 500)
    });
  }

  searchUser = (key, value) => {
    let valueOrderKey = this.state[ key === 'sName' ? 'sEmail' : 'sName' ];
    let orderKey;
    [key, orderKey] = key === 'sName' ? ['username','email'] : ['email','username'];
    let filter = {
      username: "",
      email: ""
    }

    if (value !== "") filter[key] = value
    else delete filter[key]

    if(valueOrderKey !== "") filter[orderKey] = valueOrderKey
    else delete filter[orderKey]

    console.log(filter);
    this.props.fetchUserAction({filter})
      .then(
        lst => {
          this.setState({dataUser: lst})
        }
      )
  }
  
  onChangePagination = (selected) => {
    this.setState({
      pagination: selected,
    });
  }

  toggleAddNew = () => {
    this.setState({
      addNew: !this.state.addNew,
      username: "",
      email: "",
      password: "",
      edit: -1,
      firstTime: true,
    });
  }

  showEdit = (key) => {
    this.setState({
      edit: key === this.state.edit ? -1 : key,
      username: "",
      email: "",
      password: "",
      firstTime: true,
      addNew: false,
    });
  }

  onAddNewUser = () => {
    let { repassword, password, username, email } = this.state;
    if (password === repassword) {

      this.props.signUpAction({ password, username, email })
        .then(
          () => {
            let { dataUser }= this.state;
            dataUser.unshift({ password, username, email })
            Notification.s('redirec to Login page ', 'Signup success', 500)
            this.setState({
              username: "",
              email: "",
              password: "",
              repassword: "",
              firstTime: true,
              edit: -1,
              addNew: false,
              dataUser
            })
          }
        )
        .catch(err => Notification.e(err.message, 'error'))
    }
    else Notification.e('Password does not match', 'Error', 500)
  }

  onDeleteUser = (email) => {
    this.props.removeUserAction(email)
    .then((res)=>{
      let { dataUser } = this.state;
      dataUser = dataUser.filter( e=> e.email !== res.email)
      this.setState({
        username: "",
        email: "",
        password: "",
        repassword: "",
        firstTime: true,
        edit: -1,
        addNew: false,
        dataUser
      })
      Notification.s(`Remove email ${res.email} success`, 'Remove success', 3000)
    })
    .catch(err => Notification.e(err.message, 'error'))
  }
  onEditUser = (email) => {
    let { username } = this.state;
    let result = this.props.changeInfoUserAction({ email, username })
    .then(
      ()=>{
        let { dataUser } = this.state;
        dataUser = dataUser.map(e =>(e.email !== email ? {...e} : {...e, username}))
        Notification.s('redirec to Login page ', 'Change success', 3000)
        this.setState({
          username: "",
          email: "",
          password: "",
          repassword: "",
          firstTime: true,
          edit: -1,
          addNew: false,
          dataUser
        })
      }
    )
    .catch( err => Notification.e( err.message, 'error') )
  }

  render() {
    let { sName, sEmail, addNew, email, username, password, pagination, maxRow, edit, firstTime, repassword, dataUser } = this.state;
    return (
      <div className="userRoute">
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
              <div className="col-md-4 pull-left form-field mr-2">
                <input type="text" placeholder="Search By Name" className="form-control" value={sName} onChange={e => this.changeInput( 'sName', e.target.value)} />
              </div>
              <div className="col-md-4 pull-left form-field mr-2">
                <input type="text" placeholder="Search By Email" className="form-control" value={sEmail} onChange={e => this.changeInput('sEmail', e.target.value)} />
              </div>
            </div>
          </div>
        </div>



        <Modal isOpen={addNew} toggle={this.toggleAddNew} centered>
          <ModalHeader toggle={this.toggleAddNew}>Add new</ModalHeader>
          <ModalBody>
            <div className="col-md-12 pull-right p-3 addnew">
              <div className="col-md-12 pull-left form-field mr-2">
                <input type="text" placeholder="username" className="form-control" value={username} onChange={e => this.setState({ username: e.target.value })} />
              </div>
              <div className="col-md-12 pull-left form-field mr-2">
                <input type="email" placeholder="email" className="form-control" value={email} onChange={e => this.setState({ email: e.target.value })} />
              </div>
              <div className="col-md-12 pull-left form-field mr-2">
                <input type="password" placeholder="password" className="form-control" value={password} onChange={e => this.setState({ password: e.target.value })} />
              </div>
              <div className="col-md-12 pull-left form-field mr-2">
                <input type="password" placeholder="repassword" className="form-control" value={repassword} onChange={e => this.setState({ repassword: e.target.value })} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onAddNewUser}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggleAddNew}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.slice( (pagination -1) * maxRow, (pagination -1) * maxRow + 2).map((e, key) => {
              return (

                <tr key={key}>
                  <td className="tdId">{key + 1}</td>
                  <td className="tdUser">
                    {edit === key ?
                      <input type="text" className="form-control" style={{ border: "none" }} value={firstTime ? e.username : username} onChange={e => this.setState({ username: e.target.value, firstTime: false })} />
                      : e.username
                    }
                  </td>
                  <td className="tdEmail">{e.email}</td>
                  <td className="tdButton" >
                    {edit === key
                      ? <div>
                        <button className="btn btn-warning pull-right mr-2" onClick={e => this.setState({ edit: -1 })}>Cancel</button>
                        <button className="btn btn-success pull-right mr-2" onClick={() => this.onEditUser(e.email)}>Save</button>
                      </div>

                      : <div>
                        <button className="btn btn-danger pull-right mr-2" onClick={() => this.onDeleteUser(e.email)}>Delete</button>
                        <button className="btn btn-warning pull-right mr-2" onClick={e => this.showEdit(key)}>Edit</button>
                      </div>}
                  </td>
                </tr>

              )
            }
            )}
          </tbody>
        </table>
        <div className="d-flex flex-row py-4 align-items-center">
          <Pagination
            pageCount={Math.ceil(dataUser.length / maxRow)}
            currentPage={pagination}
            onPageChange={this.onChangePagination}
          />
        </div>
      </div>
    );
  }
}

export default User;
