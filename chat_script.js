(function (g, e, n, es, ys) {
  g["_genesysJs"] = e;
  g[e] =
    g[e] ||
    function () {
      (g[e].q = g[e].q || []).push(arguments);
    };
  g[e].t = 1 * new Date();
  g[e].c = es;
  ys = document.createElement("script");
  ys.async = 1;
  ys.src = n;
  ys.charset = "utf-8";
  document.head.appendChild(ys);
})(
  window,
  "Genesys",
  "https://apps.mypurecloud.com.au/genesys-bootstrap/genesys.min.js",
  {
    environment: "apse2",
    deploymentId: "{{Genesys chat Deployment ID}}",
  }
);

function toggleMessenger() {
  Genesys(
    "command",
    "Messenger.open",
    {},
    function (o) {
      dataLayer.push({
        event: "messenger_opened",
      });
    }, // if resolved
    function (o) {
      Genesys("command", "Messenger.close");
    } // if rejected
  );
}

Genesys("subscribe", "Launcher.ready", function (o) {
  var button = document.createElement("img");
  button.src =
    "https://www.powershop.co.nz/_resources/themes/base/images/chat-tab.svg?v=1";
  button.id = "chat-tab";
  button.classList.add("chatTab", "open");
  button.addEventListener("click", toggleMessenger);
  document.body.appendChild(button);

  document
    .querySelectorAll("#open-chat, .open-chat")
    .forEach(function (element) {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        toggleMessenger();
      });
    });
});
