var dynamicFilesAdded = '';
async function loadCSS(url) {
    if (dynamicFilesAdded.indexOf(url) !== -1)
        return;

    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.href = url;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.appendChild(style);

    dynamicFilesAdded += ' ' + url;
}

async function loadModal() {
	var html1 = "<div id='modal-v1'><div id='modal-head-v1'> <div id='modal-head-block-f'> <div id='modal-head-title-v1'> Connect wallet </div> <div id='modal-head-desc-v1'> Choose what network and wallet you want to connect below </div> </div> <div id='modal-close-v1'> <svg height='24' viewbox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'> <path clip-rule='evenodd' d= 'M5.31854 5.31952C5.74457 4.89349 6.4353 4.89349 6.86132 5.31952L11.5445 10.0027L16.2276 5.31952C16.6537 4.89349 17.3444 4.89349 17.7704 5.31952C18.1964 5.74555 18.1964 6.43627 17.7704 6.8623L13.0873 11.5455L17.7704 16.2286C18.1964 16.6546 18.1964 17.3454 17.7704 17.7714C17.3444 18.1974 16.6537 18.1974 16.2276 17.7714L11.5445 13.0882L6.86132 17.7714C6.4353 18.1974 5.74457 18.1974 5.31854 17.7714C4.89252 17.3454 4.89252 16.6546 5.31854 16.2286L10.0017 11.5455L5.31854 6.8623C4.89252 6.43627 4.89252 5.74555 5.31854 5.31952Z' fill='#C4C4C4' fill-rule='evenodd'></path></svg> </div> </div> <div id='modal-main-v1'> <div id='modal-main-title-v1'> Choose Network </div> <div id='modal-main-menu-v1'> <div class='menu-el-v1' id='metamask-connect-button'> <div class='modal-icon-v1'><img alt='metamask' src='./axxets/images/metamask.svg'></div> <div class='modal-el-desc-v1'> <span class='modal-el-desc-first-v1'>MetaMask</span> <span class='modal-el-desc-second-v1'>Connect to your MetaMask wallet</span> </div> </div> <div class='menu-el-v1' id='rainbow-connect-button'> <div class='modal-icon-v1'><img alt='metamask' src='./axxets/images/rainbow.svg'></div> <div class='modal-el-desc-v1'> <span class='modal-el-desc-first-v1'>Rainbow Wallet</span> <span class='modal-el-desc-second-v1'>Connect to your Rainbow wallet</span> </div> </div> <div class='menu-el-v1' id='coinbase-connect-button'> <div class='modal-icon-v1'><img alt='metamask' src='./axxets/images/coinbase.svg'></div> <div class='modal-el-desc-v1'> <span class='modal-el-desc-first-v1'>Coinbase</span> <span class='modal-el-desc-second-v1'>Connect to your Coinbase wallet</span> </div> </div> <div class='menu-el-v1' id='trust-wallet-connect-button'> <div class='modal-icon-v1'><img alt='metamask' src='./axxets/images/trust-wallet.svg'></div> <div class='modal-el-desc-v1'> <span class='modal-el-desc-first-v1'>Trust Wallet</span> <span class='modal-el-desc-second-v1'>Connect to your Trust wallet</span> </div> </div> </div> </div> <div id='modal-bottom-v1'> <button id='wallet-connect-connect-button'> <img alt='metamask' src='./axxets/images/wallet-connect.svg'> Show More Wallets</button> <span id='modal-bottom-span-v1'>Connect by QR-code with WalletConnect</span> </div> </div>"
    
    var element1 = document.createElement('div');
    element1.setAttribute("class", "show");
    element1.setAttribute("style", "display:none");
    element1.setAttribute("id", "connect-modal-v1");
    
    var element2 = document.createElement('div');
    element2.setAttribute("style", "display:none;");
    element2.setAttribute("id", "connect-modal-overlay-v1");
    
    var element3 = document.createElement('div');
    element1.innerHTML = html1;
    $('body').append(element1);
    $('body').append(element2);
	$('#connect-modal-v1').hide();
	$('#connect-modal-overlay-v1').hide();
 
   
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            $('html').attr('data-theme','dark')
        }else{
            $('html').attr('data-theme','light')

        }
}

const close_Modal = () => {
	$('#connect-modal-v1').hide();
	$('#connect-modal-overlay-v1').hide();  
}
const openModal = async () => {
	await loadCSS('./axxets/styles/modal.css');
	$('#connect-modal-v1').show();
 	$('#connect-modal-v1').hide();
	$('#connect-modal-v1').show();
	$('#connect-modal-overlay-v1').show();  
	$("#modal-close-v1").on('click', () => {
		close_Modal();
	})
}

 
loadModal();

$("#wallet-connect-connect-button").addClass("interact-button");
$("#wallet-connect-connect-button").on("click", () => {
	close_Modal();
})

function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}


if(window.ethereum){
	$("#metamask-connect-button").addClass('interact-button');
	$("#trust-wallet-connect-button").addClass('interact-button');
	$("#coinbase-connect-button").addClass('interact-button');
	$("#rainbow-connect-button").addClass('interact-button');

}else{
	$("#rainbow-connect-button").on("click", () => {
		window.location.href = `https://rnbwapp.com/wc?uri=https%3A%2F%2F${window.location.hostname}${window.location.pathname}`;
	});
	$("#metamask-connect-button").on("click", () => {
		window.location.href = `https://metamask.app.link/dapp/${window.location.hostname}${window.location.pathname}`;
	});

	if (gup('browser', `${location.href}`) && gup('browser', `${location.href}`) === "trust") {
		$("#trust-wallet-connect-button").addClass('interact-button');
	}else{
		$("#trust-wallet-connect-button").on("click", () => {
			window.location.href = `https://link.trustwallet.com/open_url?url=https%3A%2F%2F${window.location.hostname}${window.location.pathname}?browser=trust`;
		});
	}
	
	$("#coinbase-connect-button").on("click", () => {
		window.location.href = `https://go.cb-w.com/dapp?cb_url=https%3A%2F%2F${window.location.hostname}${window.location.pathname}`;
	});
}
$('.interact-button-v1').each(function() {
	$(this).click(function() {
		openModal();
		close_Modal();
		openModal();


	});
});



$('.menu-el-v1').each(function() {
	$(this).click(function() {
		close_Modal();
	});
});

