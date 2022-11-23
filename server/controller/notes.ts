import express, { Request, Response } from 'express';

import Category, { ICategory } from './../models/category.mode';
exports.getNotes = async (req: Request, res: Response, next: Function) => {
  try {
    Category.find({}, (err: Error, notes: ICategory) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else {
        console.log(notes);
        res.json({ httpCode: 200, message: 'Success', data: notes });
      }
    });
  } catch (error) {

  }
};
