import React, { Component, Fragment } from 'react';
import { Tooltip, Progress } from 'reactstrap';
import Notification from 'components/notifications'

import Suggest from 'components/autoSuggest'
import Pagination from 'components/pagination/Pagination'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import 'styles/Home.scss';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sName: "",
      sEmail: "",
      startDate: "",
      endDate: "",
      date: '',
      sDate: '',
      firstTime: true,
      edit: -1,
      pagination: 1,
      maxRow: 2,
      tooltipOpen: false,
      addNew: false,
      selectUserData: null,
      dataPresense: [],
      dataUser: [],
      timeOut: 0,
      valueAddnew:""

    }
  }
  componentWillMount() {
   
    this.props.fetchPresenseAction()
    .then(lst => {
        this.setState({dataPresense: lst})
    })
  }
  onChangePagination = (selected) => {
    this.setState({
      pagination: selected,
    });
  }

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  toggleAddNew = () => {
    this.setState({
      addNew: !this.state.addNew,
      startDate: "",
      endDate: "",
      date: "",
      selectUserData: "",
      edit: -1,
      firstTime: true,
    });
  }
  onChangeSelectUser =  (event, {newValue})  => {
    let { timeOut } =  this.state;
    let self = this ;
    if (timeOut) {
      clearTimeout(self.state.timeOut);
    }

    self.setState({
      selectUserData: newValue,
      timeOut: setTimeout(function () {
        self.setDataUser(newValue)
        }, 500)
    });
  }
  setDataUser = (newValue) => {
    let filter = {
      username: newValue,
      email: newValue,
      or: true
    }

    this.props.fetchUserAction({filter})
      .then(
        lst => {
          lst= lst.map(e=>({name: e.username,newValue: e.email}))
          this.setState({dataUser: lst})
        }
      )
  }

  showEdit = (key) => {
    this.setState({
      edit: key === this.state.edit ? -1 : key,
      startDate: "",
      endDate: "",
      date: "",
      selectUserData: "",
      firstTime: true,
      addNew: false
    });
  }
  onAddNewPresense = () => {
    let { valueAddnew, startDate, endDate, date } = this.state;
    startDate += startDate.indexOf(':') === -1 ? ':00' :  ''
    endDate += endDate.indexOf(':') === -1 ?  ':00' :  ''
    this.props.addPresenseAction({email: valueAddnew, startDate, endDate, date })
    .then( (data)=>{
      let { dataPresense } = this.state;
      dataPresense.unshift(data);
      this.setState({
        startDate: "",
        endDate: "",
        date: "",
        selectUserData: "",
        valueAddnew: "",
        dataPresense,
        addNew: false
      })
      Notification.s('add success', 'add success', 500)
    })
    .catch(err => Notification.e(err.message, 'error'))
  }

  saveDateData = ({ email, date }) => {
    let { startDate, endDate } = this.state;
    startDate += startDate.indexOf(':') === -1 ? ':00' :  ''
    endDate += endDate.indexOf(':') === -1 ?  ':00' :  ''
    this.props.editPresenseAction({email, date, startDate, endDate})
    .then(
      res => {
        let { dataPresense } = this.state;
        Notification.s('add success', 'add success', 500)
        dataPresense = dataPresense.map( e=> ( e.email === res.email && e.date === res.date ? { ...e, startDate, endDate} : {...e} ) );
        this.setState({
          startDate: "",
          endDate: "",
          edit: -1,
          dataPresense
        })
      }
    )
    .catch(err => Notification.e(err.message, 'error'))
  }
  onSuggestSelected = ({suggestion}) => {
    this.setState({valueAddnew: suggestion.newValue})
  }

  filterHome= (key, value) => {
    let { timeOut } =  this.state;
    let self = this ;
    if (timeOut) {
      clearTimeout(self.state.timeOut);
    }

    self.setState({
      [key]: value,
      timeOut: setTimeout(function () {
        self.searchPresense(key, value);
        }, 500)
    });


  }

  searchPresense = (key, value)=> {
    let { sName, sEmail, sDate } = this.state;
    let filter =  { sName, sEmail, sDate }
    filter[key] = value;
    filter = { username: filter.sName, email: filter.sEmail, date: filter.sDate}
    this.props.fetchPresenseAction({filter})
    .then(lst => {
        this.setState({dataPresense: lst})
    })
  }
  render() {
    let { sName, sEmail, sDate, date, addNew, selectUserData, startDate, endDate, pagination, maxRow, edit, firstTime, dataPresense, dataUser } = this.state;
    return (
      <div className="homeRoute">
        <h1 className="title">Persense</h1>
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
              <div className="col-md-3 pull-left form-field mr-2">
                <input type="text" placeholder="Search By Name" className="form-control" value={sName} onChange={e => this.filterHome('sName', e.target.value)} />
              </div>
              <div className="col-md-3 pull-left form-field mr-2">
                <input type="text" placeholder="Search By Email" className="form-control" value={sEmail} onChange={e => this.filterHome('sEmail', e.target.value)} />
              </div>
              <div className="col-md-3 pull-left form-field mr-2">
                <input type="date" className="form-control" value={sDate} onChange={e => this.filterHome('sDate', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={addNew} toggle={this.toggleAddNew} centered>
          <ModalHeader toggle={this.toggleAddNew}>Add new</ModalHeader>
          <ModalBody>
            <div className="col-md-12 pull-right p-3 addnew">
          
              <div className="col-md-12 pull-left form-field mr-2">
                <Suggest 
                  className="col-md-12 pull-left form-field mr-2"
                  value = {selectUserData}
                  onChange={this.onChangeSelectUser}
                  getSuggestions = {dataUser}
                  onSelected ={this.onSuggestSelected}
                />
              </div>
              <div className="col-md-12 pull-left form-field mr-2">
                <input type="text" placeholder="start hours hh:mm" className="form-control" value={startDate} onChange={e => this.setState({ startDate: e.target.value })} />
              </div>
              <div className="col-md-12 pull-left form-field mr-2">
                <input type="text" placeholder="end hour hh:mm" className="form-control" value={endDate} onChange={e => this.setState({ endDate: e.target.value })} />
              </div>
              <div className="col-md-12 pull-left form-field mr-2">
                <input type="date" className="form-control" value={date} onChange={e => this.setState({ date: e.target.value })} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onAddNewPresense}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggleAddNew}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Process</th>
            </tr>
          </thead>
          <tbody>
            {dataPresense.slice( (pagination-1) * maxRow, (pagination - 1) * maxRow + 2).map((e, key) => {
              //xu ly thoi gian thanh %
              let { startDate, endDate } = e;
              startDate = startDate.replace(":", ".");
              endDate = endDate.replace(":", ".");
              let space = endDate - startDate;
              space = space > 4 ? space - 1.5 : space;
              let phantram = space / 8 * 100;
              phantram = phantram > 100 ? 100 : phantram;
              startDate = startDate.replace(".", ":");
              endDate = endDate.replace(".", ":");
              return (
                <Fragment key={key}>
                  <tr >
                    <td className="tdId">{key + 1}</td>
                    <td className="tdUser">{e.username}</td>
                    <td className="tdEmail">{e.email}</td>
                    <td className="tdButton">
                      <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target={`Tooltip-${key}`} toggle={this.toggle} className="TooltipClass">
                        {`${e.startDate} - ${e.endDate}`}
                      </Tooltip>
                      <Progress value={phantram} id={`Tooltip-${key}`} onClick={() => this.showEdit(key)}>
                        <small className="nameProcess">{e.username}</small>
                      </Progress>

                    </td>

                  </tr>
                  <tr>
                    <td className={"text-center " + (key === edit ? "" : "d-none")} colSpan="4" width="100%">

                      <div className="col-5 pull-left text-center form-field pr-2">
                        <input type="text" placeholder="start hours hh:mm" className="form-control col-md-8 " value={firstTime ? e.startDate : this.state.startDate} onChange={e => this.setState({ startDate: e.target.value, firstTime: false, endDate: firstTime ? endDate : this.state.endDate })} />
                      </div>
                      <div className="col-2 text-center pull-left  form-field">-</div>
                      <div className="col-5 pull-left text-center form-field pl-2">

                        <input type="text" placeholder="end hour hh:mm" className="form-control  col-md-8 " value={firstTime ? e.endDate : this.state.endDate} onChange={e => this.setState({ endDate: e.target.value, firstTime: false, startDate: firstTime ? startDate : this.state.startDate })} />
                      </div>
                      <div className="row"></div>

                      <div className="col-12 form-field">
                        <button className="btn btn-danger pull-right" onClick={() => this.showEdit(-1)}>Cancel</button>
                        <button className="btn btn-success pull-right mr-3" onClick={() => this.saveDateData({ email: e.email, date: e.date })}>Save</button>
                      </div>

                    </td>

                  </tr>
                </Fragment>
              )
            }
            )}
          </tbody>
        </table>
        <div className="d-flex flex-row py-4 align-items-center">
          <Pagination
            pageCount={dataPresense.length / maxRow}
            currentPage={pagination}
            onPageChange={this.onChangePagination}
          />
        </div>
      </div>
    );
  }
}

export default Home;
