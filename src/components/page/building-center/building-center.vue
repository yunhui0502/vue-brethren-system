<template>
    <!-- ------------------------------------------------楼号数据管理中心---------------------------------------------------------------------------------------- -->
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
                <el-input v-model="query.typeName" placeholder="根据楼号查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
                <el-table-column prop="serial" align="center" label="序列号"></el-table-column>
                <!-- <el-table-column type="index" align="center" width="80" label="序列号"> </el-table-column> -->
                <el-table-column prop="premisesName" align="center" label="所属楼盘"></el-table-column>
                <el-table-column prop="towerName" align="center" label="楼号"></el-table-column>
                <el-table-column prop="address" align="center" label="数据同步楼号"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button type="text" icon="el-icon-edit" @click="library(scope.$index, scope.row)">添加库</el-button>
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
        <!-- 添加库数据弹出框 -->
        <el-dialog title="添加库数据" :visible.sync="editVisible2" width="50%" center>
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="选择添加数据库">
                    <div class="material-radio-group">
                        <el-radio-group v-model="towerForm.libraryIds" size="small">
                            <el-radio v-for="item in selectLibraryData" :key="item.id" :label="item.id" border>{{
                                item.libraryName
                            }}</el-radio>
                        </el-radio-group>

                        <div class="dialog-footer">
                            <!-- <span slot="footer" > -->
                            <el-button type="primary" @click="towerLibrary">确 定</el-button>
                            <!-- </span> -->
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="选择添加数据库分类">
                    <div class="material-tock-box">
                        <div
                            @click="buttTab(i, item.towerLibrarys, item.id)"
                            v-for="(item, i) in TowerLibraryData"
                            :key="item.id"
                            :class="TabIndex == i ? 'on' : 'material-tock-item'"
                        >
                            {{ item.libraryName }}
                        </div>
                        <!-- <div @click="buttTab(2)" :class="TabIndex == 2 ? 'on' : 'material-tock-item'">构造做法库</div> -->
                    </div>
                    <el-tree
                        :data="routeList"
                        show-checkbox
                        node-key="categoryId"
                        label="categoryId"
                        @check="changePort"
                        :default-expanded-keys="[]"
                        :default-checked-keys="checkedKeys"
                        :props="defaultProps2"
                    >
                    </el-tree>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="50%" center>
            <el-form ref="form" :rules="rules" :model="form" label-width="120px">
                <el-form-item label="楼号名称" prop="towerNo">
                    <el-input v-model="form.towerNo"></el-input>
                </el-form-item>
                <el-form-item label="同步楼号" prop="synchronizationNo">
                    <el-select v-model="form.synchronizationNo" placeholder="请选择">
                        <el-option v-for="item in tableData" :key="item.towerId" :label="item.towerName" :value="item.towerId"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属楼盘" prop="premisesId">
                    <el-select v-model="form.premisesId" placeholder="请选择">
                        <el-option
                            v-for="item in selectPremisesData"
                            :key="item.premisesId"
                            :label="item.premisesName"
                            :value="item.premisesId"
                        >
                        </el-option>
                    </el-select>
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
        return {
            rules: {
                towerNo: [{ required: true, message: '请输入楼号名称', trigger: 'blur' }],
                // synchronizationNo: [{ required: true, message: '请输入楼号名称', trigger: 'change' }],
                premisesId: [{ required: true, message: '请选择所属楼盘', trigger: 'change' }]
            },

            str: [
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z'
            ],
            selectPlateData: [],
            selectProjectData: [],
            administrative: [],

            checkedKeys: [],
            towerId: '',

            selectLibraryData: [],
            selectLibraryId: [],
            TowerLibraryData: [],

            TabIndex: -1,
            routeList: [],
            defaultProps2: {
                children: 'selectLibraryCategories',
                label: 'categoryName'
            },
            options: [],
            value: '',
            title: '',
            selectPremisesData: '',
            query: {
                adminId: '',
                plateId: '',
                projectId: '',
                typeName: '',
                pageIndex: 1,
                pageSize: 10
            },
            form: {
                premisesId: '', //所属楼盘id
                synchronizationNo: '', //同步数据的楼号
                towerNo: '' //楼号名称
            },
            towerForm: {
                libraryIds: '',
                towerId: '1'
            },
            categoryForm: {
                categoryIds: [],
                towerLibrarys: ''
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            editVisible2: false,
            pageTotal: 0,
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
        this.selectPremises();

        this.selectLibrary();
        this.selectLibraryDetails();

        this.selectProject();
        this.selectPlate();
        this.selectAdministrative();
    },
    methods: {
        generateMixed(n) {
            var res = '';
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * 26 - 1);

                res += this.str[id];
            }
            console.log(res);
            return res;
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
        towerLibrary() {
            this.towerForm.towerId = this.towerId;
            // console.log(this.selectLibraryId);
            userApi.towerLibrary(this.towerForm, (res) => {
                console.log(res);
                this.SelectTowerLibrary(this.towerId);
            });
        },
        selectLibraryDetails() {
            userApi.selectLibraryDetails({ libraryId: 1 }, (res) => {
                console.log('查询库详情', res);
                // this.routeList = res.data.data;
            });
        },
        selectLibrary() {
            userApi.selectLibrary((res) => {
                console.log('查询库', res);
                this.selectLibraryData = res.data.data;
            });
        },
        library(index, row) {
            console.log(index);
            console.log(row);
            this.editVisible2 = true;
            this.towerId = row.towerId;
            this.SelectTowerLibrary(row.towerId);
        },
        SelectTowerLibrary(id) {
            console.log(id);
            userApi.SelectTowerLibrary({ towerId: id }, (res) => {
                console.log('查询楼号下的库', res);
                this.TowerLibraryData = res.data.data;
            });
        },
        buttTab(e, towerLibrarys, id) {
            this.TabIndex = e;
            this.categoryForm.towerLibrarys = towerLibrarys;
            (this.checkedKeys = []),
                userApi.selectLibraryDetails({ towerId: this.towerId, libraryId: id }, (res) => {
                    console.log('查询库仓详情', res);
                    this.routeList = res.data.data;
                    this.routeList.forEach((item) => {
                        //判断该行是否有子节点
                        if (item.pitch == 0) {
                            this.checkedKeys.push(item.categoryId);
                        }
                        if ('selectLibraryCategories' in item) {
                            //遍历子节点
                            item.selectLibraryCategories.forEach((item2) => {
                                //判断该节点是否为我点击的节点
                                if (item2.pitch == 0) {
                                    this.checkedKeys.push(item2.categoryId);
                                }
                                // console.log('item2', item2);
                                if (item2.selectLibraryCategories.length > 0) {
                                    //遍历子节点
                                    item2.selectLibraryCategories.forEach((item3) => {
                                        if (item3.pitch == 0) {
                                            this.checkedKeys.push(item3.categoryId);
                                        }
                                        if (item3.selectLibraryCategories.length > 0) {
                                            //遍历子节点
                                            item3.selectLibraryCategories.forEach((item4) => {
                                                //判断该节点是否为我点击的节点
                                                if (item4.pitch == 0) {
                                                    this.checkedKeys.push(item4.categoryId);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
        },
        // 点击复选框执行
        changePort(data, e) {
            console.log('changePort', data);
            console.log(e);
            this.categoryForm.categoryIds = e.checkedKeys;
            console.log(this.categoryForm);
            userApi.towerLibraryCategory(this.categoryForm, (res) => {
                this.$message.success(`添加成功`);
            });
        },
        renderContent(h, { node, data, store }) {
            // 树节点的内容区的渲染 Function
            console.log('树节点的内容区的渲染 Function');
            let classname = '';
            var nodeLevel = 2;
            // 由于项目中有三级菜单也有四级级菜单，就要在此做出判断
            if (node.level === nodeLevel) {
                classname = 'foo';
            }
            // if (node.level === 3 && node.childNodes.length === 0) {
            //   classname = "foo";
            // }
            return h(
                'p',
                {
                    class: classname
                },
                node.label
            );
        },
        handleExpand() {
            // 节点被展开时触发的事件
            // 因为该函数执行在renderContent函数之前，所以得加this.$nextTick()
            this.$nextTick(() => {
                console.log('节点被展开时触发的事件');
                this.changeCss();
            });
        },
        changeCss() {
            console.log('document.getElementsByClassName');
            // var levelName = document.getElementsByClassName('foo'); // levelname是上面的最底层节点的名字
            for (var i = 0; i < levelName.length; i++) {
                // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
                // levelName[i].parentNode.style.cssFloat = 'left'; // 最底层的节点，包括多选框和名字都让他左浮动
                // levelName[i].parentNode.style.styleFloat = 'left';
                // levelName[i].parentNode.onmouseover = function () {
                //     this.style.backgroundColor = '#fff';
                // };
            }
        },
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
            if (this.query.typeName != '') {
                Obj.typeName = this.query.typeName;
            }
            userApi.selectTower(Obj, (res) => {
                console.log('查询', res);
                this.tableData = res.data.data;
                this.pageTotal = this.tableData.length;
                this.tableData.forEach((item) => {
                    item.serial = this.generateMixed(6) + '-' + item.towerName;
                });
            });
        },
        // 添加
        saveEdit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    if (this.title == '编辑') {
                        userApi.updateProject(this.form, (res) => {
                            console.log('编辑', res);
                            this.$message.success('编辑成功');
                            this.editVisible = false;
                            this.form = { projectName: '' };
                            this.getData();
                        });
                    } else {
                        userApi.addTower(this.form, (res) => {
                            console.log('添加', res);
                            this.$message.success('添加成功');
                            this.editVisible = false;
                            this.form.projectName = '';
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
                    userApi.deleteTower({ towerId: row.towerId }, (res) => {
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
            this.form.projectName = row.projectName;
            this.form.projectId = row.projectId;
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

<style  lang="less" scoped>
.material-radio-group {
    padding: 8px;
    border: 1px solid #ccc;
    .dialog-footer {
        text-align: center;
        margin: 0 auto;
        margin-top: 30px;
    }
}
.material-tock-box {
    padding: 8px;
    border: 1px solid #ccc;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    .material-tock-item {
        margin: 10px;
        border: 1px solid #ccc;
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .on {
        margin: 10px;
        background-color: #1bb4d9;
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
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
