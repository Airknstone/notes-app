import { NextFunction, Request, Response } from 'express';
import Definition, { definition } from '../models/dictionary.model';
import { asyncHandler } from '../middleware/asyncHandler';
import capitalizeWord from '../utils/regexUtils';

/* Gets  from dictionary */
const getMatchingDefinitions = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const wordCapitalzed = capitalizeWord(req.params[ 'word' ]);
  Definition.find({ word: wordCapitalzed }, (err: unknown, words: definition) => {
    if (err) {
      return next(err);
    } else if (!words) {
      return next(err);
    }
    else {
      console.log(words);
      res.json({
        httpCode: 200,
        message: 'Success',
        data: words
      });
    }
  });
});

module.exports = {
  getMatchingDefinitions
};
