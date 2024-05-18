module.exports = (mongoose) => {
  const contacts = mongoose.model(
    'contacts',
    mongoose.Schema(
      {
        firstname: String,
        lastname: String,
        email: String,
        idnumber: Number,
      },
      { timestamps: true }
    )
  );

  return contacts;
};
