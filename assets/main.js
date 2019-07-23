// $(document).ready(function() {

// Initialize Firebase  

var firebaseConfig = {
  apiKey: "AIzaSyBHX8ftVmL-MN1Y_2hWYc8IqWfdO1p5S-E",
  authDomain: "train-scheduler-e522f.firebaseapp.com",
  databaseURL: "https://train-scheduler-e522f.firebaseio.com",
  projectId: "train-scheduler-e522f",
  storageBucket: "",
  messagingSenderId: "988607153189",
  appId: "1:988607153189:web:cda29f8f36e89661"
};

firebase.initializeApp(firebaseConfig);

// Create a variable for database
var database = firebase.database();

// Create an on click function that adds trains to the appended table
$('#form-submit-btn').on('click', function (event) {
      console.log("test");
      event.preventDefault();


      // $('#form-submit-btn').children('input').val('')
      // create variables to holding the train data
      var name = "";
      var trainDest = "";
      var trainTime = "";
      var trainFreq = "";


      // input from form
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

  // console.log(name);
  // console.log(trainDest);
  // console.log(trainTime);
  // console.log(trainFreq);

  // clear form

  $("#name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");

  return false;
});

// add firebase data back to webapge
database.ref().on("child_added", function (childSnapshot) {
      console.log(childSnapshot.val());
      // var name =childSnapshot.val().name;
      // var trainDest =childSnapshot.val().trainDest;
      var trainTime = childSnapshot.val().trainTime;
      var trainFreq = childSnapshot.val().trainFreq;


      // Calculating next train (pushing the first train back one year to ensure it comes before the current time)

      var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
      // console.log(trainTimeConverted);


      //Difference between the current times and entered train
      var diffTime = moment().diff(moment(trainTimeConverted), "minutes");


      // Time apart (remainder)
      var timeRemaining = diffTime % trainFreq;
      // console.log(diffTime)

      // Minute Until next Train
      var tillTrain = trainFreq - timeRemaining;
      // console.log(timeRemaining)

      // calculating next train time
      var nextTrain = moment().add(tillTrain, "minutes");
      // console.log(nextTrain)

      // current time
      nextTrain = moment(nextTrain).format("hh:mm A");
      // console.log(nextTrain)

      nextTrain = nextTrain.toString();
      tillTrain = tillTrain.toString();


      // add train data into table body

      $("table tbody").append(
        "<tr><td>" + childSnapshot.val().name +
        "</td><td>" + childSnapshot.val().trainDest +
        "</td><td>" + childSnapshot.val().trainFreq +
        "</td><td>" + nextTrain + "</td><td>" + tillTrain + "</td></tr>");
});