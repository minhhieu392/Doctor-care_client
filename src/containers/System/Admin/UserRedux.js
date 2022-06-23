import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES , CRUD_Actions, CommonUtils} from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {
    constructor(props){
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL:'',
            isOpen: false,
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            gender:'',
            position: '',
            role: '',
            avatar:'',

            action:'',
            userEditId:'',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps,prevState, snapshot) {
        //render => disupdate
        //hien tai (this) và quá khứ(previous)
        if(prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender:arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''

            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr:  arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers){
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                phoneNumber:'',
                address:'',
                gender:arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar:'',
                action: CRUD_Actions.CREATE,
                previewImgURL:'',
                
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objecUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objecUrl,
                avatar:base64,
            })
        }
    }

    handleSaveUser = () => {
        let isValid=this.checkVakidateInput();
        if(isValid===false) return;
        let {action} = this.state;
        //tương tự vói let action = this.state.action;
        //fire redux action (create user)

        if (action === CRUD_Actions.CREATE){
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phonenumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
            console.log('create', this.props.createNewUser())
        }
        if(action === CRUD_Actions.EDIT){
            // fire redux edit user
            this.props.editAUserRedux({ 
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phonenumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        } 
    }
    checkVakidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for(let i = 0; i<arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('this input is required:'+ arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    openPreviewImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
           isOpen:true,
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email:user.email,
            password:'HARDCODE',
            firstName:user.firstName,
            lastName:user.lastName,
            phoneNumber:user.phonenumber,
            address:user.address,
            gender:user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar:'',
            previewImgURL:imageBase64,
            action: CRUD_Actions.EDIT,
            userEditId: user.id,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        
        let {email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar} = this.state;


        return (
            <div className="user-redux-container">
                <div className="title">Learn React-Redux</div>
                <div className="user-redux-body" >
                    <div className="user-redux-body">
                        <div className="container">
                            <div className="row">
                                <div className="form-group col-md-3"><FormattedMessage id="manage-user.add"/></div>
                                <div className="col-12">{isGetGenders === true ? 'Loading genders' : ''}</div>
                                <form>
                                    <div class="row">
                                        <div class="form-group col-md-3">
                                            <label for="inputEmail4"><FormattedMessage id="manage-user.email"/></label>
                                            <input type="email" class="form-control" id="inputEmail4" placeholder="Email"
                                            value={email}
                                            onChange={(event) => {this.onChangeInput(event,'email')}}
                                            disabled={this.state.action === CRUD_Actions.EDIT ? true : false}
                                            />
                                        </div>
                                        <div class="form-group col-md-3">
                                            <label for="inputPassword4"><FormattedMessage id="manage-user.password"/></label>
                                            <input type="password" class="form-control" id="inputPassword4" placeholder="Password"
                                            value={password}
                                            onChange={(event) => {this.onChangeInput(event,'password')}}
                                            disabled={this.state.action === CRUD_Actions.EDIT ? true : false}
                                            />
                                        </div>
                                        <div class="form-group col-md-3">
                                            <label for="inputEmail4"><FormattedMessage id="manage-user.first-name"/></label>
                                            <input type="text" class="form-control" id="inputEmail4" placeholder="First Name"
                                            value={firstName}
                                            onChange={(event) => {this.onChangeInput(event,'firstName')}}
                                            />
                                        </div>
                                        <div class="form-group col-md-3">
                                            <label for="inputEmail4"><FormattedMessage id="manage-user.last-name"/></label>
                                            <input type="text" class="form-control" id="inputEmail4" placeholder="LastName"
                                            value={lastName}
                                            onChange={(event) => {this.onChangeInput(event,'lastName')}}
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group col-md-6">
                                            <label for="inputEmail4"><FormattedMessage id="manage-user.phone-number"/></label>
                                            <input type="number" class="form-control" id="inputEmail4" placeholder="Phone number"
                                            value={phoneNumber}
                                            onChange={(event) => {this.onChangeInput(event,'phoneNumber')}}
                                            />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="inputEmail4"><FormattedMessage id="manage-user.address"/></label>
                                            <input type="text" class="form-control" id="inputEmail4" placeholder="Address"
                                            value={address}
                                            onChange={(event) => {this.onChangeInput(event,'address')}}
                                            />
                                        </div>
                                    </div>
                                    <div class="row">                                       
                                        <div class="form-group col-md-3">
                                            <label for="inputState"><FormattedMessage id="manage-user.gender"/></label>
                                            <select id="inputState" class="form-control"
                                            onChange = {(event) => {this.onChangeInput(event,'gender')}}
                                            value = {gender}
                                            >
                                                {genders && genders.length > 0 && 
                                                genders.map((item, index) =>{
                                                    return (
                                                        <option key={index} value={item.keyMap}>
                                                            {language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                                    )
                                                })
                                                }
                                                
                                            </select>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <label for="inputState"><FormattedMessage id="manage-user.position"/></label>
                                            <select id="inputState" class="form-control"
                                            onChange = {(event) => {this.onChangeInput(event,'position')}}
                                            value={position}
                                            >
                                                {positions && positions.length > 0 && 
                                                positions.map((item, index) =>{
                                                    return (
                                                        <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                                    )
                                                })
                                                }
                                            </select>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <label for="inputState"><FormattedMessage id="manage-user.role"/></label>
                                            <select id="inputState" class="form-control"
                                            onChange = {(event) => {this.onChangeInput(event,'role')}}
                                            value={role}
                                            >
                                                {roles && roles.length > 0 && 
                                                roles.map((item, index) =>{
                                                    return (
                                                        <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                                    )
                                                })
                                                }
                                            </select>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <label for="inputZip"><FormattedMessage id="manage-user.image"/></label>
                                            <div className="preview-img-container">
                                                <input type="file" id="previewImg" hidden
                                                onChange={(event) => this.handleOnchangeImage(event)}
                                                />
                                                <label className="label-upload" htmlFor="previewImg">Tải Ảnh <i className="fas fa-upload"></i></label>
                                                <div class="preview-image"
                                                    style={{backgroundImage:`url(${this.state.previewImgURL})`}}
                                                    onClick={()=> this.openPreviewImage()}
                                                ></div>
                                            </div>
                                              
                                        </div>
                                        <div class="form-group col-md-3">
                                            <button type="button" 
                                            className={this.state.action === CRUD_Actions.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                            onClick={() => this.handleSaveUser()}
                                            >{this.state.action === CRUD_Actions.EDIT ?
                                                <FormattedMessage id="manage-user.edit"/>
                                                :
                                                <FormattedMessage id="manage-user.save"/>
                                            }</button>
                                        </div>                     
                                    </div>        
                                </form>            
                            </div>
                            <div className="row">
                                <form>
                                    <div class="form-group col-md-12">
                                        <TableManageUser
                                        handleEditUserFromParentKey={this.handleEditUserFromParent}
                                        action={this.state.action}
                                        />
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>   
                </div>
                {this.state.isOpen == true && 
                <Lightbox
                    mainSrc={this.state.previewImgURL}
                    onCloseRequest = {() => this.setState({isOpen:false})}
                    
                />}
            </div>
        )
    } 
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers:state.admin.users
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.EditAUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
