/* jshint -W079 */ 
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */

var expect = require('expect.js'),
  	mongoose = require('mongoose'),
    Search = mongoose.model('Search');

/**
 * Globals
 */
var search1, search2;

/**
 * Test Suites
 */

describe('<Unit Test>', function() {
  describe('Model Search:', function() {

    before(function(done) {
      search1 = { term : 'blue',
                  failure_count : 0,
                  success_count : 1,
                  count : 1
                };

      search2 = { term : 'rolling',
                  failure_count : 0,
                  success_count : 1,
                  count : 1
                };
      done();
    });

    describe('Method save', function() {
      it('should be able to save without problems', function(done) {
        var _search = new Search(search1);
        _search.save(function(err) {
          expect(err).to.be(null);
          _search.remove();
          done();
        });
      });

      it('should not save a blank search', function(done) {
        var _search = new Search(search1);
        _search.term = '';
        _search.save(function(err){
          expect(err).to.not.be(null);
          done();
          _search.remove();
          if(!err){
            _search.remove();
          }
        });
      });

      it('should be able to create search and save search for updates without problems', function(done) {
        var _search = new Search(search1);
        _search.save(function(err) {
          expect(err).to.be(null);
          _search.term = 'Jimmy Hendrix';
          _search.save(function(err) {
            expect(err).to.be(null);
            expect(_search.term).to.equal('Jimmy Hendrix');
            _search.remove(function() {
              done();
            });
          });
        });
      });
    });
  });
});
