<template>
    <div>
        <!-- ------------------------------------------------ 标签数据管理中心 ---------------------------------------------------------------------------------------- -->
        <div class="container">
            <div class="handle-box">
                <div @click="tab(1)" :class="tabIndex == 1 ? 'button' : 'butt'">区域定位标签</div>
                <div @click="tab(2)" :class="tabIndex == 2 ? 'button' : 'butt'">产品类型标签</div>
            </div>
            <!-- 第一部分 -->
            <div v-if="tabIndex == 1">
                <div class="head">区域定位标签 <el-button @click="editVisible = true" type="primary">添加标签</el-button></div>
                <div class="el-tag-box">
                    <div class="el-tag-item" v-for="(item, i) in areaData" :key="i">{{ item.labelName }}</div>
                 
                </div>
            </div>

            <!-- 第二部分 -->
            <div v-if="tabIndex == 2">
                <div class="head">产品类型标签 <el-button @click="editVisible2 = true" type="primary">添加标签</el-button></div>
                <div class="el-tag-box">
                    <div class="el-tag-item" v-for="(item, i) in productData" :key="i">
                        {{ item.labelName }}
                    </div>
                </div>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="添加区域定位标签" :visible.sync="editVisible" width="30%" center>
            <el-form ref="form" :rules="rules" :model="form" label-width="70px">
                <el-form-item label="标签名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加产品类型标签" :visible.sync="editVisible2" width="30%" center>
            <el-form ref="form2" :rules="rules" :model="form2" label-width="70px">
                <el-form-item label="标签名" prop="name">
                    <el-input v-model="form2.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit2('form2')">确 定</el-button>
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
        return {
            rules: {
                name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }]
            },
            // -----------------------------------
            productData: '',
            areaData: '',
            tabIndex: 1,
            fileList: [],
            form: {
                name: '',
                type: 'area'
            },
            form2: {
                name: '',
                type: 'product'
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
            editVisible2: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
        this.selectLabel();
        this.selectLabel2();
    },
    methods: {
        selectLabel() {
            userApi.selectLabel({ type: 'area' }, (res) => {
                console.log('区域定位标签', res);
                this.areaData = res.data.data;
            });
        },
        selectLabel2() {
            userApi.selectLabel({ type: 'product' }, (res) => {
                console.log('产品类型标签', res);
                this.productData = res.data.data;
            });
        },
        // 添加区域定位标签
        saveEdit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    userApi.addLabel(this.form, (res) => {
                        this.$message.success(`添加成功`);
                        this.editVisible = false;
                        this.selectLabel();
                        this.$refs[form].resetFields();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 添加区域定位标签
        saveEdit2(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    userApi.addLabel(this.form2, (res) => {
                        this.$message.success(`添加成功`);
                        this.editVisible2 = false;
                        this.selectLabel2();
                        this.$refs[form].resetFields();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        tab(e) {
            this.tabIndex = e;
        },

        // ----------------------------------------------------------------------------------------------
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then((res) => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
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
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
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
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
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
.head {
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: #f5f7fa;

    .el-button {
        float: right;
        margin: 6px;
    }
}
.el-tag-box {
    display: flex;
    flex-wrap: wrap;
    .el-tag-item {
        width: 150px;
        height: 70px;
        border-radius: 10px;
        border:1px solid #C1C1C1;
        margin: 20px;
        text-align: center;
        line-height: 70px;
    }
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
