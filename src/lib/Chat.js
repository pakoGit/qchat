import parser from "./parser";

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
        const message = parser.msg(e.data);
        console.log(message);

        if (!message.prefix) {
            switch (message.command) {
                case "PING":
                    if (sock.readyState !== 2 && sock.readyState !== 3)
                        sock.send("PONG");

                    break;
            }
        }
        else {
            const params = message.params[1];


            if (params) {
                const msg = params.replace(/(\r\n|\n|\r)/gm, "");

                if (msg.search(/Kappa|KappaPride/i) > -1)
                    document.dispatchEvent(new CustomEvent("chat_spawn"));
                else if (params.indexOf("!spawn") > -1)
                    document.dispatchEvent(new CustomEvent("chat_spawn", { detail: msg.split(" ").pop() }));
            }
            //sock.close();
        };

        sock.onclose = function () {
            console.log('close');
        };
    }

    function join() {
        sock.send(`JOIN midemik`);
    }
}

const Chat = {
    init() {
        const hash = document.location.hash;
        if (hash.length > 1)
            connect(document.location.hash.substring(1).split("&")[0].split("=")[1])
        else
            auth();
        //connect();
    },
    connect() {
        connect(document.location.hash.substring(1).split("&")[0].split("=")[1]);
    }
}

export default Chat;