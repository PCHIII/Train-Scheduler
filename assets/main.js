
$( document ).ready(function() {
    
  
 
var firebaseConfig = {
    apiKey: "AIzaSyBHX8ftVmL-MN1Y_2hWYc8IqWfdO1p5S-E",
    authDomain: "train-scheduler-e522f.firebaseapp.com",
    databaseURL: "https://train-scheduler-e522f.firebaseio.com",
    projectId: "train-scheduler-e522f",
    storageBucket: "",
    messagingSenderId: "988607153189",
    appId: "1:988607153189:web:cda29f8f36e89661"
  };

 // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database
  let database = firebase.database();

// Create an on click function that adds trains to the top table
  $('#form-submit-btn').on('click', function(event){
      event.preventDefault();

// create variables with the user input from form
  
// create a temporary object for holding the new train data
}

// upload the new train data to the database

// console log the values that were just pushed to the database

// clear the form values after values have been stored


// create a firebase event for adding the data from the new trains and then populating them in the DOM.

// store snapshot changes in variables

// console.log the values
// process for calculating the Next Arrival and Minutes Away fields...
// make sure the first train time is after the eventual current time
// store variable for current time
// store variable for difference of current time and first train time
// store the time left
// calculate and store the minutes until next train arrives
// calculate the next arriving train
// add the data into the DOM/html
});
