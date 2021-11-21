const tokenAddress = "0xcc9f13CdeFa1C1683E5074eD7F443FAeb7Fe710b";
let accounts;
let select = document.getElementById("currency");
let currency = select.value;
let provider;
let tokenContract;
let decimals;
select.onchange = function(){
  currency = select.value;
  var takeBalance = setTimeout(async function(){
    var balanceOfToken = await tokenContract.balanceOf(accounts[0]);
    decimals= await tokenContract.decimals();
    if(currency !== "ETH"){
    let footer = document.getElementById("footer");
    footer.innerHTML =
      "Active Account : "+ accounts[0].slice(0,7)+"..."+ accounts[0].slice(-6) +"<br>"+ "Balance: "+ parseInt(balanceOfToken)/Math.pow(10,0) + " RXT";
  
    }else{
      connectMetaMask()
    }
  },2000)
}

const connectMetaMask = async () => {
  accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      console.log(err);
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
  if(currency === "ETH"){
    footer.innerHTML =
  " Active Account : "+ accounts[0].slice(0,7)+"..."+ accounts[0].slice(-6) +"<br>"+ "Balance: "+Number.parseFloat(balance).toFixed(4) + " ETH";
  }
  footer.style.setProperty("background-color", "#D4EDDA");
  header.style.setProperty("background-color", "#D4EDDA");
  if(window.ethereum){
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  checkTokenBalance()
};

window.ethereum.on('accountsChanged', (account) => {
  accounts = account;
  connectMetaMask();
})

const transferEther= async()=>{
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
    let result = await window.ethereum.request({ method:'eth_sendTransaction',params}).catch(err => console.log(err));
}

const transferToken= async()=>{  
  return new Promise((resolve,reject) => {
    fetch("./RXToken.json")
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  }).then(data =>{    
    let ttokenContract=new ethers.Contract( tokenAddress , data , provider.getSigner() );
    let address= document.getElementById("addressToSend").value;
    let amount= document.getElementById("amount").value;
    let tutar=ethers.utils.parseUnits(amount,1)/(10**(1-decimals));
    const tx=  ttokenContract.transfer(address, tutar);

    ttokenContract.on("Transfer", () => {
      connectMetaMask();
    })
  });
  
}

const choose = function(){
  currency === "ETH" ? transferEther() : transferToken();
}

const checkTokenBalance= async()=>{  
  return new Promise((resolve,reject) => {
    fetch("./RXToken.json")
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  }).then(data =>{    
    tokenContract= new ethers.Contract( tokenAddress , data , provider );
  });
}

