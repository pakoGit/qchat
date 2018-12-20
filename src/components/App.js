import React from "react"
import ChatApi from "./../lib/Chat";
import Chlen from "./../lib/Chlen";

class App extends React.Component {
    componentDidMount() {
        console.log('1');
        //ChatApi.connect();
        const fun = new Chlen("canvas");
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <input type="button" onClick={(e) => { ChatApi.init(); }} value={"LETS GO!"}/>
                <div id="canvas" />
            </div>
        )
    }
}

export default App;