import { NextFunction, Request, Response } from 'express';
import Notes, { INote, ILinks, INoteItems } from '../models/notes-model';
import { ErrorResponse } from '../utils/errorResponse';
import { asyncHandler } from '../middleware/asyncHandler';

/* Gets all notes categories*/
const getNotesCategory =
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    Notes.find({}, (err: unknown, notes: INote) => {
      if (err) {
        return next(new ErrorResponse('Could not find Notes', 404));
      } else {
        console.log(notes);
        res.json({
          httpCode: 200,
          message: 'Success',
          data: notes
        });
      }
    });
  });

/* Gets a note category by ID */
const getNotesCategoryById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  Notes.findOne({ _id: req.params[ 'noteId' ] }, (err: unknown, note: INote) => {
    if (err) {
      return next(new ErrorResponse(`Could not find Note with id ${req.params[ 'noteId' ]}`, 404));
    }
    else if (!note) {
      return next(new ErrorResponse(`Could not find Note with id ${req.params[ 'noteId' ]}`, 404));
    }
    else {
      console.log(note);
      return res.json({
        httpCode: 200, message: 'Success', data: note
      });
    }
  });
});

module.exports = {
  getNotesCategory,
  getNotesCategoryById
};
