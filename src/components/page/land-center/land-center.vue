<template>
    <!-- ------------------------------------------------土地数据管理中心---------------------------------------------------------------------------------------- -->
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
                <el-input v-model="query.landName" placeholder="根据土地名称查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" style="float: right" @click="editVisible = true">添加土地</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.pageIndex - 1) * query.pageSize, query.pageIndex * query.pageSize)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="landName" label="土地名称" align="center"></el-table-column>
                <el-table-column prop="projectName" align="center" label="所属项目"></el-table-column>
                <el-table-column align="center" prop="administrativeName" label="所属区域"></el-table-column>
                <el-table-column align="center" prop="plateName" label="所属板块"></el-table-column>
                <el-table-column align="center" prop="ratio" label="容积率"></el-table-column>
                <el-table-column align="center" prop="transactionPrice" label="成交价格(亿元)"></el-table-column>
                <el-table-column align="center" prop="transfer" label="受让方"></el-table-column>
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
        <el-dialog title="添加" :visible.sync="editVisible" width="80%">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                <div class="formBox">
                    <div class="formBox-item">
                        <el-form-item label="土地名称" prop="landName">
                            <el-input v-model="form.landName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属项目" prop="projectId">
                            <el-select v-model="form.projectId" placeholder="请选择">
                                <el-option
                                    v-for="item in selectProjectData"
                                    :key="item.projectId"
                                    :label="item.projectName"
                                    :value="item.projectId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="土地地址" prop="landAddress">
                            <el-input v-model="form.landAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="所属板块" prop="plateId">
                            <el-select v-model="form.plateId" placeholder="请选择">
                                <el-option
                                    v-for="item in selectPlateData"
                                    :key="item.plateId"
                                    :label="item.plateName"
                                    :value="item.plateId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="用地面积">
                            <el-input :disabled="true" v-model="form.name2"></el-input>
                        </el-form-item>

                        <el-form-item label="容积率">
                            <el-input :disabled="true" v-model="form.name2"></el-input>
                        </el-form-item>
                        <el-form-item label="建筑面积">
                            <el-input :disabled="true" v-model="form.name2"></el-input>
                        </el-form-item>
                        <el-form-item label="建筑密度" prop="density">
                            <el-input v-model="form.density"></el-input>
                        </el-form-item>
                    </div>
                    <div class="formBox-item">
                        <el-form-item label="成交日期" prop="succeedTime">
                            <el-date-picker v-model="form.succeedTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="成交价" prop="transactionPrice">
                            <el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.transactionPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="起拍价" prop="startingPrice">
                            <el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.startingPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="受让方" prop="transfer">
                            <el-input v-model="form.transfer"></el-input>
                        </el-form-item>
                        <el-form-item label="溢价率">
                            <el-input :disabled="true" v-model="form.name2"></el-input>
                        </el-form-item>
                        <el-form-item label="楼面价">
                            <el-input :disabled="true" v-model="form.name2"></el-input>
                        </el-form-item>
                        <el-form-item label="关联楼盘">
                            <el-input :disabled="true" v-model="form.name2"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" rows="5" v-model="form.remark"></el-input>
                        </el-form-item>
                    </div>
                </div>

                <el-form-item class="center">
                    <el-button type="primary" @click="onSubmit('form')">表单提交</el-button>
                    <el-button  @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible2" width="80%">
            <el-form ref="form" :model="form2" label-width="100px">
                <div class="formBox">
                    <div class="formBox-item">
                        <el-form-item label="土地名称">
                            <el-input v-model="form2.landName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属项目">
                            <el-select v-model="form2.projectId" placeholder="请选择">
                                <el-option
                                    v-for="item in selectProjectData"
                                    :key="item.projectId"
                                    :label="item.projectName"
                                    :value="item.projectId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="土地地址">
                            <el-input v-model="form2.landAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="所属区域">
                            <el-input v-model="form2.administrativeName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属板块">
                            <el-select v-model="form2.plateId" placeholder="请选择">
                                <el-option
                                    v-for="item in selectPlateData"
                                    :key="item.plateId"
                                    :label="item.plateName"
                                    :value="item.plateId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="用地面积">
                            <el-input :disabled="true" v-model="form2.siteArea"></el-input>
                        </el-form-item>

                        <el-form-item label="容积率">
                            <el-input :disabled="true" v-model="form2.ratio"></el-input>
                        </el-form-item>
                        <el-form-item label="建筑面积">
                            <el-input :disabled="true" v-model="form2.architectureArea"></el-input>
                        </el-form-item>
                        <el-form-item label="建筑密度">
                            <el-input v-model="form2.density"></el-input>
                        </el-form-item>
                    </div>
                    <div class="formBox-item">
                        <el-form-item label="成交日期">
                            <el-date-picker v-model="form2.succeedTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="成交价">
                            <el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form2.transactionPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="起拍价">
                            <el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form2.startingPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="受让方">
                            <el-input v-model="form2.transfer"></el-input>
                        </el-form-item>
                        <el-form-item label="溢价率">
                            <el-input :disabled="true" v-model="form2.premium"></el-input>
                        </el-form-item>
                        <el-form-item label="楼面价">
                            <el-input :disabled="true" v-model="form2.accommodation"></el-input>
                        </el-form-item>
                        <el-form-item label="关联楼盘">
                            <el-input :disabled="true" v-model="form2.premises"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input type="textarea" rows="5" v-model="form2.remark"></el-input>
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
                landName: [{ required: true, message: '请输入土地名称', trigger: 'blur' }],
                projectId: [{ required: true, message: '请选择所属项目', trigger: 'change' }],
                landAddress: [{ required: true, message: '请输入土地地址名称', trigger: 'blur' }],
                plateId: [{ required: true, message: '请选择所属板块', trigger: 'change' }],
                density: [{ required: true, message: '请输入建筑密度', trigger: 'changeblur' }],
                succeedTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
                transactionPrice: [{ required: true, message: '请输入成交价格', trigger: 'blur' }],
                startingPrice: [{ required: true, message: '请输入起拍价格', trigger: 'blur' }],
                transfer: [{ required: true, message: '请输入受让方名称', trigger: 'blur' }],
                remark: [{ required: true, message: '请输入备注', trigger: 'blur' }]
            },

            selectPlateData: [],
            selectProjectData: [],
            administrative: [],

            form: {
                name2: '',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                desc: '',
                options: [],

                administrativeName: '', // 行政区域名称
                density: '', // 建筑密度
                landAddress: '', // 土地地址
                landName: '', // 土地名称
                plateId: '', // 板块id
                projectId: '', // 项目id
                remark: '', // 备注
                startingPrice: '', // 起拍价格
                succeedTime: '', //
                transactionPrice: '', // 成交价格
                transfer: '' // 受让方名称
            },
            form2: {
                name2: '',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                desc: '',
                options: [],

                administrativeName: '', // 行政区域名称
                density: '', // 建筑密度
                landAddress: '', // 土地地址
                landName: '', // 土地名称
                plateId: '1', // 板块id
                projectId: '1', // 项目id
                remark: '', // 备注
                startingPrice: '', // 起拍价格
                succeedTime: '', //
                transactionPrice: '', // 成交价格
                transfer: '' // 受让方名称
            },
            query: {
                adminId: '',
                plateId: '',
                projectId: '',
                landName: '',
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
        this.selectProject();
        this.selectPlate();
        this.selectAdministrative();
    },
    methods: {
        // selectPlate() {
        //     userApi.selectPlate((res) => {
        //         console.log(res.data);
        //         this.tableData = res.data.data;
        //         this.tableData.forEach((item) => {
        //             // item.averagePrice = (item.averagePrice / 100).toFixed(2);
        //         });
        //         this.editVisible = false;
        //     });
        // },
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
        onSubmit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    userApi.addLand(this.form, (res) => {
                        console.log(res);
                        this.$message.success('提交成功！');
                        this.editVisible = false;
                        this.getData();
                        this.$refs[form].resetFields();
                    });
                } else {
                    console.log('error submit!!');
                    //  this.$refs[form].resetFields();
                    return false;
                }
            });
            // this.form.succeedTime = this.form.succeedTime + ' ' + '00:00:00';
        },
        onSubmit2() {
            // this.form2.succeedTime = this.form2.succeedTime + ' ' + '00:00:00';
            userApi.updateLand(this.form2, (res) => {
                console.log(res);
                this.$message.success('修改成功！');
                this.editVisible2 = false;
                this.getData();
            });
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            // fetchData(this.query).then(res => {
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
            if (this.query.landName != '') {
                Obj.landName = this.query.landName;
            }
            userApi.selectLand(Obj, (res) => {
                console.log('土地', res);
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
                    userApi.deleteLand({ landId: row.landId }, (res) => {
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
            this.form2.administrativeName = row.administrativeName;
            this.form2.architectureArea = row.architectureArea;
            this.form2.premises = row.premises + '';
            this.form2.ratio = row.ratio;
            this.form2.density = row.density;
            this.form2.landAddress = row.landAddress;
            this.form2.landName = row.landName;
            this.form2.plateId = row.plateId;
            this.form2.siteArea = row.siteArea;
            this.form2.projectId = row.projectId;
            this.form2.remark = row.remark;
            this.form2.startingPrice = row.startingPrice;
            this.form2.succeedTime = row.succeedTime;
            this.form2.transactionPrice = row.transactionPrice;
            this.form2.transfer = row.transfer;
            this.form2.landId = row.landId;
            this.editVisible2 = true;
            this.form2.premium = row.transactionPrice / row.startingPrice;
            this.form2.accommodation = row.transactionPrice / (row.architectureArea * row.ratio);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            // this.getData();
        }
    }
};
</script>

<style scoped>
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
