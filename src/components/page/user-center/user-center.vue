<template>
    <!-- ------------------------------------------------用户中心---------------------------------------------------------------------------------------- -->
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.userName" placeholder="通过用户名搜索" class="handle-input mr10"></el-input>
                <el-input v-model="query.phone" placeholder="通过手机号搜索" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
                <el-button type="primary" style="float: right; margin: 10px" icon="el-icon-plus" @click="editVisible = true"
                    >添加用户</el-button
                >
            </div>

               <el-table
                    align="center"
                    :data="tableData.slice((query.pageIndex - 1) * query.pageSize, query.pageIndex * query.pageSize)"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column prop="userId" align="center" label="ID" width="55"></el-table-column>
                    <el-table-column prop="name" align="center" label="名称"></el-table-column>
                    <el-table-column prop="userName" align="center" label="用户名"></el-table-column>
                    <el-table-column prop="date" align="center" label="密码">
                        <template slot-scope="">
                            <div>************</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" align="center" label="手机号"></el-table-column>
                    <el-table-column prop="email" align="center" label="邮箱"></el-table-column>

                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <!-- <el-button type="text" v-if="scope.row.state ==0" icon="el-icon-remove-outline" @click="disabled(scope.$index, scope.row)">禁用</el-button>
                            <el-button type="text" v-if="scope.row.state == 1 " icon="el-icon-remove-outline" @click="disabled2(scope.$index, scope.row)"
                                >启用</el-button
                            > -->
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
        <el-dialog title="添加" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :rules="rules" :model="form" label-width="70px">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../api/index';
import userApi from '@/service/user.js';
import Api from '@/api/user.js';
export default {
    name: 'basetable',
    data() {
        let checkMobile = (rule, value, callback) => {
            // 验证手机号的正则表达式
            const regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/;

            if (regMobile.test(value)) {
                // 合法的手机号
                return callback();
            }
            // 不合法
            callback(new Error('请输入合法的手机号'));
        };
        return {
            editVisible: false,
            rules: {
                phone: [
                    { message: '请输入手机号', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ],
                password: [{ required: true, message: '密码', trigger: 'blur' }],
                userName: [{ required: true, message: '请输入账号', trigger: 'change' }]
            },
            query: {
                address: '',
                userName:'',
                name: '',
                phone:'',
                pageIndex: 1,
                pageSize: 10
            },
             form: {
                userName: '',
                password: '',
                phone: '',
                email:'',
                name:'',
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            pageTotal: 0,
            // form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
              // 保存编辑
        saveEdit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(this.form);
                    // userApi.addUsert(this.form, (res) => {
                    //     console.log(res);
                    //     this.$message.success(`添加成功`);
                    //     this.editVisible = false;
                    //     this.$refs[form].resetFields();
                    // });
                              Api.addUsert(this.form)
                        .then((res) => {
                            console.log(res);
                            this.$message.success(`添加成功`);
                            this.editVisible = false;
                        })
                        .catch((error) => {
                            console.log(error.response);
                            if (error.response.status > 399) {
                                this.$message.error(error.response.data.message+'重复');
                            }
                        });
                } else {
                    console.log('error submit!!');
                    //  this.$refs[form].resetFields();
                    return false;
                }
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
            if (this.query.name != '') {
                Obj.adminId = this.query.adminId;
            }
            if (this.query.phone != '') {
                Obj.plateId = this.query.plateId;
            }
            userApi.userSelect(Obj,(res) => {
                console.log(res);
                this.tableData = res.data.data;

                this.pageTotal = this.tableData.length;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    userApi.loginDelete({ userId: row.userId }, (res) => {
                        console.log(res);
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
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
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
    width: 200px;
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
