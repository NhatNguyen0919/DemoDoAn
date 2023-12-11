import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OurService.scss';
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl';


class OurService extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentDidMount() {

    }


    render() {

        return (
            <>
                <div className='service-container'>
                    <div className='service-section'>
                        <span>What We do</span>
                        <h3>Our Services</h3>
                    </div>

                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {

        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default (OurService);
