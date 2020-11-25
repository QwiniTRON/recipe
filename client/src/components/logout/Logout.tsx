import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {logout} from '../../store/user/actions';
import { ScreenLoader } from '../UI/ScreenLoader/ScreenLoader';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const logoutReq: Promise<any> = dispatch(logout()) as any;
    logoutReq.then(() => {
      history.push('/');
    });
  }, [])

 return (
  <div>
    <ScreenLoader />
  </div>
 );
}

export {Logout};
export default Logout;