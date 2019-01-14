import React, { Component } from 'react'

import ApplyMenuContainer from './Menu/ApplyMenuContainer';
import ExtensionApplyContainer from './Content/ExtensionApplyContainer'
import GoingoutApplyContainer from './Content/GoingoutApplyContainer'
import MusicApplyContainer from './Content/MusicApplyContainer'
import StayApplyContainer from './Content/StayApplyContainer'

import './ApplyMainContainer.scss'

class ApplyMainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: this.props.location.pathname
        }
    }

    render() {
        const {path} = this.state;
        const type = path.substring(7, path.length);
        const containerType = {
            extension: <ExtensionApplyContainer/>,
            goingout: <GoingoutApplyContainer/>,
            music: <MusicApplyContainer/>,
            stay: <StayApplyContainer/>
        }
        const content = containerType[type];

        return (
            <div style={{ width: window.screen.width}} className="apply--main--wrapper">
                <ApplyMenuContainer/>
                {content}
            </div>
        )
    }
}

export default ApplyMainContainer;