
import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Crop name is required'],
      trim: true
    },
    type: {
      type: String,
      required: [true, 'Crop type is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Field location is required'],
      trim: true
    },
    plantingDate: {
      type: Date,
      required: [true, 'Planting date is required']
    },
    status: {
      type: String,
      enum: ['Growing', 'Harvested'],
      default: 'Growing'
    }
  },
  {
    timestamps: true
  }
);

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;
