
//Budget Controller
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income  = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems:{
            exp: [],
            inc: []
        },
        total:{
            exp: 0,
            inc: 0
        }
    }

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

    var setUpEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13){
                ctrlAddItem();
            }
        });
    };

     var ctrlAddItem  = function(){
         var input = UIController.getInput();
         console.log(input);
     };

     return {
         init: function () {
             setUpEventListeners();
         }
     }

})(budgetController, UIController);

controller.init();