import React, { Component, Fragment } from 'react';
import { Tooltip, Progress  } from 'reactstrap';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';

import '../../styles/home.css';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      sName:"",
      sEmail:"",
      startDate:"",
      endDate:"",
      date:'',
      sDate: '',
      firstTime: true,
      edit: -1,
      pagination:0,
      maxRow: 2,
      tooltipOpen: false,
      addNew: false,
      selectUserData: null
    }
  }
  componentWillMount(){
    let data= [
      {
        email:"admin@dirox.net",
        date:"2018/08/20",
        startDate:"08:30",
        endDate: "18:00"
      }
    ]
    if(!localStorage.getItem('presense')) localStorage.setItem('presense',JSON.stringify(data));
  }
  onChangePagination = ({selected}) => {
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
  onChangeSelectUser = (value) => {
    this.setState({
      selectUserData: value ? value : null
    });
  }
  showEdit= (key) => {
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
    let { selectUserData, startDate, endDate, date } = this.state;
    let presense = JSON.parse(localStorage.getItem('presense'));
    let auth = presense.filter(e=> e.email === selectUserData.value && e.date === date).length;
    if(!auth){
      presense.push({email:selectUserData.value, startDate, endDate, date });
      localStorage.setItem('presense', JSON.stringify(presense));
      this.setState({
        startDate: "",
        endDate: "",
        date: "",
        selectUserData: "",
        addNew: false
      })
      alert('Add new success');
    }
    else alert('Date duplicate');
  }

  saveDateData = ({email, date}) => {
    let {startDate, endDate} = this.state;
    let presense = JSON.parse(localStorage.getItem('presense'));
    presense = presense.map(e =>(e.email === email && e.date === date ?{...e, startDate, endDate } : e));
    localStorage.setItem('presense', JSON.stringify(presense));
    this.setState({
      startDate: "",
      endDate: "",
      edit:-1
    })
    alert('success');
  }

  render(){

    let user = JSON.parse(localStorage.getItem('user'));
    let { sName, sEmail, sDate, date, addNew, selectUserData, startDate, endDate, pagination, maxRow, edit, firstTime } = this.state;
    let presense = JSON.parse(localStorage.getItem('presense'));

    let selectUser = {};
    user.forEach(e=>{
      selectUser[e.email] = e;
    })

    let filter = presense.map(e=>{
      return {
        ...e, username: selectUser[e.email].username
      }
    });

    if(sName !== ""){
      filter = filter.filter(e=> e.username.indexOf(sName) !== -1 );
    }
    if(sEmail !== ""){
      filter = filter.filter(e=>e.email.indexOf(sEmail) !== -1);
    }
    if(sDate !== ""){
      filter = filter.filter(e=>e.date === sDate);
    }
    selectUser = user.map(e=>({value:e.email, label: `${e.email}-${e.username}`}))
    return (
      <div className="home">
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
                <div className="col-md-4 pull-left">
                  <input type="text" placeholder="Search By Name" className="form-control" value={ sName } onChange={e=>this.setState({sName: e.target.value})}/> 
                </div>
                <div className="col-md-4 pull-left">
                  <input type="text" placeholder="Search By Email" className="form-control" value={ sEmail } onChange={e=>this.setState({sEmail: e.target.value})}/> 
                </div>
                <div className="col-md-4 pull-left">
                  <input type="date" className="form-control" value={ sDate } onChange={e=>this.setState({sDate: e.target.value})}/> 
                </div>          
              </div>
            </div>
        </div>

        {addNew ? <div className="col-md-12 pull-right p-3 addnew">
          <Select
            className="col-md-3 pull-left"
            value={selectUserData}
            options={selectUser}
            onChange = {this.onChangeSelectUser}
          />
          <div className="col-md-2 pull-left">
             <input type="text" placeholder="start hours hh:mm" className="form-control" value={ startDate } onChange={e=>this.setState({startDate: e.target.value})}/> 
          </div>
          <div className="col-md-2 pull-left">
             <input type="text" placeholder="end hour hh:mm" className="form-control" value={ endDate } onChange={e=>this.setState({endDate: e.target.value})}/> 
          </div>
          <div className="col-md-3 pull-left">
             <input type="date" className="form-control" value={date} onChange={e=>this.setState({date: e.target.value})}/> 
          </div>
          <button className="btn btn-success" onClick={this.onAddNewPresense}> Save</button>        
        </div>:null}

        <table className="table table-striped">
          <tbody>
            {filter.slice(pagination * maxRow , pagination *maxRow + 2).map((e, key)=>{
              //xu ly thoi gian thanh %
              let {startDate, endDate} = e; 
              startDate = startDate.replace(":", ".");
              endDate = endDate.replace(":", ".");
              let space = endDate - startDate;
              space= space> 4 ? space - 1.5 : space;
              let phantram = space/8*100;
              phantram =phantram>100 ? 100: phantram;

              return(
                <Fragment key={key}>
              <tr >
                <td className="tdId">{key+1}</td>
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
                <td className={"text-center " + (key === edit  ? "" : "d-none" ) } colSpan="4" width="100%">
                  
                  <div className="col-6 pull-left text-center">
                    <input type="text" placeholder="start hours hh:mm" className="form-control col-md-8 " value={ firstTime ? e.startDate : this.state.startDate } onChange={e=>this.setState({startDate: e.target.value,firstTime: false, endDate:firstTime ? endDate : this.state.endDate})}/> 
                  </div>
                  <div className="col-6 pull-left text-center">
                    
                    <input type="text" placeholder="end hour hh:mm" className="form-control  col-md-8 " value={ firstTime ? e.endDate : this.state.endDate } onChange={e=>this.setState({endDate: e.target.value, firstTime: false,startDate: firstTime ? startDate : this.state.startDate })}/> 
                  </div>
                 <div className="row"></div>
                  
                  <div className="col-6 col-md-6 pull-left p-3">
                    <button className="btn btn-danger" onClick={() =>this.showEdit(-1)}>Cancel</button>
                  </div>
                  <div className="col-6 col-md-6 pull-left p-3">
                    <button className="btn btn-success" onClick={() =>this.saveDateData({email: e.email, date: e.date})}>Save</button>

                  </div>
                </td>

              </tr>
              </Fragment>
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

export default Home;
