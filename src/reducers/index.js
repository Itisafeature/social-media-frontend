import Cookies from 'js-cookie';

Cookies.get('jwt');

export const authReducer = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};
