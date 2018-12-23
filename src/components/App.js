import React from "react"
import ChatApi from "./../lib/Chat";
import Chlen from "./../lib/Chlen";

let fun;

class App extends React.Component {
    componentDidMount() {
        ChatApi.init();
        fun = new Chlen("canvas");
    }

    render() {
        return (
            <div>
                <div id="canvas" />
                <input type="button" onClick={(e) => { ChatApi.init(); }} value={"Login"}/>
                <input type="button" onClick={(e) => { fun.spawn(); }} value={"Spawn"}/>
            </div>
        )
    }
}

export default App;