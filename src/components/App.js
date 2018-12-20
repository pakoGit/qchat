import React from "react"
import ChatApi from "./../lib/Chat";

class App extends React.Component {
    componentDidMount() {
        console.log('1');
        ChatApi.connect();
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <input type="button" onClick={(e) => { ChatApi.init(); }} value={"LETS GO!"}/>
            </div>
        )
    }
}

export default App;