import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal,ModalFooter, ModalHeader, ModalBody } from 'reactstrap';

class ModalManage extends Component {
    
    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent1();
    }
    handleDeleteUser1 = () => {       
        this.props.handleDeleteUser();
    }
    render() {
        return (
            <Modal 
            isOpen={this.props.isOpenModalUserDel}
            toggle={()=>{this.toggle()}} 
            className={'modal-user-container'}
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Cảnh Báo</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <label>Bạn chắc chắn muốn xoá?</label>
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={()=>{this.handleDeleteUser1()}}>Xoá</Button>
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
  