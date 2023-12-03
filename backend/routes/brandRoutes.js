import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Brand from '../models/brandsModel.js';

const brandRouter = express.Router();






 brandRouter.get('/animal/:animal/category/:category/brands',async (req, res) => {
   const { animal, category } = req.params;
   
   
    try {
      const brands = await Brand.distinct('brands', { animal, category });
      res.json(brands);
    } catch (error) {
      res.status(500).send({ message: 'An error occurred while obtaining brands.' });
    }
 });



export default brandRouter;

