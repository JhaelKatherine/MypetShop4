import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import brands from '../models/brandsModel.js';

const brandRouter = express.Router();

brandRouter.get('/brands/:animal/:category', expressAsyncHandler(async (req, res) => {
    const { animal, category } = req.params;
  
    try {
      const brands = await Brand.find({ animal, category });
      res.json(brands);
    } catch (error) {
      res.status(500).send({ message: 'An error ocurred while obtaing brands.' });
    }
  }));

export default brandRouter;