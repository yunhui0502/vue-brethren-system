<template>
    <!-- ------------------------------------------------楼盘数据管理中心---------------------------------------------------------------------------------------- -->
    <div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.adminId" clearable placeholder="请选择区域" class="handle-select mr10">
                    <el-option v-for="item in administrative" :key="item.id" :label="item.administrativeName" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="query.projectId" clearable placeholder="请选择项目" class="handle-select mr10">
                    <el-option
                        v-for="item in selectProjectData"
                        :key="item.projectId"
                        :label="item.projectName"
                        :value="item.projectId"
                    ></el-option>
                </el-select>
                <el-select v-model="query.plateId" clearable placeholder="请选择板块" class="handle-select mr10">
                    <el-option
                        v-for="item in selectPlateData"
                        :key="item.plateId"
                        :label="item.plateName"
                        :value="item.plateId"
                    ></el-option>
                </el-select>
                <el-input v-model="query.premisesName" placeholder="根据楼盘名称查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" style="float: right" @click="editVisible = true">添加楼盘</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.pageIndex - 1) * query.pageSize, query.pageIndex * query.pageSize)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="premisesName" label="楼盘名称" align="center"></el-table-column>
                <el-table-column prop="administrativeName" align="center" label="所属版块"></el-table-column>
                <el-table-column prop="landName" align="center" label="所属土地"></el-table-column>
                <el-table-column align="center" prop="labels" label="产品类型">
                    <template slot-scope="scope">
                        <div v-for="(item, i) in scope.row.labels" :key="i">{{ item }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="price" label="价格">
                    <template slot-scope="scope">￥{{ scope.row.price }}</template>
                </el-table-column>
                <el-table-column align="center" prop="ratio" label="容积率"></el-table-column>
                <el-table-column align="center" prop="openingTime" label="开盘时间"></el-table-column>
                <el-table-column align="center" prop="developersName" label="开发商"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="editVisible" width="60%">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                <div class="formBox">
                    <div class="formBox-item">
                        <el-form-item label="楼盘名称" prop="premisesName">
                            <el-input v-model="form.premisesName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属土地" prop="landId">
                            <el-select v-model="form.landId" placeholder="请选择">
                                <el-option
                                    v-for="item in selectLandData"
                                    :key="item.landId"
                                    :label="item.landName"
                                    :value="item.landId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属区域">
                            <el-input :disabled="true" v-model="form.name2"></el-input>
                        </el-form-item>
                        <el-form-item label="所属板块">
                            <el-input :disabled="true" v-model="form.name2"></el-input>
                        </el-form-item>
                        <el-form-item label="所属项目">
                            <el-input :disabled="true" v-model="form.name2"></el-input>
                        </el-form-item>
                        <el-form-item label="楼盘总图">
                            <el-upload
                                class="upload-demo"
                                action="http://39.98.126.20:7004/user/File/fileUpLoad"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="handleAvatarSuccess"
                                :before-remove="beforeRemove"
                                multiple
                                :on-exceed="handleExceed"
                                :file-list="fileList"
                            >
                                <el-button size="small" type="">点击上传总图</el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="">
                            <div class="img-box">
                                <div v-for="(item, i) in form.houseSunPicture" :key="i" class="img-item">
                                    <img width="100%" :src="item" alt="" />
                                    <i class="el-icon-close" @click="PremiseDeletePicture(item, i)"></i>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item label="楼盘立面">
                            <el-upload
                                class="upload-demo"
                                action="http://39.98.126.20:7004/user/File/fileUpLoad"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :on-success="handleAvatarSuccess2"
                                multiple
                                :on-exceed="handleExceed"
                                :file-list="fileList"
                            >
                                <el-button size="small" type="">点击上传立面</el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="">
                            <div class="img-box">
                                <div v-for="(item, i) in form.houseFacadePicture" :key="i" class="img-item">
                                    <img width="100%" :src="item" alt="" />
                                    <i class="el-icon-close" @click="PremiseDeletePicture(item, i)"></i>
                                </div>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="formBox-item">
                        <el-form-item label="产品类型" prop="plateLabelId">
                            <el-checkbox-group v-model="form.plateLabelId">
                                <el-checkbox v-for="(item, i) in productData" :key="i" :label="item.id" :value="item.id">{{
                                    item.labelName
                                }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="价格" prop="price">
                            <el-input v-model="form.price"></el-input>
                        </el-form-item>
                        <el-form-item label="用地面积" prop="siteArea">
                            <el-input @blur="blurSite('form')" v-model="form.siteArea"></el-input>
                        </el-form-item>
                        <el-form-item label="建筑面积" prop="architectureArea">
                            <el-input @blur="blurArchitecture('form')" v-model="form.architectureArea"></el-input>
                        </el-form-item>
                        <el-form-item label="容积率" prop="plotRatio">
                            <el-input :disabled="true" v-model="form.plotRatio"></el-input>
                        </el-form-item>
                        <el-form-item label="成交日期" prop="openingTime">
                            <el-date-picker v-model="form.openingTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="开发商" prop="developersName">
                            <el-input v-model="form.developersName"></el-input>
                        </el-form-item>
                        <el-form-item label="总户数" prop="households">
                            <el-input v-model="form.households"></el-input>
                        </el-form-item>
                        <el-form-item label="物业管理" prop="propertyName">
                            <el-input v-model="form.propertyName"></el-input>
                        </el-form-item>
                    </div>
                </div>

                <el-form-item class="center">
                    <el-button type="primary" @click="onSubmit('form')">表单提交</el-button>
                    <el-button @click="editVisible = false">取消</el-button>

                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible2" width="60%">
            <el-form ref="form" :model="form2" label-width="100px">
                <div class="formBox">
                    <div class="formBox-item">
                        <el-form-item label="楼盘名称">
                            <el-input v-model="form2.premisesName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属土地">
                            <el-select v-model="form2.landId" placeholder="请选择">
                                <el-option
                                    v-for="item in selectLandData"
                                    :key="item.landId"
                                    :label="item.landName"
                                    :value="item.landId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属区域">
                            <el-input :disabled="true" v-model="form2.administrativeName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属板块">
                            <el-input :disabled="true" v-model="form2.plateName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属项目">
                            <el-input :disabled="true" v-model="form2.projectName"></el-input>
                        </el-form-item>
                        <el-form-item label="楼盘总图">
                            <el-upload
                                class="upload-demo"
                                action="http://39.98.126.20:7004/user/File/fileUpLoad"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="handleAvatarSuccess3"
                                :before-remove="beforeRemove"
                                multiple
                                :on-exceed="handleExceed"
                                :file-list="fileList"
                            >
                                <el-button size="small" type="">点击上传总图</el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="">
                            <div class="img-box">
                                <div v-for="(item, i) in form2.houseSunPicture" :key="i" class="img-item">
                                    <img width="100%" :src="item" alt="" />
                                    <i class="el-icon-close" @click="PremiseDeletePicture(item, i)"></i>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item label="楼盘立面">
                            <el-upload
                                class="upload-demo"
                                action="http://39.98.126.20:7004/user/File/fileUpLoad"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :on-success="handleAvatarSuccess4"
                                multiple
                                :on-exceed="handleExceed"
                                :file-list="fileList"
                            >
                                <el-button size="small" type="">点击上传立面</el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="">
                            <div class="img-box">
                                <div v-for="(item, i) in form2.houseFacadePicture" :key="i" class="img-item">
                                    <img width="100%" :src="item" alt="" />
                                    <i class="el-icon-close" @click="PremiseDeletePicture(item, i)"></i>
                                </div>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="formBox-item">
                        <el-form-item label="产品类型">
                            <el-checkbox-group v-model="form2.plateLabelId">
                                <el-checkbox v-for="(item, i) in productData" :key="i" :label="item.id" :value="item.id">{{
                                    item.labelName
                                }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="价格">
                            <el-input v-model="form2.price"></el-input>
                        </el-form-item>
                        <el-form-item label="用地面积">
                            <el-input @blur="blurSite('form2')" v-model="form2.siteArea"></el-input>
                        </el-form-item>
                        <el-form-item label="建筑面积">
                            <el-input @blur="blurArchitecture('form2')" v-model="form2.architectureArea"></el-input>
                        </el-form-item>
                        <el-form-item label="容积率">
                            <el-input :disabled="true" v-model="form2.plotRatio"></el-input>
                        </el-form-item>
                        <el-form-item label="成交日期">
                            <el-date-picker v-model="form2.openingTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="开发商">
                            <el-input v-model="form2.developersName"></el-input>
                        </el-form-item>
                        <el-form-item label="总户数">
                            <el-input v-model="form2.households"></el-input>
                        </el-form-item>
                        <el-form-item label="物业管理">
                            <el-input v-model="form2.propertyName"></el-input>
                        </el-form-item>
                    </div>
                </div>

                <el-form-item class="center">
                    <el-button type="primary" @click="onSubmit2">表单提交</el-button>
                    <el-button @click="editVisible2 = false">取消</el-button>

                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../api/index';
import userApi from '@/service/user.js';
export default {
    name: 'basetable',
    data() {
        return {
            rules: {
                premisesName: [{ required: true, message: '请输入楼盘名称', trigger: 'blur' }],
                plateLabelId: [{ required: true, message: '请选择产品标签', trigger: 'blur' }],
                price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
                siteArea: [{ required: true, message: '请输入用地面积', trigger: 'blur' }],
                openingTime: [{ required: true, message: '请选择成交日期', trigger: 'change' }],
                developersName: [{ required: true, message: '请输入开发商名称', trigger: 'blur' }],
                households: [{ required: true, message: '请输入总户数', trigger: 'blur' }],
                propertyName: [{ required: true, message: '请输入物业名称', trigger: 'blur' }],
                landId: [{ required: true, message: '请选择所属土地', trigger: 'change' }],
                architectureArea: [{ required: true, message: '请输入建筑面积', trigger: 'blur' }]
            },

            selectPlateData: [],
            selectProjectData: [],
            administrative: [],

            fileList: [],
            selectLandData: '',
            productData: '',
            form: {
                name: '',
                name2: '',
                name3: '',
                region: '',
                date1: '',
                date2: '',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                desc: '',
                options: [],

                architectureArea: '', // 建筑面积
                developersName: '', // 开发商名称
                houseFacadePicture: [], // 楼盘立面
                houseSunPicture: [], // 楼盘总图
                households: '', // 总户数
                landId: '', // 土地id
                plateLabelId: [], // 产品类型
                openingTime: '', // 营业时间
                plotRatio: '', // 容积率
                premisesName: '', // 楼盘名称
                price: '', // 楼盘价格
                propertyName: '', // 物业名称
                siteArea: '' // 用地面积
            },
            form2: {
                name: '',
                name2: '不可修改',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                desc: '',
                options: [],

                architectureArea: '', // 建筑面积
                developersName: '', // 开发商名称
                houseFacadePicture: [], // 楼盘立面
                houseSunPicture: [], // 楼盘总图
                households: '', // 总户数
                landId: '', // 土地id
                plateLabelId: [], // 产品类型
                openingTime: '', // 营业时间
                plotRatio: '', // 容积率
                premisesName: '', // 楼盘名称
                price: '', // 楼盘价格
                propertyName: '', // 物业名称
                siteArea: '', // 用地面积
                FacadePicture: true,
                SunPicture: true
            },
            query: {
                adminId: '',
                plateId: '',
                projectId: '',
                premisesName: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            editVisible2: false,

            pageTotal: 0,
            // form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
        this.selectLabel();
        this.selectLand();

        this.selectProject();
        this.selectPlate();
        this.selectAdministrative();
    },
    methods: {
        blurSite(e) {
            // form.siteArea
            if (this.form.architectureArea == '') {
                console.log('空');
                return;
            }
            if (e == 'form') {
                console.log('form');
                this.form.plotRatio = this.form.architectureArea / this.form.siteArea;
            } else {
                console.log('form2');
                this.form2.plotRatio = this.form2.architectureArea / this.form2.siteArea;
            }
        },
        blurArchitecture(e) {
            if (this.form.siteArea == '') {
                console.log('空');
                return;
            }
            if (e == 'form') {
                console.log('form');
                this.form.plotRatio = this.form.architectureArea / this.form.siteArea;
            } else {
                console.log('form2');
                this.form2.plotRatio = this.form2.architectureArea / this.form2.siteArea;
            }
        },
        selectAdministrative() {
            userApi.selectAdministrative((res) => {
                console.log('区域', res);
                this.administrative = res.data.data;
            });
        },
        selectPlate() {
            userApi.selectPlate((res) => {
                console.log('板块', res.data);
                this.selectPlateData = res.data.data;
            });
        },
        selectProject() {
            userApi.selectProject({}, (res) => {
                console.log('项目', res);
                this.selectProjectData = res.data.data;
            });
        },
        selectLand() {
            userApi.selectLand({}, (res) => {
                console.log('土地', res);
                this.selectLandData = res.data.data;
            });
        },
        // 删除图片
        PremiseDeletePicture(item, index) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    console.log(item);
                    userApi.PremiseDeletePicture({ Files: item }, (res) => {
                        console.log(res);
                        this.form.houseFacadePicture.splice(index, 1);
                        this.form.houseSunPicture.splice(index, 1);
                    });
                })
                .catch(() => {});
        },
        selectLabel() {
            userApi.selectLabel({ type: 'product' }, (res) => {
                console.log('产品类型标签', res);
                this.productData = res.data.data;
            });
        },
        // ------------------------------- 图片 -----------------------------------
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res);
            this.form.houseSunPicture.push(res.data);
        },

        handleAvatarSuccess2(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res);
            this.form.houseFacadePicture.push(res.data);
        },

        handleAvatarSuccess3(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res);
            this.form2.SunPicture = false;
            this.form2.houseSunPicture.push(res.data);
        },
        handleAvatarSuccess4(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res);
            this.form2.FacadePicture = false;
            this.form2.houseFacadePicture.push(res.data);
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        // ------------------------------------------------------------------
        onSubmit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(this.form);
                    // this.form.openingTime = this.form.openingTime + ' ' + '00:00:00';
                    userApi.addPremises(this.form, (res) => {
                        console.log(res);
                        this.$message.success('提交成功！');
                        this.editVisible = false;
                        this.getData();
                        this.$refs[form].resetFields();
                    });
                } else {
                    console.log('error submit!!');

                    return false;
                }
            });
        },
        onSubmit2() {
            if (this.form2.FacadePicture) {
                console.log(1);
                this.form2.houseFacadePicture = [];
            }
            if (this.form2.SunPicture) {
                console.log(2);
                this.form2.houseSunPicture = [];
            }
            userApi.updatePremises(this.form2, (res) => {
                console.log(res);
                this.$message.success('编辑成功！');
                this.editVisible2 = false;
                this.getData();
            });
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            // fetchData(this.query).then((res) => {
            //     console.log(res);
            //     this.tableData = res.list;
            //     this.pageTotal = res.pageTotal || 50;
            // });
            let Obj = {};
            if (this.query.adminId != '') {
                Obj.adminId = this.query.adminId;
            }
            if (this.query.plateId != '') {
                Obj.plateId = this.query.plateId;
            }
            if (this.query.projectId != '') {
                Obj.projectId = this.query.projectId;
            }
            if (this.query.premisesName != '') {
                Obj.premisesName = this.query.premisesName;
            }
            userApi.selectPremises(Obj, (res) => {
                console.log('楼盘', res);
                this.tableData = res.data.data;
                this.pageTotal = this.tableData.length;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            // this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    userApi.deletePremises({ premisesId: row.premisesId }, (res) => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form2.architectureArea = row.architectureArea;
            this.form2.developersName = row.developersName;
            this.form2.houseFacadePicture = row.facadeFiles;
            this.form2.houseSunPicture = row.sumFiles;
            this.form2.households = row.households;
            this.form2.projectName = row.projectName;
            this.form2.plateName = row.plateName;
            this.form2.administrativeName = row.administrativeName;
            // this.form2.landId = row.;
            this.form2.plateLabelId = row.plateId;
            this.form2.openingTime = row.openingTime;
            this.form2.premisesName = row.premisesName;
            this.form2.plotRatio = row.ratio;
            this.form2.price = row.price;
            this.form2.propertyName = row.propertyName;
            this.form2.siteArea = row.siteArea;
            this.form2.premisesId = row.premisesId;
            this.editVisible2 = true;
        },
        // 保存编辑
        saveEdit() {
            // this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            // this.$set(this.tableData, this.idx, this.form);
            this.editVisible2 = false;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            // this.getData();
        }
    }
};
</script>

<style  lang="less" scoped>
.img-box {
    display: flex;
    .img-item {
        position: relative;
        img {
            height: 118px;
            width: 118px;
            margin: 8px;
        }
        .el-icon-close {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 18px;
            color: #000;
        }
    }
}

/deep/.el-upload--text {
    background-color: #fff;
    border: 0px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 360px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.classimg {
    width: 80px;
    height: 80px;
}

.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
