// Import the correct model
import urlModel from "@/model/urlSchema";
import mongoose from "mongoose";

export default async function POST(req, res) {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_API_MONGO_URI);
        const { useremail } = req.body;
        const urls = await urlModel.find({ useremail });

        if (!urls || urls.length === 0) {
            return res.status(404).json({  success: false, error: "No URLs found for the user" });
        }

        res.status(200).json({
            success: true,
            data: urls
        });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).json({
           
            error: "Internal server error"
        });
    }
}
