/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import Axios from './index';
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
// 删除标签
function deleteLabel(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('id', params.id);
    return Axios.post(api + '/user/Label/deleteLabel', fd);
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
    fd.append('plateLabelId', params.plateLabelId);
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
    fd.append('projectName', params.projectName);
    fd.append('exploitId', params.exploitId);
    fd.append('developersName', params.developersName);
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
function selectProject(params) {
    return Axios.get(api + '/user/Login/selectProject', { params });
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
    fd.append('BottomCopyright', params.bottomCopyright);
    fd.append('login', params.logo);
    fd.append('name', params.systemName);
    return Axios.post(api + '/user/Login/system', fd);
}
// 添加区域
function addAdministrative(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('name', params.name);
    return Axios.post(api + '/user/Administrative/addAdministrative', fd);
}
// 修改区域
function updateAdministrative(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('id', params.id);
    fd.append('name', params.name);
    return Axios.post(api + '/user/Administrative/updateAdministrative', fd);
}
// 删除区域
function deleteAdministrative(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('id', params.id);
    return Axios.post(api + '/user/Administrative/deleteAdministrative', fd);
}
// 查询区域
function selectAdministrative() {
    return Axios.get(api + '/user/Administrative/selectAdministrative');
}

// 新建库
function addLibrary(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('libraryName', params.libraryName);
    return Axios.post(api + '/user/Tower/addLibrary', fd);
}
// 添加分类
function addLibraryaddCategory(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('categoryName', params.categoryName);
    fd.append('libraryId', params.libraryId);
    fd.append('parentCategoryId', params.parentCategoryId);
    // if(params.Ttext != undefined) {
        // console.log('111')
        fd.append('Ttext', params.Ttext);
    // }
    // if(params.text != undefined) {
        // console.log('111')
        fd.append('text', params.text);
    // }
    if(params.text != undefined) {
        // fd.append('type', params.type);
    }
    return Axios.post(api + '/user/Tower/addLibraryaddCategory', fd);
}
// 新建楼号
function addTower(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('premisesId', params.premisesId);
    fd.append('towerNo', params.towerNo);
    fd.append('synchronizationNo', params.synchronizationNo);
    return Axios.post(api + '/user/Tower/addTower', fd);
}
// 查询库
function selectLibrary() {
    return Axios.get(api + '/user/Tower/selectLibrary');
}
// 查询库详情
function selectLibraryDetails(params) {

    return Axios.get(api + '/user/Tower/selectLibraryDetails', { params });
}
// 查询
function selectTower(params) {
    return Axios.get(api + '/user/Tower/selectTower', { params });
}
// 查找最低分类
function category(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('premisesId', params.premisesId);
    fd.append('towerNo', params.towerNo);
    return Axios.post(api + '/user/Tower/category', fd);
}
// 删除库
function deleteLibrary(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('libraryId', params.libraryId);
    return Axios.post(api + '/user/Tower/deleteLibrary', fd);
}
// 删除分类
function deleteLibraryCategory(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('categoryId', params.categoryId);
    return Axios.post(api + '/user/Tower/deleteLibraryCategory', fd);
}
// 删除库分类下的文本或者图片
function deleteLibraryCategoryText(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('categoryId', params.categoryId);
    return Axios.post(api + '/user/Tower/deleteLibraryCategoryText', fd);
}
// 删除楼号的库
function deleteTowerLibrary(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('libraryId', params.libraryId);
    fd.append('towerId', params.towerId);
    return Axios.post(api + '/user/Tower/deleteTowerLibrary', fd);
}
// 添加楼号的库
function towerLibrary(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('libraryIds', params.libraryIds);
    fd.append('towerId', params.towerId);
    return Axios.post(api + '/user/Tower/towerLibrary', fd);
}
// 添加取消楼号的库
function towerLibraryCategory(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('categoryIds', params.categoryIds);
    fd.append('towerLibrarys', params.towerLibrarys);
    return Axios.post(api + '/user/Tower/towerLibraryCategory', fd);
}
// 修改库
function updateLibrary(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('libraryId', params.libraryId);
    fd.append('libraryName', params.libraryName);
    return Axios.post(api + '/user/Tower/updateLibrary', fd);
}
// 修改分类
function updateLibraryCategory(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('categoryId', params.categoryId);
    fd.append('categoryName', params.categoryName);
    fd.append('parentCategoryId', params.parentCategoryId);
    // if(params.text != undefined) {
        // console.log('111')
        fd.append('text', params.text);
        fd.append('Ttext', params.Ttext);
    // }
    // if(params.text != undefined) {
        // fd.append('type', params.type);
    // }
    return Axios.post(api + '/user/Tower/updateLibraryCategory', fd);
}
// 删除楼号
function deleteTower(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('towerId', params.towerId);
    return Axios.post(api + '/user/Tower/deleteTower', fd);
}
// 查询楼号的库
function SelectTowerLibrary(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('towerId', params.towerId);
    return Axios.post(api + '/user/Tower/SelectTowerLibrary', fd);
}
// 系统设置查詢
function systemSelect(params) {
    return Axios.post(api + '/user/Login/systemSelect');
}
// 新建开发
function addExploit(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('exploitName', params.exploitName);
    return Axios.post(api + '/user/Exploit/addExploit', fd);
}
// 删除开发
function deletedExploit(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('id', params.id);
    return Axios.post(api + '/user/Exploit/deletedExploit', fd);
}
// 查询开发
function selectExploit() {
    return Axios.post(api + '/user/Exploit/selectExploit');
}
// 修改开发
function updateExploit(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('exploitName', params.exploitName);
    fd.append('id', params.id);
    return Axios.post(api + '/user/Exploit/updateExploit', fd);
}
// 添加用户
function addUsert(params) {
    let fd = new FormData();
    console.log(params);
    fd.append('email', params.email);
    fd.append('name', params.name);
    fd.append('password', params.password);
    fd.append('phone', params.phone);
    fd.append('userName', params.userName);
    return Axios.post(api + '/user/User/addUser', fd);
}
// 用户登录查询
function userSelect(params) {
    return Axios.get(api + '/user/User/userSelect', { params });
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
    addAdministrative: addAdministrative,
    updateAdministrative: updateAdministrative,
    deleteAdministrative: deleteAdministrative,
    selectAdministrative: selectAdministrative,
    addLibrary: addLibrary,
    addLibraryaddCategory: addLibraryaddCategory,
    addTower: addTower,
    selectLibrary: selectLibrary,
    selectLibraryDetails: selectLibraryDetails,

    selectTower: selectTower,
    category: category,
    deleteLibrary: deleteLibrary,
    deleteLibraryCategory: deleteLibraryCategory,
    deleteLibraryCategoryText: deleteLibraryCategoryText,
    deleteTowerLibrary: deleteTowerLibrary,
    towerLibrary: towerLibrary,
    towerLibraryCategory: towerLibraryCategory,
    updateLibrary: updateLibrary,
    updateLibraryCategory: updateLibraryCategory,
    deleteTower: deleteTower,
    SelectTowerLibrary: SelectTowerLibrary,
    systemSelect: systemSelect,

    addExploit: addExploit,
    deletedExploit: deletedExploit,
    selectExploit: selectExploit,
    updateExploit: updateExploit,

    deleteLabel: deleteLabel,
    addUsert: addUsert,
    userSelect: userSelect,
};