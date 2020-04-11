import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const apiCallGet = (uri, token) =>
  new Promise(async (resolve, reject) => {
    try {
      let res = await axios.get(uri, {
        headers: { Authorization: `Token ${token}` }
      });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });

const apiCallPost = (uri, body) =>
  new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        method: 'post',
        url: uri,
        data: body,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });

export { apiCallGet, apiCallPost };
