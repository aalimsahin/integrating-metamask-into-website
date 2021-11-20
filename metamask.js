let accounts;

const connectMetaMask = async () => {


  accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      console.log(err.code);
    });

  let balance = await window.ethereum.request({
    method: "eth_getBalance",
    params: [accounts[0]]
  }).catch((err) => {
    console.log(err);
  })
  balance = parseInt(balance);
  balance = balance/Math.pow(10,18);

  let header = document.getElementById("header");
  let footer = document.getElementById("footer");
  let img = document.getElementById("img");
  img.src = "images/metamask-green.png";
  footer.innerHTML =
  " Active Account : "+ accounts[0].slice(0,7)+"..."+ accounts[0].slice(-6) +"<br>"+ "Balance: "+Number.parseFloat(balance).toFixed(4) + " ETH";
  footer.style.setProperty("background-color", "#D4EDDA");
  header.style.setProperty("background-color", "#D4EDDA");
};

window.ethereum.on('accountsChanged', (account) => {
  accounts = account;
  connectMetaMask();  
})

const sendEther= async()=>{
  let address= document.getElementById("addressToSend").value;
  let amount= document.getElementById("amount").value;
  let tutar= Number(amount)*1000000000000000000;
  let params=[
    {
      from:accounts[0],
      to:address,
      gas: '0x76c0',
      gasPrice: Number(2111800000).toString(16),
      value:Number(tutar).toString(16)

    }
  ]
  let result = await window.ethereum.request({ method:'eth_sendTransaction',params}).catch((err)=>{
    console.log(err);
  }); 

}