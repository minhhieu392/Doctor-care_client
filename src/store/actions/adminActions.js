import actionTypes from './actionTypes';
import {getAllCodeService, createNewUserService, getAllUsers,deleteUserService, editUserService, getTopDoctorHomeService, saveDetailDoctorsService, getAllDoctors, getAllSpecialty} from '../../services/userService'
import {toast} from "react-toastify";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }else {
                dispatch(fetchGenderFailed());
            }
        }catch(e){
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
        
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})
//position
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED
})
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }else {
                dispatch(fetchPositionFailed());
            }
        }catch(e){
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', e)
        }
        
    }
}
//role
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }else {
                dispatch(fetchRoleFailed());
            }
        }catch(e){
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e)
        }
        
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("create a new user succeed !");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            }else {
                dispatch(saveUserFailed());
            }
        }catch(e){
            dispatch(saveUserFailed());
            console.log('fetchPositionStart error', e)
        }
        
    }
}
export const saveUserSuccess = () => ({
    type:actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type:actionTypes.CREATE_USER_FAILDED
})
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {              
                dispatch(fetchAllUsersSuccess(res.user))
                console.log('e',res.user);
                toast.success("fetch all user succeed !");
            }else {
                toast.error("fetch all user failed !");
                dispatch(fetchAllUsersFailed());
            }
        }catch(e){
            console.log('e',e);
            toast.error("fetch all failed !",e);
            dispatch(fetchAllUsersFailed());
        }
        
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type:actionTypes.FETCH_ALL_USERS_SUCCESS,
    users:data
})
export const fetchAllUsersFailed = () => ({
    type:actionTypes.FETCH_ALL_USERS_FAILED,
})
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("delete user s !");
                dispatch(deleteUsersSuccess());
                dispatch(fetchAllUsersStart());
            }else {
                toast.error("delete user e !");
                dispatch(deleteUsersFailed());
            }
        }catch(e){
            toast.error("delete user e !");
            dispatch(deleteUsersFailed());
        }
        
    }
}
export const deleteUsersSuccess = () => ({
    type:actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUsersFailed = () => ({
    type:actionTypes.DELETE_USER_FAILED,
})

export const EditAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("edit succeed !");
                dispatch(editUsersSuccess());
                dispatch(fetchAllUsersStart());
            }else {
                dispatch(editUserFailed());
                toast.error("edit failed !");
            }
        }catch(e){
            dispatch(editUserFailed());
            toast.error("edit failed !");
        }  
    }
}

export const editUsersSuccess = () => ({
    type:actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () => ({
    type:actionTypes.EDIT_USER_FAILED,
})

export const fetchTopDoctor = () => {
    return async(dispatch, getState)=> {
        try{
            let res = await getTopDoctorHomeService('');
            if(res && res.errCode === 0) {
                console.log('resdata', res.data);
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                })
                

            }else{
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTORS_FAILDED
                })
            }
        }catch(err){
            console.log('err', err)
            dispatch({
                type:actionTypes.FETCH_TOP_DOCTORS_FAILDED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async(dispatch, getState)=> {
        try{
            let res = await getAllDoctors();
            if(res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            }else{
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        }catch(err){
            console.log('FETCH_ALL_DOCTORS_FAILED', err)
            dispatch({
                type:actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}
export const saveDetailDoctors = (data) => {
    return async(dispatch, getState)=> {
        try{
            let res = await saveDetailDoctorsService(data);
            console.log('save', res)
            if(res && res.errCode === 0) {
                toast.success("save detail user s !");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            }else{
                toast.error("save detail user f1 !");
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTORS_FAILED
                })
            }
        }catch(err){
            toast.err("save detail user f !");
            console.log('SAVE_DETAIL_DOCTORS_FAILED', err)
            dispatch({
                type:actionTypes.SAVE_DETAIL_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0){
                console.log("datatime", res.data)
                dispatch({
                    type:actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED
                })
            }
        }catch(e){
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:', e)
            dispatch({ type:actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED})
        }
    }
}
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        
        try {
            dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0) {
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
                        resSpecialty: resSpecialty.data
                    }
                    dispatch(fetchRequiredDoctorInforSuccess(data))
                    console.log('fail', data)
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
                console.log('fail')
            }

        }catch(e){
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}
 export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
     type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
     data: allRequiredData
 })

 export const fetchRequiredDoctorInforFailed = () => ({
     type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED
 })