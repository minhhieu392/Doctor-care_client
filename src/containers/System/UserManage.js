import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService'
import ModalUser from './ModalUser';
import ModalUserDel from './ModalUserDel';
import ModalUserEdit from './ModalUserEdit';
import {emitter} from '../../utils/emitter';
class UserManage extends Component {
    //khoi tao state(bien) dung voi class
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser:false,
            isOpenModalUserDel:false,
            isOpenModalUserEdit: false,
            valueuser:{}
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser:true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    handledelUser = (user) => {
        this.setState({
            isOpenModalUserDel:true,
            valueuser:user
        })
    }
    toggleDeleteUserModal = () => {
        this.setState({
            isOpenModalUserDel: !this.state.isOpenModalUserDel,
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalUserEdit: !this.state.isOpenModalUserEdit,
        })
    }

    handleEditUser = (user) => {
        console.log(user)
        this.setState({
            isOpenModalUserEdit: true,
            valueuser:user
        })
    }

    createNewUser = async(data) => {
        try {
            let response = await createNewUserService(data)
            if(response && response.errCode !==0) {
                alert(response.errMessage)
            }else {
                await this.getAllUsersFromReact();
                //sau khi them xong se tu tat modal
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        }catch (e) {
            console.log(e)
        }
        
        console.log('check data',data)
    }

    EditUser = async(data) => {
        console.log('data',data)
        try{
            let response = await editUserService(data)
            if(response && response.errCode !==0) {
                alert(response.errMessage)
            }else {
                console.log(response)
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUserEdit: false
                })
            }
        }catch(e){
            console.log(e);
        }
    }

    async componentDidMount() {
        /** life cycle (vong doi)
         * run component
         * 1.run constructor -> state
         * 2.did mount (set state) (set gia tri cua cac bien truoc khi render)(goi api lay gia tri va setstate cho component-> state luu lai gia tri cua cac bien)
         * set <-> born , die <-> unmount
         * 3.render
         * 
        */
        
        await this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async() => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0){
            //yeu cau render lai
            this.setState({
                arrUsers: response.user
            })
        }
    }
    handleDeleteUser = async() => {
        let a = this.state.valueuser;
        console.log('delete user', a)
        try{
            let res = await deleteUserService(a.id);
            if(res && res.errCode === 0){
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUserDel: false,})
            }else{
                alert(res.errMessage)
            }
        }catch(e){
            console.log(e)
        }
    }


    render() {
        
        let arrUsers = this.state.arrUsers;
        console.log('render', this.state.arrUsers )
        return (
            <div className="user-container">
                
                <ModalUser 
                    isOpenModalUser={ this.state.isOpenModalUser }
                    toggleFromParent={this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                    
                />
                <ModalUserDel
                    toggleFromParent1={this.toggleDeleteUserModal}
                    isOpenModalUserDel={this.state.isOpenModalUserDel}
                    handleDeleteUser={this.handleDeleteUser}
                />
                {
                    this.state.isOpenModalUserEdit &&
                    <ModalUserEdit
                    toggleFromParentEdit={this.toggleEditUserModal}
                    isOpenModalUserEdit={this.state.isOpenModalUserEdit}
                    EditUser={this.EditUser}
                    lastData = {this.state.valueuser}   
                    />
                }
                
                <div className="title">
                    Manage user with mh
                </div>
                <div className="mx-1">
                    {/* px 1- 5  p(pading) x(truc ox)*/}
                    <button className="btn btn-primary px-3" onClick = {() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className="users-table mt-3 mx-1">
                <table id="customers">
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                                                        
                        {arrUsers && arrUsers.map((item, index) => {
                            console.log('check', item, index)
                            return(
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit"
                                        onClick={() => this.handleEditUser(item)}>
                                        <i class="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className="btn-delete"
                                        onClick={() => this.handledelUser(item)}>
                                        <i class="fa fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        }                       
                                      
                </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
