const Intern = require("../db/Intern");


module.exports.getInterns = function (req, res) {

    Intern.find({}, (error, result) => {
        if (error) {
            // console.error(error);
            res.json({ message: error.message });
        }
        if (result != null) {
        
            res.json({ message: "fetching list of interns was successful", data: { interns: result } });
        } 
        // else {
        //     res.json({});
        // }
    });
};


module.exports.getIntern = function(req, res) {
    Intern.findOne({email: req.query.email}, function(error, result) {
        if (error) {
            // console.error(error);
            // res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.json({ message: error.message });
        } else {
            if (!result) {
                // res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.json({ message: "fetching failed, intern not found", data: result });
                
            }
            else {
                res.json({ message: "fetching was successful, intern found", data: result });
            }
            
        }
    });
};


module.exports.addIntern = function(req, res) {
    // console.log(req.body);
    // if(err) return res.status(500).send({ error: err.message });


    let name = req.query.name
    let email = req.query.email
    let country = req.query.country


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
        .then((result) => res.json({ message: "addition was successful, new intern created", data: result }))
        .catch(error => res.json({ message: error.message }));
    
    }
};



module.exports.updateIntern = function(req, res) {
    const { name, email, country } = req.body;

    if(!name || !email || !country){
        res.json({ message: "All fields are compulsory" });
    } else {
        var newIntern = new Intern({
        name,
        email,
        country
        });
    }


    Intern.findOne({ email: req.body.email }, function(error, result) {
        if (error) {
            // console.error(error);
            res.json({ message: error.message })

        } else {
            if (!result) {
                res.json({ message: "Intern does not exist. Use POST request to create a new one" });
                
            } else {
                // console.log('Updating existing item');
                result.name = newIntern.name;
                result.email = newIntern.email;
                result.country = newIntern.country;

            Intern.findOneAndUpdate({ email: req.body.email }, result, { new: true, useFindAndModify: false }, function(err, result) {
                if (err) {
                    res.json({ message: error.message })
                } else {
                    res.json(result);
                    res.json({ message: "update was successful, intern updated", data: result })
                }
            });

            }
        }
        });
};


module.exports.deleteIntern = function(req, res) {
    Intern.deleteOne({ email: req.params.internEmail }, function(err, result) {
        if (err) {
            res.json({ message: error.message });
        }
        if (result.ok === 1 && result.deletedCount === 1) {
            // console.log(result);
            res.json({ message: "intern deletion was successful", data: result });
        } 
        else {
            // console.log(result);
            // res.send('Unsuccessful deletion');
        }
    });
};


