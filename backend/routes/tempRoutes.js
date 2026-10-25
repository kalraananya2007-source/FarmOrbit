
import express from 'express';
import Crop from '../models/Crop.js';

const router = express.Router();

// GET all crops
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch crops'
    });
  }
});

// POST a new crop
router.post('/', async (req, res) => {
  try {
    const { name, type, location, plantingDate, status } = req.body;

    if (!name?.trim() || !type?.trim() ||
        !location?.trim() || !plantingDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required crop fields'
      });
    }

    const crop = await Crop.create({
      name,
      type,
      location,
      plantingDate,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Crop added successfully',
      data: crop
    });
  } catch (error) {
    const isValidationError = error.name === 'ValidationError';

    res.status(isValidationError ? 400 : 500).json({
      success: false,
      message: isValidationError
        ? error.message
        : 'Failed to add crop'
    });
  }
});

 
// PUT: Update a crop by its MongoDB ID
router.put('/:id', async (req, res) => {
  try {
    const { name, type, location, plantingDate, status } = req.body;

    const crop = await Crop.findByIdAndUpdate(
      req.params.id,
      { name, type, location, plantingDate, status },
      { new: true, runValidators: true }
    );

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Crop updated successfully',
      data: crop
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update crop. Check the crop ID and fields.'
    });
  }
});

// DELETE: Delete a crop by its MongoDB ID
router.delete('/:id', async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Crop deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid crop ID'
    });
  }
});

export default router;
