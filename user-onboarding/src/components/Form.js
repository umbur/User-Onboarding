import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik, Formik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
          setUsers([...users, status]);
        }
      }, [status]);
    return (
      <div>
        <h1>User Form</h1>
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (<p className="error">{errors.name}</p>)}
          <Field type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && (
          <p className="error">{errors.email}</p>)}
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && (
          <p className="error">{errors.password}</p>)}
          <label>Term Of Service</label>
          <Field type="checkbox" name="tos" checked={''} />
          <button type="submit">Submit!</button>
        </Form>
      </div>
    );
  };

  const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password }) {
      return {
        name: name || '',
        email: email || '',
        password: password || '',
      };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      }),
  
    handleSubmit(values, { setStatus }) {
        axios
          .post('https://reqres.in/api/users/', values)
          .then(res => {
            setStatus(res.data);
            console.log(res.data)
          })
          .catch(err => console.log(err.response));
      }
  })(UserForm);

  export default FormikUserForm;