const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema(
    {
        name:{ type: String, required: true },
        phoneNumber: { type: Number, require: false},
        noteNumber:{type: Number},
        size: [{
            ወራዲ : {type: Number},
            ቁመት : {type: Number},
            ማዓንጣ : {type: Number},
            እፍልቢ : {type: Number},
            ሞንኮብ : {type: Number},
            ኢድ : {type: Number},
        }],
        ordersImages: [{
            first: { type: String, required: false},
            second: { type: String, required: false},
            third: { type: String, required: false},
            fourth: { type: String, required: false},
            fifth: { type: String, required: false}
        }],
        whatType: {type: String, required: false},
    },
    {
        timestamps: true
    }
)

const Client = mongoose.model('Clients', clientsSchema)
module.exports = Client;

