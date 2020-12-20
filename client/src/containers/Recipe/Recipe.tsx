import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../store/main';

import './recipe.scss';

import { getOneRecipe, createComment, deleteComment, deleteRecipe } from '../../store/recipe/actions';
import { RecipeInfo, User } from '../../store/types';
import { Loader } from '../../components/UI/Loader/Loader';
import { Comments } from '../../components/comments/Comments';
import Modal from '../../components/UI/Modal/Modal';
import { CommentCard } from '../../components/comments/Comment';
import { Link } from 'react-router-dom';

type RecipeRoutes = {
  id: string
}
interface RecipeProps extends RouteComponentProps<RecipeRoutes> {
  loading: boolean
  recipe: RecipeInfo | null
  user: User | null

  getOneRecipe: Function
  createComment: Function
  deleteComment: Function
  deleteRecipe: Function
}
const Recipe: React.FC<RecipeProps> = (props) => {
  const [commentError, setcommentError] = useState('');
  const [commentToDeleteId, setCommentToDeleteId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const recipeId = props.match.params.id;

  useEffect(() => {
    if (recipeId) {
      props.getOneRecipe(recipeId);
    }
  }, []);


  if (props.loading) return (
    <div className="recipe-page">
      <Loader />
    </div>
  );

  if (props.recipe == null) return (<div className="recipe-page">
    рецепт удалён
  </div>);

  return (
    <div className="recipe-page container">
      <h3 className="title">
        {props.recipe?.recipe.name}
      </h3>
      <div className="content">
        <div className="row">
          <div className="col s6 recipe-page__img">
            <img loading="lazy" src={'/imgs/' + (props.recipe?.recipe.photo_path || "default.png")} alt={props.recipe?.recipe.name} />
          </div>
          <div className="col s6">
            <div className="ingridients">
              {props.recipe?.ingridients.map((i) => (
                <div key={i.id} className="ingridients__item">
                  {i.title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <span className="recipe-page__author chip green black-text">
              <i className="fas fa-user" /> автор:{props.recipe?.recipe.nickname}
            </span>
            <span className="recipe-page__author chip blue black-text">
              <i className="fas fa-cat" /> категория:{props.recipe?.recipe.category_name}
            </span>
          </div>
        </div>
        <div className="row recipe-page__text">
          <div className="col s12">
            {props.recipe?.recipe.description}
          </div>
        </div>
        <div className="row recipe-page__btn">
          {props.user && props.user.nickname == props.recipe?.recipe.nickname &&
            <Link to={'/edit/' + props.recipe.recipe.id}><button className="btn waves-effect waves-light">
              редактировать
            </button></Link>
          }
          {props.user && props.user.status == 1 &&
            <button className="btn waves-effect waves-light red" onClick={(e) => setDeleteModal(true)}>
              удалить
          </button>
          }

          {deleteModal && <Modal clickHandle={() => setDeleteModal(false)}>
            <div className="header-modal">
              <p className="header-modal__title tac">Точно удалить данный рецепт?</p>
              <div className="header-modal__btns">
                <div className="modal__btns betweened">
                  <button className="btn waves-effect waves-light" onClick={() => setDeleteModal(false)}>
                    нет
                  </button>
                  <button
                    className="btn waves-effect waves-light red darken-1"
                    onClick={() => {
                      props.deleteRecipe(props.recipe?.recipe.id).then((r: boolean) => {
                        if (r) {
                          (window as any).M.toast({ html: 'Рецепт удалён, через 3 секунды переход на главную.', classes: 'orange' });
                          setTimeout(() => {
                            props.history.push('/');
                          }, 3000);
                        } else {
                          (window as any).M.toast({ html: 'Произошла ошибка', classes: 'red' });
                        }
                      });
                    }}>
                    да
                  </button>
                </div>
              </div>
            </div>
          </Modal>}
        </div>
      </div>

      <hr />
      <h4>Комментарии</h4>
      <p className="form-error">{commentError}</p>
      <Comments
        comments={props.recipe?.comments}
        user={props.user}
        errorHandle={(err: any) => {
          setcommentError('комментарий должен быть не короче 6 символов');
        }}
        commentDeleteHandle={(commentId: number) => {
          setCommentToDeleteId(commentId);
        }}
        submitHandle={(comment: string) => {
          comment = comment.trim();
          if (comment.length > 5) {
            props.createComment(props.recipe?.recipe.id, comment).then((result: boolean) => {
              if (result) {
                (window as any).M.toast({ html: 'Комментарий добавлен' });
              } else {
                (window as any).M.toast({ html: 'произошла ошибка' });
              }
            });
            setcommentError('');
          } else {
            setcommentError('комментарий должен быть не короче 6 символов');
          }
        }} />

      {commentToDeleteId != 0 && <Modal clickHandle={() => setCommentToDeleteId(0)}>
        <div className="header-modal">
          <div className="header-modal__title tac">
            Точно удалить данный комментарий?
            <div className="bordered p5 m5">
              <CommentCard
                isAdmin={false}
                deleteHandle={() => { }}
                comment={props.recipe?.comments.find(c => c.id === commentToDeleteId)!}
              />
            </div>
          </div>
          <div className="header-modal__btns">
            <div className="modal__btns betweened">
              <button className="btn waves-effect waves-light" onClick={() => setCommentToDeleteId(0)}>
                нет
              </button>
              <button
                className="btn waves-effect waves-light red darken-1"
                onClick={() => {
                  props.deleteComment(commentToDeleteId).then((result: boolean) => {
                    if (!result) return (window as any).M.toast({ html: 'Произошла ошибка' });

                    (window as any).M.toast({ html: 'Комментарий удалён' });
                  });

                  setCommentToDeleteId(0);
                }}>
                да
              </button>
            </div>
          </div>
        </div>
      </Modal>}

    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  loading: state.recipe.loading,
  recipe: state.recipe.oneRecipe,
  user: state.user.userInfo
})
const mapDispatchToProps = {
  getOneRecipe,
  createComment,
  deleteComment,
  deleteRecipe
}

const connectedRecipe = connect(mapStateToProps, mapDispatchToProps)(Recipe);
export { connectedRecipe as Recipe };
export default connectedRecipe;