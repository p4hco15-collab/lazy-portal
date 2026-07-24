// CLOUD-INDEPENDENT STATUS.JS
// This script relies entirely on MikroTik local variables. No JuanFi cloud needed.

function MainContent() {
    const container = addElement('div');
    const innerDiv = addElement('div');
    container.id = 'Step1';
    
    // Build the UI exactly like the original
    container.innerHTML = `
        <h1 id="Voucher_Timeleft"><div class="loader"></div></h1>
        <table class="mt-10" style="text-align:left">
            <tr id="Voucher_Details">
                <td>Voucher</td>
                <td>${CurrVoucher}</td>
            </tr>
            <tr>
                <td>Exp</td>
                <td id="Voucher_Expiration"><div class="loader"></div></td>
            </tr>
        </table>
        <div class="mt-20" style="display:grid; gap:12px">
            <button id="insert_coin" type="button" class="btn primary" onclick="HealthCheck();" data-save-type="extend">Add time</button>
            <button id="gcash_button" type="button" class="btn secondary" onclick="ModalContent('gcash');">Buy code via <img class="ewallet-btn-img" src="assets/img/gcash.png" alt="gcash" /></button>
            <button id="Pause_Button" type="button" class="btn secondary" onclick="PauseButtonAction();">Pause time</button>
        </div>
    `;
    
    container.appendChild(innerDiv);
    QS('#root').appendChild(container);
    
    // Hide voucher details if configured
    HideClass('#Voucher_Details');
    
    // Hide Pause Button if configured in config.js
    if (typeof hide_pause_button !== 'undefined' && hide_pause_button) {
        QS('#Pause_Button').style.display = 'none';
    }
    
    // Check noPausePrefix (e.g., TR, PR, MR)
    if (typeof noPausePrefix !== 'undefined') {
        for (x = 0; x < noPausePrefix.length; x++) {
            if (CurrVoucher.substring(0, 2) == noPausePrefix[x]) {
                QS('#Pause_Button').style.display = 'none';
            }
        }
    }

    // Check noExtendPrefix
    if (typeof noExtendPrefix !== 'undefined') {
        for (y = 0; y < noExtendPrefix.length; y++) {
            if (CurrVoucher.substring(0, 2) == noExtendPrefix[y]) {
                QS('#insert_coin').style.display = 'none';
            }
        }
    }

    // Hide GCash if configured
    if (typeof hide_gcash_button !== 'undefined' && hide_gcash_button) {
        QS('#gcash_button').style.display = 'none';
    }
    
    // Hide Insert Coin if configured
    if (typeof hide_insertcoin_button !== 'undefined' && hide_insertcoin_button) {
        QS('#insert_coin').style.display = 'none';
    }

    // Remove used voucher from local vault storage so it doesn't clutter
    var storedVouchers = JSON.parse(getStorageValue('aVoucherList') || '[]');
    if (storedVouchers != null && storedVouchers.length > 0) {
        for (var i = 0; i < storedVouchers.length; i++) {
            if (storedVouchers[i].split('#')[0] == CurrVoucher) {
                VaultDelete('aVoucherList', storedVouchers[i]);
            }
        }
    }

    // START THE LOCAL TIMER (No cloud needed)
    QS('#Voucher_Timeleft').innerText = TimeConvert(SessionTimeLeftSecs);
    
    var timerInterval = setInterval(function() {
        if (SessionTimeLeftSecs >= 0 && SessionUptimeSecs >= 0) {
            SessionTimeLeftSecs--;
            QS('#Voucher_Timeleft').innerText = TimeConvert(SessionTimeLeftSecs);
        } else if (SessionTimeLeftSecs <= 0 && SessionUptimeSecs >= 0) {
            QS('#Voucher_Timeleft').innerText = '0h 0m 0s';
            QS('#insert_coin').style.display = 'none';
        } else {
            clearInterval(timerInterval);
            removeStorageValue('aVoucher');
            new Toast('Session ended', ToastType.Warning, 5000);
            setTimeout(() => { location.reload(); }, 5000);
        }

        // Optional: Telegram alert when 10 seconds left (if enable_coin_drop is true)
        if (typeof enable_coin_drop !== 'undefined' && enable_coin_drop && SessionTimeLeftSecs == 10) {
            TelegramNotification('Coin Drop', VendoLocation, '0', CurrVoucher, '00:00:00');
        }
    }, 1000);

    // Get Expiration Date (Reads from local MikroTik /hotspot/data/ folder)
    GetExpirationData(0);
}

// Function to fetch Expiration date locally
function GetExpirationData(retryCount) {
    var timestamp = new Date().getTime();
    var fileUrl = 'data/' + CurrVoucher + '.txt?query=' + timestamp;
    var method = 'GET';

    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = this.responseText;
            QS('#Voucher_Expiration').innerText = data.split('#')[1];
        }
        if (this.readyState == 4 && this.status == 404) {
            QS('#Voucher_Expiration').innerHTML = '<span style="color:red">No Expiry</span>';
        }
        // If it's a trial voucher, just show Unli
        if (CurrVoucher.split('-')[0] == 'T') {
            QS('#Voucher_Expiration').innerHTML = 'Unli';
        }
    };
    xhr.onerror = function() {
        // If it fails to read the file, just fail silently instead of breaking the page
        if (retryCount < 3) {
            GetExpirationData(retryCount + 1);
        } else {
            QS('#Voucher_Expiration').innerText = 'N/A';
        }
    };
    xhr.open(method, fileUrl, true);
    xhr.send();
}

// LOCAL PAUSE FUNCTION (No cloud needed, just logs out via MikroTik local IP)
function PauseButtonAction() {
    var timeLeft = QS('#Voucher_Timeleft').innerText;
    var expDate = QS('#Voucher_Expiration').innerText;
    
    // Save pause state to phone's browser storage
    setStorageValue('aVoucher', CurrVoucher + '#' + timeLeft + '#' + expDate);
    setStorageValue('isPaused', '1');

    // If pause_limit is 0, it means unlimited pauses
    if (typeof pause_limit === 'undefined' || pause_limit === 0) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() { location.reload(); };
        // This hits the MikroTik router directly to log the user out
        xhr.open('GET', LinkLogout + '?erase-cookie=on', true);
        xhr.send();
    } else {
        // Handle pause limits
        var currentPauses = getStorageValue('pauseCount') ? parseInt(getStorageValue('pauseCount')) : 0;
        var remainingPauses = pause_limit - currentPauses - 1;
        
        if (remainingPauses < 0) {
            QS('#Pause_Button').style.display = 'none';
            new Toast('Pause limit reached', ToastType.Warning, 5000);
        } else {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                setTimeout(function() {
                    window.location.href = LinkLogin;
                }, 1000);
                
                // Increment pause count
                if (getStorageValue('pauseCount') == null) {
                    setStorageValue('pauseCount', 1);
                } else {
                    let newCount = parseInt(getStorageValue('pauseCount')) + 1;
                    setStorageValue('pauseCount', newCount);
                }
            };
            xhr.open('GET', LinkLogout, true);
            xhr.send();
        }
    }
}

// Initialize the page immediately. No loading screen, no cloud check.
window.addEventListener('DOMContentLoaded', () => {
    MainContent();
});