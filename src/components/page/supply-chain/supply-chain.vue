<template>
    <!-- ------------------------------------------------仓库管理---------------------------------------------------------------------------------------- -->
    <div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-input v-model="query.name" placeholder="根据仓库名称查询" class="handle-input mr10"></el-input> -->
                <!-- <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button> -->
                <el-button type="primary" style="float: right; margin: 20px" @click="add">添加</el-button>
            </div>

            <el-table
                :data="tableData.slice((query.pageIndex - 1) * query.pageSize, query.pageIndex * query.pageSize)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column prop="projectName" align="center" label="序号"></el-table-column> -->
                <el-table-column type="index" align="center" width="440" label="序号"> </el-table-column>
                <el-table-column prop="libraryName" align="center" label="库名称">
                    <!-- <template slot-scope="scope">
                        <div v-for="(item, i) in scope.row.landType.土地名称" :key="i">{{ item }}</div>
                    </template> -->
                </el-table-column>
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

        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="30%" center>
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                <el-form-item label="库名称" prop="libraryName">
                    <el-input v-model="form.libraryName"></el-input>
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
import userApi from '@/service/user.js';
export default {
    name: 'basetable',
    data() {
        return {
            rules: {
                libraryName: [{ required: true, message: '请输入库名称', trigger: 'blur' }]
            },

            title: '',
            selectPremisesData: '',
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            form: {
                libraryName: ''
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
        this.selectPremises();
    },
    methods: {
        selectPremises() {
            userApi.selectPremises({}, (res) => {
                console.log('楼盘', res);
                this.selectPremisesData = res.data.data;
            });
        },
        add() {
            this.title = '添加';
            this.editVisible = true;
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            // fetchData(this.query).then(res => {
            //     console.log(res);
            //     this.tableData = res.list;
            //     this.pageTotal = res.pageTotal || 50;
            // });
            userApi.selectLibrary((res) => {
                console.log('查询库', res);
                this.tableData = res.data.data;
                this.pageTotal = this.tableData.length;
            });
        },
        // 添加
        saveEdit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    if (this.title == '编辑') {
                        userApi.updateLibrary(this.form, (res) => {
                            console.log('编辑', res);
                            this.$message.success('编辑成功');
                            this.editVisible = false;
                            this.form = { libraryName: '' };
                            this.getData();
                        });
                    } else {
                        userApi.addLibrary(this.form, (res) => {
                            console.log('添加', res);
                            this.$message.success('添加成功');
                            this.editVisible = false;
                            this.form.libraryName = '';
                            this.getData();
                        });
                    }
                } else {
                    console.log('error submit!!');
                    //  this.$refs[form].resetFields();
                    return false;
                }
            });
        },
        // 触发搜索按钮
        handleSearch() {
            // this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            console.log(row);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    userApi.deleteLibrary({ libraryId: row.id }, (res) => {
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
        // 编辑操作
        handleEdit(index, row) {
            console.log(row);
            this.idx = index;
            this.title = '编辑';
            this.form.libraryName = row.libraryName;
            this.form.libraryId = row.id;
            this.editVisible = true;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            // this.getData();
        }
    }
};
</script>

<style lang="less" scoped>
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
