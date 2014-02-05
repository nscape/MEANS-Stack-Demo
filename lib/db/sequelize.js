'use strict';

var Sequelize = require('sequelize')
var postgres  = require('sequelize-postgres').postgres

var fs        = require('fs')
  , path      = require('path')
  , lodash    = require('lodash')
  , db        = {}
  , dbConfig  = require('./database.json')
  , wait      = require('wait.for')


var env = 
  process.env.NODE_ENV || 
  'development';


var sequelize = new Sequelize(
  dbConfig[env].pg.database, 
  dbConfig[env].pg.user,  
  dbConfig[env].pg.password,  {

  port: dbConfig[env].pg.port,
 
  // custom protocol
  // - default: 'tcp'
  // - added in: v1.5.0
  // - postgres only, useful for heroku
  //protocol: null,
 
  // max concurrent database requests; default: 50
  maxConcurrentQueries: 100,
 
  // the sql dialect of the database
  // - default is 'mysql'
  // - currently supported: 'mysql', 'sqlite', 'postgres', 'mariadb'
  dialect: 'postgres',

 
  // disable inserting undefined values as NULL
  // - default: false
  omitNull: false,
 
  // a flag for using a native library or not.
  // in the case of 'pg' -- set this to true will allow SSL support
  // - default: false
  native: true,
 
  // Specify options, which are used when sequelize.define is called.
  // The following example:
  //   define: {timestamps: false}
  // is basically the same as:
  //   sequelize.define(name, attributes, { timestamps: false })
  // so defining the timestamps for each model will be not necessary
  // Below you can see the possible keys for settings. All of them are explained on this page
  define: {
    underscored: false,
    freezeTableName: false,
    syncOnAssociation: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    classMethods: {method1: function() {}},
    instanceMethods: {method2: function() {}},
    timestamps: true
  },
 
  // sync after each association (see below). If set to false, you need to sync manually after setting all associations. Default: true
  syncOnAssociation: true,
 
  // use pooling in order to reduce db connection overload and to increase speed
  // currently only for mysql and postgresql (since v1.5.0)
  pool: { maxConnections: 5, maxIdleTime: 30},
 
  // language is used to determine how to translate words into singular or plural form based on the [lingo project](https://github.com/visionmedia/lingo)
  // options are: en [default], es
  language: 'en',

  logging: true
});


var modelPath = path.join(__dirname, '/../models/sequelize');
fs
  .readdirSync(modelPath)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(modelPath, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db)
  }
})

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)