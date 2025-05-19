import {
    createCollectionService,
    deleteCollectionService,
    getAllCollectionsService,
    getCollectionByIdService,
    updateCollectionService
} from '../services/collection.service';

// Create new collection
export const createCollection = async (req, res) => {
    try {
        const collection = await createCollectionService(req.body);
        res.json(collection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all categories
export const getAllCollections = async (req, res) => {
    try {
        const collections = await getAllCollectionsService();
        res.json(collections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID
export const getCollectionById = async (req, res) => {
    try {
        const collection = await getCollectionByIdService(req.params.id);
        res.json(collection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update category
export const updateCollection = async (req, res) => {
    try {
        const collection = await updateCollectionService(req.params.id, req.body);
        res.json(collection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete category
export const deleteCollection = async (req, res) => {
    try {
        await deleteCollectionService(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
