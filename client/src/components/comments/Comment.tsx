import React from 'react'

import { Comment } from '../../store/types';

type CommetProps = {
  comment: Comment
  isAdmin: boolean

  deleteHandle: Function
}

export const CommentCard: React.FC<CommetProps> = ({ comment, isAdmin, deleteHandle }) => {
  return (
    <div className="comment">
      <div className="row">
        <div className="chip orange black-text">{comment.nickname}</div>
        <div className="chip blue black-text"><i className="fas fa-clock" />
          {new Date(comment.create_time).toLocaleDateString()}
        </div>
      </div>
      <div className="row">
        {comment.content}
      </div>
      {isAdmin &&
        <button onClick={(e) => {
          deleteHandle(comment.id);
        }} className="btn waves-effect waves-light red">
          удалить
        </button>
      }
    </div>
  );
}