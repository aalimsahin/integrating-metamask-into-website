You can create your own ERC20 token in Remix IDE. You must change the contract address after creating it.
This is the code:
    
    pragma solidity 0.5.6;
    contract ERC20Token{
    
        string public name;
        string public symbol;
        uint8 public decimals;
        uint256 public supply;
        
        mapping(address => uint) public balances;
        mapping(address => mapping(address => uint)) public allowed;
        
        event Transfer(address sender, address receiver, uint256 tokens);
        event Approvel(address sender, address delegate, uint256 tokens);
        
        constructor (string memory _name, string memory _symbol, uint8 _decimals, uint256 _supply) public {
            require(_supply <= 1000000000, "Maximum supply can only be a billion tokens");
            name = _name;
            symbol = _symbol;
            decimals = _decimals;
            supply = _supply;
            balances[msg.sender] = _supply;
        }
        
        function totalSupply() external view returns (uint256){
            return supply;
        }
        
        function balanceOf(address tokenOwner) external view returns (uint){
            return balances[tokenOwner];
        }
        
        function transfer(address receiver, uint numTokens) external returns (bool){
            require(msg.sender != receiver, "Sender and receiver can't be the same");
            require(balances[msg.sender] >= numTokens, "Not enough balance");
            balances[msg.sender] -= numTokens;
            balances[receiver] += numTokens;
            emit Transfer(msg.sender, receiver, numTokens);
            return true;
        }
        
        function approve(address delegate, uint numTokens) external returns (bool){
            require(msg.sender != delegate, "Sender and delegate can't be the same");
            allowed[msg.sender][delegate] = numTokens;
            emit Approvel(msg.sender, delegate,numTokens);
            return true;
        }
        
        function allowance(address owner, address delegate) external view returns (uint){
            return allowed[owner][delegate];
        }
        
        function transferFrom(address owner, address buyer, uint numTokens) external returns (bool){
            require(owner != buyer, "Owner and Buyer can't be the same");
            require(balances[owner] >= numTokens, "Not enough balance");
            require(allowed[owner][msg.sender] >= numTokens, "Not enough allowance");
            balances[owner] -=numTokens;
            balances[buyer] +=numTokens;
            allowed[owner][msg.sender] -= numTokens;
            emit Transfer(owner, buyer, numTokens);
            return true;
        }
    }
