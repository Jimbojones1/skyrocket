const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  company: {
    type: String, 
    required: true
  },
  title: {
    type: String,
    required: true
  }, 
  notes: String,
  postingLink: String,
  status: {
    type: String,
    // enums are the options that you have as the value of status
    enum: ['interested', 'interviewing', 'rejected', 'accepted', 'applied']
  }
})


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // 1 to many relationship using embedding
  // 1 user has many applications, application belongs to a User
  applications: [applicationSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;




// {
//   _id: 12u98274983749832,
//   username: 'jim',
//   password: '12345',
//   applications: [
//     {
//       company: 'meta', 
//       title: 'SEI', 
//       notes: 'Dev ops',
//       postingLink: 'facebook.com', 
//       status: 'interviewing'
//     }, 
//     {
//       company: 'tsla', 
//       title: 'SEI', 
//       notes: 'Dev ops',
//       postingLink: 'facebook.com', 
//       status: 'interviewing'
//     },
//     {
//       company: 'microsoft', 
//       title: 'SEI', 
//       notes: 'Dev ops',
//       postingLink: 'facebook.com', 
//       status: 'interviewing'
//     },
//     {
//       company: 'openai', 
//       title: 'SEI', 
//       notes: 'Dev ops',
//       postingLink: 'facebook.com', 
//       status: 'interviewing'
//     }
//     ]
// }