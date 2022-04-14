import { AlertActionTypes, AlertActionTypeTypes } from '../Actions/alertActions';

type InitialStateType = {
  success: string;
  error: string;
};

const initialState: InitialStateType = {
  success: '',
  error: '',
};

const alertReducer = (state = initialState, action: AlertActionTypes): InitialStateType => {
  switch (action.type) {
    case AlertActionTypeTypes.ALERT_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case AlertActionTypeTypes.ALERT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AlertActionTypeTypes.ALERT_CLEAR:
      return {
        success: '',
        error: '',
      };
    default:
      return state;
  }
};

export default alertReducer;
