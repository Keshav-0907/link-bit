import { nanoid } from 'nanoid';
import linkModel from '@/model/urlModel';
import mongoose from 'mongoose';

export default async function POST(req, res) {
    const { originalLink } = req.body;
    const slug = nanoid(5);

    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_API_MONGO_URI);
        console.log('Connected to database');

        const newShortLink = await linkModel.create({
            originalLink: originalLink,
            shortLink: slug
        });

        console.log('Link created successfully:', newShortLink);

        if (!newShortLink) {
            throw new Error('Error creating link');
        }

        res.status(200).json({
            message: 'Link created successfully',
            data: newShortLink
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
