
import express from 'express';
const router = express.Router();
import Notes, { INote } from '../models/notes-model';

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
router.get('/', async (req, res) => {
  try {
    Notes.find({}, (err: Error, notes: any) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else {
        console.log(notes);
        res.json({ httpCode: 200, message: 'Success', data: notes });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

/* Add a note api */
router.post('/', async (req, res) => {
  try {

    const note: INote = {
      category: req.body.category,
      notesTitle: req.body.notesTitle,
      notesBody: req.body.notesBody

    };
    console.log(note);
    Notes.create(note, function (err: any, note: any) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      } else {
        console.log(note);
        res.json({
          httpCode: 200,
          message: 'Successful Post of a Note',
          data: note,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

/* Update Notes */
router.put('/:noteId', async (req: express.Request, res: express.Response) => {
  try {
    Notes.findOne({ _id: req.params[ 'noteId' ] }, function (err: any, note: any) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      }
      else {
        console.log(note);
        note.set({
          category: req.body.category,
          notesTitle: req.body.notesTitle,
          notesBody: req.body.notesBody
        });

        note.save(function (err: any, note: INote) {
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
    Notes.findByIdAndDelete({ _id: req.params[ 'noteId' ] }, function (err: any, note: any) {
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
module.exports = router;