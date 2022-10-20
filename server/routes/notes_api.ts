
import express from 'express';
const router = express.Router();
import Notes, { INote, ILinks, INoteItems } from '../models/notes-model';



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
        /*         console.log(notes); */
        res.json({ httpCode: 200, message: 'Success', data: notes });
      }
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
/* Get notes within Category */
router.get('/:noteId', async (req, res) => {
  try {
    Notes.findOne({ _id: req.params[ 'noteId' ] }, (err: Error, note: any) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      }
      else {
        console.log(note);
        res.json({
          httpCode: 200, message: 'Success', data: note
        });
      }
    });

  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});


/* Add a Category default template api */
router.post('/', async (req, res) => {
  try {
    const defaultLink: ILinks = {
      linkTitle: "Enter a Title",
      linkHref: "Enter a URL"
    };
    const defaultInotesItems: INoteItems = {
      noteTitle: 'Enter Note Title',
      noteBody: "Enter Notes...",
      links: [ defaultLink ]
    };
    const note: INote = {
      category: req.body.category,
      description: req.body.description,
      note: [
        {
          noteTitle: req.body.note.noteTitle ? req.body.note.noteTitle : defaultInotesItems.noteTitle,
          noteBody: req.body.note.noteBody ? req.body.note.noteBody : defaultInotesItems.noteBody,
          links: [ {
            linkTitle: req.body.note.links.linkTitle ? req.body.note.links.linkTitle : defaultLink.linkTitle,
            linkHref: req.body.note.links.linkHref ? req.body.note.links.linkHref : defaultLink.linkHref
          } ],
        }
      ]
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

/* Update Category */
router.put('/:noteId', async (req: express.Request, res: express.Response) => {
  try {
    Notes.findOne({ _id: req.params[ 'noteId' ] }, function (err: any, note: any) {
      console.log(note);
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      }
      else {
        console.log(note);
        const updateCategory = {
          category: req.body.category,
          description: req.body.description,
        };
        note.set(updateCategory);

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

/* Delete Many by Object Ids  */
router.delete('/delete/:deleteArr', async (req: express.Request, res: express.Response) => {
  try {
    let arrObjectId: string[] = req.params[ 'deleteArr' ].split(',');
    Notes.deleteMany({
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
                  linkTitle: req.body.linkTitle,
                  linkHref: req.body.linkHref
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

module.exports = router;
