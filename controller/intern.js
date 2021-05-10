const Intern = require("../db/Intern");


module.exports.getInterns = function (req, res) {

    Intern.find({}, (error, result) => {
        if (error) {
            res.status(500).json({ message: error.message });
        }
        
        res.status(200).json({ message: "fetching list of interns was successful", data: { interns: result } }); 
    });
};


module.exports.getIntern = function(req, res) {
    Intern.findOne({ _id: req.params.id }, function(error, result) {
        if (error) {
            res.status(500).json({ message: error.message });
        } else {
            if (!result) {
                res.status(404).json({ message: "intern not found"});
            }
            else {
                res.status(200).json({ message: "fetching was successful, intern found", data: { intern: result } });
            }
            
        }
    });
};


module.exports.addIntern = function(req, res) {

    let name = req.body.name
    let email = req.body.email
    let country = req.body.country


    if(!name || !email || !country){
        res.json({ message: "All fields are compulsory" });
    } else {
    let newIntern = new Intern({
        name,
        email,
        country
    });


    // Save Intern
    newIntern.save()
        .then((result) => res.status(201).json({ message: "addition was successful, new intern created", data: { intern: result } }))
        .catch(error => res.status(500).json({ message: error.message }));
    
    }
};



module.exports.updateIntern = function(req, res) {
    const { name, email, country } = req.body;

    if(!name && !email && !country){
        res.json({ message: "All fields can't be empty" });
    }
    let newName = name || undefined;
    let newEmail = email || undefined;
    let newCountry = country || undefined;
    let update = {name: newName, email: newEmail, country: newCountry};

    Intern.findOneAndUpdate({ _id: req.params.id }, update, { new: true, omitUndefined: true, useFindAndModify: false }, function(err, result) {
        if (err) {
            res.status(500).json({ message: error.message });
        } else {
            if (!result) {
                res.status(404).json({ message: "intern not found, Use POST request to create a new one"});
            } else {
                res.status(200).json({ message: "update was successful, intern updated", data: { intern: result } })
            }
            
        }
    });

};


module.exports.deleteIntern = function(req, res) {
    Intern.findOneAndDelete({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.status(500).json({ message: error.message });
        }  else {
            if (!result) {
                res.status(404).json({ message: "intern was not found"});
            }
            else {
                res.status(200).json({ message: "intern was deleted successfully", data: { intern: result } });
            }
            
        }
        
    });
};


