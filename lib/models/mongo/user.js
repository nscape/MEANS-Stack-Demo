'use strict';

var mongoose = require('mongoose'),
		crypto = require('crypto');


var userSchema = new mongoose.Schema({
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  hashedPassword: { type: String, default: '' },
  salt: { type: String, default: '' },
  role : {type: String, default: 'user'}
})

userSchema.methods.authenticate = function(plainText) {
  return this.encryptPassword(plainText) === this.hashedPassword;
}

userSchema.methods.encryptPassword = function (password) {
	if (!password) return '';
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

userSchema.methods.makeSalt = function() {
  return Math.round((new Date().valueOf() * Math.random())) + '';
}

userSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  })


/**
 * Validations
 */

userSchema.path('username').validate(function (name) {
  if (this.skipValidation) return true;
  return name.trim().length;
}, 'Please provide a valid name');

userSchema.path('email').validate(function (email) {
  if (this.skipValidation) return true;
  return email.trim().length;
}, 'Please provide a valid email');

userSchema.path('hashedPassword').validate(function (hashedPassword) {
  if (this.skipValidation) return true;
  return hashedPassword.length;
}, 'Please provide a password');

mongoose.model('User', userSchema);