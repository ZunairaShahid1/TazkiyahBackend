import mongoose from "mongoose"

const EbookSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    link: {
        type: String,
    },
})

export const EbookModel = mongoose.model('Ebooks', EbookSchema);