const settingsElements = [
    player1, player2, player3, player4, player5, player6, player7, player8, player9, player10, subtitle1, subtitle2, subtitle3, torrent1, torrent2, torrent3, torrent4, torrent5, torrent6, torrent7, torrent8, torrent9, other1, other2
]
let settings = {}
function restoreDefaults() {
    localStorage.removeItem("settings");
    location.reload()
}
let applyTimeout
function applySettingsTimeout() {
    clearTimeout(applyTimeout)
    applyTimeout = setTimeout(saveSettings, 500)
}
function saveSettings() {
    settingsElements.forEach(element => {
        if (element.type == "checkbox") {
            settings[element.id] = element.checked
        } else {
            settings[element.id] = element.value
        }
    })
    localStorage.setItem("settings", JSON.stringify(settings))
}

function renderSettings() {
    Object.entries(settings).forEach(setting => {
        let settingElement = settingsElements.filter(e => e.id == setting[0])[0]
        if (settingElement.type == "checkbox") {
            settingElement.checked = setting[1]
        } else {
            settingElement.value = setting[1]
        }
    })
}
function registerProtocol() {
    if ('registerProtocolHandler' in navigator) {
        navigator.registerProtocolHandler(
            'magnet',
            `${location.href.replace(location.hash, '')}#&m=%s`,
            'Miru'
        );
    }
}

if (!localStorage.getItem("settings")) {
    saveSettings()
    location.reload()
} else {
    settings = JSON.parse(localStorage.getItem("settings"))
}
renderSettings()
setRes.addEventListener("click", restoreDefaults)
settingsTab.addEventListener("click", applySettingsTimeout)
regProtButton.addEventListener("click", registerProtocol)

let searchParams = new URLSearchParams(location.href)
if (searchParams.get("access_token")) {
    localStorage.setItem("ALtoken", searchParams.get("access_token"))
    window.location = "/app/#settingsTab"
}

torrent5.onclick = e => {
    if (!e.srcElement.checked)
        torrent8.checked = false

}
torrent8.onclick = e => {
    if (e.srcElement.checked)
        torrent5.checked = true
}

document.documentElement.style.setProperty("font-size", settings.other1 + "%")