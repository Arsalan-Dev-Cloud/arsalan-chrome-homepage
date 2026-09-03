/* =========================================================
   CUSTOM CHROME HOMEPAGE
   PERSONALIZATION + PAGES + BOARDS + LINKS + BACKGROUND
========================================================= */


/* =========================================================
   PERSONALIZATION SYSTEM
========================================================= */

let userName =
  localStorage.getItem('userName') || '';

let userImage =
  localStorage.getItem('userImage') || '';


const DEFAULT_HUB_IMAGE =
  'Images/Icon Images/A_Logo1.png';


const DEFAULT_FAVICON =
  'Images/Icon Images/A_Logo.png';


function updateHubName(){

  const logoTitle =
    document.querySelector('.logo h1');

  if(!logoTitle) return;


  if(userName){

    const hubName =
      `${userName} Hub`;

    logoTitle.textContent =
      hubName;

    document.title =
      hubName;

  }
  else{

    logoTitle.textContent =
      'Arsalan Hub';

    document.title =
      'Arsalan Hub';

  }

}


/* =========================================================
   UPDATE HUB IMAGE + FAVICON
========================================================= */

function updateHubImage(){

  const hubLogo =
    document.getElementById('hubLogo');

  const favicon =
    document.getElementById('faviconLink');


  const image =
    userImage || DEFAULT_HUB_IMAGE;


  if(hubLogo){

    hubLogo.src =
      image;

  }


  if(favicon){

    favicon.href =
      userImage || DEFAULT_FAVICON;

  }

}


/* =========================================================
   UPDATE EVERYTHING
========================================================= */

function updatePersonalization(){

  updateHubName();

  updateHubImage();

}


/* =========================================================
   IMAGE READER
========================================================= */

function readImageFile(
  file,
  callback
){

  if(!file) return;


  if(!file.type.startsWith('image/')){

    alert('Please select a valid image.');

    return;

  }


  const reader =
    new FileReader();


  reader.onload =
    ()=>{
      callback(
        reader.result
      );
    };


  reader.readAsDataURL(
    file
  );

}


/* =========================================================
   IMAGE PREVIEW
========================================================= */

function setImagePreview(
  previewElement,
  image
){

  if(!previewElement) return;


  if(image){

    previewElement.innerHTML = `

      <img
        src="${image}"
        alt="Hub image preview"
      >

    `;

  }
  else{

    previewElement.innerHTML =
      '<span>🖼</span>';

  }

}


/* =========================================================
   PERSONALIZATION ELEMENTS
========================================================= */

const nameModal =
  document.getElementById(
    'nameModal'
  );


const userNameInput =
  document.getElementById(
    'userNameInput'
  );


const saveNameBtn =
  document.getElementById(
    'saveNameBtn'
  );


const nameModalError =
  document.getElementById(
    'nameModalError'
  );


const nameImageInput =
  document.getElementById(
    'nameImageInput'
  );


const selectNameImageBtn =
  document.getElementById(
    'selectNameImageBtn'
  );


const removeNameImageBtn =
  document.getElementById(
    'removeNameImageBtn'
  );


const nameImagePreview =
  document.getElementById(
    'nameImagePreview'
  );


const changeNameBtn =
  document.getElementById(
    'changeNameBtn'
  );


const changeNameModal =
  document.getElementById(
    'changeNameModal'
  );


const changeNameInput =
  document.getElementById(
    'changeNameInput'
  );


const changeNameError =
  document.getElementById(
    'changeNameError'
  );


const saveChangeNameBtn =
  document.getElementById(
    'saveChangeNameBtn'
  );


const cancelChangeNameBtn =
  document.getElementById(
    'cancelChangeNameBtn'
  );


const changeImageInput =
  document.getElementById(
    'changeImageInput'
  );


const selectChangeImageBtn =
  document.getElementById(
    'selectChangeImageBtn'
  );


const removeChangeImageBtn =
  document.getElementById(
    'removeChangeImageBtn'
  );


const changeImagePreview =
  document.getElementById(
    'changeImagePreview'
  );


/* =========================================================
   FIRST VISIT
========================================================= */

function checkFirstVisit(){

  if(!userName){

    nameModal.classList.add(
      'active'
    );


    setTimeout(
      ()=>{
        userNameInput.focus();
      },
      200
    );

  }
  else{

    updatePersonalization();

  }

}


/* =========================================================
   SAVE FIRST PERSONALIZATION
========================================================= */

function saveUserName(){

  const name =
    userNameInput.value.trim();


  /* NAME IS REQUIRED */

  if(!name){

    nameModalError.textContent =
      'Please enter your name.';

    nameModalError.style.display =
      'block';

    userNameInput.focus();

    return;

  }


  userName =
    name;


  localStorage.setItem(
    'userName',
    userName
  );


  /* IMAGE IS OPTIONAL */

  if(userImage){

    localStorage.setItem(
      'userImage',
      userImage
    );

  }
  else{

    localStorage.removeItem(
      'userImage'
    );

  }


  nameModalError.style.display =
    'none';


  updatePersonalization();


  nameModal.classList.remove(
    'active'
  );


  userNameInput.value =
    '';

}


/* =========================================================
   SELECT FIRST IMAGE
========================================================= */

selectNameImageBtn.onclick =
  ()=>{

    nameImageInput.click();

  };


nameImageInput.onchange =
  (event)=>{

    const file =
      event.target.files[0];


    if(!file) return;


    readImageFile(
      file,
      (image)=>{

        userImage =
          image;


        setImagePreview(
          nameImagePreview,
          userImage
        );

      }
    );

  };


/* =========================================================
   REMOVE FIRST IMAGE
========================================================= */

removeNameImageBtn.onclick =
  ()=>{

    userImage =
      '';


    setImagePreview(
      nameImagePreview,
      ''
    );


    nameImageInput.value =
      '';

  };


/* =========================================================
   OPEN CHANGE PERSONALIZATION
========================================================= */

function openChangeNameModal(){

  changeNameInput.value =
    userName || '';


  changeNameError.style.display =
    'none';


  setImagePreview(
    changeImagePreview,
    userImage
  );


  changeNameModal.classList.add(
    'active'
  );


  setTimeout(
    ()=>{
      changeNameInput.focus();
      changeNameInput.select();
    },
    150
  );

}


/* =========================================================
   CLOSE CHANGE PERSONALIZATION
========================================================= */

function closeChangeNameModal(){

  changeNameModal.classList.remove(
    'active'
  );

}


/* =========================================================
   SELECT CHANGE IMAGE
========================================================= */

selectChangeImageBtn.onclick =
  ()=>{

    changeImageInput.click();

  };


changeImageInput.onchange =
  (event)=>{

    const file =
      event.target.files[0];


    if(!file) return;


    readImageFile(
      file,
      (image)=>{

        userImage =
          image;


        setImagePreview(
          changeImagePreview,
          userImage
        );

      }
    );

  };


/* =========================================================
   REMOVE CHANGE IMAGE
========================================================= */

removeChangeImageBtn.onclick =
  ()=>{

    userImage =
      '';


    setImagePreview(
      changeImagePreview,
      ''
    );


    changeImageInput.value =
      '';

  };


/* =========================================================
   SAVE CHANGED PERSONALIZATION
========================================================= */

function saveChangedName(){

  const name =
    changeNameInput.value.trim();


  if(!name){

    changeNameError.textContent =
      'Please enter your name.';

    changeNameError.style.display =
      'block';

    changeNameInput.focus();

    return;

  }


  userName =
    name;


  localStorage.setItem(
    'userName',
    userName
  );


  if(userImage){

    localStorage.setItem(
      'userImage',
      userImage
    );

  }
  else{

    localStorage.removeItem(
      'userImage'
    );

  }


  updatePersonalization();


  closeChangeNameModal();

}


/* =========================================================
   PERSONALIZATION EVENTS
========================================================= */

if(saveNameBtn){

  saveNameBtn.addEventListener(
    'click',
    saveUserName
  );

}


if(changeNameBtn){

  changeNameBtn.addEventListener(
    'click',
    openChangeNameModal
  );

}


if(saveChangeNameBtn){

  saveChangeNameBtn.addEventListener(
    'click',
    saveChangedName
  );

}


if(cancelChangeNameBtn){

  cancelChangeNameBtn.addEventListener(
    'click',
    closeChangeNameModal
  );

}


if(userNameInput){

  userNameInput.addEventListener(
    'keydown',
    (event)=>{

      if(event.key === 'Enter'){

        saveUserName();

      }

    }
  );

}


if(changeNameInput){

  changeNameInput.addEventListener(
    'keydown',
    (event)=>{

      if(event.key === 'Enter'){

        saveChangedName();

      }

    }
  );

}


if(changeNameModal){

  changeNameModal.addEventListener(
    'click',
    (event)=>{

      if(
        event.target ===
        changeNameModal
      ){

        closeChangeNameModal();

      }

    }
  );

}


/* =========================================================
   NAVIGATION
========================================================= */

const navButtons =
  document.getElementById(
    'navButtons'
  );


const mainContent =
  document.getElementById(
    'mainContent'
  );


const homeButton =
  document.querySelector(
    '[data-page="home"]'
  );


const navArea =
  document.querySelector(
    '.nav-area'
  );


let customPages =
  JSON.parse(
    localStorage.getItem(
      'customPages'
    )
  ) || [];


/* =========================================================
   BLUR SYSTEM
========================================================= */

const blurBtn =
  document.getElementById(
    'blurToggleBtn'
  );


let blurEnabled =
  localStorage.getItem(
    'globalBlur'
  ) === 'true';


function updateBlurUI(){

  if(blurEnabled){

    document.body.classList.add(
      'blur-enabled'
    );


    blurBtn.classList.remove(
      'blur-off'
    );


    blurBtn.classList.add(
      'blur-on'
    );


    blurBtn.innerHTML =
      '🌫';

  }
  else{

    document.body.classList.remove(
      'blur-enabled'
    );


    blurBtn.classList.remove(
      'blur-on'
    );


    blurBtn.classList.add(
      'blur-off'
    );


    blurBtn.innerHTML =
      '👁';

  }

}


updateBlurUI();


blurBtn.onclick =
  ()=>{

    blurEnabled =
      !blurEnabled;


    localStorage.setItem(
      'globalBlur',
      blurEnabled
    );


    updateBlurUI();

  };


/* =========================================================
   SEARCH
========================================================= */

const searchInput =
  document.getElementById(
    'searchInput'
  );


searchInput.addEventListener(
  'keypress',
  function(event){

    if(event.key === 'Enter'){

      let value =
        searchInput.value.trim();


      if(value !== ''){

        if(
          value.includes('.') &&
          !value.includes(' ')
        ){

          if(
            !value.startsWith(
              'http://'
            ) &&
            !value.startsWith(
              'https://'
            )
          ){

            value =
              'https://' + value;

          }


          window.location.href =
            value;

        }
        else{

          window.location.href =
            `https://www.google.com/search?q=${encodeURIComponent(value)}`;

        }

      }

    }

  }
);


/* =========================================================
   ACTIVATE PAGE
========================================================= */

function activatePage(
  pageId,
  button
){

  document
    .querySelectorAll('.page')
    .forEach(
      page=>{
        page.classList.remove(
          'active'
        );
      }
    );


  document
    .querySelectorAll('.nav-btn')
    .forEach(
      btn=>{
        btn.classList.remove(
          'active'
        );
      }
    );


  const page =
    document.getElementById(
      pageId
    );


  if(page){

    page.classList.add(
      'active'
    );

  }


  if(button){

    button.classList.add(
      'active'
    );

  }

}


homeButton.onclick =
  ()=>{
    activatePage(
      'homePage',
      homeButton
    );
  };


/* =========================================================
   SAVE PAGES
========================================================= */

function savePages(){

  localStorage.setItem(
    'customPages',
    JSON.stringify(
      customPages
    )
  );

}


/* =========================================================
   FAVICON FUNCTIONS
========================================================= */

function getFaviconUrl(domain){

  return `https://icons.duckduckgo.com/ip3/${domain}.ico`;

}


function getFaviconGoogleUrl(domain){

  return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

}


function getFaviconFallbackUrl(domain){

  return `https://icons.duckduckgo.com/ip3/${domain}.ico?size=256`;

}


function getFaviconDirectUrl(domain){

  return `https://${domain}/favicon.ico`;

}


function getFaviconWWWDirectUrl(domain){

  return `https://www.${domain}/favicon.ico`;

}


function getDomainFromUrl(url){

  try{

    return new URL(url).hostname;

  }
  catch{

    return '';

  }

}


function getPlaceholderIcon(domain){

  const letter =
    (domain || 'W')[0]
      ?.toUpperCase();


  const svg = `

    <svg
      width="96"
      height="96"
      xmlns="http://www.w3.org/2000/svg"
    >

      <rect
        width="100%"
        height="100%"
        fill="#1f1f1f"
      />

      <text
        x="50%"
        y="52%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="#ff4b4b"
        font-family="Inter,system-ui,sans-serif"
        font-size="48"
      >
        ${letter}
      </text>

    </svg>

  `;


  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

}


/* =========================================================
   RENDER BOARDS
========================================================= */

function renderBoards(pageIndex){

  const container =
    document.getElementById(
      `boardsContainer${pageIndex}`
    );


  if(!container) return;


  container.innerHTML =
    '';


  customPages[pageIndex]
    .boards
    ?.forEach(
      (board, boardIndex)=>{

        const boardDiv =
          document.createElement(
            'div'
          );


        boardDiv.className =
          'board-box';


        boardDiv.innerHTML = `

          <button
            class="board-delete"
            onclick="
              deleteBoard(
                ${pageIndex},
                ${boardIndex}
              )
            "
          >
            ✕
          </button>


          <div class="board-header">

            <div class="board-actions">

              <h2>
                ${board.name}
              </h2>


              <button
                class="edit-btn board-edit"
                onclick="
                  event.stopPropagation();
                  openEditBoard(
                    ${pageIndex},
                    ${boardIndex}
                  )
                "
              >
                ✎
              </button>

            </div>


            <button
              class="add-link-btn"
              onclick="
                addLink(
                  ${pageIndex},
                  ${boardIndex}
                )
              "
            >
              + Add Link
            </button>

          </div>


          <div
            class="link-grid"
            id="linkGrid${pageIndex}_${boardIndex}"
          >
          </div>

        `;


        container.appendChild(
          boardDiv
        );


        const grid =
          boardDiv.querySelector(
            `#linkGrid${pageIndex}_${boardIndex}`
          );


        board.links.forEach(
          (link, linkIndex)=>{

            const card =
              document.createElement(
                'a'
              );


            card.className =
              'link-card';


            card.href =
              link.url;


            card.target =
              '_blank';


            card.rel =
              'noopener noreferrer';


            card.innerHTML = `

              <button
                class="delete-link"
                onclick="
                  event.preventDefault();
                  deleteLink(
                    ${pageIndex},
                    ${boardIndex},
                    ${linkIndex}
                  )
                "
              >
                ✕
              </button>


              <button
                class="edit-btn link-edit"
                onclick="
                  event.preventDefault();
                  event.stopPropagation();
                  openEditLink(
                    ${pageIndex},
                    ${boardIndex},
                    ${linkIndex}
                  )
                "
              >
                ✎
              </button>


              <h3>
                ${link.name}
              </h3>

            `;


            const img =
              document.createElement(
                'img'
              );


            img.alt =
              `${link.name} icon`;


            const domain =
              getDomainFromUrl(
                link.url
              );


            const faviconSources = [

              link.image,

              `https://www.google.com/s2/favicons?sz=128&domain=${domain}`,

              `https://icons.duckduckgo.com/ip3/${domain}.ico`,

              `https://${domain}/favicon.ico`,

              `https://www.${domain}/favicon.ico`

            ].filter(Boolean);


            let currentIndex =
              0;


            function loadNextIcon(){

              if(
                currentIndex >=
                faviconSources.length
              ){

                img.src =
                  getPlaceholderIcon(
                    domain
                  );

                return;

              }


              img.src =
                faviconSources[
                  currentIndex
                ];


              currentIndex++;

            }


            img.onerror =
              ()=>{
                loadNextIcon();
              };


            img.onload =
              ()=>{

                if(
                  customPages[pageIndex] &&
                  customPages[pageIndex]
                    .boards[boardIndex] &&
                  customPages[pageIndex]
                    .boards[boardIndex]
                    .links[linkIndex]
                ){

                  customPages[pageIndex]
                    .boards[boardIndex]
                    .links[linkIndex]
                    .image =
                      img.src;


                  savePages();

                }

              };


            loadNextIcon();


            card.insertBefore(
              img,
              card.querySelector('h3')
            );


            grid.appendChild(
              card
            );

          }
        );

      }
    );

}


/* =========================================================
   RENDER PAGES
========================================================= */

function renderPages(){

  document
    .querySelectorAll('.dynamic-btn')
    .forEach(
      btn=>{
        btn.remove();
      }
    );


  document
    .querySelectorAll('.dynamic-page')
    .forEach(
      page=>{
        page.remove();
      }
    );


  customPages.forEach(
    (page, index)=>{

      const btn =
        document.createElement(
          'div'
        );


      btn.className =
        'nav-btn dynamic-btn';


      btn.innerHTML = `

        <div class="page-item-actions">

          <span>
            ${page.name}
          </span>


          <button
            class="edit-btn page-edit"
            onclick="
              event.stopPropagation();
              openEditPage(
                ${index}
              )
            "
          >
            ✎
          </button>


          <button
            class="page-delete"
            onclick="
              event.stopPropagation();
              deletePage(
                ${index}
              )
            "
          >
            ✕
          </button>

        </div>

      `;


      navButtons.insertBefore(
        btn,
        document.getElementById(
          'addPageBtn'
        )
      );


      const pageDiv =
        document.createElement(
          'div'
        );


      pageDiv.className =
        'page dynamic-page';


      pageDiv.id =
        `dynamicPage${index}`;


      pageDiv.innerHTML = `

        <div class="boards-wrapper">

          <div class="page-header">

            <div class="board-actions">

              <h1>
                ${page.name}
              </h1>


              <button
                class="edit-btn board-edit"
                onclick="
                  openEditPage(
                    ${index}
                  )
                "
              >
                ✎
              </button>

            </div>


            <button
              class="add-link-btn"
              onclick="
                addBoard(
                  ${index}
                )
              "
            >
              + Add Board
            </button>

          </div>


          <div
            class="boards-container"
            id="boardsContainer${index}"
          >
          </div>

        </div>

      `;


      mainContent.appendChild(
        pageDiv
      );


      btn.onclick =
        ()=>{
          activatePage(
            `dynamicPage${index}`,
            btn
          );
        };


      renderBoards(index);

    }
  );


  navArea.scrollLeft =
    navArea.scrollWidth;

}


/* =========================================================
   MODAL ELEMENTS
========================================================= */

const pageModal =
  document.getElementById(
    'pageModal'
  );


const newPageNameInput =
  document.getElementById(
    'newPageName'
  );


const modalError =
  document.getElementById(
    'modalError'
  );


const createPageBtn =
  document.getElementById(
    'createPageBtn'
  );


const cancelPageBtn =
  document.getElementById(
    'cancelPageBtn'
  );


const boardModal =
  document.getElementById(
    'boardModal'
  );


const newBoardNameInput =
  document.getElementById(
    'newBoardName'
  );


const boardModalError =
  document.getElementById(
    'boardModalError'
  );


const createBoardBtn =
  document.getElementById(
    'createBoardBtn'
  );


const cancelBoardBtn =
  document.getElementById(
    'cancelBoardBtn'
  );


const linkModal =
  document.getElementById(
    'linkModal'
  );


const newLinkNameInput =
  document.getElementById(
    'newLinkName'
  );


const newLinkURLInput =
  document.getElementById(
    'newLinkURL'
  );


const linkModalError =
  document.getElementById(
    'linkModalError'
  );


const createLinkBtn =
  document.getElementById(
    'createLinkBtn'
  );


const cancelLinkBtn =
  document.getElementById(
    'cancelLinkBtn'
  );


const confirmModal =
  document.getElementById(
    'confirmModal'
  );


const confirmTitle =
  document.getElementById(
    'confirmTitle'
  );


const confirmMessage =
  document.getElementById(
    'confirmMessage'
  );


const confirmBtn =
  document.getElementById(
    'confirmBtn'
  );


const cancelConfirmBtn =
  document.getElementById(
    'cancelConfirmBtn'
  );


const editModal =
  document.getElementById(
    'editModal'
  );


const editTitle =
  document.getElementById(
    'editTitle'
  );


const editNameInput =
  document.getElementById(
    'editName'
  );


const editURLInput =
  document.getElementById(
    'editURL'
  );


const editImageInput =
  document.getElementById(
    'editImage'
  );


const iconUploadInput =
  document.getElementById(
    'iconUploadInput'
  );


const uploadIconBtn =
  document.getElementById(
    'uploadIconBtn'
  );


const editModalError =
  document.getElementById(
    'editModalError'
  );


const saveEditBtn =
  document.getElementById(
    'saveEditBtn'
  );


const cancelEditBtn =
  document.getElementById(
    'cancelEditBtn'
  );


let activeBoardPageIndex =
  null;


let activeBoardIndex =
  null;


let activeLinkIndex =
  null;


let editMode =
  null;


let confirmAction =
  null;


/* =========================================================
   PAGE MODAL
========================================================= */

function openPageModal(){

  newPageNameInput.value =
    '';


  modalError.style.display =
    'none';


  pageModal.classList.add(
    'active'
  );


  setTimeout(
    ()=>{
      newPageNameInput.focus();
    },
    100
  );

}


function closePageModal(){

  pageModal.classList.remove(
    'active'
  );

}


function createPage(){

  const pageName =
    newPageNameInput.value.trim();


  if(!pageName){

    modalError.style.display =
      'block';

    return;

  }


  customPages.push({

    name:
      pageName,

    boards:
      []

  });


  savePages();

  renderPages();


  const newIndex =
    customPages.length - 1;


  const buttons =
    document.querySelectorAll(
      '.dynamic-btn'
    );


  activatePage(
    `dynamicPage${newIndex}`,
    buttons[newIndex]
  );


  closePageModal();

}


/* =========================================================
   BOARD MODAL
========================================================= */

function openBoardModal(
  pageIndex
){

  activeBoardPageIndex =
    pageIndex;


  newBoardNameInput.value =
    '';


  boardModalError.style.display =
    'none';


  boardModal.classList.add(
    'active'
  );


  setTimeout(
    ()=>{
      newBoardNameInput.focus();
    },
    100
  );

}


function closeBoardModal(){

  boardModal.classList.remove(
    'active'
  );


  activeBoardPageIndex =
    null;

}


function createBoard(){

  const boardName =
    newBoardNameInput.value.trim();


  if(!boardName){

    boardModalError.style.display =
      'block';

    return;

  }


  if(
    activeBoardPageIndex === null
  ){

    return;

  }


  customPages[
    activeBoardPageIndex
  ].boards.push({

    name:
      boardName,

    links:
      []

  });


  savePages();

  renderPages();


  activatePage(
    `dynamicPage${activeBoardPageIndex}`,
    document.querySelectorAll(
      '.dynamic-btn'
    )[activeBoardPageIndex]
  );


  closeBoardModal();

}


/* =========================================================
   LINK MODAL
========================================================= */

function openLinkModal(
  pageIndex,
  boardIndex
){

  activeBoardPageIndex =
    pageIndex;


  activeBoardIndex =
    boardIndex;


  newLinkNameInput.value =
    '';


  newLinkURLInput.value =
    '';


  linkModalError.textContent =
    'Link name and URL are required.';


  linkModalError.style.display =
    'none';


  linkModal.classList.add(
    'active'
  );


  setTimeout(
    ()=>{
      newLinkNameInput.focus();
    },
    100
  );

}


function closeLinkModal(){

  linkModal.classList.remove(
    'active'
  );


  activeBoardPageIndex =
    null;


  activeBoardIndex =
    null;

}


function createLink(){

  const name =
    newLinkNameInput.value.trim();


  let url =
    newLinkURLInput.value.trim();


  if(!name || !url){

    linkModalError.textContent =
      'Link name and URL are required.';

    linkModalError.style.display =
      'block';

    return;

  }


  if(
    !url.startsWith('http://') &&
    !url.startsWith('https://')
  ){

    url =
      'https://' + url;

  }


  let domain;


  try{

    domain =
      new URL(url).hostname;

  }
  catch{

    linkModalError.textContent =
      'Please enter a valid URL.';

    linkModalError.style.display =
      'block';

    return;

  }


  const image =
    `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;


  if(
    activeBoardPageIndex === null ||
    activeBoardIndex === null
  ){

    return;

  }


  customPages[
    activeBoardPageIndex
  ]
  .boards[
    activeBoardIndex
  ]
  .links.push({

    name,

    url,

    image

  });


  savePages();

  renderPages();


  activatePage(
    `dynamicPage${activeBoardPageIndex}`,
    document.querySelectorAll(
      '.dynamic-btn'
    )[activeBoardPageIndex]
  );


  closeLinkModal();

}


/* =========================================================
   EDIT SYSTEM
========================================================= */

function openEditModal(
  mode
){

  editMode =
    mode;


  editModalError.style.display =
    'none';


  editURLInput.style.display =
    'none';


  editImageInput.style.display =
    'none';


  editModal.classList.add(
    'active'
  );


  if(mode === 'link'){

    editURLInput.style.display =
      'block';


    editImageInput.style.display =
      'block';

  }


  setTimeout(
    ()=>{
      editNameInput.focus();
    },
    100
  );

}


function closeEditModal(){

  editModal.classList.remove(
    'active'
  );


  editMode =
    null;


  activeBoardPageIndex =
    null;


  activeBoardIndex =
    null;


  activeLinkIndex =
    null;

}


function saveEdit(){

  const name =
    editNameInput.value.trim();


  let url =
    editURLInput.value.trim();


  if(!name){

    editModalError.textContent =
      'Please enter a valid name.';

    editModalError.style.display =
      'block';

    return;

  }


  if(editMode === 'page'){

    customPages[
      activeBoardPageIndex
    ].name =
      name;

  }


  else if(editMode === 'board'){

    customPages[
      activeBoardPageIndex
    ]
    .boards[
      activeBoardIndex
    ]
    .name =
      name;

  }


  else if(editMode === 'link'){

    if(!url){

      editModalError.textContent =
        'Please enter a valid URL.';

      editModalError.style.display =
        'block';

      return;

    }


    if(
      !url.startsWith('http://') &&
      !url.startsWith('https://')
    ){

      url =
        'https://' + url;

    }


    let domain;


    try{

      domain =
        new URL(url).hostname;

    }
    catch{

      editModalError.textContent =
        'Please enter a valid URL.';

      editModalError.style.display =
        'block';

      return;

    }


    let image =
      '';


    const manualImage =
      editImageInput.value.trim();


    if(manualImage){

      image =
        manualImage;

    }
    else{

      image =
        `https://icons.duckduckgo.com/ip3/${domain}.ico`;

    }


    const linkItem =
      customPages[
        activeBoardPageIndex
      ]
      .boards[
        activeBoardIndex
      ]
      .links[
        activeLinkIndex
      ];


    linkItem.name =
      name;


    linkItem.url =
      url;


    linkItem.image =
      image;

  }


  const pageIndex =
    activeBoardPageIndex;


  savePages();

  renderPages();


  if(
    editMode !== null &&
    pageIndex !== null
  ){

    activatePage(
      `dynamicPage${pageIndex}`,
      document.querySelectorAll(
        '.dynamic-btn'
      )[pageIndex]
    );

  }


  closeEditModal();

}


function openEditPage(
  pageIndex
){

  activeBoardPageIndex =
    pageIndex;


  editTitle.textContent =
    'Edit Page';


  editNameInput.value =
    customPages[
      pageIndex
    ].name;


  openEditModal(
    'page'
  );

}


function openEditBoard(
  pageIndex,
  boardIndex
){

  activeBoardPageIndex =
    pageIndex;


  activeBoardIndex =
    boardIndex;


  editTitle.textContent =
    'Edit Board';


  editNameInput.value =
    customPages[
      pageIndex
    ]
    .boards[
      boardIndex
    ].name;


  openEditModal(
    'board'
  );

}


function openEditLink(
  pageIndex,
  boardIndex,
  linkIndex
){

  activeBoardPageIndex =
    pageIndex;


  activeBoardIndex =
    boardIndex;


  activeLinkIndex =
    linkIndex;


  const linkItem =
    customPages[
      pageIndex
    ]
    .boards[
      boardIndex
    ]
    .links[
      linkIndex
    ];


  editTitle.textContent =
    'Edit Link';


  editNameInput.value =
    linkItem.name;


  editURLInput.value =
    linkItem.url;


  editImageInput.value =
    linkItem.image || '';


  openEditModal(
    'link'
  );

}


/* =========================================================
   CONFIRM MODAL
========================================================= */

function openConfirmModal(
  title,
  message,
  action
){

  confirmTitle.textContent =
    title;


  confirmMessage.textContent =
    message;


  confirmAction =
    action;


  confirmModal.classList.add(
    'active'
  );

}


function closeConfirmModal(){

  confirmModal.classList.remove(
    'active'
  );


  confirmAction =
    null;

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

document
  .getElementById('addPageBtn')
  .addEventListener(
    'click',
    openPageModal
  );


createPageBtn.addEventListener(
  'click',
  createPage
);


cancelPageBtn.addEventListener(
  'click',
  closePageModal
);


createBoardBtn.addEventListener(
  'click',
  createBoard
);


cancelBoardBtn.addEventListener(
  'click',
  closeBoardModal
);


createLinkBtn.addEventListener(
  'click',
  createLink
);


cancelLinkBtn.addEventListener(
  'click',
  closeLinkModal
);


confirmBtn.addEventListener(
  'click',
  ()=>{
    
    if(confirmAction){

      confirmAction();

    }

    closeConfirmModal();

  }
);


cancelConfirmBtn.addEventListener(
  'click',
  closeConfirmModal
);


/* =========================================================
   OUTSIDE CLICK
========================================================= */

pageModal.addEventListener(
  'click',
  (event)=>{

    if(event.target === pageModal){

      closePageModal();

    }

  }
);


boardModal.addEventListener(
  'click',
  (event)=>{

    if(event.target === boardModal){

      closeBoardModal();

    }

  }
);


linkModal.addEventListener(
  'click',
  (event)=>{

    if(event.target === linkModal){

      closeLinkModal();

    }

  }
);


confirmModal.addEventListener(
  'click',
  (event)=>{

    if(event.target === confirmModal){

      closeConfirmModal();

    }

  }
);


editModal.addEventListener(
  'click',
  (event)=>{

    if(event.target === editModal){

      closeEditModal();

    }

  }
);


/* =========================================================
   ENTER KEY SUPPORT
========================================================= */

newPageNameInput.addEventListener(
  'keypress',
  (event)=>{

    if(event.key === 'Enter'){

      createPage();

    }

  }
);


newBoardNameInput.addEventListener(
  'keypress',
  (event)=>{

    if(event.key === 'Enter'){

      createBoard();

    }

  }
);


newLinkNameInput.addEventListener(
  'keypress',
  (event)=>{

    if(event.key === 'Enter'){

      createLink();

    }

  }
);


newLinkURLInput.addEventListener(
  'keypress',
  (event)=>{

    if(event.key === 'Enter'){

      createLink();

    }

  }
);


saveEditBtn.addEventListener(
  'click',
  saveEdit
);


cancelEditBtn.addEventListener(
  'click',
  closeEditModal
);


editNameInput.addEventListener(
  'keypress',
  (event)=>{

    if(event.key === 'Enter'){

      saveEdit();

    }

  }
);


editURLInput.addEventListener(
  'keypress',
  (event)=>{

    if(event.key === 'Enter'){

      saveEdit();

    }

  }
);


/* =========================================================
   ICON UPLOAD
========================================================= */

uploadIconBtn.onclick =
  ()=>{
    iconUploadInput.click();
  };


iconUploadInput.onchange =
  (event)=>{

    const file =
      event.target.files[0];


    if(!file) return;


    readImageFile(
      file,
      (image)=>{
        editImageInput.value =
          image;
      }
    );

  };


/* =========================================================
   DELETE PAGE
========================================================= */

function deletePage(
  pageIndex
){

  openConfirmModal(

    'Delete Page',

    'Delete this page and all boards inside it?',

    ()=>{

      customPages.splice(
        pageIndex,
        1
      );


      savePages();

      renderPages();


      activatePage(
        'homePage',
        homeButton
      );

    }

  );

}


/* =========================================================
   ADD BOARD
========================================================= */

function addBoard(
  pageIndex
){

  openBoardModal(
    pageIndex
  );

}


/* =========================================================
   DELETE BOARD
========================================================= */

function deleteBoard(
  pageIndex,
  boardIndex
){

  openConfirmModal(

    'Delete Board',

    'Delete this board and all its links?',

    ()=>{

      customPages[
        pageIndex
      ]
      .boards.splice(
        boardIndex,
        1
      );


      savePages();

      renderPages();


      activatePage(
        `dynamicPage${pageIndex}`,
        document.querySelectorAll(
          '.dynamic-btn'
        )[pageIndex]
      );

    }

  );

}


/* =========================================================
   INDEXED DB
========================================================= */

let bgDatabase;


const dbRequest =
  indexedDB.open(
    'DashboardBackgroundDB',
    1
  );


dbRequest.onupgradeneeded =
  (event)=>{

    bgDatabase =
      event.target.result;


    if(
      !bgDatabase.objectStoreNames.contains(
        'backgrounds'
      )
    ){

      bgDatabase.createObjectStore(
        'backgrounds'
      );

    }

  };


dbRequest.onsuccess =
  (event)=>{

    bgDatabase =
      event.target.result;

    loadSavedBackground();

  };


dbRequest.onerror =
  ()=>{

    console.error(
      'IndexedDB failed'
    );

  };


/* =========================================================
   BACKGROUND IMAGE
========================================================= */

function saveBackgroundImage(
  file
){

  return new Promise(
    (resolve,reject)=>{

      if(!bgDatabase){

        reject(
          new Error(
            'Background database is not ready.'
          )
        );

        return;

      }


      const transaction =
        bgDatabase.transaction(
          ['backgrounds'],
          'readwrite'
        );


      const store =
        transaction.objectStore(
          'backgrounds'
        );


      const request =
        store.put(
          file,
          'currentBackground'
        );


      request.onsuccess =
        ()=>{
          resolve();
        };


      request.onerror =
        ()=>{
          reject(
            request.error
          );
        };

    }
  );

}


/* =========================================================
   CUSTOM BACKGROUND ELEMENT
========================================================= */

const bgImage =
  document.createElement(
    'img'
  );


bgImage.className =
  'custom-bg-image';


document.body.prepend(
  bgImage
);


/* =========================================================
   LOAD SAVED BACKGROUND
========================================================= */

function loadSavedBackground(){

  const savedURL =
    localStorage.getItem(
      'backgroundURL'
    );


  if(savedURL){

    bgImage.src =
      savedURL;


    bgImage.classList.add(
      'active'
    );

  }


  if(!bgDatabase) return;


  const transaction =
    bgDatabase.transaction(
      ['backgrounds'],
      'readonly'
    );


  const store =
    transaction.objectStore(
      'backgrounds'
    );


  const request =
    store.get(
      'currentBackground'
    );


  request.onsuccess =
    ()=>{

      const file =
        request.result;


      if(file){

        const imageURL =
          URL.createObjectURL(
            file
          );


        bgImage.src =
          imageURL;


        bgImage.classList.add(
          'active'
        );

      }

    };

}


/* =========================================================
   BACKGROUND MODAL
========================================================= */

const bgImageBtn =
  document.getElementById(
    'bgImageBtn'
  );


const bgImageInput =
  document.getElementById(
    'bgImageInput'
  );


const backgroundModal =
  document.getElementById(
    'backgroundModal'
  );


const backgroundURL =
  document.getElementById(
    'backgroundURL'
  );


const saveBackgroundBtn =
  document.getElementById(
    'saveBackgroundBtn'
  );


const cancelBackgroundBtn =
  document.getElementById(
    'cancelBackgroundBtn'
  );


const uploadBackgroundBtn =
  document.getElementById(
    'uploadBackgroundBtn'
  );


const removeBackgroundBtn =
  document.getElementById(
    'removeBackgroundBtn'
  );


/* =========================================================
   BACKGROUND MODAL EVENTS
========================================================= */

bgImageBtn.addEventListener(
  'click',
  ()=>{
    
    backgroundURL.value =
      '';


    backgroundModal.classList.add(
      'active'
    );

  }
);


function closeBackgroundModal(){

  backgroundModal.classList.remove(
    'active'
  );

}


cancelBackgroundBtn.addEventListener(
  'click',
  closeBackgroundModal
);


saveBackgroundBtn.addEventListener(
  'click',
  ()=>{
    
    const imageUrl =
      backgroundURL.value.trim();


    if(!imageUrl) return;


    localStorage.setItem(
      'backgroundURL',
      imageUrl
    );


    bgImage.src =
      imageUrl;


    bgImage.classList.add(
      'active'
    );


    closeBackgroundModal();

  }
);


uploadBackgroundBtn.addEventListener(
  'click',
  ()=>{
    bgImageInput.click();
  }
);


backgroundModal.addEventListener(
  'click',
  (event)=>{

    if(
      event.target ===
      backgroundModal
    ){

      closeBackgroundModal();

    }

  }
);


bgImageInput.onchange =
  async (event)=>{

    const file =
      event.target.files[0];


    if(!file) return;


    try{

      await saveBackgroundImage(
        file
      );


      const imageURL =
        URL.createObjectURL(
          file
        );


      bgImage.src =
        imageURL;


      bgImage.classList.add(
        'active'
      );


      localStorage.removeItem(
        'backgroundURL'
      );


      bgImageInput.value =
        '';


      closeBackgroundModal();

    }
    catch(error){

      console.error(
        'Background upload failed:',
        error
      );

    }

  };


/* =========================================================
   ADD LINK
========================================================= */

function addLink(
  pageIndex,
  boardIndex
){

  openLinkModal(
    pageIndex,
    boardIndex
  );

}


/* =========================================================
   DELETE LINK
========================================================= */

function deleteLink(
  pageIndex,
  boardIndex,
  linkIndex
){

  openConfirmModal(

    'Delete Link',

    'Delete this link from the board?',

    ()=>{

      customPages[
        pageIndex
      ]
      .boards[
        boardIndex
      ]
      .links.splice(
        linkIndex,
        1
      );


      savePages();

      renderPages();


      activatePage(
        `dynamicPage${pageIndex}`,
        document.querySelectorAll(
          '.dynamic-btn'
        )[pageIndex]
      );

    }

  );

}


/* =========================================================
   REMOVE BACKGROUND
========================================================= */

removeBackgroundBtn.addEventListener(
  'click',
  ()=>{
    
    bgImage.src =
      '';


    bgImage.classList.remove(
      'active'
    );


    localStorage.removeItem(
      'backgroundURL'
    );


    if(bgDatabase){

      const transaction =
        bgDatabase.transaction(
          ['backgrounds'],
          'readwrite'
        );


      const store =
        transaction.objectStore(
          'backgrounds'
        );


      store.delete(
        'currentBackground'
      );

    }


    closeBackgroundModal();

  }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

updatePersonalization();

renderPages();

checkFirstVisit();