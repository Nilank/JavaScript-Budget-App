
//Budget Controller
var budgetController = (function(){


})();

//User Interface Controller
var UIController = (function(){

    //We'll write code later


})();

//Global App Controller
var controller = (function(bdgtCntrl, UICtrl){

    var ctrlAddItem  = function(){

        alert("It Worked!");

    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13){
            ctrlAddItem();
        }
    });







})(budgetController, UIController);