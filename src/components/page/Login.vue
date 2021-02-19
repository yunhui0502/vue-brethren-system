<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <!-- 账号登录 -->
            <el-form v-if="!onway" :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="userName ">
                    <el-input v-model="param.userName" placeholder="userName ">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="on-way">
                    <el-button @click="LodingType(0)" type="text">手机号登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>

            <!-- 手机号登陆 -->
            <el-form v-if="onway" :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="phone ">
                    <el-input v-model="param.phone" placeholder="phone ">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="password" v-model="param.passwd">
                        <el-button slot="prepend" icon="el-icon-message"></el-button>
                        <el-button @click="code" slot="append">获取验证码</el-button>
                    </el-input>
                </el-form-item>
                <div class="on-way">
                    <el-button @click="LodingType(1)" type="text">密码账号登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm2()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import userApi from '@/service/user.js';
import Apiuser from '@/api/user.js';
export default {
    data: function () {
        return {
            onway: false,
            param: {
                userName: 'admin',
                password: '123456',

                phone: '18830709007',
                passwd: ''
            },
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.loginSelect();
    },
    methods: {
        loginSelect() {
            userApi.loginSelect((res) => {
                //   this.$message.success('获取验证码');
                console.log(res);
                this.param.passwd = res.data.data;
            });
        },
        code() {
            userApi.code(this.param.phone, (res) => {
                this.$message.success('获取验证码');
                console.log(res);
                this.param.passwd = res.data.data;
            });
        },
        LodingType(e) {
            if (e == 0) {
                this.onway = true;
            } else {
                this.onway = false;
            }
        },

        submitForm() {
            Apiuser.adminLogin(this.param)
                .then( (res) => {
                    this.$message.success('登录成功');
                  localStorage.setItem('ms_username', this.param.userName);
                  this.$router.push('/');
                })
                .catch( (error) => {
                    console.log(error.response);
                    if(error.response.status > 399){
                     this.$message.error(error.response.data.message);
                    }
                });
            // Apiuser.adminLogin(this.param,( res) => {
            //       this.$message.success('登录成功');
            //       localStorage.setItem('ms_username', this.param.userName);
            //       this.$router.push('/');
            // });

            // this.$refs.login.validate(valid => {
            //     if (valid) {
            //         this.$message.success('登录成功');
            //         localStorage.setItem('ms_username', this.param.username);
            //         this.$router.push('/');
            //     } else {
            //         this.$message.error('请输入账号和密码');
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        },
        submitForm2() {
            userApi.phoneLogin(this.param, (res) => {
                console.log('登录', res);
                this.$message.success('登录成功');
                //   localStorage.setItem('ms_username', this.param.userName);
                //   this.$router.push('/');
            });
            // this.$refs.login.validate(valid => {
            //     if (valid) {
            //         this.$message.success('登录成功');
            //         localStorage.setItem('ms_username', this.param.username);
            //         this.$router.push('/');
            //     } else {
            //         this.$message.error('请输入账号和密码');
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        }
    }
};
</script>

<style scoped>
.on-way {
    display: flex;
    /* justify-content: space-around; */
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>