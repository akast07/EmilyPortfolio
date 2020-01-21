/*
Title : Emily Antinozzi Portfolio
Author : Alejandro C.
Last Updated : 2/25/2019
*/

window.onscroll = function () {
  scrollFunction();
};

let autoHeightautoWidthImg = (AllImageLi,totalImages) => {
  let elementAutoHeight;

  for (i = 0; i < totalImages; i++) {
    console.log(AllImageLi[i].children[0]); ///<img element>
    elementAutoHeight = (AllImageLi[i].children[0].naturalHeight * 345) / AllImageLi[i].children[0].naturalWidth;
    console.log(`Unique Image height : ${elementAutoHeight}`);
    AllImageLi[i].children[0].height = elementAutoHeight;
    elementAutoHeight = null; //reset elementAutoHeight
    AllImageLi[i].children[0].width = 345;
  }
};
let modalFunctionality = () => {

  /*Add arrows to all html IMGS */
  appendARROWS();

  let modal = $('.myModal');

  /*WINDOW ON CLICK*/
  modal.on('click', function (event) {
    let clickedElem = $(event.target);
    let parentElement = ".myModal";
    if (clickedElem.is(':visible')) {
      if (clickedElem.hasClass('next') || clickedElem.hasClass('prev')) {
        return;
      } else if (clickedElem.closest(parentElement).length > 0) {
        hideModal(clickedElem.closest(parentElement));
      } else {
        hideModal(clickedElem.parent()); //on click on the window .click()
      }
    } else {
      return;
    }
  });

  /* X ICON CLOSE MODAL */
  $(".close").on("click", function (event) {
    hideModal($(event.target).parent().hide());
  });

  $(".next,.prev").on("click", function (event) {

    /*total imgs in rig */
    let ImgRig = $(".rig");
    let ImgCount = ImgRig.children().length;
    ImgCount -= 1; //zero index purposes 
    /*modalPosition index */
    let thisImg;
    let ImgPos;
    let nextSrc;
    let prevSrc;

    /*arrow click */
    let arrowClick = $(event.target);
    let arrowValue = arrowClick.data("arrowValue");
    let myModal = arrowClick.parent();
    thisImg = myModal.parent();

    let ImgParent;
    let myModalImg;

    //show next img
    hideModal(myModal);
    if (arrowValue > 0) {
      thisImg = $(this).prev();
      ImgPos = $(".rig > li").index(thisImg.parent().parent());
      nextSrc = PositionCheck(ImgPos, arrowValue, ImgCount);
      ImgParent = ImgRig.children("li").eq(nextSrc);
      ImgParent.children(".myModal").show();
      myModalImg = ImgParent.children(".myModal").find("img");
      UpdateImgSource(ImgParent.children("img"), myModalImg);
    } else if (arrowValue < 0) {
      //show prev img
      thisImg = $(this).next();
      ImgPos = $(".rig > li").index(thisImg.parent().parent());
      prevSrc = PositionCheck(ImgPos, arrowValue, ImgCount);
      ImgParent = ImgRig.children("li").eq(prevSrc);
      ImgParent.children(".myModal").show();
      myModalImg = ImgParent.children(".myModal").find("img");
      UpdateImgSource(ImgParent.children("img"), myModalImg);
    } else {
      console.log('no image to show?');
    }

  });
  //get the image and insert it inside the modal - use its "alt" text as a caption
  let test = "img,.text";

  /*SHOW IMG MODAL*/
  $(test).on("click", function (evt) {

    let activeModal = false;
    let newSrc = this.src;

    let clickParent = $(this);

    if (clickParent.hasClass('text')) {
      newSrc = clickParent.parent().next().children(".modal-content").prop('src');
      clickParent.parent().next().show();
      clickParent.parent().next().children(".modal-content").attr("src", newSrc);
    } else if (clickParent.is('img')) {
      newSrc = clickParent.prop('src');
      clickParent.next().next().show();
      clickParent.next().next().children(".modal-content").attr("src", newSrc);
    } else {
      console.log("something else clicked");
    }
  });

  //set image default grid width and height
};

let topFunction = function () {
  document.body.scrollTop = 0; // For Chrome, Safari and Opera
  document.documentElement.scrollTop = 0; // For IE and Firefox
};

let everyImageContainer = () => {
  // foreach img in folder place Li>img,div>div,div>img,div
};

let appendARROWS = () => {
  let footerNode = document.getElementsByClassName("modal-content");
  let arrowsHTML = `    <!-- Next/previous controls --><div class="prev" data-arrow-value="-1">&#10094;</div>`;
  let rightArrowHTML = `<div class="next" data-arrow-value="1">&#10095;</div>`;
  let closeIconHTML = `<span class="close">&times;</span>`;
  for (let i = 0; i < footerNode.length; i++) {
    footerNode[i].insertAdjacentHTML('beforebegin', closeIconHTML);
    footerNode[i].insertAdjacentHTML('beforebegin', arrowsHTML);
    footerNode[i].insertAdjacentHTML('afterend', rightArrowHTML);
  }
};


let modalIcons = (element, modalIsActive) => {
  scrollingEnable(modalIsActive);
  if (modalIsActive) {
    $(".myModal").show();
    $(".prev").css("display", "inline-block");
    $(".next").css("display", "inline-block");
    $(".close").show();
  } else if (!modalIsActive) {
    $(element).hide();
  } else {
    console.log("just checking");
  }
};

let PositionCheck = (currentIndex, arrowClickNum, ImgCount) => {
  if (currentIndex + arrowClickNum < 0) {
    return ImgCount; //returns last image in set
  } else if (arrowClickNum + currentIndex > ImgCount) {
    return 0; //returns first image in set
  } else {
    return currentIndex + arrowClickNum;
  }
};

let UpdateImgSource = (LiParent, myModalIMG) => {
  // .myModal after displayed
  let originalSrc = LiParent.attr("src");
  // IMG container
  myModalIMG.attr("src", originalSrc);
  // myModal change src
  return;
};

let scrollingEnable = (modalIsActive) => {
  if (modalIsActive) {
    $('body').addClass('stop-scrolling');
  } else {
    $('body').removeClass('stop-scrolling');
  }
};

let scrollFunction = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
};

/*HIDE MODAL */
let hideModal = (ObjectClosing) => {
  $(ObjectClosing).hide();
};


$(window).ready(function(){
  let imagesLoaded = 0;
  let AllImageLi = document.getElementsByClassName('image');
  let totalImages = AllImageLi.length; 
  console.log('total images : ' + totalImages);
  console.log(AllImageLi);
  autoHeightautoWidthImg(AllImageLi,totalImages);
  modalFunctionality();
});

