<template>
    <!-- ------------------------------------------------材料库管理---------------------------------------------------------------------------------------- -->
    <div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-input v-model="query.name" placeholder="根据材料库查询" class="handle-input mr10"></el-input> -->
                <!-- <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button> -->
                <el-button type="primary" style="float: right; margin: 20px" @click="add">添加</el-button>
            </div>

            <!-- <pdf src="../../../assets/ces.pdf"></pdf> -->
            <!-- <a href="http://39.98.126.20:7004/user/File/getFile?id=59">pdf</a> -->
            <!-- <div @click="Onpreview">44444</div> -->
            <el-table
                :data="tableData.slice((query.pageIndex - 1) * query.pageSize, query.pageIndex * query.pageSize)"
                class="table"
                row-key="categoryId"
                border
                default-expand-all
                :tree-props="{ children: 'selectLibraryCategories' }"
            >
                <!-- <el-table-column prop="date" label="序列号" sortable> </el-table-column> -->
                <el-table-column align="center" type="index" width="400" label="序列号"></el-table-column>
                <el-table-column prop="categoryName" label="类目名称" sortable>
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
        <el-dialog :title="title" class="abow_dialog" :visible.sync="editVisible" width="65%" center>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="类目名称">
                    <el-input class="el-input-item" v-model="form.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="上级类目">
                    <el-cascader
                        v-model="form.parentCategoryId"
                        :options="tableData"
                        @change="change"
                        :props="{
                            checkStrictly: true,
                            multiple: false,
                            children: 'selectLibraryCategories',
                            label: 'categoryName',
                            value: 'categoryId'
                        }"
                        clearable
                    ></el-cascader>
                </el-form-item>
                <el-form-item v-if="form.isAddText == 0" label="类目文件">
                    <el-upload
                        class="upload-demo"
                        :action="action"
                        :on-change="handleChange"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeUpload"
                        :on-preview="Onpreview"
                        list-type="picture"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="primary">上传pdf/CAD文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item v-if="form.isAddText == 0" label="类目详情">
                    <tinymce @fatherMethod="fatherMethod" style="margin: 10px" ref="blc" :id="'tinymceBzlc'"></tinymce>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import tinymce from '@/components/common/tinymce.vue';
import { fetchData } from '../../../api/index';
import userApi from '@/service/user.js';
import pdf from 'vue-pdf';
export default {
    name: 'basetable',
    components: { tinymce, pdf },
    data() {
        return {
            action: 'http://39.98.126.20:7004/user/File/fileUpLoadFile',
            fileList: [],

            title: '',
            selectPremisesData: '',
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            form: {
                isAddText: 0,
                categoryName: '', // 类名称
                libraryId: '1', // 库id
                parentCategoryId: '0', // 上级类目id 顶级传0
                text: '', // 文本或者图片
                type: 'text' // 文本或者图片类型
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
    watch: {
        // 监听路由变化，路由变化的时候请求页面数据
        $route: function () {
            console.log('刷新');
            this.getData();
            this.selectPremises();
        }
    },
    created() {
        // console.log()
        this.getData();
        this.selectPremises();
        this.form.libraryId = this.$route.query.id;
    },
    methods: {
        Onpreview(e) {
            // console.log(e.response.data);

            window.open(e.response.data);
        },
        change(e) {
            console.log(e);
            let i = e.length - 1;
            console.log(i);
            this.form.parentCategoryId = e[i];
            console.log('this.parentCategoryId', this.form.parentCategoryId);
            // for(i=0;i < -1;i)
        },
        // ---------------------------------------------------------
        handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res);
            this.form.text = res.data;
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-3);
            // this.fileList = []
        },
        beforeUpload(file) {
            if (file.size / 1024 / 1024 > 1) {
                Vue.$vux.toast.text('上传文件不超过1M');
                return false;
            }
            var ext = file.name.substring(file.name.lastIndexOf('.') + 1);
            const extension = ext === 'pdf';
            if (extension) {
                console.log('pdf');
                this.form.type = 'pdf';
                // this.action = 'http://39.98.126.20:7004/user/File/fileUpLoad';
            } else {
                console.log('图片');
                // this.action = 'http://39.98.126.20:7004/user/File/fileDelete';
            }
        },
        fatherMethod() {
            console.log(12);
            // this.dialogDetails = true;
            // this.dialogshow = true;
        },
        //   ---------------------------------------------------------
        selectPremises() {
            userApi.selectPremises({}, (res) => {
                console.log('楼盘', res);
                this.selectPremisesData = res.data.data;
            });
        },
        add() {
            this.title = '添加';
            this.editVisible = true;
            this.form.isAddText = 0;
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            // fetchData(this.query).then(res => {
            //     console.log(res);
            //     this.tableData = res.list;
            //     this.pageTotal = res.pageTotal || 50;
            // });
            userApi.selectLibraryDetails({ libraryId: this.$route.query.id }, (res) => {
                console.log('查询库详情', res);
                this.tableData = res.data.data;
                this.pageTotal = this.tableData.length;
            });
        },
        // 添加
        saveEdit() {
            if (this.title == '编辑') {
                if (this.form.type == 'text') {
                    this.form.text = this.$refs.blc.release();
                }
                if (this.form.text == '') {
                    this.form = {
                        categoryName: this.form.categoryName,
                        libraryId: this.form.libraryId,
                        parentCategoryId: this.form.parentCategoryId
                    };
                }
                userApi.updateLibraryCategory(this.form, (res) => {
                    console.log('编辑', res);
                    this.$message.success('编辑成功');
                    this.editVisible = false;
                    this.form = {
                        categoryName: '', // 类名称
                        libraryId: '1', // 库id
                        parentCategoryId: '0', // 上级类目id 顶级传0
                        text: '', // 文本或者图片
                        type: 'text' // 文本或者图片类型
                    };
                    setTimeout(() => {
                        this.$refs.blc.setData('');
                    }, 10);
                    (this.fileList = []), this.getData();
                });
            } else {
                if (this.form.type == 'text') {
                    this.form.text = this.$refs.blc.release();
                }
                if (this.form.text == '') {
                    this.form = {
                        categoryName: this.form.categoryName,
                        libraryId: this.form.libraryId,
                        parentCategoryId: this.form.parentCategoryId
                    };
                }
                console.log(this.form);
                // console.log(richText);
                userApi.addLibraryaddCategory(this.form, (res) => {
                    console.log('添加', res);
                    this.$message.success('添加成功');
                    this.editVisible = false;
                    this.form = {
                        categoryName: '', // 类名称
                        libraryId: '1', // 库id
                        parentCategoryId: '0', // 上级类目id 顶级传0
                        text: '', // 文本或者图片
                        type: 'text' // 文本或者图片类型
                    };
                    setTimeout(() => {
                        this.$refs.blc.setData('');
                    }, 10)((this.fileList = [])),
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
                    userApi.deleteLibraryCategory({ categoryId: row.categoryId }, (res) => {
                        console.log(res);
                        this.$message.success('删除成功');
                        // this.tableData.splice(index, 1);
                        this.getData();
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
            //遍历整个table数据
            this.tableData.forEach((item) => {
                //判断该行是否有子节点
                if ('selectLibraryCategories' in item) {
                    //遍历子节点
                    item.selectLibraryCategories.forEach((item2) => {
                        //判断该节点是否为我点击的节点
                        if (item2 == row) {
                            console.log(item); //输出父节点
                            this.form.parentCategoryId = item.categoryId;
                        }
                        // console.log('item2', item2);
                        if (item2.selectLibraryCategories.length > 0) {
                            //遍历子节点
                            item2.selectLibraryCategories.forEach((item3) => {
                                //判断该节点是否为我点击的节点
                                if (item3 == row) {
                                    // console.log(item2); //输出父节点
                                    this.form.parentCategoryId = item2.categoryId;
                                }
                                if (item3.selectLibraryCategories.length > 0) {
                                    //遍历子节点
                                    item3.selectLibraryCategories.forEach((item4) => {
                                        //判断该节点是否为我点击的节点
                                        if (item4 == row) {
                                            // console.log(item3); //输出父节点
                                            this.form.parentCategoryId = item3.categoryId;
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            console.log(row);
            console.log(row.type);
            this.idx = index;
            this.title = '编辑';
            this.form.categoryName = row.categoryName;
            this.form.categoryId = row.categoryId;
            this.form.isAddText = row.isAddText;
            this.editVisible = true;
            console.log(this.form.parentCategoryId);
            this.fileList = [];
            setTimeout(() => {
                this.$refs.blc.setData('');
            }, 10);
            if (row.type != undefined) {
                if (row.type == 'TEXT') {
                    setTimeout(() => {
                        this.$refs.blc.setData(row.text);
                    }, 10);
                }
                if (row.type == 'PDF') {
                    let obj = {
                        name: row.type,
                        url: row.text
                    };
                    this.fileList.push(obj);
                }
            }
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
.el-input-item {
    width: 220px;
}
.dialog-footer {
    text-align: center;
    margin-bottom: 20px;
}
/deep/.el-upload-list {
    display: flex;
    flex-wrap: wrap;
}
/deep/.el-upload-list__item {
    width: 26%;
    margin: 8px;
}
/deep/.el-upload--text {
    border: 0px dashed #d9d9d9;
    width: 140px;
    height: 40px;
}

.abow_dialog {
    display: flex;
    justify-content: center;
    align-items: Center;
    overflow: hidden;
    /deep/.el-dialog {
        margin: 0 auto !important;
        height: 90%;
        overflow: hidden;
        /deep/.el-dialog__body {
            position: absolute;
            left: 0;
            top: 54px;
            bottom: 0;
            right: 0;
            padding: 0;
            z-index: 1;
            overflow: hidden;
            overflow-y: auto;
        }
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
