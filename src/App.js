import './App.css';
import './custom.scss';
import React from "react";
import ChangeSettings from './Settings/ChangeSettings'

class App extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            isOpenSettings: false
        };

        this.changeBackground = this.changeBackground.bind(this);
    }

    setNewSettingsPanelPosition() {
        this.setState(state => ({
            isOpenSettings: !state.isOpenSettings
        }), () => {
            if (this.state.isOpenSettings) {
                const settingsPanel = document.getElementById('settings');
                settingsPanel.style.animation = 'open-settings-panel 2s';
            }
        })
    }

    changeSettingsOpen() {
        if (this.state.isOpenSettings) {
            const settingsPanel = document.getElementById('settings');
            settingsPanel.style.animation = 'close-settings-panel 2s';
            setTimeout(() => this.setNewSettingsPanelPosition(), 2000);
        }
        else this.setNewSettingsPanelPosition();
    }

    changeBackground(new_url) {
        console.log(new_url);
        const root = document.getElementById('root');
        root.style.backgroundImage = `url(${new_url})`;
        this.changeSettingsOpen();
    }

    render() {
        return (
            <div className="container-xl">
                <>
                    {
                        this.state.isOpenSettings ?
                            <div id="settings" className="settings-panel position-absolute">
                                <ChangeSettings
                                    changeBackground={this.changeBackground}
                                    changeSettingsOpen={() => this.changeSettingsOpen()}/>
                            </div>
                            :
                            <div className="row">
                                <div className="spacer"/>
                                <button type="button" onClick={() => this.changeSettingsOpen()}
                                        className="btn btn-outline-primary m-2">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-toggles">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-toggles"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z"/>
                                        </svg>
                                    </svg>
                                </button>
                            </div>
                    }
                </>
            </div>
        );
    }
}

export default App;
