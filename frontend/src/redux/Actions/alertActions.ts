export enum AlertActionTypeTypes {
  ALERT_SUCCESS = 'ALERT_SUCCESS',
  ALERT_ERROR = 'ALERT_ERROR',
  ALERT_CLEAR = 'ALERT_CLEAR',
}

export type AlertActionTypes = SuccessType | ErrorType | ClearType;

export type SuccessType = {
  type: AlertActionTypeTypes.ALERT_SUCCESS;
  payload: string;
};
export const setSuccessAlert = (message: string): SuccessType => {
  return {
    type: AlertActionTypeTypes.ALERT_SUCCESS,
    payload: message,
  };
};

export type ErrorType = {
  type: AlertActionTypeTypes.ALERT_ERROR;
  payload: string;
};
export const setErrorAlert = (message: string): ErrorType => {
  return {
    type: AlertActionTypeTypes.ALERT_ERROR,
    payload: message,
  };
};

export type ClearType = {
  type: AlertActionTypeTypes.ALERT_CLEAR;
};
export const clearAlert = (): ClearType => {
  return {
    type: AlertActionTypeTypes.ALERT_CLEAR,
  };
};
