const mongoose = require('mongoose');
const InternSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const Intern = mongoose.model('Intern', InternSchema);

module.exports = Intern;

