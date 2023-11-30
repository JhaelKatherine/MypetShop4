import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
    animal: { type: String, required: true },
    category: { type: String, required: true },
    brands: [{ type: String, required: true }],
  });

  const Brand = mongoose.model('Brand', brandSchema);
  export default Brand;