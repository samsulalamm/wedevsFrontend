import axios from 'axios';
import {API_BASE_URL} from "../helper/env";
import {
  getObjectToFormData,
} from "../helper/utils";

export const add = (url, data) => {
  const formData = getObjectToFormData(data)
  return new Promise((resolve, reject) => {
    axios.post(API_BASE_URL + url, formData, {
      headers: {}
    }).then(res => {
      console.log(res.data);
      if (res.data.error) {
        reject(res.data.error)
      } else {
        resolve(res.data)
      }
    })
      .catch(err => {
        reject('Something went wrong')
      })
  })
}

export const update = (url, id, data) => {
  const formData = getObjectToFormData(data)
  return new Promise((resolve, reject) => {
    axios.post(API_BASE_URL + url + '/' + id, formData, {
      headers: {}
    }).then(res => {
      if (res.data.error) {
        reject(res.data.error)
      } else {
        resolve(res.data)
      }
    })
      .catch(err => {
        reject('Something went wrong')
      })
  });
}

export const getList = url => {
  return new Promise((resolve, reject) => {
    axios.get(API_BASE_URL + url, {
      headers: {}
    }).then(res => {
      if (res.data.error) {
        reject(res.data.error)
      } else {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err.message)
    })
  })
}

export const getDetails = (url, id) => {
  return new Promise((resolve, reject) => {

    axios.get(API_BASE_URL + url + `/` + id, {
      headers: {}
    }).then(res => {
      if (res.data.error) {
        reject(res.data.error)
      } else {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err.message)
    })
  })
}

export const destroy = (url, id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${API_BASE_URL}${url}/${id}`, {
      headers: {}
    })
      .then(res => {
        if (res.data.error) {
          reject(res.data.error)
        } else {
          resolve(res.data.message)
        }
      })
      .catch(err => {
        reject(err.message)
      })
  })
}
