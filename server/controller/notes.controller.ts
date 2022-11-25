import { NextFunction, Request, Response } from 'express';
import Notes, { INote, ITag, INoteItems } from '../models/notes-model';
import { ErrorResponse } from '../utils/errorResponse';
import { asyncHandler } from '../middleware/asyncHandler';

/* Gets all notes folder*/
const getNotesFolder =
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    Notes.find({}, (err: unknown, notes: INote) => {
      if (err) {
        /*         return next(new ErrorResponse('Could not find Notes', 404)); */
        return next(err);
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

/* Gets a note Folder by ID */
const getNotesFolderById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  Notes.findOne({ _id: req.params[ 'noteId' ] }, (err: unknown, note: INote) => {
    if (err) {
/*       return next(new ErrorResponse(`Could not find Note with id ${req.params[ 'noteId' ]}`, 404));
 */        return next(err);
    }

    else if (!note) {
      /*       return next(new ErrorResponse(`Could not find Note with id ${req.params[ 'noteId' ]}`, 404)); */
      return next(err);
    }
    else {
      console.log(note);
      return res.json({
        httpCode: 200, message: 'Success', data: note
      });
    }
  });
});

const createNotesFolder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const newFolder: INote = {
    folderName: req.body.folderName,
    description: req.body.description,
    notes: []
  };
  Notes.create(newFolder, function (err: any, folder: INote) {
    if (err) {
      return next(err);
    } else {
      console.log(folder);
      res.json({
        httpCode: 200,
        message: 'Successful Post of a folder',
        data: folder,
      });
    }
  });
});

module.exports = {
  getNotesFolder,
  getNotesFolderById,
  createNotesFolder
};
