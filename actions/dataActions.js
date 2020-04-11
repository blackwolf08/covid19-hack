import { FETCH_DATA } from './types';
import React from 'react';

export const fetchData = () => dispatch => {
  dispatch({
    type: FETCH_DATA,
    payload: 'light'
  });
};
