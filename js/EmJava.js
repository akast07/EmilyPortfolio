(function($) {
  $().ready(function(){

    //DEBUG
    // $('html').click(function(evt){
    //   console.log('evt', evt, 'target', evt.target);
    // });

    var modal = document.getElementById('myModal');

    //get the image and insert it inside the modal - use its "alt" text as a caption
    // var test = document.getElementById("myImg"); //??? test is null
    var liOne ="image-li-one";
    var test = "img,.text";

    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    // console.log('test var is',$(test));

    $(test).on("click",function(evt){

      var newSrc = this.src;

      //conditional for text selection
      if(evt.target.className === 'text'){

        //img,text - parentNODE == overlay
        //overlay -parentNode == li.image
        //li.image -firstchild(the first nodechild )== img
        //img -next sibling(text inside div) == text

        newSrc = evt.target.parentNode.parentNode.firstChild.nextSibling.src;

      }

      modal.style.display = "block";

      //sets newSrc to modalImg
      modalImg.src = newSrc;
      //captionText.innerHTML=this.alt;
    });
    //get the<span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    //when the user clicks on <span> (x), close the modal
    span.onclick=function(){
      modal.style.display="none";
    }
  })
}($));
