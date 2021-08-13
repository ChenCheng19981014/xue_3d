// importScripts("./app.js");

console.log("run");
onmessage = function (e) {

  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", "./" + e.data, true);

  rawFile.onreadystatechange = function () {

    if (this.readyState === 4) {
      postMessage(JSON.parse(this.responseText));
    }
  };
  rawFile.send(null);
};
