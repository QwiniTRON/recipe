import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import './createRecipe.scss';

import { RootState } from '../../store/main';
import { Category } from '../../store/types';
import { BreadCramps } from '../../components/BreadCramps/BreadCramps';

type CreateRecipeType = {
  categories: Category[]
}

const CreateRecipe: React.FC<CreateRecipeType> = ({ categories }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(false);
  const [createError, setCreateError] = useState('');
  const [isSuccesCreated, setIsSuccesCreated] = useState(false);
  const history = useHistory();

  useLayoutEffect(() => {
    var elems = document.querySelectorAll('select');
    var instances = (window as any).M.FormSelect.init(elems, {value: null});
  }, [categories]);

  const imageURI = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    else return null;
  }, [file])

  if(isSuccesCreated) return (
    <div className="create-page container">
      <p className="accentet green darken-1">
        рецепт создан.
        через 3 секунды переадресация на главную ...
      </p>
    </div>
  );

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        category: '',
        ingridiens: []
      }}
      onSubmit={(values, help) => {
        // CREATE
        if (!file) {
          return setFileError(true);
        }

        const data = new FormData();
        data.append('title', values.title);
        data.append('description', values.description);
        data.append('category', values.category);
        data.append('photo', file, file.name);
        values.ingridiens.forEach(ing => data.append('ingridiens', ing));

        fetch('/api/recipe', {
          body: data,
          method: 'POST'
        }).then((res) => res.json()).then(v => {
          if(v.ok) {
            setIsSuccesCreated(true);

            setTimeout(() => {
              history.push('/');
            }, 3000);
          } else {
            setCreateError(v.message);
          }
        });

        help.setSubmitting(true);
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('поле обязательно')
          .trim()
          .min(3, 'название не короче 3')
          .max(56, 'название не длиннее 56'),

        category: Yup.string().required('поле обязательно'),

        description: Yup.string().required('поле обязательно')
          .trim()
          .min(15, 'описание не короче 15')
          .max(2000, 'описание не длиннее 2000'),

        ingridiens: Yup.array().of(
          Yup.string().required('поле обязательно')
            .trim().min(3, 'ингридиент не короче 3')
            .max(56, 'ингридиент не длиннее 56')
        )
      })}
    >
      {(formik) => (
        <div className="create-page container">
          <BreadCramps />
          <Form>
            <p className="form-error">{createError}</p>
            <div className="create-page__title">
              <div className="input-field col s12">
                <Field name="title" placeholder="название рецепта" id="title" type="text" className="validate" />
                <label htmlFor="title">название рецепта</label>
                <span className="form-error"><ErrorMessage name="title" /></span>
              </div>
            </div>

            <div className="row create-page__categories">
              <div className="col s12 m6 input-field">
                <Field name="category" as="select">
                  <option key="a000" value="" disabled>выбирите категорию</option>
                  {categories.map((cat, idx) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </Field>
                <label>{ }</label>
              </div>
              <div className="col s12 m6">
                <p className="accentet">описание категории</p>
                {categories.find(c => c.id == formik.values.category)?.description}
              </div>
            </div>

            <div className="hero row">
              <div className="col s12 m6">
                <p className="accentet">ваше фото</p>
                {fileError && <p className="form-error">выбирите фото</p>}
                {imageURI && <img className="hero__photo-img" src={imageURI} alt="your photo" />}
                <div className="file-field input-field">
                  <div className="btn">
                    <span>File</span>
                    <input type="file" accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFile((e.target as any).files[0]);
                      setFileError(false);
                    }} />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </div>
              <div className="col s12 m6">
                <p className="accentet">ингридиенты</p>
                <FieldArray name="ingridiens">
                  {(arrayHelp) => (<div className="hero__ingridients-content">

                    {formik.values.ingridiens.map((ing, idx) => (
                      <div key={idx}>
                        <div className="hero__ingridients-ingridients">
                          <Field name={`ingridiens.${idx}`} type="text" />
                          <button
                            className="btn waves-effect waves-light red darken-1"
                            type="button"
                            onClick={() => arrayHelp.remove(idx)}>
                            &times;
                        </button>
                        </div>
                        <span className="form-error"><ErrorMessage name={`ingridiens.${idx}`} /></span>
                      </div>
                    ))}

                    <button className="btn waves-effect waves-light green darken-1"
                      type="button"
                      onClick={() => arrayHelp.push('')}>
                      добавить
                    </button>
                  </div>)}
                </FieldArray>
              </div>
            </div>

            <div className="description">
              <div className="input-field col s12">
                <textarea id="textarea1"
                  className="materialize-textarea"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}></textarea>
                <label htmlFor="textarea1">описание рецепта</label>
                <span className="form-error"><ErrorMessage name="description" /></span>
              </div>
            </div>

            <button
              disabled={!formik.isValid}
              className="btn waves-effect waves-light green darken-1 full-width mv10"
              type="submit">
              создать
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}


const mapStateToProps = (state: RootState) => ({
  categories: state.recipe.categories
})
const mapDispatchToProps = {
}

const connectedCreateRecipe = connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);
export { connectedCreateRecipe as CreateRecipe };
export default connectedCreateRecipe;