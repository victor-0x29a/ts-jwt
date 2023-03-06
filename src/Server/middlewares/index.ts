import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

function Middlewares(App: express.Application) {
  App.use(express.json());
  App.use(cors({ origin: true }));
  App.use(bodyParser.urlencoded({ extended: true }));
  App.use(bodyParser.json());
}

export default Middlewares;
