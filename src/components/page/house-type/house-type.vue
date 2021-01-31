<template>
    <!-- ------------------------------------------------户型数据管理中心---------------------------------------------------------------------------------------- -->
    <div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

                <el-button type="primary" style="float: right" @click="editVisible = true">添加户型</el-button>
                <el-button type="primary" style="float: right" @click="dialogFormVisible = true">添加</el-button>
                <el-select v-model="value" style="float: right" placeholder="请选择">
                    <el-option v-for="item in options2" :key="item.id" :label="item.constituteName" :value="item.id"> </el-option>
                </el-select>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="typeName" label="户型名称" align="center"></el-table-column>
                <el-table-column prop="premisesName" align="center" label="所属楼盘"></el-table-column>
                <el-table-column prop="area" align="center" label="户型面积"></el-table-column>
                <el-table-column align="supply" label="提供套数"></el-table-column>
                <el-table-column align="transaction" prop="address" label="成交套数"></el-table-column>

                <el-table-column align="ratio" prop="date" label="供求比"></el-table-column>
                <el-table-column align="center" prop="date" label="开间数"></el-table-column>
                <el-table-column align="center" prop="date" label="卧室数"></el-table-column>
                <el-table-column align="center" prop="date" label="厅数"></el-table-column>
                <el-table-column align="center" prop="date" label="卫生间"></el-table-column>
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

        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="20%">
            <el-form :model="countForm">
                <el-form-item label="属性名称">
                    <el-input v-model="countForm.constituteName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addroom">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="户型名称">
                    <el-input v-model="form.houseName"></el-input>
                </el-form-item>
                <el-form-item label="所属楼盘">
                    <el-select v-model="form.premisesId" placeholder="请选择">
                        <el-option :key="item.premisesId" v-for="item in PremisesData" :label="item.premisesName" :value="item.premisesId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属项目">
                    <el-input :disabled="true" v-model="form.name2"></el-input>
                </el-form-item>
                <el-form-item label="所属区域">
                    <el-input :disabled="true" v-model="form.name2"></el-input>
                </el-form-item>
                <el-form-item label="所属板块">
                    <el-input :disabled="true" v-model="form.name2"></el-input>
                </el-form-item>
                <el-form-item label="所属土地">
                    <el-input :disabled="true" v-model="form.name2"></el-input>
                </el-form-item>

                <el-form-item label="户型图">
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
                        <el-button size="small" type="">点击上传立面</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="">
                    <div class="img-box">
                        <div v-for="(item, i) in form.houseFiles" :key="i" class="img-item">
                            <img width="100%" :src="item" alt="" />
                            <i class="el-icon-close" @click="deletePicture(item)"></i>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="户型面积">
                    <el-input v-model="form.area"></el-input>
                </el-form-item>
                <el-form-item label="供应套数">
                    <el-input v-model="form.supply"></el-input>
                </el-form-item>
                <el-form-item label="成交套数">
                    <el-input style="width: 70%" v-model="form.transaction"></el-input>
                    <el-button style="margin: 0 10px" type="primary">添加</el-button>
                </el-form-item>

                <el-form-item :label="item.constituteName" v-for="item in options2" :key="item.id">
                    <el-input v-model="item.value" @blur="blur(item.value, item.id)"></el-input>
                </el-form-item>

                <el-form-item label="南向总面宽">
                    <el-input v-model="form.southWide"></el-input>
                </el-form-item>
                <el-form-item label="起居室面宽">
                    <el-input v-model="form.livingWide"></el-input>
                </el-form-item>
                <el-form-item label="主卧面宽">
                    <el-input v-model="form.masterWide"></el-input>
                </el-form-item>
                <el-form-item label="客卧面宽">
                    <el-input v-model="form.guestWide"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">表单提交</el-button>
                    <!-- <el-button>取消</el-button> -->
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible2" width="40%">
            <el-form ref="form" :model="form2" label-width="100px">
                <el-form-item label="户型名称">
                    <el-input v-model="form2.houseName"></el-input>
                </el-form-item>
                <el-form-item label="所属楼盘">
                    <el-select v-model="form2.premisesId" placeholder="请选择">
                        <el-option :key="item.premisesId" v-for="item in PremisesData" :label="item.premisesName" :value="item.premisesId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属项目">
                    <el-input :disabled="true" v-model="form2.name2"></el-input>
                </el-form-item>
                <el-form-item label="所属区域">
                    <el-input :disabled="true" v-model="form2.name2"></el-input>
                </el-form-item>
                <el-form-item label="所属板块">
                    <el-input :disabled="true" v-model="form2.name2"></el-input>
                </el-form-item>
                <el-form-item label="所属土地">
                    <el-input :disabled="true" v-model="form2.name2"></el-input>
                </el-form-item>

                <el-form-item label="户型图">
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
                        <el-button size="small" type="">点击上传立面</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="">
                    <div class="img-box">
                        <div v-for="(item, i) in form2.houseFiles" :key="i" class="img-item">
                            <img width="100%" :src="item" alt="" />
                            <i class="el-icon-close" @click="deletePicture(item, i)"></i>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="户型面积">
                    <el-input v-model="form2.area"></el-input>
                </el-form-item>
                <el-form-item label="供应套数">
                    <el-input v-model="form2.supply"></el-input>
                </el-form-item>
                <el-form-item label="成交套数">
                    <el-input style="width: 70%" v-model="form2.transaction"></el-input>
                    <el-button style="margin: 0 10px" type="primary">添加</el-button>
                </el-form-item>

                <el-form-item :label="item.constituteName" v-for="item in options2" :key="item.id">
                    <el-input v-model="item.value" @blur="blur(item.value, item.id)"></el-input>
                </el-form-item>

                <el-form-item label="南向总面宽">
                    <el-input v-model="form2.southWide"></el-input>
                </el-form-item>
                <el-form-item label="起居室面宽">
                    <el-input v-model="form2.livingWide"></el-input>
                </el-form-item>
                <el-form-item label="主卧面宽">
                    <el-input v-model="form2.masterWide"></el-input>
                </el-form-item>
                <el-form-item label="客卧面宽">
                    <el-input v-model="form2.guestWide"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit2">表单提交</el-button>
                    <!-- <el-button>取消</el-button> -->
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
// import { fetchData } from '../../../api/index';
import userApi from '@/service/user.js';
export default {
    name: 'basetable',
    data() {
        return {
            fileList: [],
            dialogFormVisible: false,
            value: '',
            options2: [],
            countForm: {
                constituteName: ''
            },
            PremisesData: '',
            form: {
                name: '',
                name2: '不可修改',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                options: [],

                area: '', // 户型面积
                constitute: {}, // 组成
                guestWide: '', // 客卧面宽
                houseFiles: [], //
                houseName: '', // 户型名称
                livingWide: '', // 起居室面宽
                masterWide: '', // 主卧面宽
                premisesId: '', // 楼盘id
                southWide: '', // 南向总面宽
                supply: '', // 供应套数
                transaction: '' // 成交套数
            },
            form2: {
                name: '',
                name2: '不可修改',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                options: [],

                area: '', // 户型面积
                constitute: {}, // 组成
                guestWide: '', // 客卧面宽
                houseFiles: [], //
                houseName: '', // 户型名称
                livingWide: '', // 起居室面宽
                masterWide: '', // 主卧面宽
                premisesId: '', // 楼盘id
                southWide: '', // 南向总面宽
                supply: '', // 供应套数
                transaction: '' // 成交套数
            },
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
            // form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
        this.selectConstitute();
        this.selectPremises();
    },
    methods: {
        selectPremises() {
            userApi.selectPremises({}, (res) => {
                console.log('楼盘', res);
                this.PremisesData = res.data.data;
            });
        },
        // 删除图片
        deletePicture(item, index) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    console.log(item);
                    userApi.deletePicture({ Files: item }, (res) => {
                        console.log(res);
                        this.options2 = res.data.data;
                        this.form2.houseFiles.splice(index, 1);
                        this.form.houseFiles.splice(index, 1);
                    });
                })
                .catch(() => {});
        },
        blur(value, id) {
            console.log('value', value);
            console.log('id', id);
            this.form.constitute[id] = value;
            console.log('constitute', this.form.constitute);
        },
        selectConstitute() {
            userApi.selectConstitute((res) => {
                console.log(res);
                this.options2 = res.data.data;
            });
        },
        addroom() {
            userApi.addConstitute(this.countForm, (res) => {
                console.log(res);
                this.$message.success('提交成功！');
                this.dialogFormVisible = false;
            });
        },
        onSubmit() {
            console.log(this.form)
            this.form.constitute = JSON.stringify(this.form.constitute);
            userApi.addType(this.form, (res) => {
                console.log(res);
                this.$message.success('提交成功！');
                this.editVisible = true;
                this.form = {
                    name: '',
                    name2: '不可修改',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    options: [],

                    area: '', // 户型面积
                    constitute: {}, // 组成
                    guestWide: '', // 客卧面宽
                    houseFiles: [], //
                    houseName: '', // 户型名称
                    livingWide: '', // 起居室面宽
                    masterWide: '', // 主卧面宽
                    premisesId: '1', // 楼盘id
                    southWide: '', // 南向总面宽
                    supply: '', // 供应套数
                    transaction: '' // 成交套数
                };
            });
        },
        onSubmit2() {
            // this.form.constitute = JSON.stringify(this.form.constitute);
            userApi.updateType(this.form, (res) => {
                console.log(res);
                this.$message.success('修改成功！');
                this.editVisible2 = true;
            });
        },
        // -------------------------------图片-----------------------------------
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res);
            this.form.houseFiles.push(res.data);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            // this.form.houseFiles =
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
        // 获取 easy-mock 的模拟数据
        getData() {
            // fetchData(this.query).then((res) => {
            //     console.log(res);
            //     this.tableData = res.list;
            //     this.pageTotal = res.pageTotal || 50;
            // });
            userApi.selectType({}, (res) => {
                console.log(res);
                this.tableData = res.data.data;
            });
        },

        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
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
                    userApi.deleteType({ houseId: row.typeId }, (res) => {
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
            this.idx = index;
            this.form2.houseName = row.typeName;
            this.form2.houseId = row.typeId;
            this.form2.guestWide = row.guestWide;
            this.form2.area = row.area;
            this.form2.houseFiles = row.files;
            this.form2.livingWide = row.livingWide;
            this.form2.masterWide = row.masterWide;
            this.form2.premisesId = row.premisesId;
            this.form2.southWide = row.southWide;
            this.form2.supply = row.supply;
            this.form2.transaction = row.transaction;
            this.editVisible2 = true;
        },
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

<style  lang="less" scoped>
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
