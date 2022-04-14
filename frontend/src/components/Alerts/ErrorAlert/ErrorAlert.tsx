import React from 'react';
import { Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { clearAlert } from '../../../redux/Actions/alertActions';

type PropsType = {
  error: string | null;
};

const ErrorAlert: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(clearAlert());
  };

  return <Alert message={props.error} type="error" onClose={onClose} closable />;
};

export default ErrorAlert;
