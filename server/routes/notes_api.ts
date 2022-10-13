
import express from 'express';
import { HydratedDocument } from 'mongoose';
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
    /*     const note = {
          category: req.body.category,
          notes: [
            {
              title: req.body.title,
              body: req.body.body,
              links: [
                {
                  linkHref: req.body.linkHref,
                  linkTitle: req.body.linkTitle,
                },
              ],
            },
          ],
        }; */

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
module.exports = router;
/* {
  "category": "Test Category",
  "notes": [
      {
          "title": "Test Title",
          "body": " Testing the body of a note post",
          "links": [{
              "linkHref": "https://mongoosejs.com/docs/typescript/schemas.html",
              "linkTitle": "Mongoose with Typescript"
          }]
      }
  ]
} */
