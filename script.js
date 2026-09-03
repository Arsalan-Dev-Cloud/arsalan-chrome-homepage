    const navButtons =
    document.getElementById('navButtons');

    const mainContent =
    document.getElementById('mainContent');

    const homeButton =
    document.querySelector('[data-page="home"]');

    const navArea =
    document.querySelector('.nav-area');

    let customPages =
    JSON.parse(localStorage.getItem('customPages'))
    || [];

    /* =========================
       BLUR SYSTEM
    ========================= */

    const blurBtn =
    document.getElementById(
      'blurToggleBtn'
    );

    let blurEnabled =
    localStorage.getItem('globalBlur')
    === 'true';

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

        blurBtn.innerHTML = '🌫';

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

        blurBtn.innerHTML = '👁';

      }

    }

    updateBlurUI();

    blurBtn.onclick = ()=>{

      blurEnabled = !blurEnabled;

      localStorage.setItem(
        'globalBlur',
        blurEnabled
      );

      updateBlurUI();

    };

    /* =========================
       SEARCH
    ========================= */

    const searchInput =
    document.getElementById('searchInput');

    searchInput.addEventListener('keypress',function(e){

      if(e.key === 'Enter'){

        let value =
        searchInput.value.trim();

        if(value !== ''){

          if(
            value.includes('.') &&
            !value.includes(' ')
          ){

            if(
              !value.startsWith('http://') &&
              !value.startsWith('https://')
            ){

              value = 'https://' + value;
            }

            window.location.href = value;

          }

          else{

            window.location.href =
            `https://www.google.com/search?q=${value}`;

          }

        }

      }

    });

    /* =========================
       ACTIVATE PAGE
    ========================= */

    function activatePage(pageId,button){

      document
      .querySelectorAll('.page')
      .forEach(page=>{

        page.classList.remove('active');

      });

      document
      .querySelectorAll('.nav-btn')
      .forEach(btn=>{

        btn.classList.remove('active');

      });

      document
      .getElementById(pageId)
      .classList.add('active');

      button.classList.add('active');

    }

    homeButton.onclick = ()=>{

      activatePage(
        'homePage',
        homeButton
      );

    };

    /* =========================
       SAVE
    ========================= */

    function savePages(){

      localStorage.setItem(
        'customPages',
        JSON.stringify(customPages)
      );

    }

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
      try {
        return new URL(url).hostname;
      }
      catch {
        return '';
      }
    }

    function getPlaceholderIcon(domain){
      const letter = (domain || 'W')[0]?.toUpperCase();
      const svg = `
        <svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#1f1f1f"/>
          <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#ff4b4b" font-family="Inter,system-ui,sans-serif" font-size="48">${letter}</text>
        </svg>`;
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }

    function handleLinkIconError(img){
      const domain = img.dataset.domain || '';
      const fallback = img.dataset.fallback;
      const pageIndex = Number(img.dataset.page);
      const boardIndex = Number(img.dataset.board);
      const linkIndex = Number(img.dataset.link);

      function persistImage(url){
        if(
          Number.isFinite(pageIndex) &&
          Number.isFinite(boardIndex) &&
          Number.isFinite(linkIndex) &&
          customPages[pageIndex] &&
          customPages[pageIndex].boards?.[boardIndex] &&
          customPages[pageIndex].boards[boardIndex].links?.[linkIndex]
        ){
          customPages[pageIndex].boards[boardIndex].links[linkIndex].image = url;
          savePages();
        }
      }

      if(!fallback){
        img.dataset.fallback = 'google';
        const url = getFaviconGoogleUrl(domain);
        img.src = url;
        persistImage(url);
        return;
      }

      if(fallback === 'google'){
        img.dataset.fallback = 'duck';
        const url = getFaviconFallbackUrl(domain);
        img.src = url;
        persistImage(url);
        return;
      }

      if(fallback === 'duck'){
        img.dataset.fallback = 'direct';
        const url = getFaviconDirectUrl(domain);
        img.src = url;
        persistImage(url);
        return;
      }

      if(fallback === 'direct'){
        img.dataset.fallback = 'directWWW';
        const url = getFaviconWWWDirectUrl(domain);
        img.src = url;
        persistImage(url);
        return;
      }

      if(fallback === 'directWWW'){
        img.dataset.fallback = 'placeholder';
        const url = getPlaceholderIcon(domain);
        img.src = url;
        persistImage(url);
        return;
      }

      img.onerror = null;
    }

    /* =========================
       RENDER BOARDS
    ========================= */

    function renderBoards(pageIndex){

      const container =
      document.getElementById(
        `boardsContainer${pageIndex}`
      );

      if(!container) return;

      container.innerHTML = '';

      customPages[pageIndex]
      .boards
      ?.forEach((board,boardIndex)=>{

        const boardDiv =
        document.createElement('div');

        boardDiv.className =
        'board-box';

        boardDiv.innerHTML = `

          <button
          class="board-delete"
          onclick="deleteBoard(${pageIndex},${boardIndex})">

            ✕
          </button>

          <div class="board-header">

            <div class="board-actions">
              <h2>${board.name}</h2>
              <button
                class="edit-btn board-edit"
                onclick="event.stopPropagation();
                openEditBoard(${pageIndex},${boardIndex})">
                ✎
              </button>
            </div>

            <button
            class="add-link-btn"
            onclick="addLink(${pageIndex},${boardIndex})">

              + Add Link

            </button>

          </div>

          <div
          class="link-grid"
          id="linkGrid${pageIndex}_${boardIndex}">
          </div>

        `;

        container.appendChild(boardDiv);

        const grid =
        boardDiv.querySelector(
          `#linkGrid${pageIndex}_${boardIndex}`
        );

        board.links.forEach((link,linkIndex)=>{

          const card =
          document.createElement('a');

          card.className =
          'link-card';

          card.href =
          link.url;

          card.target =
          '_blank';

          card.innerHTML = `

            <button
            class="delete-link"
            onclick="event.preventDefault();
            deleteLink(${pageIndex},
            ${boardIndex},
            ${linkIndex})">

              ✕
            </button>

            <button
            class="edit-btn link-edit"
            onclick="event.preventDefault(); event.stopPropagation();
            openEditLink(${pageIndex},${boardIndex},${linkIndex})">
              ✎
            </button>

            <h3>${link.name}</h3>

          `;

     // ICON SYSTEM
        const img = document.createElement('img');

        img.alt = `${link.name} icon`;

        const domain = getDomainFromUrl(link.url);

        const faviconSources = [

          link.image,

          `https://www.google.com/s2/favicons?sz=128&domain=${domain}`,

          `https://icons.duckduckgo.com/ip3/${domain}.ico`,

          `https://${domain}/favicon.ico`,

          `https://www.${domain}/favicon.ico`

        ].filter(Boolean);

        let currentIndex = 0;

        function loadNextIcon(){

          if(currentIndex >= faviconSources.length){

            img.src = getPlaceholderIcon(domain);
            return;

          }

          img.src = faviconSources[currentIndex];

          currentIndex++;

        }

        img.onerror = ()=>{

          loadNextIcon();

        };

        img.onload = ()=>{

          customPages[pageIndex]
          .boards[boardIndex]
          .links[linkIndex]
          .image = img.src;

          savePages();

        };

        loadNextIcon();

        card.insertBefore(
          img,
          card.querySelector('h3')
        );

        grid.appendChild(card);

      });

      });

    }

    /* =========================
       RENDER PAGES
    ========================= */

    function renderPages(){

      document
      .querySelectorAll('.dynamic-btn')
      .forEach(btn=>btn.remove());

      document
      .querySelectorAll('.dynamic-page')
      .forEach(page=>page.remove());

      customPages.forEach((page,index)=>{

        const btn =
        document.createElement('div');

        btn.className =
        'nav-btn dynamic-btn';

        btn.innerHTML = `

          <div class="page-item-actions">
            <span>${page.name}</span>
            <button
              class="edit-btn page-edit"
              onclick="event.stopPropagation();
              openEditPage(${index})">
              ✎
            </button>
            <button
            class="page-delete"
            onclick="event.stopPropagation();
            deletePage(${index})">

              ✕
            </button>
          </div>

        `;

        navButtons.insertBefore(
          btn,
          document.getElementById('addPageBtn')
        );

        const pageDiv =
        document.createElement('div');

        pageDiv.className =
        'page dynamic-page';

        pageDiv.id =
        `dynamicPage${index}`;

        pageDiv.innerHTML = `

          <div class="boards-wrapper">

            <div class="page-header">

              <div class="board-actions">
                <h1>${page.name}</h1>
                <button
                  class="edit-btn board-edit"
                  onclick="openEditPage(${index})">
                  ✎
                </button>
              </div>

              <button
              class="add-link-btn"
              onclick="addBoard(${index})">

                + Add Board

              </button>

            </div>

            <div
            class="boards-container"
            id="boardsContainer${index}">
            </div>

          </div>

        `;

        mainContent.appendChild(pageDiv);

        btn.onclick = ()=>{

          activatePage(
            `dynamicPage${index}`,
            btn
          );

        };

        renderBoards(index);

      });

      navArea.scrollLeft =
      navArea.scrollWidth;

    }

    /* =========================
       ADD PAGE
    ========================= */

    const pageModal =
    document.getElementById('pageModal');

    const newPageNameInput =
    document.getElementById('newPageName');

    const modalError =
    document.getElementById('modalError');

    const createPageBtn =
    document.getElementById('createPageBtn');

    const cancelPageBtn =
    document.getElementById('cancelPageBtn');

    const boardModal =
    document.getElementById('boardModal');

    const newBoardNameInput =
    document.getElementById('newBoardName');

    const boardModalError =
    document.getElementById('boardModalError');

    const createBoardBtn =
    document.getElementById('createBoardBtn');

    const cancelBoardBtn =
    document.getElementById('cancelBoardBtn');

    const linkModal =
    document.getElementById('linkModal');

    const newLinkNameInput =
    document.getElementById('newLinkName');

    const newLinkURLInput =
    document.getElementById('newLinkURL');

    const linkModalError =
    document.getElementById('linkModalError');

    const createLinkBtn =
    document.getElementById('createLinkBtn');

    const cancelLinkBtn =
    document.getElementById('cancelLinkBtn');

    const confirmModal =
    document.getElementById('confirmModal');

    const confirmTitle =
    document.getElementById('confirmTitle');

    const confirmMessage =
    document.getElementById('confirmMessage');

    const confirmBtn =
    document.getElementById('confirmBtn');

    const cancelConfirmBtn =
    document.getElementById('cancelConfirmBtn');

    const editModal =
    document.getElementById('editModal');

    const editTitle =
    document.getElementById('editTitle');

    const editNameInput =
    document.getElementById('editName');

    const editURLInput =
    document.getElementById('editURL');

    const editImageInput =
    document.getElementById('editImage');
    
    const iconUploadInput =
    document.getElementById(
      'iconUploadInput'
    );

    const uploadIconBtn =
    document.getElementById(
      'uploadIconBtn'
    );

    const editModalError =
    document.getElementById('editModalError');

    const saveEditBtn =
    document.getElementById('saveEditBtn');

    const cancelEditBtn =
    document.getElementById('cancelEditBtn');

    let activeBoardPageIndex = null;
    let activeBoardIndex = null;
    let activeLinkIndex = null;
    let editMode = null;
    let confirmAction = null;

    function openPageModal(){
      newPageNameInput.value = '';
      modalError.style.display = 'none';
      pageModal.classList.add('active');
      setTimeout(()=> newPageNameInput.focus(), 100);
    }

    function closePageModal(){
      pageModal.classList.remove('active');
    }

    function createPage(){
      const pageName =
      newPageNameInput.value.trim();

      if(!pageName){
        modalError.style.display = 'block';
        return;
      }

      customPages.push({
        name:pageName,
        boards:[]
      });

      savePages();
      renderPages();
      activatePage(
        `dynamicPage${customPages.length - 1}`,
        document.querySelectorAll('.dynamic-btn')[customPages.length - 1]
      );

      closePageModal();
    }

    function openBoardModal(pageIndex){
      activeBoardPageIndex = pageIndex;
      newBoardNameInput.value = '';
      boardModalError.style.display = 'none';
      boardModal.classList.add('active');
      setTimeout(()=> newBoardNameInput.focus(), 100);
    }

    function closeBoardModal(){
      boardModal.classList.remove('active');
      activeBoardPageIndex = null;
    }

    function createBoard(){
      const boardName =
      newBoardNameInput.value.trim();

      if(!boardName){
        boardModalError.style.display = 'block';
        return;
      }

      if(activeBoardPageIndex === null) return;

      customPages[activeBoardPageIndex]
      .boards.push({
        name:boardName,
        links:[]
      });

      savePages();
      renderPages();
      activatePage(
        `dynamicPage${activeBoardPageIndex}`,
        document.querySelectorAll('.dynamic-btn')[activeBoardPageIndex]
      );

      closeBoardModal();
    }

    function openLinkModal(pageIndex, boardIndex){
      activeBoardPageIndex = pageIndex;
      activeBoardIndex = boardIndex;
      newLinkNameInput.value = '';
      newLinkURLInput.value = '';
      linkModalError.style.display = 'none';
      linkModal.classList.add('active');
      setTimeout(()=> newLinkNameInput.focus(), 100);
    }

    function closeLinkModal(){
      linkModal.classList.remove('active');
      activeBoardPageIndex = null;
      activeBoardIndex = null;
    }

    function openEditModal(mode){
      editMode = mode;
      editModalError.style.display = 'none';
      editURLInput.style.display = 'none';
      if(editImageInput){
      editImageInput.style.display = 'none';
        }
      editModal.classList.add('active');
      if(mode === 'link'){
        editURLInput.style.display = 'block';
      if(editImageInput){
        editImageInput.style.display = 'block';
        }
     }
      setTimeout(()=> editNameInput.focus(), 100);
    }

    function closeEditModal(){
      editModal.classList.remove('active');
      editMode = null;
      activeBoardPageIndex = null;
      activeBoardIndex = null;
      activeLinkIndex = null;
    }

    function saveEdit(){
      const name = editNameInput.value.trim();
      let url = editURLInput.value.trim();

      if(!name){
        editModalError.textContent = 'Please enter a valid name.';
        editModalError.style.display = 'block';
        return;
      }

      if(editMode === 'page'){
        customPages[activeBoardPageIndex].name = name;
      }
      else if(editMode === 'board'){
        customPages[activeBoardPageIndex]
        .boards[activeBoardIndex].name = name;
      }
      else if(editMode === 'link'){
        if(!url){
          editModalError.textContent = 'Please enter a valid URL.';
          editModalError.style.display = 'block';
          return;
        }

        if(
          !url.startsWith('http://') &&
          !url.startsWith('https://')
        ){
          url = 'https://' + url;
        }

        const domain = new URL(url).hostname;
        let image = '';
        const manualImage = editImageInput?.value.trim();
        if(manualImage){
          image = manualImage;
        } else {
          image =
              `https://icons.duckduckgo.com/ip3/${domain}.ico`;
        }
        const linkItem =
        customPages[activeBoardPageIndex]
        .boards[activeBoardIndex]
        .links[activeLinkIndex];

        linkItem.name = name;
        linkItem.url = url;
        linkItem.image = image;
      }

      savePages();
      renderPages();
      activatePage(
        `dynamicPage${activeBoardPageIndex}`,
        document.querySelectorAll('.dynamic-btn')[activeBoardPageIndex]
      );

      closeEditModal();
    }

    function openEditPage(pageIndex){
      activeBoardPageIndex = pageIndex;
      editTitle.textContent = 'Edit Page';
      editNameInput.value = customPages[pageIndex].name;
      editURLInput.style.display = 'none';
      openEditModal('page');
    }

    function openEditBoard(pageIndex, boardIndex){
      activeBoardPageIndex = pageIndex;
      activeBoardIndex = boardIndex;
      editTitle.textContent = 'Edit Board';
      editNameInput.value = customPages[pageIndex]
        .boards[boardIndex].name;
      editURLInput.style.display = 'none';
      openEditModal('board');
    }

    function openEditLink(pageIndex, boardIndex, linkIndex){
      activeBoardPageIndex = pageIndex;
      activeBoardIndex = boardIndex;
      activeLinkIndex = linkIndex;
      const linkItem =
      customPages[pageIndex]
      .boards[boardIndex]
      .links[linkIndex];

      editTitle.textContent = 'Edit Link';
      editNameInput.value = linkItem.name;
      editURLInput.style.display = 'block';
      editURLInput.value = linkItem.url;
      if(editImageInput){
        editImageInput.style.display = 'block';
        editImageInput.value = linkItem.image || '';
      }
      openEditModal('link');
    }

    function createLink(){
      const name =
      newLinkNameInput.value.trim();

      let url =
      newLinkURLInput.value.trim();

      if(!name || !url){
        linkModalError.style.display = 'block';
        return;
      }

      if(
        !url.startsWith('http://') &&
        !url.startsWith('https://')
      ){
        url = 'https://' + url;
      }

      const domain =
      new URL(url).hostname;

      const image =
      `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

      if(activeBoardPageIndex === null || activeBoardIndex === null) return;

      customPages[activeBoardPageIndex]
      .boards[activeBoardIndex]
      .links.push({
        name,
        url,
        image
      });

      savePages();
      renderPages();
      activatePage(
        `dynamicPage${activeBoardPageIndex}`,
        document.querySelectorAll('.dynamic-btn')[activeBoardPageIndex]
      );

      closeLinkModal();
    }

    function openConfirmModal(title, message, action){
      confirmTitle.textContent = title;
      confirmMessage.textContent = message;
      confirmAction = action;
      confirmModal.classList.add('active');
    }

    function closeConfirmModal(){
      confirmModal.classList.remove('active');
      confirmAction = null;
    }

    document
    .getElementById('addPageBtn')
    .addEventListener('click',openPageModal);

    createPageBtn.addEventListener('click',createPage);
    cancelPageBtn.addEventListener('click',closePageModal);

    createBoardBtn.addEventListener('click',createBoard);
    cancelBoardBtn.addEventListener('click',closeBoardModal);

    createLinkBtn.addEventListener('click',createLink);
    cancelLinkBtn.addEventListener('click',closeLinkModal);

    confirmBtn.addEventListener('click',()=>{
      if(confirmAction){
        confirmAction();
      }
      closeConfirmModal();
    });

    cancelConfirmBtn.addEventListener('click',closeConfirmModal);

    pageModal.addEventListener('click',(event)=>{
      if(event.target === pageModal){
        closePageModal();
      }
    });

    boardModal.addEventListener('click',(event)=>{
      if(event.target === boardModal){
        closeBoardModal();
      }
    });

    linkModal.addEventListener('click',(event)=>{
      if(event.target === linkModal){
        closeLinkModal();
      }
    });

    confirmModal.addEventListener('click',(event)=>{
      if(event.target === confirmModal){
        closeConfirmModal();
      }
    });

    newPageNameInput.addEventListener('keypress',(event)=>{
      if(event.key === 'Enter'){
        createPage();
      }
    });

    newBoardNameInput.addEventListener('keypress',(event)=>{
      if(event.key === 'Enter'){
        createBoard();
      }
    });

    newLinkNameInput.addEventListener('keypress',(event)=>{
      if(event.key === 'Enter'){
        createLink();
      }
    });

    newLinkURLInput.addEventListener('keypress',(event)=>{
      if(event.key === 'Enter'){
        createLink();
      }
    });

    saveEditBtn.addEventListener('click',saveEdit);
    cancelEditBtn.addEventListener('click',closeEditModal);

    editModal.addEventListener('click',(event)=>{
      if(event.target === editModal){
        closeEditModal();
      }
    });

    editNameInput.addEventListener('keypress',(event)=>{
      if(event.key === 'Enter'){
        saveEdit();
      }
    });

    editURLInput.addEventListener('keypress',(event)=>{
      if(event.key === 'Enter'){
        saveEdit();
      }
    });


      uploadIconBtn.onclick = ()=>{

      iconUploadInput.click();

    };

      iconUploadInput.onchange = (e)=>{

      const file = e.target.files[0];

      if(!file) return;

      const reader = new FileReader();

      reader.onload = ()=>{

        editImageInput.value =
        reader.result;

      };

      reader.readAsDataURL(file);

    };

    /* =========================
       DELETE PAGE
    ========================= */

    function deletePage(pageIndex){
      openConfirmModal(
        'Delete Page',
        'Delete this page and all boards inside it?',
        ()=>{
          customPages.splice(pageIndex,1);
          savePages();
          renderPages();
          activatePage(
            'homePage',
            homeButton
          );
        }
      );
    }

    /* =========================
       ADD BOARD
    ========================= */

    function addBoard(pageIndex){
      openBoardModal(pageIndex);
    }

    /* =========================
       DELETE BOARD
    ========================= */

    function deleteBoard(pageIndex,boardIndex){
      openConfirmModal(
        'Delete Board',
        'Delete this board and all its links?',
        ()=>{
          customPages[pageIndex]
          .boards.splice(boardIndex,1);

          savePages();

          renderPages();

          activatePage(
            `dynamicPage${pageIndex}`,
            document.querySelectorAll('.dynamic-btn')[pageIndex]
          );
        }
      );
    }

    /* =========================
        INDEXED DB SYSTEM
      ========================= */

      let bgDatabase;

      const dbRequest =
      indexedDB.open(
        'DashboardBackgroundDB',
        1
      );

      dbRequest.onupgradeneeded = (event)=>{

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

      dbRequest.onsuccess = (event)=>{

        bgDatabase =
        event.target.result;

        loadSavedBackground();

      };

      dbRequest.onerror = ()=>{

        console.error(
          'IndexedDB failed'
        );

      };

      /* SAVE IMAGE */

      function saveBackgroundImage(file){

        return new Promise((resolve,reject)=>{

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

          request.onsuccess = ()=> resolve();

          request.onerror = ()=> reject();

        });

      }

      /* LOAD IMAGE */

      function loadSavedBackground(){

        const savedURL =
        localStorage.getItem(
          'backgroundURL'
        );

        /* URL BACKGROUND */

        if(savedURL){

          bgImage.src =
          savedURL;

          bgImage.classList.add(
            'active'
          );

        }

        /* LOCAL FILE BACKGROUND */

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

        request.onsuccess = ()=>{

          const file =
          request.result;

          if(file){

            const imageURL =
            URL.createObjectURL(file);

            bgImage.src =
            imageURL;

            bgImage.classList.add(
              'active'
            );

          }

        };

      }

          /* =========================
        CUSTOM BACKGROUND SYSTEM
      ========================= */

      const bgImageBtn =
      document.getElementById('bgImageBtn');

      const bgImageInput =
      document.getElementById('bgImageInput');

      const bgImage =
      document.createElement('img');

      bgImage.className =
      'custom-bg-image';

      document.body.prepend(bgImage);

      /* LOAD BACKGROUND */

      const savedBackground =
      sessionStorage.getItem(
        'tempBackground'
      );

      if(savedBackground){

        bgImage.src =
        savedBackground;

        bgImage.classList.add(
          'active'
        );

      }

      /* =========================
        BACKGROUND MODAL SYSTEM
      ========================= */

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

      /* OPEN MODAL */

      bgImageBtn.addEventListener('click',()=>{

        backgroundURL.value = '';

        backgroundModal.classList.add('active');

      });

      /* CLOSE */

      function closeBackgroundModal(){

        backgroundModal.classList.remove(
          'active'
        );

      }

      cancelBackgroundBtn.addEventListener(
        'click',
        closeBackgroundModal
      );

      /* APPLY URL IMAGE */

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

      /* DEVICE UPLOAD */

      uploadBackgroundBtn.addEventListener(
        'click',
        ()=>{

          bgImageInput.click();

        }
      );

      /* CLOSE ON OUTSIDE CLICK */

      backgroundModal.addEventListener(
        'click',
        (event)=>{

          if(event.target === backgroundModal){

            closeBackgroundModal();

          }

        }
      );

      /* =========================
        ULTRA SAFE 4K BACKGROUND SYSTEM
      ========================= */

      bgImageInput.onchange = async (e)=>{

        const file =
        e.target.files[0];

        if(!file) return;

        try{

          await saveBackgroundImage(
            file
          );

          const imageURL =
          URL.createObjectURL(file);

          bgImage.src =
          imageURL;

          bgImage.classList.add(
            'active'
          );

          localStorage.removeItem(
            'backgroundURL'
          );

          bgImageInput.value = '';

          closeBackgroundModal();

        }

        catch(error){

          console.error(
            'Background upload failed:',
            error
          );

        }

      };
          /* =========================
            ADD LINK
          ========================= */

          function addLink(pageIndex,boardIndex){
            openLinkModal(pageIndex,boardIndex);
          }

          /* =========================
            DELETE LINK
          ========================= */

          function deleteLink(
            pageIndex,
            boardIndex,
            linkIndex
          ){
            openConfirmModal(
              'Delete Link',
              'Delete this link from the board?',
              ()=>{
                customPages[pageIndex]
                .boards[boardIndex]
                .links.splice(linkIndex,1);

                savePages();

                renderPages();

                activatePage(
                  `dynamicPage${pageIndex}`,
                  document.querySelectorAll('.dynamic-btn')[pageIndex]
                );
              }
            );
          }

          /* REMOVE BACKGROUND */

      removeBackgroundBtn.addEventListener(
        'click',
        ()=>{

          bgImage.src = '';

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
      /* LOAD SAVED DATA */

      renderPages();    