const connectMetaMask = async () => {
  let accounts;
  accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      console.log(err.code);
    });
  let header = document.getElementById("header");
  let footer = document.getElementById("footer");
  let img = document.getElementById("img");
  img.src = "images/metamask-green.png";
    footer.innerHTML =
    " Active Account : " + accounts[0];
    footer.style.setProperty("background-color", "#D4EDDA");
    header.style.setProperty("background-color", "#D4EDDA");  
};