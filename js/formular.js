import { render } from "mustache";
//funkcia na resetovanie formularu
function reset() {
    document.getElementById("opnFrm").reset();
}
function resetForm() {

    for (let i = 0; i < opinions.length; i++) {
        if ((Date.now() - new Date(opinions[i].created)) > 30000) {
            opinions.splice(i, 1);
            localStorage.removeItem(opinions[i]);
            localStorage.myTreesComments = JSON.stringify(opinions);

            if (localStorage.myTreesComments) {
                opinions = JSON.parse(localStorage.myTreesComments);
            }

            opinionsElm.innerHTML = opinionArray2html(opinions);
            i--;
        }
    }

}

//-----------------------


//functions for transforming opinion(s) to Html code

function opinion2html(opinion){


    //TODO finish opinion2html

    opinion.createdDate=(new Date(opinion.created)).toDateString();
    opinion.notifications=opinion.notifications?"I want to be informed about actualities about this page.":"I am not interested about this page";

    const template = document.getElementById("mTmplOneOpinion").innerHTML;
    const htmlWOp = render(template,opinion);

    delete(opinion.createdDate);
    delete(opinion.notifications);

    return htmlWOp;

    //======


}
//=========================



function opinionArray2html(sourceData){

    //TODO finish opinionArray2html
    return sourceData.reduce((htmlWithOpinions,opn) => htmlWithOpinions+ opinion2html(opn),"");
    //=======

}
//==========================


//data and localStorage handling at startup

let opinions=[];


//==========================
//TODO Add opinionsElm variable, referencing the div with id="opinionsContainer"
const opinionsElm=document.getElementById("opinionsContainer");
//=======
//localStorage.clear();
if(localStorage.myTreesComments){
    opinions=JSON.parse(localStorage.myTreesComments);
}



//TODO render opinions to html
opinionsElm.innerHTML=opinionArray2html(opinions);
//============================


let myFrmElm=document.getElementById("opnFrm");

myFrmElm.addEventListener("submit",processOpnFrmData);

function processOpnFrmData(event){
    //1.prevent normal event (form sending) processing
    event.preventDefault();

    //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
    const inputs = document.getElementById("opnFrm").elements;
    const nopName = /*document.getElementById("nameElm").value.trim()*/inputs["login"].value.trim();
    const nopMail = /*document.getElementById("mail").value.trim()*/inputs["mail"].value.trim();
    const nopURL = /*document.getElementById("url").value.trim()*/inputs["url"].value.trim();
    const nopCheck = /*document.getElementById("check").checked*/inputs["check"].checked;
    let nopGender;
    const nopOpn = document.getElementById("opnElm").value.trim();

    //3. Verify the data
    if(nopName==="" || nopOpn==="" || nopMail===""){
        window.alert("Please, enter your name, e-mail and opinion");
        return;
    }

    if(inputs["male"].checked === true){
        nopGender = /*document.getElementById("male").value.trim()*/inputs["male"].value.trim();
    }
    else if(inputs["female"].checked === true){
        nopGender = /*document.getElementById("female").value.trim()*/inputs["female"].value.trim();
    }
    else{
        nopGender = "";
    }


    //3. Add the data to the array opinions and local storage
    const newOpinion =
        {
            name: nopName,
            mail: nopMail,
            url: nopURL,
            gender: nopGender,
            notifications: nopCheck,
            comment: nopOpn,
            created: new Date()
        };

    //================================
    opinions.push(newOpinion);

    localStorage.myTreesComments = JSON.stringify(opinions);



    //4. Update HTML
    //TODO add the new opinion to HTML

    opinionsElm.innerHTML+=opinion2html(newOpinion);
    //========


    //5. Reset the form
    myFrmElm.reset(); //resets the form
    //===========================================
}