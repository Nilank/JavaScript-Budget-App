
//Budget Controller
var budgetController = (function(){

})();

//User Interface Controller
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    };

    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMStrings: function () {
            return DOMstrings;

        }
    }
})();

//Global App Controller
var controller = (function(bdgtCntrl, UICtrl){

    var DOM = UICtrl.getDOMStrings();

     var ctrlAddItem  = function(){
         var input = UIController.getInput();
         console.log(input);
    }

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13){
            ctrlAddItem();
        }
    });
})(budgetController, UIController);