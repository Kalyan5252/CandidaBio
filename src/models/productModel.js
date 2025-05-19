import mongoose, { models, model } from 'mongoose';

const productSchema = new mongoose.Schema(
  {
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
    certificate: {
      type: String,
      required: false,
    },
    dateIssued: {
      type: Date,
      required: false,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// const products = mongoose.model('products', productSchema);
const products = models?.products || model('products', productSchema);

export default products;
