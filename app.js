var budgetController = (function(){

    var x = 23;

    var add =  fumction(a){
        return x+a;
    }

    return {
        publicTest: function(b){
            console.log(add(b));
        }
    }

})();

var UIController = (function(){

    //We'll write code later


})();

var controller = (function(bdgtCntrl, UICtrl){

    var z = budgetController.publicTest(5);

    return{
        anotherPublic: function(){
            console.log(z);
        }
    }


})(budgetController, UIController);