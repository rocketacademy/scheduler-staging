const download = (data, filename) => {
  // from: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", filename);
  dlAnchorElem.click();
};

export default download;
