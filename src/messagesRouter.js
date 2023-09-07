const { getMessages, addMessages, deleteMessages } = require('./messagesRepo');
const { generateFilters, generateSort } = require('./mongoHelper');
const express = require('express');
const messageRouter = express.Router();

messageRouter.post('/', async (req, res) => {
    try {
        const dataArray = req.body;

        if (!Array.isArray(dataArray)) {
            return res.status(400).json({ error: 'Invalid input. Expected an array.' });
        }
        const messagesToSave = dataArray.map((item) => {
            return { NAXMLMobile: item };
        });

        const result = await addMessages(messagesToSave);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

messageRouter.get('/', async (req, res) => {
    try {
        let { id, type, umti, merchantId, beginTime, endTime, sortOrder, sortdirection: sortDirection = 'asc', limit = 100, skip = 0 } = req.query;

        const filters = generateFilters(id, type, umti, merchantId, beginTime, endTime);
        const sort = generateSort(sortOrder, sortDirection);

        if (limit > 500) {
            return res.status(400).json({ error: 'Skip parameter exceeds the maximum allowed value of 500.' });
        }

        const result = await getMessages(filters, sort, limit, skip);
        res.send(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

messageRouter.delete('/', async (req, res) => {
    try {
        let { id, type, umti, merchantId, begintime, endtime } = req.query;

        const filters = generateFilters(id, type, umti, merchantId, begintime, endtime);

        const result = await deleteMessages(filters);

        res.send(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = { messageRouter };