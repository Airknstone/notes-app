

import express from 'express';
const router = express.Router();
import Notes, { INote, INoteItems } from '../models/notes-model';

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

/* Creates a new notes Folder  */
router.post('/', notesController.createNotesFolder);

/* Update Folder  */
router.put('/:noteId', notesController.updateNotesFolder);

/* Deletes a Folder and all its contents  */
router.delete('/:noteId', notesController.deleteNotesFolder);

/* Delete multiple folders  */
router.delete('/delete/:deleteArr', notesController.deleteMultipleFolders);


/* *
*
*   BEGIN ROUTES WITHIN FOLDER
*/
/* Get notes within Folder */
router.get('/:noteId', notesController.getNotesFolderById);

/* add a new Note */
router.post('/:noteId/note', notesController.addNewNote);

module.exports = router;
