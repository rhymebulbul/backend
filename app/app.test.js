// Import
const express = require('express')
const cors = require("cors")
const config = require("./config/auth.config")
const cookieSession = require("cookie-session")
const { USERNAME,PASSWORD,DATABASE,CLUSTER } = require('./config/db.config.js')
const db = require("./models/index.js")
const session = require('express-session');
const cheerio = require('cheerio');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); // Assuming app setup is in 'app.js'

const { expect } = chai;
chai.use(chaiHttp);

describe('/domain Route', () => {
    it('should respond with a message containing the word "domain"', (done) => {
      chai.request('http://localhost:3000')
        .get('/domain')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.include('domain');
          done();
        });
    });
  });


describe('/domain Route', () => {
    it('should respond with a message containing the phrase "Your Domain Selection is"', (done) => {
      chai.request('http://localhost:3000')
        .get('/domain')
        .end((err, res) => {
          //expect(res).to.have.status(404);
          
          // Parse the HTML using cheerio
          const $ = cheerio.load(res.text);
          
          // Check for the presence of the desired text within the HTML
          const containsText = $('body').text().includes('Domain');
          console.log(containsText)
          expect(containsText).to.be.false;
          
          done();
        });
    });
  });