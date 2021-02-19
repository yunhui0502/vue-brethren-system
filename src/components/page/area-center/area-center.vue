<template>
    <!-- ------------------------------------------------区域板块管理中心---------------------------------------------------------------------------------------- -->
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button style="float: right; margin: 20px" type="primary" @click="editVisible = true">添加区域板块</el-button>
                <el-button type="primary" style="float: right; margin: 20px 0" @click="dialogFormVisible = true">添加</el-button>
                <el-select v-model="value" style="float: right; margin: 20px 0" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.id" :label="item.administrativeName" :value="item.id"> </el-option>
                </el-select>
            </div>
            <el-table
                :data="tableData.slice((query.pageIndex - 1) * query.pageSize, query.pageIndex * query.pageSize)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="plateName" label="板块名称" align="center"></el-table-column>
                <el-table-column prop="administrative" align="center" label="所属行政区域"></el-table-column>
                <el-table-column align="center" label="区域定位">
                    <template slot-scope="scope">
                        <div v-for="(item, i) in scope.row.label" :key="i">{{ item }}</div>
                    </template>
                </el-table-column>
                <!-- <el-table-column align="center" prop="address" label="供应套数"></el-table-column>
                <el-table-column align="center" prop="date" label="成交套数"></el-table-column>
                <el-table-column align="center" prop="date" label="供求比"></el-table-column>
                <el-table-column align="center" prop="date" label="容积率"></el-table-column> -->
                <el-table-column align="center" prop="averagePrice" label="置业均价(元/㎡)"></el-table-column>
                <!-- <el-table-column align="center" prop="date" label="楼面均价(元/㎡)"></el-table-column> -->
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

        <!-- 添加区域 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="20%">
            <el-form ref="countForm" :rules="countFormRules" :model="countForm">
                <el-form-item label="属性名称" prop="name">
                    <el-input v-model="countForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addroom('countForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :rules="rules" :model="form" label-width="130px">
                <el-form-item label="板块名称" prop="plateName">
                    <el-input v-model="form.plateName"></el-input>
                </el-form-item>
                <el-form-item label="所属行政区" prop="administrativeId">
                    <el-select v-model="form.administrativeId" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :label="item.administrativeName" :value="item.id"> </el-option>
                        <!-- <el-option key="bbk" label="步步高" value="1"></el-option>
                        <el-option key="xtc" label="小天才" value="2"></el-option>
                        <el-option key="imoo" label="imoo" value="3"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="板块地址" prop="plateAddress">
                    <el-input v-model="form.plateAddress"></el-input>
                </el-form-item>
                <el-form-item label="区域定位" prop="plateLabelId">
                    <el-checkbox-group v-model="form.plateLabelId">
                        <el-checkbox :label="item.id" v-for="item in areaData" :key="item.id" name="type">{{ item.labelName }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="区域优势" prop="advantage">
                    <el-input type="textarea" rows="5" v-model="form.advantage"></el-input>
                </el-form-item>
                <!-- <el-form-item label="供应套数">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="成交套数">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="供求比">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item> -->
                <!-- <el-form-item label="已有楼盘">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item> -->
                <!-- <el-form-item label="容积率">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item> -->
                <el-form-item label="置业均价" prop="averagePrice">
                    <el-input v-model="form.averagePrice"></el-input>
                </el-form-item>
                <!-- <el-form-item label="楼盘均价">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item> -->
                <el-form-item label="区域发展信息" prop="developMessage">
                    <el-input type="textarea" rows="5" v-model="form.developMessage"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">表单提交</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible2" width="40%">
            <el-form ref="form" :model="form2" label-width="130px">
                <el-form-item label="板块名称">
                    <el-input v-model="form2.plateName"></el-input>
                </el-form-item>
                <el-form-item label="所属行政区">
                    <el-select v-model="form2.administrativeId" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :label="item.administrativeName" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="板块地址">
                    <el-input v-model="form2.plateAddress"></el-input>
                </el-form-item>
                <el-form-item label="区域定位">
                    <el-checkbox-group v-model="form2.plateLabelId">
                        <el-checkbox :label="item.id" v-for="item in areaData" :key="item.id" name="type">{{ item.labelName }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="区域优势">
                    <el-input type="textarea" rows="5" v-model="form2.advantage"></el-input>
                </el-form-item>
                <!-- <el-form-item label="供应套数">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="成交套数">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="供求比">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item> -->
                <!-- <el-form-item label="已有楼盘">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item> -->
                <!-- <el-form-item label="容积率">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item> -->
                <el-form-item label="置业均价">
                    <el-input v-model="form2.averagePrice"></el-input>
                </el-form-item>
                <!-- <el-form-item label="楼盘均价">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item> -->
                <el-form-item label="区域发展信息">
                    <el-input type="textarea" rows="5" v-model="form2.developMessage"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updatePlate">表单提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../api/index';
import userApi from '@/service/user.js';
import Axios from 'axios';
export default {
    name: 'basetable',
    data() {
        return {
            rules: {
                plateName: [{ required: true, message: '请输入板块名称', trigger: 'blur' }],
                plateAddress: [{ required: true, message: '请输入板块地址名称', trigger: 'change' }],
                advantage: [{ required: true, message: '请输入区域优势', trigger: 'change' }],
                averagePrice: [{ required: true, message: '请输入置业均价', trigger: 'change' }],
                developMessage: [{ required: true, message: '请输入区域发展信息', trigger: 'change' }],
                administrativeId: [{ required: true, message: '请选择所属行政区', trigger: 'change' }],
                plateLabelId: [{ type: 'array', required: true, message: '请至少选择一个区域定位', trigger: 'change' }]
            },
            countFormRules: {
                name: [{ required: true, message: '请输入板块名称', trigger: 'blur' }]
            },
            value: '',
            options: [],
            dialogFormVisible: false,
            editVisible: false,
            editVisible2: false,
            areaData: '',
            countForm: {
                name: ''
            },
            form: {
                administrativeId: '', //行政区id
                advantage: '', //区域优势
                averagePrice: '', //置业均价
                developMessage: '', //区域发展信息
                plateAddress: '', // 板块地址
                plateLabelId: [], //
                plateName: '', //板块名称

                name: ''
            },
            form2: {
                administrativeId: '', //行政区id
                advantage: '', //区域优势
                averagePrice: '', //置业均价
                developMessage: '', //区域发展信息
                plateAddress: '', // 板块地址
                plateLabelId: [], //
                plateName: '' //板块名称
            },
            // --------------------------------------------------------------

            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            pageTotal: 0,
            idx: -1,
            id: -1
        };
    },
    created() {
        this.selectPlate();
        this.selectLabel();
        this.selectAdministrative();
    },
    methods: {
        selectAdministrative() {
            userApi.selectAdministrative((res) => {
                console.log('区域', res);
                this.options = res.data.data;
            });
        },
        addroom(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(this.form);
                    userApi.addAdministrative(this.countForm, (res) => {
                        console.log(res);
                        this.$message.success('提交成功！');
                        this.$refs[form].resetFields();
                        this.dialogFormVisible = false;
                    });
                } else {
                    console.log('error submit!!');
                    //  this.$refs[form].resetFields();
                    return false;
                }
            });
        },
        // 编辑
        updatePlate() {
            userApi.updatePlate(this.form2, (res) => {
                this.$message.success('修改成功');
            });
        },
        // 添加操作
        handleEdit(index, row) {
            // this.idx = index; plateLabelId
            console.log(row);
            this.form2.administrativeId = row.administrativeId;
            this.form2.advantage = row.advantage;

            this.form2.plateLabelId = [];
            for (let key in row.label) {
                console.log(key);
                this.form2.plateLabelId.push(Number(key));
            }
            console.log(this.form2.plateLabelId);

            this.form2.averagePrice = row.averagePrice;
            this.form2.developMessage = row.developMessage;
            this.form2.plateAddress = row.address;
            this.form2.plateName = row.plateName;
            this.form2.plateId = row.plateId;
            this.editVisible2 = true;
        },
        selectLabel() {
            userApi.selectLabel({ type: 'area' }, (res) => {
                console.log('区域定位标签', res);
                this.areaData = res.data.data;
            });
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    userApi.deletedPlate({ plateId: row.plateId }, (res) => {
                        console.log(res);
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    });
                })
                .catch(() => {});
        },
        onSubmit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(this.form);
                    userApi.addPlate(this.form, (res) => {
                        console.log(res);
                        this.$message.success('提交成功!');
                        this.editVisible = false;
                        this.$refs[form].resetFields();
                        this.selectPlate()
                    });
                } else {
                    console.log('error submit!!');
                    //  this.$refs[form].resetFields();
                    return false;
                }
            });
        },
        selectPlate() {
            userApi.selectPlate((res) => {
                console.log(res.data);
                this.tableData = res.data.data;
                this.pageTotal = this.tableData.length;
                this.tableData.forEach((item) => {
                    // item.averagePrice = (item.averagePrice / 100).toFixed(2);
                });
                this.editVisible = false;
            });
        },
        // --------------------------------------------------------------
        // 获取 easy-mock 的模拟数据

        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            // this.getData();
        },

        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // delAllSelection() {
        //     const length = this.multipleSelection.length;
        //     let str = '';
        //     this.delList = this.delList.concat(this.multipleSelection);
        //     for (let i = 0; i < length; i++) {
        //         str += this.multipleSelection[i].name + ' ';
        //     }
        //     this.$message.error(`删除了${str}`);
        //     this.multipleSelection = [];
        // },

        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            // this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
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
