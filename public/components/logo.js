import React, {Component} from 'react';


class Logo extends Component {
    constructor(props){
        super(props);
    }

    render(){


        return(

            <div className="container">
                <img className="login-logo" src="../images/thinkopen_logo_big.png" alt="Thinkopen logo" />
            </div>
        );
    }

}

export default Logo;