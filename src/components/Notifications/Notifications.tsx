import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';

export const Notifications = () => {
  return (
    <ToastContainer
      pauseOnHover
      autoClose={5000}
      icon={false}
      theme="colored"
    />
  );
};
