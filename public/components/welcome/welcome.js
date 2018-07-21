import React, { Component } from "react";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('welcome did mount');
    }

    render() {
        return (
            <div>
                Welcome
            </div>
        );
    }
}

Welcome.propTypes = {
    loginData: PropTypes.object
};

function mapStateToProps(state) {
    return {
        loginData: state.loginData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators();
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);