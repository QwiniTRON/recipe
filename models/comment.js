"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var connect_1 = __importDefault(require("../db/connect"));
var Comment = /** @class */ (function () {
    function Comment(content, nickname, create_time, id) {
        this.id = id;
        this.content = content;
        this.nickname = nickname;
        this.create_time = create_time;
    }
    Comment.create$C = function (comment, authorId, recipeId) {
        var queryString = "\n    insert into comments(author_id, recipe_id, content) values \n    ($1, $2, $3) returning id\n  ";
        try {
            return connect_1.default.query(queryString, [authorId, recipeId, comment.content]).then(function (commentId) {
                return Comment.getById(String(commentId[0].id));
            });
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    Comment.create = function (authorId, recipeId, text) {
        var queryString = "\n      insert into comments(author_id, recipe_id, content) values \n      ($1, $2, $3) returning id\n    ";
        try {
            return connect_1.default.query(queryString, [authorId, recipeId, text]).then(function (commentId) {
                return Comment.getById(String(commentId[0].id));
            });
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    Comment.getByRecipe = function (recipeId) {
        var queryString = "\n      select mq.id, content, nickname, create_time from comments as mq\n        join users as uj on uj.id = mq.author_id \n      where recipe_id = $1\n      order by create_time asc\n    ";
        try {
            return connect_1.default.manyOrNone(queryString, [recipeId]);
        }
        catch (err) {
            return [];
        }
    };
    Comment.getById = function (commentId) {
        var queryString = "\n      select mq.id, content, nickname, create_time from comments as mq\n        join users as uj on uj.id = mq.author_id \n      where mq.id = $1\n    ";
        try {
            return connect_1.default.oneOrNone(queryString, [commentId]);
        }
        catch (err) {
            return null;
        }
    };
    Comment.update = function () {
    };
    Comment.deleteComment = function (commentId) {
        var queryString = "\n      delete from comments where id = $1\n  ";
        try {
            return connect_1.default.query(queryString, [commentId]);
        }
        catch (err) {
            return null;
        }
    };
    Comment.prototype.save = function (authorId, recipeId) {
        if (this.id) {
            Comment.update();
        }
        else {
            if (!authorId || !recipeId)
                return;
            Comment.create$C(this, authorId, recipeId);
        }
    };
    return Comment;
}());
exports.Comment = Comment;
