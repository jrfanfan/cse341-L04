const db = require('../models');
const contacts = db.userDetail;

const apiKey =
  '3a28b4dd-d909-432a-b7f1-f3f77133393d';

exports.create = (req, res) => {
   //Validate request
  if (!req.body.firstname) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a contact
  const contact = new Contact({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    idnumber: req.body.idnumber
  });
  // Save contact in the database
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Temple.',
      });
    });
};

exports.findAll = (req, res) => {
  console.log(req.header('apiKey'));
  if (req.header('apiKey') === apiKey) {
    Contact.find(
      {},
      {
        temple_id: 1,
        name: 1,
        location: 1,
        dedicated: 1,
        additionalInfo: 1,
        _id: 0,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving temples.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Find a single Temple with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  if (req.header('apiKey') === apiKey) {
    Temple.find({ _id: id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not found Temple with id ' + _id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Temple with temple_id=' + _id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

//  Update a Temple by the id in the request
 exports.update = (req, res) => {
   if (!req.body) {
     return res.status(400).send({
       message: 'Data to update can not be empty!',
     });
   }

   const id = req.params.id;

   Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
     .then((data) => {
       if (!data) {
         res.status(404).send({
           message: `Cannot update Temple with id=${id}. Maybe Temple was not found!`,
         });
       } else res.send({ message: 'Temple was updated successfully.' });
     })
     .catch((err) => {
       res.status(500).send({
         message: 'Error updating Temple with id=' + id,
       });
     });
 };

//  Delete a contact with the specified id in the request
 exports.delete = (req, res) => {
   const id = req.params.id;

   Temple.findByIdAndRemove(id)
     .then((data) => {
       if (!data) {
         res.status(404).send({
           message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
         });
       } else {
         res.send({
           message: 'Temple was deleted successfully!',
         });
       }
     })
     .catch((err) => {
       res.status(500).send({
         message: 'Could not delete Temple with id=' + id,
       });
     });
 };

//  Delete all Temples from the database.
// exports.deleteAll = (req, res) => {
//   Contact.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Temples were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all temple.',
//       });
//     });
// };

//  Find all published Temples
// exports.findAllPublished = (req, res) => {
//   Temple.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving temple.',
//       });
//     });
// };
