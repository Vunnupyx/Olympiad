import React from 'react';
import { Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { clearAlert } from '../../../redux/Actions/alertActions';

type PropsType = {
  message: string | null;
};

const SuccessAlert: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(clearAlert());
  };

  return <Alert message={props.message} type="success" onClose={onClose} closable />;
};

export default SuccessAlert;
