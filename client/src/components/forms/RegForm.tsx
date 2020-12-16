import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

type RegFormProps = {
  registerHandle: Function
  isLoading: boolean
}

const RegForm: React.FC<RegFormProps> = (props) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rpassword: '',
        nickname: ''
      }}
      onSubmit={(values, help) => {
        if(!props.isLoading) {
          const {email, nickname, password, rpassword} = values;
          props.registerHandle(email, nickname, password, rpassword);
          help.setSubmitting(false);
        }
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().required('поле обязательно').trim()
            .email('email не по формату.'),

          password: Yup.string().required('поле обязательно').trim()
            .min(6, 'пароль не короче 6')
            .max(56, 'пароль не длиннее 56'),

          rpassword: Yup.string().required('поле обязательно'),

          nickname: Yup.string().required('поле обязательно').trim()
            .min(3, 'ник не короче 3')
            .max(56, 'ник не длиннее 56')
        })
      }
    >
      {(formik) => (
        <Form>
          <div className="row login-form">
            <div className="input-field col s12">
              <Field name="email" placeholder="email" id="email" type="email" className="validate" />
              <label htmlFor="email">login</label>
              <span className="form-error"><ErrorMessage name="email" /></span>
            </div>
            <div className="input-field col s12">
              <Field name="password" placeholder="password" id="password" type="password" className="validate" />
              <label htmlFor="password">password</label>
              <span className="form-error"><ErrorMessage name="password" /></span>
            </div>
            <div className="input-field col s12">
              <Field
                name="rpassword"
                placeholder="repeat password"
                id="rpassword"
                type="password"
                className="validate"
                validate={() => {
                  let error = '';
                  if (formik.values.password !== formik.values.rpassword) error = 'пароли должны совпадать';
                  return error;
                }} />
              <label htmlFor="rpassword">repeat password</label>
              <span className="form-error"><ErrorMessage name="rpassword" /></span>
            </div>
            <div className="input-field col s12">
              <Field name="nickname" placeholder="nickname" id="nickname" type="text" className="validate" />
              <label htmlFor="nickname">nickname</label>
              <span className="form-error"><ErrorMessage name="nickname" /></span>
            </div>
            <div className="login-form__btns col s12">
              <button disabled={!formik.isValid} className="btn waves-effect waves-light" type="submit" name="action">
                зарегистрироваться
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

export { RegForm };