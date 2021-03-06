/* Using jQuery, select all the article elements */

let articles = $('.article');

class Article {
  /* The constructor will take an element as it's only argument */
  constructor(element) {
    /* 
      We need to make sure the element being passed to us is a jQuery element.
      To do so, wrap the element in jQuery syntax. 
    */
    this.element = $(element);
    /* 
      Using our new reference to the element, find the expand button within 
      the element and set a new property on the Article class. 
    */
    this.expandButton = this.element.find('.expandButton');
    /* 
      Using our new reference to the expandButton, use jQuery to set the inner
      text on the button. 
    */
    this.expandButton.text('Click to expand');
    /* 
      Set a click handler on the expand button (or article element), calling 
      the expandArticle method. 
    */
    this.element.click(() => { this.expandArticle() });
    this.articleP = this.element.find('.articleP')
  }



  expandArticle() {
    /* Using our reference to the article element, add or remove a class */
    this.element.toggleClass('article-open');
    this.articleP.slideToggle().css('display', 'block');
    if (this.element[0].classList[1] === 'article-open') {
      this.expandButton.text('Click to close');
    } else {
      this.expandButton.text('Click to expand');
    }
  }

  // addArticle() {
  //   $('.addArticle').submit(() => {
  //     let header = $('#header').val();
  //     let date = $('#date').val();

  //     if (header && date) {
  //       $('.article').append(`<h2>${header}</h2><p class="date">${date}</p><span></span>`)
  //     }
  //   })   
  // }
}

/* 
  Use jQuery's .map function to map over the array of jQuery elements
  Within .map, we create a new instance of Article passing in each article element 
  to the constructor
*/

articles = articles.map(function (index, element) {
  new Article(element)
})

let addArticle = function () {
  let header = $('#header').val();
  let date = $('#date').val();
  let content = $('#content').val();
  if (header && date && content) {
    let newArticle = $("<div class='article'></div>") //document.createElement('div');
    newArticle.append(`<h2>${header}</h2><p class="date">${date}</p><div class='articleP'><p>${content}</p></div><span class="expandButton"></span>`)
    console.log(newArticle)
    $('.articles').append(newArticle);
    document.getElementById('header').value = '';
    document.getElementById('date').value = '';
    document.getElementById('content').value = '';
    return new Article(newArticle);
  }
}


$('.addArticle').submit((event) => {
  event.preventDefault();
  addArticle();
})
