import mongoose from "mongoose"

const EventsSchema = new mongoose.Schema({
    eventName: {
        type: String,
        require: true
    },
    eventDate: {
        type: Date,
        require: true
    },
    eventTime: {
        type: String,
        require:true
    }
})

export const EventsModel = mongoose.model('Events', EventsSchema);