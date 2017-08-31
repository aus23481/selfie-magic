/*
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

var express = require('express');
var app = express();
// Load the SDK and UUID
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var uuid = require('node-uuid');
var machinelearning = new AWS.MachineLearning();

//ml-tVdFgFZosG2   sm	 
	


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

	
app.get('/', function (req, res) {
  //res.send(req.query.gender+"-"+req.query.emotion+"-"+req.query.age);
  var params = {
  MLModelId: 'ml-20NWdu0cCC5', 
  PredictEndpoint: 'https://realtime.machinelearning.us-east-1.amazonaws.com', 
  Record: { 
    'gender': req.query.gender,
	 'emotion': req.query.emotion,
	  'age': req.query.age,
	   
  }
};
  
  
  machinelearning.predict(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else  {   
            console.log(data);           // successful response
			res.json(data);
    }
});
  
});

app.listen(3300, function () {
  console.log('Example app listening on port 3300!');
});	 

