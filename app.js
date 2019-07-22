
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

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(curr){
            sum += curr.value;
        });
        data.total[type] = sum;

    }

    var data = {
        allItems:{
            exp: [],
            inc: []
        },
        total:{
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    return{
        addItem: function (type, des, val) {
            var newItem, ID;

            //Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID =0;
            }

            //Create new item based on 'inc' and 'exp'
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            //Push it into the our data structure
            data.allItems[type].push(newItem);

            //Return the element
            return newItem;
        },

        calculateBudget: function(){

            //Calculate the total income or expense
            calculateTotal('inc');
            calculateTotal('exp');

            //Calculate the budget i.e income - expense
            data.budget = data.total.inc - data.total.exp;

            //Calculate the percentage of income spent
            data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage

            };
        },

        testing: function(){
            console.log(data);
        }
    };

})();

//User Interface Controller
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        addListItem: function(obj, type){
            var html, newHtml, element;

            // Create HTML string using placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                html ='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace the placeholder test with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);


            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' +  DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.description = '';
                current.value = '';
            });

            fieldsArr[0].focus(); 
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
    
    var updateBudget = function () {

        // Calculate the budget
        bdgtCntrl.calculateBudget();

        // Return the budget
        var budget = bdgtCntrl.getBudget();

        // Display the budget on the UI
        console.log(budget);

    };

     var ctrlAddItem  = function(){
         var input;

         //Get the field input data
         input = UIController.getInput();

         if(input.description !== "" && !isNaN(input.value) && input.value > 0){

             //Add the item to the budget controller
             var newItem =budgetController.addItem(input.type, input.description, input.value);

             //Add the item to the UI
             UICtrl.addListItem(newItem, input.type);

             // Clear the input fields
             UICtrl.clearFields();

             // Calculate and update the budget
             updateBudget();

         }else if(input.description === ""){
             alert("Description cannot be empty!");
         }else if(input.value === 0){
             alert(input.type + " cannot be zero!");
         }else if(isNaN(input.value)){
             alert("Please enter valid value");
         }

     };

     return {
         init: function () {
             setUpEventListeners();
         }
     }

})(budgetController, UIController);

controller.init();