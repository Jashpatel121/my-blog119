https://teachablemachine.withgoogle.com/models/YIqYmdyjE/

Webcam.set({
    width:350,
    height:350,
    Image_format:"png",
    png_quality:90
});
webcam=document.getElementById("webcam");
Webcam.attach("webcam");

function snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("snapshot").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    })
}

console.log("ml5 version", ml5.version);
var classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/H10VclIho/model.json",modelLoaded);

function modelLoaded()
{
    console.log("model is loaded");
}
var prediction_1="";
var prediction_2="";
function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1="the 1st prediction is - " + prediction_1;
    speak_data_2="the 2nd prediction is - " + prediction_2;
var utterThis= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
synth.speak(utterThis);
}

function check()
{
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error,results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("name1").innerHTML=results[0].label;
        document.getElementById("name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;

        speak();
        if(results[0].label == "happy")
        {
            document.getElementById("emoji1").innerHTML="&#128522;";
        }
        if(results[0].label == "sad")
        {
            document.getElementById("emoji1").innerHTML="&#128532;";
        }
        if(results[0].label == "angry")
        {
            document.getElementById("emoji1").innerHTML="&#128548;";
        }
        
        if(results[1].label == "happy")
        {
            document.getElementById("emoji2").innerHTML="&#128522;";
        }
        if(results[1].label == "sad")
        {
            document.getElementById("emoji2").innerHTML="&#128532;";
        }
        if(results[1].label == "angry")
        {
            document.getElementById("emoji2").innerHTML="&#128548;";
        }
    }
}