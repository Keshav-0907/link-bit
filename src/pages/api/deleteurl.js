import urlModel from "@/model/urlSchema";
import mongoose from "mongoose";

export default async function POST(req, res) {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_API_MONGO_URI);
        const { useremail, id } = req.body;

        const deletedUrl = await urlModel.findOneAndDelete({ _id: id, useremail });
        if (!deletedUrl) {
            return res.status(404).json({
                error: "URL not found"
            });
        }

        res.status(200).json({
            success: true
        });

    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).json({

            error: "Internal server error"
        });
    }
}
