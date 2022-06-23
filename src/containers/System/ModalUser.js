
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal,ModalFooter, ModalHeader, ModalBody } from 'reactstrap';
import {emitter} from '../../utils/emitter';
class ModalManage extends Component {

//props <-> properties ; nested
   constructor(props) {
       super(props);
       this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
       }
       this.listenToEmitter();
   }
   listenToEmitter() {
       //hứng event
       emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
           //reset state
           this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
           })
       })
   }
    componentDidMount() {
        
    }
    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChageInput = (event, id) => {
        //bad code( modify state truc tiep )
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state,
        // }, () => {
        //     console.log('check bab state:', this.state)
        // })
        //good code
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState      
        });
    }
// typo : viet sai
    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName','lastName','address'];
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

    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if(isValid === true) {
            // call api create modal
            this.props.createNewUser(this.state);
            console.log('data modal', this.state);
        }
    }
    render() {
        // console.log('check child props', this.props)
        // console.log('check ', this.props.isOpenModalUser)
        return (
            <Modal 
            isOpen={this.props.isOpenModalUser}
            toggle={()=>{this.toggle()}} 
            className={'modal-user-container'}
            size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                    <div className="input-container">
                        <label>Email</label>
                        <input type="email" onChange={(event) => {this.handleOnChageInput(event,"email")}}
                        value={this.state.email}/>
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input type="Password" onChange={(event) => {this.handleOnChageInput(event,"password")}}
                        value={this.state.passwordw}/>
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
                    <Button color="primary" className="px-3" onClick={()=>{this.handleAddNewUser()}}>Save Changes</Button>
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
