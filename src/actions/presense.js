
export function fetchPresenseAction(data) {
	return (dispatch, getState) => {
       return fetchPresenseApi(data)
    }   
}

const fetchPresenseApi = (data = {}) =>(
	new Promise(function(resolve, reject) {
    let init = [
      {
        email: "admin@dirox.net",
        date: "2018/08/20",
        startDate: "08:30",
        endDate: "18:00"
      }
    ]
		setTimeout(function(){
      let presense = !!localStorage.getItem('presense') ? JSON.parse(localStorage.getItem('presense')) : init
      let user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
      let selectUser = {};
      user.forEach(e=>{
        selectUser[e.email] = e;
      })

     let dataPresense = [];
      presense.forEach(e=>{
        if(!!selectUser[e.email]) dataPresense.push({ ...e, username: selectUser[e.email].username })
      });

			if(data.filter){
				let { filter } = data;
				if(filter.username) dataPresense = dataPresense.filter( e=> e.username.indexOf(filter.username) !== -1)
				if(filter.email) dataPresense = dataPresense.filter( e=> e.email.indexOf(filter.email) !== -1)
				if(filter.date) dataPresense = dataPresense.filter( e=> e.date.indexOf(filter.date) !== -1)
			}
			resolve(dataPresense);
		}, 500);
	})
)


export function addPresenseAction(data) {
	return (dispatch, getState) => {
       return addPresenseApi(data)
    }   
}


const addPresenseApi = ({ email, startDate, endDate, date }) =>(
  new Promise(function(resolve, reject) {
   
    setTimeout(function(){
      let presense = !!localStorage.getItem('presense') ? JSON.parse(localStorage.getItem('presense')) : []
      let user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
      let auth = user.filter(e => e.email === email);

      if (auth.length === 0) return reject(new Error('Email not exit'));
      let username = auth[0].username;
      auth = presense.filter(e => e.email === email && e.date === date).length;
			if(!auth){
          presense.push({ email, startDate, endDate, date });
          localStorage.setItem('presense', JSON.stringify(presense));
					return resolve({ username, email, startDate, endDate, date });
			}
			return reject(new Error('Cannot signup accounts'));
		}, 500);
  })
) 


export function editPresenseAction(data) {
	return (dispatch, getState) => {
       return editPresenseApi(data)
    }   
}

const editPresenseApi = ({ email, startDate, endDate, date }) =>(
  new Promise(function(resolve, reject) {
   
    setTimeout(function(){
      let presense = !!localStorage.getItem('presense') ? JSON.parse(localStorage.getItem('presense')) : []
      let user = !!localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
      let auth = user.filter(e => e.email === email);

      if (auth.length === 0) return reject(new Error('Email not exit'));
      auth = presense.filter(e => e.email === email && e.date === date).length;
			if(auth){
        presense = presense.map( e=> ( e.email === email && e.date === date ? { ...e, startDate, endDate} : {...e} ) );
          localStorage.setItem('presense', JSON.stringify(presense));
					return resolve({ email, startDate, endDate, date });
      }
      console.log('ddd');
			return reject(new Error('Cannot signup presense'));
		}, 500);
  })
) 