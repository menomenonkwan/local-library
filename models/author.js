const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, maxlength: 100 },
    last_name: { type: String, required: true, maxlength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
  }
);

// Virtual for Author's Full Name
AuthorSchema
  .virtual('name')
  .get(function() { return `${this.last_name}, ${this.first_name}` });

// Virtual for Author's lifespan
// AuthorSchema
//   .virtual('lifespan')
//   .get(() => (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString());
AuthorSchema
  .virtual('lifespan_formatted')
  .get(function() {
    const birth =  this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : 'unknown';
    const death =  this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';

    return `${birth} - ${death}`;
  });
  
// Virtual for Author's URL 
AuthorSchema
  .virtual('url')
  .get(function() { return `/catalog/author/${this._id}` });

module.exports = mongoose.model('Author', AuthorSchema);