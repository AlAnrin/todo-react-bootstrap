import './App.css';
import './custom.scss';
import React from "react";
import ChangeBackground from './Settings/ChangeBackground'

class App extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            isOpenSettings: false
        };

        this.changeBackground = this.changeBackground.bind(this);
    }

    changeSettingsOpen() {
        this.setState(state => ({
            isOpenSettings: !state.isOpenSettings
        }))
    }

    changeBackground(new_url) {
        console.log(new_url);
        const root = document.getElementById('root');
        root.style.backgroundImage = `url(${new_url})`;
        this.changeSettingsOpen();
    }

    render() {
        return (
            <div className="container">
                <div>
                    {
                        this.state.isOpenSettings ?
                            <ChangeBackground changeBackground={this.changeBackground}/>
                            :
                            <button type="button" onClick={() => this.changeSettingsOpen()}
                                    className="btn btn-info mt-3">Change background
                            </button>
                    }
                </div>
            </div>
        );
    }
}

export default App;
