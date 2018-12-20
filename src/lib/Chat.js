
const options = {
    clientId: "lu4j0mnwfq5396d49exie7m0gvkvfk",
    redirect_uri: "http://localhost:8080",
    scope: "chat:read+chat:edit"
}

function auth() {
    window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${options.clientId}&redirect_uri=${options.redirect_uri}&response_type=token&scope=${options.scope}`;

    return;
    fetch(
        `https://id.twitch.tv/oauth2/authorize?client_id=${options.clientId}&redirect_uri=${options.redirect_uri}&response_type=token&scope=${options.scope}`,
        { method: 'GET', mode: 'no-cors' })
        //mode: 'no-cors', credentials: 'include', headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/html' } })
        .then((resp) => resp)
        .then((json) => {
            console.log(json);
            console.log(document.location.hash);
            return json;
        })
        .catch((e) => { console.log(e) })
}

let sock = null;
function connect(oauth) {
    var ws = global.WebSocket || global.MozWebSocket;
    sock = new ws('ws://irc-ws.chat.twitch.tv:80');
    //this.ws = new ws(`${this.secure ? "wss" : "ws"}://${this.server}:${this.port}/`, "irc");

    sock.onerror = console.log;

    sock.onopen = function () {
        console.log('open');
        //dutnibqyatuiixss8ntcvnsq2a9qxx
        ///#access_token=dutnibqyatuiixss8ntcvnsq2a9qxx&scope=viewing_activity_read&token_type=bearer
        sock.send(`PASS oauth:${oauth}`);
        sock.send(`NICK midemik`);
        sock.send(`JOIN #midemik`);
        // sock.send(`CAP REQ :twitch.tv/membership`);
    };

    sock.onmessage = function (e) {
        console.log('message', e.data.split(":").pop());
        //sock.close();
    };

    sock.onclose = function () {
        console.log('close');
    };
}

function join() {
    sock.send(`JOIN midemik`);
}

const Chat = {
    init() {
        auth();
        //connect();
    },
    connect() {
        console.log(document.location.hash);
        connect(document.location.hash.substring(1).split("&")[0].split("=")[1]);
    }
}

export default Chat;