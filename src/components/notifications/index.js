import { NotificationManager } from 'react-notifications';
let timeout = 300;
const Notification = {
  
  s : (content = "", title="", timeout = timeout, callback) => {
    NotificationManager.success(content, title, timeout, callback);
  },

  e : (content = "", title="", timeout = timeout, callback) => {
    NotificationManager.error(content, title, timeout, callback);
  },

  i : (content = "", title="", timeout = timeout, callback) => {
    NotificationManager.info(content, title, timeout, callback);
  },

  w : (content = "", title="", timeout = timeout, callback) => {
    NotificationManager.warning(content, title, timeout, callback);
  }
}

export default Notification