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
        
          <Field type="text" name="email" placeholder="Email" />
          <Field type="password" name="password" placeholder="Password" />
          <label>Term Of Service</label>
          <Field type="checkbox" name="tos" checked={''} />
          <button type="submit">Submit!</button>
        </Form>
      </div>
    );
  };

  const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
      return {
        name: name || '',
        email: email || '',
        password: password || '',
        tos: tos || ''
      };
    },

    // validationSchema: Yup.object().shape({
    //     name: Yup.string().required(),
    //     email: Yup.string().required(),
    //     password: Yup.string().required(),
    //     tos: Yup.string().required(),
    //   }),
  
    handleSubmit(values, { setStatus }) {
        axios
          .post('https://reqres.in/api/users/', values)
          .then(res => {
            setStatus(res.data);
          })
          .catch(err => console.log(err.response));
      }
  })(UserForm);

  export default FormikUserForm;