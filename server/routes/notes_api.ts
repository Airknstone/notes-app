import express from 'express';
const router = express.Router();
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

/* Creates a new notes Folder  */
router.post('/', notesController.createNotesFolder);

/* Update Folder  */
router.put('/:folderId', notesController.updateNotesFolder);

/* Deletes a Folder and all its contents  */
router.delete('/:folderId', notesController.deleteNotesFolder);

/* Delete multiple folders  */
router.delete('/delete/:deleteArr', notesController.deleteMultipleFolders);


/* *
*
*   BEGIN ROUTES WITHIN FOLDER
*/
/* Get notes within Folder */
router.get('/:folderId', notesController.getNotesFolderById);

/* add a new Note */
router.post('/:folderId/note', notesController.addNewNote);

/* Updates a note Within a Folder */
router.put('/:folderId/:noteId', notesController.updatesANoteWithinFolder);

/* Delete a note from Folder */
router.delete('/:folderId/:noteId', notesController.deleteNoteFromFolder);

module.exports = router;
