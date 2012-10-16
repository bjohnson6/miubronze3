//Bernice Johnson
//Project 3
// Visual Frameworks 12/07


//wait until the dom is ready.
window.addEventListener("DOMContentLoaded", function(){	 




//getelementByID function
function $(x){
    var theElement = document.getElementById(x);
    return theElement;              
};


//Create Select field element and populate with options.
function makeEvents(){
    var formTag = document.getElementsByTagName("form"),//formTag is an arrray of all the form tags.
        selectLi = $("select"),
        makeSelect = document.createElement("select");
        makeSelect.setAttribute("id", "events");
    for(var i=0, j=addAnEvent.length; i<j; i++) {
    	var makeOption = document.createElement("option");
    	var optText = addAnEvent[i];
    	makeOption.setAttribute("value", optText);
    	makeOption.innerHTML = optText;
    	makeSelect.appendChild(makeOption);

    }  
    selectLi.appendChild(makeSelect);

}

//Finc value of selected radio button
function getSelectedRadio(){
	var radios = document.forms[0].same;
	for(var i=0; i<radios.length; i++){
		if(radios[i].checked){
			zodiacValue = radios[i].value;

		}
		

	}

}

function toggleControls (n) {
	switch(n){
		case "on":
		    $("momentForm").style.display ="none";
		    $("clear").style.display = "inline";
		    $("displayLink").style.display ="none";
		    $("addNew").style.display= "inline";
		    break;
		case "off":
		    $("momentForm").style.display ="block";
		    $("clear").style.display = "inline";
		    $("displayLink").style.display ="inline";
		    $("addNew").style.display= "none";
		    $("items").style.display = "none";
		    break;   
		 default:
		    return false;    

	}
	// body...
}
//function getCheckboxValue(){
//	if($("yes").checked){
//		yesValue=
 //   }else{
 //       yesValue="No"
 //   }
//	}


//}



function storeData(key){
	//if there is no key this is a brand new item.we need a new key
	if(!key){
	    var id           = Math.floor(Math.random()*100000001);
	}else{
		//set the id to the existing key were editing so that it will save over the other data
		//the key is the same key that has been passed along from the editsubmit evnt handler
		id =key;
	} 
	//gather up all form field values and store in an object.
	//Object properties contain array with the form label and input value.
	getSelectedRadio();
	var item                ={};
	    item.event        =["Event:", $("events").value];
	    item.names          =["Name:", $("names").value];
	    item.when           =["When:",$("when").value];
	    item.what           =["What:",$("what").value];
	    item.where          =["Where:",$("where").value];
	    item.startd         =["Start Date:",$("startd").value];
	    item.endd           =["End Date:", $("endd").value];
	    item.zodiac         =["Relationship Status:", zodiacValue]; //////
	    item.range          =["Rate My Lover:",$("range").value]; 
	    item.addnotes       =["Add Notes:",$("addnotes").value];
	 //save data ito local storage: Use stringify to convert object to a string.
	 localStorage.setItem(id, JSON.stringify(item));
	 alert("Memory is Saved!");



}

function getData() {
	toggleControls("on");
	if(localStorage.length === 0){
		alert("There is no new Moments so default data was added.");
		autoFillData();
	}
	// Write Data from local storage
	var makeDiv = document.createElement("div");
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement("ul");
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	$("items").style.display="block";
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeLi =document.createElement("li");
		var linksLi = document.createElement("li"); //WEEK 3 ADD
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		//convert to string from local storage value back to an object by using JSON.parse()
		//////////
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("ul");
		makeLi.appendChild(makeSubList);
		getImage(obj.event[1], makeSubList); ///week 4 
		for(var n in obj){ //////////////////////////////
			var makeSubLi = document.createElement("li");
			makeSubList.appendChild(makeSubLi);
			var optSubText = obj [n] [0] + " " + obj[n][1]; /////////
			makeSubLi.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);

		}
		makeItemLinks(localStorage.key(i), linksLi);//create our edit and delete buttons/link fr each item in local storage//WEEK 3 ADD
	}
}
//get the image for the right category
function getImage(catName, makeSubList){
	var imageLi = document.createElement("li");
	makeSubList.appendChild(imageLi);
	var newImg = document.createElement("img");
	var setSrc = newImg.setAttribute("src", "img/"+ catName + ".png");
	imageLi.appendChild(newImg);
}
//week 4 adding json.Auto populate local storage
function autoFillData(){
	//the actual json data required for this to work is coming from our json.js file which is loaded from our html page
	//store the json object into local storage.
	for(var n in json){
		var id = Math.floor(Math.random()*100000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
}



//week 3 add//Make Item Links
//create the edit and delete links for each stored item when displayed.
function makeItemLinks(key, linksLi){
	//add edit single item link
    var editLink = document.createElement("a");
    editLink.href ="#"; 
    editLink.key = key;	
    var editText = "Edit Moment";
    editLink.addEventListener("click", editItem);
    editLink.innerHTML = editText;
    linksLi.appendChild(editLink);
    //add delete single items link
    var deleteLink = document.createElement("a");
    deleteLink.href ="#";
    deleteLink.key = key;
    var deleteText = "Delete Moment";
    deleteLink.addEventListener("click", deleteItem);
    deleteLink.innerHTML = deleteText;
    linksLi.appendChild(deleteLink);

    //add line break
    var breakTag = document.createElement("br");
    linksLi.appendChild(breakTag);
}
//edit Single Item
function editItem(){
	//grab the data from our item from local storage.week 3
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
    //show the form
	toggleControls("off");

	//populate the form field with the current localStorage values.week 3
	$("events").value =item.event[1];
	$("names").value =item.names[1];
	$("when").value =item.when[1];
	$("what").value =item.what[1];
	$("where").value =item.where[1];
	$("startd").value =item.startd[1];
	$("endd").value  =item.endd[1];
	var radios = document.forms[0].same;
	for(var i=0; i<radios.length; i++){
		if(radios[i].value == "Yes" && item.same[1] == "Yes"){ //DATING
			radios[i].setAttribute("checked", "checked");
		}else if(radios[i].value == "NO" && item.same[1] == "No"){ //A couple
			radios[i].setAttribute("checked", "checked");
		}
	}
	$("range").value =item.range[1];
	$("addnotes").value =item.addnotes[1];

	//remove the intial listener from the input "save moment" button. week 3
	save.removeEventListener("click", storeData); /////check storeData////////////////////
	//change submit button value to edit moment
	$("submit").value ="Edit Moment";
	var editSubmit = $("submit");
	//save the key value established in this function as a property of the editSubmit event
	//so we can use that value when we save the date we edited..
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;

}

function deleteItem(){
	var ask = confirm("Are you sure you want to delete this moment?");
	if(ask){
        localStorage.removeItem(this.key);
        alert("Moment was deleted!");
        window.location.reload();
	}else{
        alert("Moment was NOT deleted.")
	}
}

function clearLocal () {
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All events are deleted")
		window.location.reload();
		return false;
	}

}
//week 3
function validate(e){
	//define elements we want to check
	var getEvent = $("events");

	//reset error messages
	errMsg.innerHTML = " ";
	    getEvent.style.border = "1px solid black";
	

	//get error message
	var messageAry = [];
	//event validation
	if(getEvent.value === "--Choose Your Moment--"){
		var eventError = "Please choose a moment.";
		getEvent.style.border = "1px solid red";
		messageAry.push(eventError);
	}
	//if there were errors, dislplay them on the screen
	if(messageAry.length >= 1){
		for(var i=0, j= messageAry.length; i < j; i++){
			var txt = document.createElement("li");
			txt.innerHTML = messageAry[i];
			errMsg.appendChild(txt);
		}
	
        e.preventDefault();
        return false;
    }else{
 	   //if all is ok. save our data..send the key value (which came from the editdata function)
 	   //remember this key value was passed through the editsubmit listner property
 	   storeData(this.key);
    }   
}

//Variable defaults
var addAnEvent =[
   "--Choose Your Moment--", 
   "First Met", 
   "First Date",
   "First Kiss",
   "First Said I Love You!", 
   "Our Song",
   "--Choose Something Else--",
 //  "Our Names",
   "Relationship Status",
   "Calculate Time Together",
   "Note A Special Moment"
],
   zodiacValue,
   errMsg = $("errors");

;
  
//makeSelect();
makeEvents();




//Set Link and Submit click events
var displayLink = $("displayLink");
displayLink.addEventListener("click",getData);
var clearLink= $("clear");
clearLink.addEventListener("click",clearLocal);
var save = $("submit");
save.addEventListener("click", validate);


});
