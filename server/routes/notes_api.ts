import express from 'express';
const router = express.Router();
import Notes from '../models/notes-model';

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
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    Notes.find({}, (err: any, notes: any) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      }
      else {
        console.log(notes);
        res.json({ httpCode: 200, message: 'Success', data: notes });
      }
    });

  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
