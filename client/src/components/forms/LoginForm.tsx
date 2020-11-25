import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import './loginFrom.scss';

type LoginFormProps = {
  submitHandle: Function
  isLoading: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({submitHandle, isLoading}) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, help) => {
        if(isLoading) return;
        submitHandle(values.email, values.password);
        help.setSubmitting(false);
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().required('поле обязательно').trim()
            .email('email не по формату.'),

          password: Yup.string().required('поле обязательно').trim()
            .min(6, 'пароль не короче 6')
            .max(56, 'пароль не длиннее 56')
        })
      }
    >
      {(formik) => (
        <Form>
          <div className="row login-form">
            <div className="input-field col s12">
              <Field name="email" placeholder="email" id="email" type="email" className="validate" />
              <label htmlFor="email">login</label>
              <span className="login-form__error"><ErrorMessage name="email" /></span>
            </div>
            <div className="input-field col s12">
              <Field name="password" placeholder="password" id="password" type="password" className="validate" />
              <label htmlFor="password">password</label>
              <span className="login-form__error"><ErrorMessage name="password" /></span>
            </div>
            <div className="login-form__btns col s12">
              <button disabled={!formik.isValid || isLoading} className="btn waves-effect waves-light" type="submit" name="action">
                войти
              </button>
              <button className="btn waves-effect waves-light red darken-1" type="reset" name="action">
                <i className="fas fa-redo"></i>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { LoginForm };