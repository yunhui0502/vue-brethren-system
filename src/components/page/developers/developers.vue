<template>
    <!-- ------------------------------------------------项目数据管理中心---------------------------------------------------------------------------------------- -->
    <div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-input v-model="query.name" placeholder="根据项目名称查询" class="handle-input mr10"></el-input> -->
                <!-- <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button> -->
                <!-- <el-button type="primary" style="float: right" @click="add">添加项目</el-button> -->
                <el-button type="primary" class="mr10" style="float: right" @click="dialogFormVisible = true">添加开发商</el-button>
                <!-- <el-select v-model="value" style="float: right" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.id" :label="item.exploitName" :value="item.id"> </el-option>
                </el-select> -->
            </div>
            <el-table
                :data="tableData.slice((query.pageIndex - 1) * query.pageSize, query.pageIndex * query.pageSize)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="id" align="center" label="ID"></el-table-column>
                <el-table-column prop="exploitName" align="center" label="开发商">
                    <!-- <template slot-scope="scope">
                        <div v-for="(item, i) in scope.row.developers" :key="i">{{ item }}</div>
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

        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="20%">
            <el-form :model="countForm">
                <el-form-item label="开发商名称">
                    <el-input v-model="countForm.exploitName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
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
            title: '',
            selectPremisesData: '',
            Premisesarr: [],
            options: [],
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            form: {
                projectName: '',
                exploitId: '',
                developersName: '112'
            },
            countForm: {
                exploitName: ''
            },
            tableData: [],
            dialogFormVisible: false,
            multipleSelection: [],
            delList: [],
            editVisible2: false,
            pageTotal: 0,
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },

    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            userApi.selectExploit((res) => {
                console.log('新建', res);
                this.tableData = res.data.data;
                this.pageTotal = this.tableData.length;
                console.log('this.tableData', this.tableData);
            });
        },
        // 添加
        saveEdit() {
            if (this.title == '编辑') {
                userApi.updateExploit(this.countForm, (res) => {
                    console.log('编辑', res);
                    this.$message.success('编辑成功');
                    this.dialogFormVisible = false;
                    this.countForm = {
                        exploitName: ''
                    };
                    this.getData();
                });
            } else {
                userApi.addExploit(this.countForm, (res) => {
                    console.log(res);
                    this.$message.success('添加成功！');
                    this.dialogFormVisible = false;
                    this.countForm = {
                        exploitName: ''
                    };
                    this.getData();
                });
            }
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
                    userApi.deletedExploit({ id: row.id }, (res) => {
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
            this.countForm.exploitName = row.exploitName;
            this.countForm.id = row.id;
            this.dialogFormVisible = true;
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
    margin: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
