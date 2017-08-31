/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('cognition.controllers', ['ngCordova'])
 .controller('CognitionCtrl',function($scope, $rootScope, $stateParams,$location, $state, $http, $cordovaCamera,$cordovaGeolocation){
    
   $scope.imgURI = "img/barack-obama.jpg"; 
 // alert("Congnition");
    $rootScope.age = parseInt("57.08");
    $rootScope.gender = "handsome man";
    $rootScope.smileml = "You have reserved personality";
    $rootScope.glasses = "Your have good vision and need no glass"; 
    $rootScope.emotion = "Don't worry be happy";
    $rootScope.smile1 = "0.0";
	//$rootScope.smileml = "";
    //$rootScope.surprise = "You should take more rest";
	$rootScope.agegroup = "1-10";
	$rootScope.emotionml = "sadness";
	$rootScope.genderml = "male";
   // $rootScope.physicalmental = "Physical health is sound and mental health is down";
	   //alert($rootScope.age);  
	  $rootScope.progress = false;
	  $scope.select = [];
	  $scope.select.input = "emotion";
	  $scope.select.detail = "Anger,Sadness,Happiness,Neutral";
	  $scope.allowEdit = true;
	 
	  
	//  if($rootScope.emotionml == "sadness") alert("hi"); 
  
     
  
  
  
    $rootScope.surprise = "Do not worry be happy matured man! Your success potential is very high and it depends on  how well you take care your health and family. Your predicted full life expectancy is  30 more years.";


  //alert($rootScope.gender);

   

  
  console.log("In out");  
  $scope.selielyze = function() {
    $rootScope.progress = true;
    $rootScope.imgURI = "";
    navigator.camera.getPicture(function (imageData) {
        
        //$rootScope.imgURI = "data:image/jpeg;base64," + imageData;
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        $rootScope.age = "";
        $rootScope.gender = "";
        $rootScope.smile = "";
        $rootScope.glasses = ""; 
        $rootScope.expression = "";
        $rootScope.emotion = "";
        //http://siliconvalleynest.com/familykoolapi/uploaddata/profile/10154263301143982.jpg
        // Emotion  
      console.log("In selyze");  
      
    //  if($scope.select.input=="emotion"){
      $scope.allowEdit = true;	  
      $http({
        url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": "f0c44f0ead094f7aad1c44164bdac77f"
        },
        data: makeblob("data:image/jpeg;base64," + imageData),
	   // data:"{'url':'http://siliconvalleynest.com/familykoolapi/uploaddata/profile/10154263301143982.jpg'}",
        processData: false
      })
        .then(function(response) {
            
            
               console.log("In emotion");   
            
          var max = Object.keys(response.data[0].scores).reduce(function(m, k){
            return response.data[0].scores[k] > m ? response.data[0].scores[k] : m
          }, -Infinity);

          var maxObj = [];

          angular.forEach(response.data[0].scores, function(value, key) {
            if(value == max) {
              this.push(key);
            }
          }, maxObj);

          $rootScope.emotion = maxObj[0];
		  $rootScope.emotion = $rootScope.emotion.trim();
		 // alert($rootScope.emotion);
		  $rootScope.emotionml = $rootScope.emotion;
		  if($rootScope.emotionml == "happiness") {  $rootScope.emotion = "You look happy today. keep it up."; } 
		  else {  $rootScope.emotion = "You look down today. Don't worry be happy"; }
         // if($rootScope.expression>=.3) $rootScope.expression = "Smile";
         // if($rootScope.expression<.3) $rootScope.expression = "No Smile";
	//  alert($rootScope.expression);	  
		  
	 // $rootScope.progress = false;		
          //$state.go('photo');
         // $location.path("/app/photo");
         // window.location.href = "index.html#/app/photo";

        },
        function(response) { // optional
          console.log("failed");
         // console.log(response);
		  console.log(response.statusText);
        });
	//  } //end of emotion	
	  
	  
	 //http://siliconvalleynest.com/familykoolapi/uploaddata/profile/10154263301143982.jpg 
	  		//face
	//if($scope.select.input=="face"){	
	//	$scope.allowEdit = false;
		$http({
        url: "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=fale&returnFaceAttributes=age,gender,smile,glasses",
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": "ca9135a87e274c29ae39e001b69b7deb"
        },
        data: makeblob("data:image/jpeg;base64," + imageData),
		 //data:"{'url':'http://siliconvalleynest.com/familykoolapi/uploaddata/profile/10154263301143982.jpg'}",

        processData: false
      })
        .then(function(response) {
           
		    console.log("In face");  
		   // alert(response.data[0].faceAttributes.age+response.data[0].faceAttributes.gender+response.data[0].faceAttributes.smile+response.data[0].faceAttributes.glasses);
                        $rootScope.age = response.data[0].faceAttributes.age;
                        $rootScope.gender = response.data[0].faceAttributes.gender;
			            $rootScope.smile = response.data[0].faceAttributes.smile;
			            $rootScope.glasses = response.data[0].faceAttributes.glasses;
                        $rootScope.smile = $rootScope.smile.toFixed(0);
						 $rootScope.smile =  parseInt($rootScope.smile.trim());
                        $rootScope.smile1  =  $rootScope.smile ;
						
						//alert($rootScope.smile+"-"+$rootScope.emotion);
                        if($rootScope.smile>0){ $rootScope.smileml = "You are generous and smiling"; }
                        else { $rootScope.smileml = "You have reserved personality"; }
                       // alert($rootScope.smileml+"-"+$rootScope.emotion);
			            $rootScope.ageml = $rootScope.age;
                        $rootScope.progress = false;	
                         
                        
                         var log = [];
                         $rootScope.age = parseInt($rootScope.age);
						 
						 //age based gender
						 
						 if($rootScope.age<=18&&$rootScope.gender=="male") $rootScope.gender = "cute boy";
						 if($rootScope.age>18&&$rootScope.gender=="male") $rootScope.gender = "handsome man";
						 
						 if($rootScope.age<=18&&$rootScope.gender=="female") $rootScope.gender = "sweet girl";
						 if($rootScope.age>18&&$rootScope.gender=="female") $rootScope.gender = "beautiful lady";
						 
						 //glasses
						 
						 if($rootScope.glasses!="NoGlasses") $rootScope.glasses = "Your glass makes you look intelligent";
						 if($rootScope.glasses=="NoGlasses") $rootScope.glasses = "Your have good vision and need no glass";
						 
						 //age group
						 if($rootScope.age>=1&&$rootScope.age<=10) $rootScope.agegroup = "1-10";
						 if($rootScope.age>=11&&$rootScope.age<=20) $rootScope.agegroup = "11-20";
						 if($rootScope.age>=21&&$rootScope.age<=30) $rootScope.agegroup = "21-30";
						 if($rootScope.age>=31&&$rootScope.age<=40) $rootScope.agegroup = "31-40";
						 if($rootScope.age>=41&&$rootScope.age<=50) $rootScope.agegroup = "41-50";
						 if($rootScope.age>=51&&$rootScope.age<=60) $rootScope.agegroup = "51-60";
						 if($rootScope.age>=61&&$rootScope.age<=70) $rootScope.agegroup = "61-70";
					     if($rootScope.age>=71&&$rootScope.age<=99) $rootScope.agegroup = "71-99";
					    
						 //call ml api hosted on test aws
						 
						 
						 $http({
                         method: 'GET',
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                         url: "http://52.1.229.213:3300/?"+"age="+$rootScope.agegroup+"&emotion="+$rootScope.emotionml+"&gender="+$rootScope.genderml,
                         data: "age="+$rootScope.agegroup+"&emotion="+$rootScope.emotionml+"&gender="+$rootScope.genderml
						 }).
						 success(function(data) {
							// alert(data.Prediction.predictedLabel);
							 $rootScope.surprise =data.Prediction.predictedLabel;
						 }).
						 error(function(data, response) {
							 console.log(response + " " + data);
						 });
						 //end of call ml api
						 
	            
                         
        },
        function(response) { // optional
          console.log("failed");
          console.log(response.statusText);
        });
		
	//  } //end of face
	  
	  
	
	   //end of api cognitive	

    }, function () {
      // An error occured. Show a message to the user
      console.log("err -> " + err);
    }, {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 2048,
      targetHeight: 2400,
	  correctOrientation: true,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      cameraDirection: 1
    });
  };

  
  //$scope.allowEdit
  
  
  
  
  

  function makeblob (dataURL) {
	console.log("In makeblob");  
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);
      return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }
  
  
  $scope.reload = function(){
    //alert('hi');
	window.location.reload(true);
  }

  $scope.uidesc = function(){
  //  alert($scope.select.input);
	if($scope.select.input=="emotion")  $scope.select.detail = "Anger,Sadness,Happiness and Neutral";
	if($scope.select.input=="face")     $scope.select.detail = "Age,Gender and Glasses";
	if($scope.select.input=="vision")  $scope.select.detail = "Environmental Info about picture";
	//
  }   
 
  $scope.GoHome = function(){
    console.log("gohome");
    $rootScope.progress = false;
    $state.go('cognition');
  }   
  
   $scope.GoToHome = function(){
    console.log("gohome");
    $rootScope.progress = false;
    //$state.go('home');
    window.location.href = "index.html#/app/selfie";
  }  
  
  
  
  
  
  //current position
	  var geoSettings = {frequency: 1000, timeout: 30000, enableHighAccuracy: false};
       $cordovaGeolocation.getCurrentPosition(geoSettings).then(function(position){
 
	         $scope.lat = position.coords.latitude;
             $scope.lng = position.coords.longitude;
			 console.log($scope.lat+"-"+$scope.lng);
			 $scope.latLng = new google.maps.LatLng($scope.lat, $scope.lng);
			 
			 //geo coder 
			 var geocoder = new google.maps.Geocoder(); 
			  var request = {
				latLng: $scope.latLng
			  };
			  geocoder.geocode(request, function(data, status) {
				 // alert("hi");
				if (status == google.maps.GeocoderStatus.OK) {
				  if (data[0] != null) {
					//alert("address is: " + data[0].formatted_address);
					//$scope.locationlists.push(data[0].formatted_address);
					//alert(data[0].formatted_address);
					$rootScope.location = data[0].formatted_address;
				  } else {
					alert("No address available");
				  }
				}
			  })
	    //geo			
			 
			 
			 
		 }, function(error){console.log("Could not get location");
		
	  }); 		 
      		 
  
  
  
  
    
});