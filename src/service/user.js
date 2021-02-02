/* eslint-disable require-jsdoc */
import user from '@/api/user.js';

async function adminLogin(params, handleResult) {
    user.adminLogin(params).then((res) => handleResult(res));
}

async function phoneLogin(params, handleResult) {
    user.phoneLogin(params).then((res) => handleResult(res));
}

async function code(params, handleResult) {
    user.code(params).then((res) => handleResult(res));
}
async function addLogin(params, handleResult) {
    user.addLogin(params).then((res) => handleResult(res));
  }
async function phonePassword(params, handleResult) {
   user.phonePassword(params).then((res) => handleResult(res));
}
async function addLabel(params, handleResult) {
   user.addLabel(params).then((res) => handleResult(res));
}
async function selectLabel(params, handleResult) {
   user.selectLabel(params).then((res) => handleResult(res));
}
async function selectPlate(handleResult) {
   user.selectPlate().then((res) => handleResult(res));
}
async function addPlate(params, handleResult) {
   user.addPlate(params).then((res) => handleResult(res));
}
async function deletedPlate(params, handleResult) {
    user.deletedPlate(params).then((res) => handleResult(res));
 }
 async function updatePlate(params, handleResult) {
   user.updatePlate(params).then((res) => handleResult(res));
}
async function loginSelect(handleResult) {
   user.loginSelect().then((res) => handleResult(res));
}
async function forbid(params,handleResult) {
   user.forbid(params).then((res) => handleResult(res));
}
async function addProject(params,handleResult) {
   user.addProject(params).then((res) => handleResult(res));
}
async function deleteProject(params,handleResult) {
   user.deleteProject(params).then((res) => handleResult(res));
}
async function updateProject(params,handleResult) {
   user.updateProject(params).then((res) => handleResult(res));
}
async function selectProject(params,handleResult) {
   user.selectProject(params).then((res) => handleResult(res));
}
async function addType(params,handleResult) {
   user.addType(params).then((res) => handleResult(res));
}
async function deletePicture(params,handleResult) {
   user.deletePicture(params).then((res) => handleResult(res));
}
async function deleteType(params,handleResult) {
   user.deleteType(params).then((res) => handleResult(res));
}
async function selectType(params,handleResult) {
   user.selectType(params).then((res) => handleResult(res));
}
async function updateType(params,handleResult) {
   user.updateType(params).then((res) => handleResult(res));
}
async function addConstitute(params,handleResult) {
   user.addConstitute(params).then((res) => handleResult(res));
}
async function deleteConstitute(params,handleResult) {
   user.deleteConstitute(params).then((res) => handleResult(res));
}
async function selectConstitute(handleResult) {
   user.selectConstitute().then((res) => handleResult(res));
}
async function updateConstitute(params,handleResult) {
   user.updateConstitute(params).then((res) => handleResult(res));
}

async function addPremises(params,handleResult) {
   user.addPremises(params).then((res) => handleResult(res));
}
async function updatePremises(params,handleResult) {
   user.updatePremises(params).then((res) => handleResult(res));
}
async function PremiseDeletePicture(params,handleResult) {
   user.PremiseDeletePicture(params).then((res) => handleResult(res));
}
async function deletePremises(params,handleResult) {
   user.deletePremises(params).then((res) => handleResult(res));
}
async function selectPremises(params,handleResult) {
   user.selectPremises(params).then((res) => handleResult(res));
}

async function addLand(params,handleResult) {
   user.addLand(params).then((res) => handleResult(res));
}
async function updateLand(params,handleResult) {
   user.updateLand(params).then((res) => handleResult(res));
}
async function deleteLand(params,handleResult) {
   user.deleteLand(params).then((res) => handleResult(res));
}
async function selectLand(params,handleResult) {
   user.selectLand(params).then((res) => handleResult(res));
}
async function loginDelete(params,handleResult) {
   user.loginDelete(params).then((res) => handleResult(res));
}
async function system(params,handleResult) {
   user.system(params).then((res) => handleResult(res));
}
async function addAdministrative(params,handleResult) {
   user.addAdministrative(params).then((res) => handleResult(res));
}
async function updateAdministrative(params,handleResult) {
   user.updateAdministrative(params).then((res) => handleResult(res));
}
async function deleteAdministrative(params,handleResult) {
   user.deleteAdministrative(params).then((res) => handleResult(res));
}
async function selectAdministrative(handleResult) {
   user.selectAdministrative().then((res) => handleResult(res));
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
};
