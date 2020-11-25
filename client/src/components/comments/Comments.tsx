import React, { useState } from 'react'
import { User, Comment } from '../../store/types';

import "./comments.scss";

import { CommentCard } from './Comment';
import { isPropertySignature } from 'typescript';

type CommentsProps = {
  comments?: Comment[]
  user?: User | null
  minLength?: number

  submitHandle: Function
  errorHandle: Function
  commentDeleteHandle: Function
}

export const Comments: React.FC<CommentsProps> = ({ comments, user, submitHandle, minLength = 5, errorHandle, commentDeleteHandle }) => {
  const [useComment, setUserComment] = useState('');

  return (
    <div className="comments">
      {user ?
        <form className="comment-form" onSubmit={e => {
          const text = useComment.trim();
          if(text.length > minLength) {
            submitHandle(useComment);
            setUserComment('');
          } else {
            errorHandle('minLength');
          }
          e.preventDefault();
        }}>
          <div className="col s10 xl11" >
            <input value={useComment} onChange={e => setUserComment(e.target.value)} type="text" placeholder="ваш комментарий" />
            <button className="btn waves-effect waves-light">
              комментировать
            </button>
          </div>
        </form> :
        <p>Незарегистрированные пользователи не могут делать комментарии</p>
      }

      {comments && comments.length > 0 ? 
      comments?.map((c: Comment) => (
        <CommentCard isAdmin={user?.status == 1} comment={c} key={c.id} deleteHandle={commentDeleteHandle} />
      )):
        <p className="comments__notice">пока нет комментариев</p>
      }

    </div>
  );
}