
// $( document ).ready(function() {
    
  
 
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
  var database = firebase.database();

// Create an on click function that adds trains to the top table
  $('#form-submit-btn').on('click', function(event){
    console.log("test");
      event.preventDefault();

// create variables with the user input from form
    var name = "";
    var trainDest = "";
    var trainTime = "";
    var trainFreq = "";



    var name = $("#name").val().trim();
    var trainDest = $("#destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFreq = $("#frequency").val().trim();
  // console.log(name, trainDest, trainTime, trainFreq)
// create a temporary object for holding the new train data

          database.ref().push({
              name: name,
              trainDest: trainDest,
              trainTime: trainTime,
              trainFreq: trainFreq,
            
          });

// upload the new train data to the database


    // $("#name").val("");
    // $("#destination").val("");
    // $("#train-time").val("");
    // $("#frequency").val("");

    return false;
});

database.ref().on("child_added", function(childSnapshot){
    // var name =snapshot.val().name;
    // var trainDest =snapshot.val().trainDest;
    var trainTime=childSnapshot.val().trainTime;
    var trainFreq=childSnapshot.val().trainFreq;

// console log the values that were just pushed to the database
  // console.log(name);
  // console.log(trainDest);
  // console.log(trainTime);
  // console.log(trainFreq);

  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  // console.log(trainTimeConverted);
  

  //Difference between the times
  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  // console.log(diffTime)

  // Time apart (remainder)
  var timeRemaining = diffTime % trainFreq;
  // console.log(timeRemaining)

  // Minute Until Train
  var tillTrain = trainFreq - timeRemaining;

  var nextTrain = moment().add(tillTrain, "minutes");
  nextTrain=moment(nextTrain).format("hh:mm A");

  nextTrain = nextTrain.toString();
  tillTrain = tillTrain.toString();



// $("table tbody").append("<tr><td>"+ name +"</td><td>"+ trainDest +"</td><td>"+ trainFreq +"</td><td>"+ nextTrain +"</td><td>"+ tillTrain +"</td></tr>");

$("table tbody").append(
  "<tr><td>"+childSnapshot.val().name+
  "</td><td>"+childSnapshot.val().trainDest+
  "</td><td>"+childSnapshot.val().trainFreq+
  "</td><td>"+nextTrain+"</td><td>"+tillTrain+"</td></tr>");
});




// });



// });
