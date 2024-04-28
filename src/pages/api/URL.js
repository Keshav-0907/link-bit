import { nanoid } from 'nanoid';
import linkModel from '@/pages/model/urlModel';
import mongoose from 'mongoose';

export default async function POST(req, res) {
    const { originalLink } = req.body;
    const slug = nanoid(5);

    mongoose.connect(process.env.NEXT_PUBLIC_API_MONGO_URI).then(()=>{
        console.log('Connected to database');
    }).catch((error)=>{
        console.log('Error connecting to database');
    })

    try {
        const newShortLink = await linkModel.create({
            originalLink: originalLink,
            shortLink: slug
        })
        if (!newShortLink) {
            throw new Error('Error creating link');
        }
        res.status(200).json({
            message: 'Link created successfully',
            data: newShortLink
        });
    } catch (error) {
        console.log(error);
    }
}