import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import '../Auth/Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {//khoi tao state
            username: '',
            password: '',
            isShowPassword: false,
            errMessage:''

        }
    }
    //cap nhat lai gia tri cho state
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        // console.log('username: ', this.state.username , 'password: ', this.state.password)
        // , tuong duong +
        // console.log('allstate', this.state)
        //xoa message loi moi khi thuc hien
        this.setState({
            errMessage:''
        })
        try{
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !==0){
                this.setState({
                    errMessage: data.message
                    
                })
                console.log(data);
            }
            if(data && data.errCode === 0){
                //todo 
                this.props.userLoginSuccess(data.user)
                console.log('login success')
            }
        }catch(e){
            if(e.response){
                if(e.response.data){
                    this.setState({
                        erressage: e.response.data.message
                    })
                }
            }
            console.log(e.response);           
        }
        
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }
    render() {

        return (
            <>
                <div className="custom">
                    <label for="email">Email address:</label>
                    <input type="email" 
                    class="form-control" 
                    placeholder="Enter email" 
                    id="email"
                    value={this.state.username}
                    onChange={(event)=> this.handleOnChangeUsername(event)}
                    />
                    <label for="pwd">Password:</label>
                    <div className="custom-input-password">
                        <input type={this.state.isShowPassword ? 'text' : 'password'} 
                        class="form-control" 
                        placeholder="Enter password" 
                        id="pwd"
                        onChange={(event)=> this.handleOnChangePassword(event)}
                        onKeyDown = {(event) => this.handleKeyDown(event)}
                        />
                        <span onClick={() => {this.handleShowHidePassword()}}>
                            
                            <i class={this.state.isShowPassword ? 'fa fa-eye' : 'far fa-eye-slash'}></i>
                        </span>
                        
                    </div>
                    
                    <div class="form-check">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox"/> Remember me
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary"
                    onClick={()=> {this.handleLogin()}}
                    >Login</button>
                    <div class="mess" style={{color:'red'}} >
                    {this.state.errMessage}
                    </div>
                    
               </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);