window.addEventListener("load", function(evt) {

  var output = document.getElementById("output");
  var input = document.getElementById("input");
  var ws;

  var print = function(message) {
    var d = document.createElement("div");
    d.innerHTML = message;
    output.appendChild(d);
  };

  document.getElementById("open").onclick = function(evt) {
    if (ws) {
      return false;
    }
    var loc = window.location, new_uri;
    if (loc.protocol === "https:") {
      new_uri = "wss:";
    } else {
      new_uri = "ws:";
    }
    new_uri += "//" + loc.host;
    new_uri += loc.pathname + "ws";
    ws = new WebSocket(new_uri);
    ws.onopen = function(evt) {
      print("OPEN");
    }
    ws.onclose = function(evt) {
      print("CLOSE");
      ws = null;
    }
    ws.onmessage = function(evt) {
      print("RESPONSE: " + evt.data);
    }
    ws.onerror = function(evt) {
      print("ERROR: " + evt.data);
    }
    return false;
  };

  document.getElementById("send").onclick = function(evt) {
    if (!ws) {
      return false;
    }
    print("SEND: " + input.value);
    ws.send(input.value);
    return false;
  };

  document.getElementById("close").onclick = function(evt) {
    if (!ws) {
      return false;
    }
    ws.close();
    return false;
  };
});