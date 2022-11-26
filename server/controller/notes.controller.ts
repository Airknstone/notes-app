import { NextFunction, Request, Response } from 'express';
import Notes, { INote, INoteItems } from '../models/notes-model';
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



/* Creates a new notes Folder  */
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

const updateNotesFolder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  Notes.findOne({ _id: req.params[ 'noteId' ] }, function (err: any, note: any) {
    if (err) {
      return next(err);
    }
    else {
      const updateFolder: INote = {
        folderName: req.body.folderName,
        description: req.body.description,
        notes: req.body.notes
      };
      note.set(updateFolder);

      note.save(function (err: any, note: INote) {
        if (err) {
          return next(err);
        }
        else {
          res.json({
            httpCode: 200,
            message: 'Successful Update of a Note',
            data: note,
          });
        }
      });
    }
  });
});


/* Deletes a Folder and all its contents */
const deleteNotesFolder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  Notes.findByIdAndDelete({ _id: req.params[ 'noteId' ] }, function (err: any, folder: INote) {
    if (err) {
      return next(err);
    } else {
      console.log(folder);
      res.json({
        httpCode: 200,
        message: `Successful Delete of note: ${folder}`,
        data: folder,
      });
    }
  });
});

/* Delete multiple folders  */
const deleteMultipleFolders = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let arrObjectId: string[] = req.params[ 'deleteArr' ].split(',');
  Notes.deleteMany({
    _id: {
      $in: arrObjectId
    }
  }, function (err: Error, result: INote) {
    if (err) {
      return next(err);
    } else {
      res.json({
        httpCode: 200,
        message: 'Successful Delete of Notes',
        data: result,
      });
    }
  });
});


/* Get notes within Folder */
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


/* *
*
*   BEGIN ROUTES WITHIN FOLDER
*/
/* adds a new Note */
const addNewNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  Notes.findOne({ _id: req.params[ 'noteId' ] }, function (err: any, note: any) {
    if (err) {
      return next(err);

    }
    else if (!note) {
      return next(err);
    }
    else {

      let newNote = {} as INoteItems;

      newNote.noteTitle = req.body.noteTitle || null,
        newNote.noteBody = req.body.noteBody,
        newNote.tags = req.body.tags || null;

      console.log(newNote);
      note.notes.push(newNote);

      note.save(function (err: any, note: INote) {
        if (err) {
          return next(err);
        }
        else {
          res.json({
            httpCode: 200,
            message: 'Successful Update of a Note',
            data: note,
          });
        }
      });
    }
  });
});



module.exports = {
  getNotesFolder,
  getNotesFolderById,
  createNotesFolder,
  deleteNotesFolder,
  updateNotesFolder,
  deleteMultipleFolders,
  addNewNote
};
