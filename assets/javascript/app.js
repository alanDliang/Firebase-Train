var config = {
    apiKey: "AIzaSyC7WxH4anssh5srxI5q7pha8rLdZa-GkdA",
    authDomain: "rutgersbc08.firebaseapp.com",
    databaseURL: "https://rutgersbc08.firebaseio.com",
    projectId: "rutgersbc08",
    storageBucket: "rutgersbc08.appspot.com",
    messagingSenderId: "501199397781"
  };
  firebase.initializeApp(config);

var dataRef = firebase.database();

var name = '';
var dest = '';
var frstTrTm = '';
var freq = '';
var nextTrain = '';
var nxtTrnForm = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyhold = '';
var getKey = '';

$(document).ready(function() {
    $("#addTrainBtn").on("click", function (){
        event.preventDefault();
        name = $("#name-input").val().trim();
        dest = $("#destination-input").val().trim();
        frstTrTm = $("#first-train-time-input").val().trim();
        freq = $("#frequency-input").val().trim();
        firstTimeConverted = moment(frstTrTm, "hh:mm").subtract(1, "years");
        currentTime = moment();
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        tRemainder= diffTime % freq;
        minutesTillTrain = freq - tRemainder;
        nextTrain = moment().add(minutesTillTrain, "minutes");
        nxtTrnForm = moment(nextTrain).format("hh:mm");

        dataRef.ref().push({
            name: name,
            destination: dest,
            firstTrainTime: frstTrTm,
            frequency: freq,
            nextTrainFormatted: nxtTrnForm,
            minutesTillTrain: minutesTillTrain,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
});

        $('#name-input').val('');
        $('#destination-input').val('');
        $('#first-train-time-input').val('');
        $('#frequency-input').val('');

});

dataRef.ref().on("child_added", function(Snapshot) {
    
            $('.train-schedule').append("<tr class='table-row' id=" + "'" + Snapshot.val() + "'" + ">" +
                "<td class='col-xs-3'>" + Snapshot.val().name +
                "</td>" +
                "<td class='col-xs-2'>" + Snapshot.val().destination +
                "</td>" +
                "<td class='col-xs-2'>" + Snapshot.val().frequency +
                "</td>" +
                "<td class='col-xs-2'>" + Snapshot.val().nextTrainFormatted +
                "</td>" +
                "<td class='col-xs-2'>" + Snapshot.val().minutesTillTrain +
                "</td>" +
                "<td class='col-xs-1'>" + "<input type='submit' value='DELETE' class='remove-train btn btn-danger btn-sm'>" + "</td>" +
                "</tr>");
    
        }, function(errorObject) {});
    
        $("body").on("click", ".remove-train", function() {
            $(this).closest('tr').remove();
            getKey = $(this).parent().parent().attr('id');
            dataRef.child(getKey).remove();
        });
    
    });
