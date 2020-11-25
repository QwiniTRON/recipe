import db from '../db/connect';
import express from 'express';

export function getUser(username: string, password: string) {
  const queryString = `SELECT * FROM users WHERE password = $1 and login = $2`;
  return db.oneOrNone(queryString, [
    password, username
  ]);
}

export function getUserById(id: string) {
  const queryString = `SELECT * FROM users WHERE id = $1`;
  return db.oneOrNone(queryString, [
    id
  ]);
}

export function isExistsNickname(nickname: string) {
  const queryString = `SELECT * FROM users WHERE nickname = $1`;

  return db.oneOrNone(queryString, [
    nickname
  ]).then((exists) => Boolean(exists));
}

export function isExistsEmail(email: string) {
  const queryString = `SELECT * FROM users WHERE login = $1`;

  return db.oneOrNone(queryString, [
    email
  ]).then((exists) => Boolean(exists));
}

export function registerUser(password: string, login: string, nickname: string) {
  const queryString = `
    INSERT INTO users(password, login, nickname) values 
    ($1, $2, $3)
  `;

  return db.query(queryString, [
    password, login, nickname
  ]);
}

export type User = {
  id: number,
  password: string,
  login: string,
  nickname: string,
  status: number
}

export interface ReqWithUser extends express.Request {
  userData: User
}