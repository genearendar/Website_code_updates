function createCollapsibleMenu() {
  //add z-index to the blue menu to prevent overlay
  const secMenu = document.querySelector(".menu-secondary");
  secMenu.setAttribute("style", "z-index:1001");
  const styles = document.createElement("style");
  styles.innerText = `
    .login-menu-container {
        position: absolute;
        right: 0px;
        top: 0rem;
        width: 100vw;
        height: 100vh;
        padding: 1rem;
        background: var(--color-blue-1);
        text-align: left;
        z-index: 10;
    }

    @media (min-width:1025px) {
        .login-menu-container {
          top:2rem; 
          border-radius:20px; 
          width:500px;
        }
    }
    `;
  document.querySelector("head").appendChild(styles);
  //create login menu element
  const loginMenuContainer = document.createElement("div");
  loginMenuContainer.classList.add("login-menu-container");
  loginMenuContainer.setAttribute("style", "display:none;");
  loginMenuContainer.innerHTML = `
          <div class="login-menu-header" style="margin-bottom:0.8rem">
              <p style="color:var(--color-white) font-weight:500">Choose where to login:</p>
          </div>
          <div class="login-menu-content t-light-teal"; style="color:var(--color-blue-1);">
              <div class="login-menu-item" style="display:flex; gap: 1.5em; align-items:center; justify-content:space-between; margin-bottom:0.8rem; background:var(--color-teal-2); border-radius:20px; padding:1rem">
                  <div>
                    <h3 style="font-size:1.5rem">MyMeridian</h3>
                    <p style="font-size:1rem; color:var(--t-blue-1); font-weight:500;">Account information, usage and billing information.</p>
                  </div>
                  <div>
                    <a class="button button--main" href="#">Let's go!</a>
                  </div>
              </div>
              <div class="t-dark-blue login-menu-item" style="display:flex; gap: 1.5em; align-items:center; justify-content:space-between; background:var(--color-blue-2); border-radius:20px; padding:1rem">
                  <p style="margin:0; font-size:1rem; font-weight:500;">Got Four Free? Log in here instead:</p>
                  <a class="button button--secondary">Four Free</a>
              </div>
          </div>
  `;
  // Set desktop toggler element
  const loginToggler = document.querySelector(
    ".menu-secondary__listitem:nth-child(3)"
  );
  loginToggler.innerHTML = `<button id="login-toggle-btn" class="menu-secondary__link">Log in ▼</button>`;
  loginToggler.setAttribute("style", "position:relative");
  // Add the container element to DOM
  // loginToggler.appendChild(loginMenuContainer);

  // Add toggle functionality
  const loginToggleButton = document.getElementById("login-toggle-btn");

  loginToggleButton.addEventListener("click", () => {
    //add the element to dom if not present yet
    !loginToggler.querySelector(".loginMenuContainer") &&
      loginToggler.appendChild(loginMenuContainer);
  });

  // mobile version

  // remove initial login
  const initLoginMobile = document.querySelector(
    ".menu-small__tertiary-list>li:nth-child(3)"
  );
  initLoginMobile.remove();
  // add a new element to the top
  const mobileButtonsBlock = document.querySelector(
    ".menu-small__item:first-child"
  );
  const mobileLoginTrigger = document.createElement("button");
  mobileLoginTrigger.innerText = "Log in";
  mobileLoginTrigger.classList.add("button", "button--secondary");

  mobileButtonsBlock.insertBefore(
    mobileLoginTrigger,
    mobileButtonsBlock.firstChild
  );
  mobileButtonsBlock.setAttribute(
    "style",
    "display:flex; justify-content:space-between"
  );

  // Add the login block to mobile view
  const mobileMenuContainer = document.getElementById("nav-mobile-menu");

  // add toggle event

  mobileLoginTrigger.addEventListener("click", () => {
    !mobileMenuContainer.querySelector(".loginMenuContainer") &&
      mobileMenuContainer.insertBefore(
        loginMenuContainer,
        mobileMenuContainer.firstChild
      );
  });

  document.addEventListener("click", (e) => {
    if (e.target === mobileLoginTrigger || e.target === loginToggleButton) {
      loginMenuContainer.style.display =
        loginMenuContainer.style.display === "block" ? "none" : "block";
      loginToggleButton.textContent =
        loginMenuContainer.style.display === "block" ? "Log in ▲" : " Log in ▼";
    } else if (loginMenuContainer && !loginMenuContainer.contains(e.target)) {
      if (loginMenuContainer.style.display === "block") {
        console.log("Toggling display");
        loginMenuContainer.style.display = "none";
      }
    }
  });
}

// Call the function to create the menu
createCollapsibleMenu();
