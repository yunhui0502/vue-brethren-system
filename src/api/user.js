/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import Axios from 'axios';
// let api = 'http://192.168.1.128:7004'
let api = 'http://39.98.126.20:7004'
// 账号密码登录
function adminLogin(params) {
    console.log(params);
    return Axios.get(api + '/user/Login/adminLogin?password=' + params.password + '&userName=' + params.userName);
}
// 手机号登录
function phoneLogin(params) {
    console.log(params);
    return Axios.get(api + '/user/Login/phoneLogin?phone=' + params.phone + '&passwd=' + params.passwd);
}
// 发送验证码
function code(phone) {
    let fd = new FormData();
    console.log(phone);
    fd.append('phone', phone);
    return Axios.post(api + '/user/Login/code', fd);
}
// 创建账号
function addLogin(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('password', params.password);
    fd.append('phone', params.phone);
    fd.append('userName', params.userName);
    return Axios.post(api + '/user/Login/addLogin', fd);
}
// 登录查询
function loginSelect() {
    return Axios.get(api + '/user/Login/loginSelect');
}
// 找回密码
function phonePassword(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('newPasswd', params.newPasswd);
    fd.append('passwd', params.passwd);
    fd.append('phone', params.phone);
    return Axios.post(api + '/user/Login/phonePassword', fd);
}
// 添加标签
function addLabel(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('name', params.name);
    fd.append('type', params.type);
    return Axios.post(api + '/user/Label/addLabel', fd);
}
// 查询标签
function selectLabel(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('type', params.type);
    return Axios.post(api + '/user/Label/selectLabel', fd);
}
// 查询板块
function selectPlate() {
    return Axios.get(api + '/user/Plate/selectPlate');
}
// 添加板块
function addPlate(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('administrativeId', params.administrativeId);
    fd.append('advantage', params.advantage);
    fd.append('averagePrice', params.averagePrice);
    fd.append('developMessage', params.developMessage);
    fd.append('plateAddress', params.plateAddress);
    // fd.append('plateLabelId', params.plateLabelId);
    fd.append('plateName', params.plateName);
    return Axios.post(api + '/user/Plate/addPlate', fd);
}
// 删除板块
function deletedPlate(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('plateId', params.plateId);
    return Axios.post(api + '/user/Plate/deletedPlate', fd);
}
// 修改板块
function updatePlate(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('administrativeId', params.administrativeId);
    fd.append('advantage', params.advantage);
    fd.append('averagePrice', params.averagePrice);
    fd.append('developMessage', params.developMessage);
    fd.append('plateAddress', params.plateAddress);
    fd.append('plateLabelId', params.plateLabelId);
    fd.append('plateName', params.plateName);
    fd.append('plateId', params.plateId);
    return Axios.post(api + '/user/Plate/updatePlate', fd);
}
// 禁用 
function forbid(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('userId', params.userId);
    return Axios.post(api + '/user/Login/forbid', fd);
}
// 添加项目 
function addProject(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('developersName', params.developersName);
    fd.append('projectName', params.projectName);
    return Axios.post(api + '/user/Login/addProject', fd);
}
// 删除项目
function deleteProject(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('projectId', params.projectId);
    return Axios.post(api + '/user/Login/deleteProject', fd);
}
// 修改项目  
function updateProject(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('developersName', params.developersName);
    fd.append('projectId', params.projectId);
    fd.append('projectName', params.projectName);
    return Axios.post(api + '/user/Login/updateProject', fd);
}
// 查询项目信息
function selectProject() {
    return Axios.get(api + '/user/Login/selectProject');
}
// 添加户型
function addType(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('area', params.area);
    fd.append('constitute', params.constitute);
    fd.append('guestWide', params.guestWide);
    fd.append('houseFiles', params.houseFiles);
    fd.append('houseName', params.houseName);
    fd.append('livingWide', params.livingWide);
    fd.append('masterWide', params.masterWide);
    fd.append('premisesId', params.premisesId);
    fd.append('southWide', params.southWide);
    fd.append('supply', params.supply);
    fd.append('transaction', params.transaction);
    return Axios.post(api + '/user/Type/addType', fd);
}
// 删除图片
function deletePicture(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('Files', params.Files);
    return Axios.post(api + '/user/Type/deletePicture', fd);
}
// 删除户型
function deleteType(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('houseId', params.houseId);
    return Axios.post(api + '/user/Type/deleteType', fd);
}
// 查询项目信息
function selectType(params) {
    console.log(params);
    return Axios.get(api + '/user/Type/selectType', { params });
}
// 修改户型
function updateType(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('area', params.area);
    fd.append('houseId', params.houseId);
    // fd.append('constitute', params.constitute);
    fd.append('guestWide', params.guestWide);
    fd.append('houseFiles', params.houseFiles);
    fd.append('houseName', params.houseName);
    fd.append('livingWide', params.livingWide);
    fd.append('masterWide', params.masterWide);
    fd.append('premisesId', params.premisesId);
    fd.append('southWide', params.southWide);
    fd.append('supply', params.supply);
    fd.append('transaction', params.transaction);
    return Axios.post(api + '/user/Type/updateType', fd);
}

// 添加户型组成
function addConstitute(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('constituteName', params.constituteName);
    return Axios.post(api + '/user/Constitute/addConstitute', fd);
}
// 删除户型组成
function deleteConstitute(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('constituteId', params.constituteId);
    return Axios.post(api + '/user/Constitute/deleteConstitute', fd);
}
// 查询户型组成
function selectConstitute() {
    ;
    return Axios.post(api + '/user/Constitute/selectConstitute');
}
// 修改户型组成
function updateConstitute(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('constituteName', params.constituteName);
    fd.append('constituteId', params.constituteId);
    return Axios.post(api + '/user/Constitute/updateConstitute', fd);
}
// 添加楼盘
function addPremises(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('architectureArea ', params.architectureArea);
    fd.append('developersName', params.developersName);
    fd.append('houseFacadePicture', params.houseFacadePicture);
    fd.append('houseSunPicture', params.houseSunPicture);
    fd.append('households', params.households);
    fd.append('landId', params.landId);
    fd.append('openingTime', params.openingTime);
    fd.append('plateLabelId', params.plateLabelId);
    fd.append('plotRatio', params.plotRatio);
    fd.append('premisesName', params.premisesName);
    fd.append('price', params.price);
    fd.append('propertyName', params.propertyName);
    fd.append('siteArea', params.siteArea);
    return Axios.post(api + '/user/Premises/addPremises', fd);
}
// 编辑楼盘  
function updatePremises(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('architectureArea ', params.architectureArea);
    fd.append('premisesId', params.premisesId);
    fd.append('developersName', params.developersName);
    fd.append('houseFacadePicture', params.houseFacadePicture);
    fd.append('houseSunPicture', params.houseSunPicture);
    fd.append('households', params.households);
    fd.append('landId', params.landId);
    fd.append('openingTime', params.openingTime);
    fd.append('plateLabelId', params.plateLabelId);
    fd.append('plotRatio', params.plotRatio);
    fd.append('premisesName', params.premisesName);
    fd.append('price', params.price);
    fd.append('propertyName', params.propertyName);
    fd.append('siteArea', params.siteArea);
    return Axios.post(api + '/user/Premises/updatePremises', fd);
}
// 删除图片
function PremiseDeletePicture(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('Files', params.Files);
    return Axios.post(api + '/user/Premises/deletePicture', fd);
}
// 删除楼盘
function deletePremises(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('premisesId', params.premisesId);
    return Axios.post(api + '/user/Premises/deletePremises', fd);
}
// 查询楼盘信息
function selectPremises(params) {
    console.log(params);
    return Axios.get(api + '/user/Premises/selectPremises', { params });
}
// 添加土地  
function addLand(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('administrativeName', params.administrativeName);
    fd.append('density', params.density);
    fd.append('landAddress', params.landAddress);
    fd.append('landName', params.landName);
    fd.append('plateId', params.plateId);
    fd.append('projectId', params.projectId);
    fd.append('remark', params.remark);
    fd.append('startingPrice', params.startingPrice);
    fd.append('succeedTime', params.succeedTime);
    fd.append('transactionPrice', params.transactionPrice);
    fd.append('transfer', params.transfer);
    return Axios.post(api + '/user/Land/addLand', fd);
}
// 修改土地  
function updateLand(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('administrativeName', params.administrativeName);
    fd.append('landId', params.landId);
    fd.append('density', params.density);
    fd.append('landAddress', params.landAddress);
    fd.append('landName', params.landName);
    fd.append('plateId', params.plateId);
    fd.append('projectId', params.projectId);
    fd.append('remark', params.remark);
    fd.append('startingPrice', params.startingPrice);
    fd.append('succeedTime', params.succeedTime);
    fd.append('transactionPrice', params.transactionPrice);
    fd.append('transfer', params.transfer);
    return Axios.post(api + '/user/Land/updateLand', fd);
}
// 删除土地
function deleteLand(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('landId', params.landId);
    return Axios.post(api + '/user/Land/deleteLand', fd);
}
// 查询土地信息
function selectLand(params) {
    console.log(params);
    return Axios.get(api + '/user/Land/selectLand', { params });
}
// 删除用户登录
function loginDelete(params) {
    console.log(params);
    return Axios.get(api + '/user/Login/loginDelete', { params });
}
// 删除土地
function system(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('BottomCopyright', params.BottomCopyright);
    fd.append('login', params.login);
    fd.append('name', params.name);
    return Axios.post(api + '/user/Login/system', fd);
}
export default {
    adminLogin: adminLogin,
    phoneLogin: phoneLogin,
    code: code,
    addLogin: addLogin,
    phonePassword: phonePassword,
    addLabel: addLabel,
    selectLabel: selectLabel,
    selectPlate: selectPlate,
    addPlate: addPlate,
    deletedPlate: deletedPlate,
    updatePlate: updatePlate,
    loginSelect: loginSelect,
    forbid: forbid,
    addProject: addProject,
    deleteProject: deleteProject,
    updateProject: updateProject,
    selectProject: selectProject,
    addType: addType,
    deletePicture: deletePicture,
    deleteType: deleteType,
    selectType: selectType,
    updateType: updateType,
    addConstitute: addConstitute,
    deleteConstitute: deleteConstitute,
    selectConstitute: selectConstitute,
    updateConstitute: updateConstitute,
    addPremises: addPremises,
    updatePremises: updatePremises,
    PremiseDeletePicture: PremiseDeletePicture,
    deletePremises: deletePremises,
    selectPremises: selectPremises,
    addLand: addLand,
    updateLand: updateLand,
    deleteLand: deleteLand,
    selectLand: selectLand,
    loginDelete: loginDelete,
    system: system,
};