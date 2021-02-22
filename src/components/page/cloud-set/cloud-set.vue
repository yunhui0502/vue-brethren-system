<template>
    <!-- ------------------------------------------------云管理设置---------------------------------------------------------------------------------------- -->
    <div>
        <div class="container">
            <div class="handle-box">
                <div @click="tab(1)" :class="tabIndex == 1 ? 'button' : 'butt'">权限设置</div>
                <div @click="tab(2)" :class="tabIndex == 2 ? 'button' : 'butt'">系统设置</div>
            </div>
            <el-button
                v-if="tabIndex == 1"
                style="float: right; margin: 10px"
                type="primary"
                icon="el-icon-plus"
                @click="editVisible = true"
                >添加管理员</el-button
            >
            <div v-if="tabIndex == 1">
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
                    <el-table-column prop="userName" align="center" label="账号"></el-table-column>
                    <el-table-column prop="date" align="center" label="密码">
                        <template slot-scope="">
                            <div>************</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" align="center" label="手机号"></el-table-column>

                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-remove-outline" @click="disabled(scope.$index, scope.row)">禁用</el-button>
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

            <div v-if="tabIndex == 2" class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="软件名称">
                        <el-input v-model="systemForm.name" placeholder="请输入软件系统名称"></el-input>
                    </el-form-item>

                    <el-form-item label="loge图片">
                        <el-upload
                            class="upload-demo"
                            action="http://39.98.126.20:7004/user/File/fileUpLoad"
                            :on-preview="handlePreview"
                            :on-success="handleAvatarSuccess"
                            :on-remove="handleRemove"
                            :limit="1"
                            :before-remove="beforeRemove"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="">
                        <div class="img-box">
                            <div class="img-item">
                                <img width="100%" :src="systemForm.login" alt="" />
                                <!-- <i class="el-icon-close" @click="deletePicture(item)"></i> -->
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="底部版权信息">
                        <el-input v-model="form.BottomCopyright" placeholder="请输入版权信息"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <!-- <el-button>取消</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :rules="rules" :model="form" label-width="70px">
                <el-form-item label="账号" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="form.phone"></el-input>
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
export default {
    name: 'basetable',
    data() {
        // 验证手机号的校验规则
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
            rules: {
                phone: [
                    { message: '请输入手机号', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ],
                password: [{ required: true, message: '密码', trigger: 'blur' }],
                userName: [{ required: true, message: '请输入账号', trigger: 'change' }]
            },
            // -----------------------------------
            tabIndex: 1,
            fileList: [],
            form: {
                userName: '',
                password: '',
                phone: ''
            },
            systemForm: {
                BottomCopyright: '',
                login: '',
                name: ''
            },
            // -----------------------------------
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
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
                    userApi.addLogin(this.form, (res) => {
                        console.log(res);
                        this.$message.success(`添加成功`);
                        this.editVisible = false;
                        this.$refs[form].resetFields();
                    });
                } else {
                    console.log('error submit!!');
                    //  this.$refs[form].resetFields();
                    return false;
                }
            });
        },
        onSubmit() {
            userApi.system(this.systemForm, (res) => {
                console.log(res);
                this.$message.success('提交成功！');
            });
        },
        // ----------------------图片--------------------------
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res);
            this.systemForm.login = res.data;
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
        // -------------------------------------------------------
        tab(e) {
            this.tabIndex = e;
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            userApi.loginSelect((res) => {
                console.log(res);
                this.tableData = res.data.data;
                this.pageTotal = this.tableData.length;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            // this.getData();
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
        // 禁用
        disabled(index, row) {
            this.idx = index;
            console.log(row.userId);
            userApi.forbid({ userId: row.userId }, (res) => {
                console.log(res);
                this.$message.error(`已禁用`);
                // this.editVisible = true;
            });
        },

        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style lang="less" scoped>
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
.form-box {
    margin: 0 auto;
}
.classimg {
    width: 240px;
    height: 240px;
}
.handle-box {
    margin-bottom: 20px;
    display: flex;
    .butt {
        height: 40px;
        line-height: 40px;
        width: 160px;
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        background-color: #b6b9be;
        margin: 20px;
    }
    .button {
        height: 40px;
        line-height: 40px;
        width: 160px;
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        margin: 20px;
        background-color: #409eff;
    }
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
