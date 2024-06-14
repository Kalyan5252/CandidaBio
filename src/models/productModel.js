import mongoose, { models, model } from 'mongoose';

const productSchema = mongoose.Schema({
  productName: String,
  type: {
    type: String,
    enum: ['aqua', 'agri'],
    lowercase: true,
  },
  productImage: {
    type: String,
    default: '/images/CRD001.jpg',
  },
  subTitle: String,
  description: [String],
  benefits: [String],
  moa: [String],
  precautions: [String],
  compostiion: [
    {
      title: String,
      value: String,
    },
  ],
  packing: String,
  details: [
    {
      title: String,
      value: String,
    },
  ],
  images: [String],
  imgLoc: {
    type: String,
    default: 'cloud',
  },
});

// const products = mongoose.model('products', productSchema);
const products = models?.products || model('products', productSchema);

export default products;
