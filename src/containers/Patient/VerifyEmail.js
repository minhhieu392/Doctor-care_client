import React, {Component} from "react";
import {connect} from "react-redux";
import { FormattedMessage } from "react-intl";
import { postPatientBookAppointment, postVerifyBookingAppointment } from "../../services/userService";
import HeaderHome from "../HomePage/HeaderHome";
import './VerifyEmail.scss';

class VerifyEmail extends Component{
    constructor(props){
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount(){
        if(this.props.location && this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId
            })

            if(res && res.errCode=== 0){
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){

        }
    }
    
    render() {
        let {statusVerify, errCode} = this.state;
        console.log('check state email', this.state)
        return(
            <>
                <HeaderHome/>
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div>Loading data ...</div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className="infor-booking">Xac nhan lich hen thanh cong</div>  :  
                                <div className="infor-booking">Lich hen khong ton tai</div>    
                            }
                        </div>
                    }
                </div>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);