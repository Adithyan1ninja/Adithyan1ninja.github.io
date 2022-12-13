function favTutorial() {  
    var mylist = document.getElementById("myList");  
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;  
    }  
    
    function show_hide() {
        var click = document.getElementById("list-items");
        if(click.style.display ==="none") {
           click.style.display ="block";
        } else {
           click.style.display ="none";
        } 
     }
     function show_hide2() {
      var click = document.getElementById("list-items2");
      if(click.style.display ==="none") {
         click.style.display ="block";
      } else {
         click.style.display ="none";
      } 
   }
   function myFunction() {
      var element = document.body;
      element.classList.toggle("dark-mode");
      console.log("hello");
    }