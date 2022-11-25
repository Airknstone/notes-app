

import express from 'express';
const router = express.Router();
import Notes, { INote, ITag, INoteItems } from '../models/notes-model';

import Category, { ICategory } from './../models/category.mode';
const notesController = require('../controller/notes.controller');



/**
 * findAll
 * @openapi
 * /api/notes:
 *   get:
 *     tags:
 *       - Notes
 *     description:  API for returning all users
 *     summary: returns all user documents
 *     responses:
 *       '200':
 *         description: List of users
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */
router.get('/', notesController.getNotesFolder);


/* Get notes within Category */
router.get('/:noteId', notesController.getNotesFolderById);


/* Add a Category default template api */
router.post('/', notesController.createNotesFolder);
/* router.post('/', async (req, res) => {
  try {

    const category: ICategory = {
      category: req.body.category,
      description: req.body.description
    };
    Category.create(category, function (err: any, category: ICategory) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      } else {
        console.log(category);
        res.json({
          httpCode: 200,
          message: 'Successful Post of a category',
          data: category,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}); */

/* Update Category */
router.put('/:noteId', async (req: express.Request, res: express.Response) => {
  try {
    Category.findOne({ _id: req.params[ 'noteId' ] }, function (err: any, note: any) {
      console.log(note);
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      }
      else {
        console.log(note);
        const updateCategory: ICategory = {
          category: req.body.category,
          description: req.body.description,
        };
        note.set(updateCategory);

        note.save(function (err: any, note: ICategory) {
          if (err) {
            console.log(err);
            res.status(500).send({ message: err.message });
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
  } catch (error) {
    console.log(error);
  }
});


/* Delete a note api */
router.delete('/:noteId', async (req: express.Request, res: express.Response) => {
  try {
    Category.findByIdAndDelete({ _id: req.params[ 'noteId' ] }, function (err: Error, note: ICategory) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      }
      else {
        console.log(note);
        res.json({
          httpCode: 200,
          message: 'Successful Delete of a Note',
          data: note,
        });
      }
    });

  } catch (error) {
    console.log(error);
  }
});

/* Delete Many by Object Ids  */
router.delete('/delete/:deleteArr', async (req: express.Request, res: express.Response) => {
  try {
    let arrObjectId: string[] = req.params[ 'deleteArr' ].split(',');
    Category.deleteMany({
      _id: {
        $in: arrObjectId
      }
    }, function (err: Error, result: any) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      } else {
        console.log(result);
        res.json({
          httpCode: 200,
          message: 'Successful Delete of Notes',
          data: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});


/* ********************************
Adding Notes and Links to Catergory
******************************** */

/* add a new Note */
router.post('/:noteId/note', async (req: express.Request, res: express.Response) => {
  try {

    /*     const noteBody: INoteItems = {
          noteTitle: req.body.noteTitle,
          noteBody: req.body.noteBody,
          links: [
            {
              linkTitle: req.body.links.linkTitle,
              linkHref: req.body.links.linkHref
            }
          ]
        } */
    Notes.findOneAndUpdate(
      { _id: req.params[ 'noteId' ] },
      {
        $push: {
          note: {
            $each: [ {
              noteTitle: req.body.noteTitle,
              noteBody: req.body.noteBody,
              links: [
                {
                  linkTitle: req.body.links.linkTitle,
                  linkHref: req.body.links.linkHref
                }
              ]
            } ]

          }
        }
      }
      , function (err: Error, update: any) {
        if (err) {
          res.status(500).send({ message: err.message });
        }
        else {
          console.log(update);
          res.json({
            httpCode: 200,
            message: 'Successful Adding of Notes',
            data: update,
          });
        }
      });

  } catch (error) {
    console.log(error);

  }
});

/* AddLinks to Note */
module.exports = router;
