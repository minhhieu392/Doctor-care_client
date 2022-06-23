import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal,ModalFooter, ModalHeader, ModalBody } from 'reactstrap';
import {emitter} from '../../utils/emitter';
import _ from 'lodash'; //ham su li mang, object
class ModalManage extends Component {

//props <-> properties ; nested
   constructor(props) {
       super(props);
       this.state = {
            id: this.props.lastData.id,
            email: this.props.lastData.email,
            password:'',
            firstName: this.props.lastData.firstName,
            lastName: this.props.lastData.lastName,
            address: this.props.lastData.address,
       }
   }

    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParentEdit();
    }

    handleOnChageInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState      
        });
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = [ 'firstName','lastName','address'];
        for(let i = 0; i < arrInput.length; i++) {
            console.log('check loop',this.state[arrInput[i]], arrInput[i]);
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter:' +arrInput[i]);
                break;
            }           
        }
        return isValid;
    }

    handleUpdateUser = () => {
        let isValid = this.checkValideInput();
        if(isValid === true) {
            this.props.EditUser(this.state);
        }
    }
    render() {

        return (
            <Modal 
            isOpen={this.props.isOpenModalUserEdit}
            toggle={()=>{this.toggle()}} 
            className={'modal-user-container'}
            size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Edit User</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                    <div className="input-container">
                        <label>Email</label>
                        <input type="email" 
                        value={this.state.email}
                        />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input type="Password"
                        value={this.state.password} 
                        />
                    </div>
                    <div className="input-container">
                        <label>First Name</label>
                        <input type="text" onChange={(event) => {this.handleOnChageInput(event,"firstName")}}
                        value={this.state.firstName}/>
                    </div>
                    <div className="input-container">
                        <label>Last Name</label>
                        <input type="text" onChange={(event) => {this.handleOnChageInput(event,"lastName")}}
                        value={this.state.lastName}/>
                    </div>
                    <div className="input-container max-width-input">
                        <label>Address</label>
                        <input type="text" onChange={(event) => {this.handleOnChageInput(event,"address")}}
                        value={this.state.address}/>
                    </div>
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={()=>{this.handleUpdateUser()}}>Save Changes</Button>
                    <Button color="secondary" className="px-3"onClick={()=>{this.toggle()}}>cancel</Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalManage);
