const pageContent = document.getElementById('container');
const btns = document.getElementById('btns').querySelectorAll('button');

const pages = [
  (page1 = {
    htmlFile: 'subpages/1.html',
    urlPath: '/1',
    pageTitle: 'Page 1',
  }),
  (page2 = {
    htmlFile: 'subpages/2.html',
    urlPath: '/2',
    pageTitle: 'Page 2',
  }),
  (page2 = {
    htmlFile: 'subpages/3.html',
    urlPath: '/3',
    pageTitle: 'Page 3',
  }),
];

loadContent = function (divId, subpage) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', subpage, true);
  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return;
    if (this.status !== 200) return;
    document.getElementById(divId).innerHTML = this.responseText;
  };
  xhr.send();
  window.scroll(0, 0);
};

function loadSubpage(response, divId, urlChange) {
  loadContent(divId, response.htmlFile);
  document.title = response.pageTitle;
  if (urlChange) {
    window.history.pushState(
      { html: response.html, pageTitle: response.pageTitle },
      '',
      response.urlPath
    );
  }
}

loadFromUrl = function () {
  url = window.location.href.split('/');
  subUrl = '/' + url[url.length - 1];
  for (subpage of pages) {
    if (subpage.urlPath === subUrl) {
      loadSubpage(subpage, 'container', false);
      break;
    }
  }
};

window.addEventListener('popstate', () => {
  loadFromUrl();
});

btns[0].addEventListener(
  'click',
  loadSubpage.bind(null, pages[0], 'container', true)
);
btns[1].addEventListener(
  'click',
  loadSubpage.bind(null, pages[1], 'container', true)
);
btns[2].addEventListener(
  'click',
  loadSubpage.bind(null, pages[2], 'container', true)
);

loadFromUrl();
