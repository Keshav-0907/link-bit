import linkModel from '@/model/urlSchema';

export default async function GET(req, res) {
    const { urlSlug } = req.query;
    try {
        const link = await linkModel.findOneAndUpdate(
            { shortLink: urlSlug },
            { $inc: { clicks: 1 } }, 
            { new: true }
        );
        if (link) {
            res.status(200).redirect(link.originalLink);
        } else {
            res.status(404).send("Link not found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
