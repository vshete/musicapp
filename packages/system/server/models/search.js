'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;
    // crypto    = require('crypto'),
    //       _   = require('lodash');

/**
 * Validations
 */


 /**
 * User Schema
 */
var SearchSchema = new Schema({
	term: {
		type: String,
		required: true,
		unique: true
	},
	count: {
		type: Number,
		default: 1
	},
	success_count: {
		type: Number,
		default: 0
	},
	failure_count: {
		type: Number,
		default: 0
	}
});

mongoose.model('Search', SearchSchema);
