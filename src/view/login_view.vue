<template>
    <div >
        <Row type='flex' justify="center">
            <Col span="15" style="height:150px"></Col>
        </Row>
        <Row type='flex' justify="center">
            <Col span="12">
                <Layout >
                    <Content style="display:flex;justify-content:center;background-color:#ffffff">
                        <Card class="Card">
                            <div style="text-align:center">
                                <img  src="../assets/icon.png">
                            </div>
                            <br>
                            <h1 style='text-align:center;font-size:32px'>登录</h1>
                            <div style="background-color:#dddddd;height:2px;"></div>
                            <br>
                            <Form class="Form" ref="loginForm" :model="loginData" :rules="loginDataValidateRules" >
                                <FormItem  prop="phone">
                                    <Input v-model="loginData.phone" placeholder="请输入电话号码"></Input>
                                </FormItem>
                                <FormItem prop="password">
                                    <Input type="password" v-model="loginData.password" placeholder="请输入密码"></Input>
                                </FormItem>
                                <FormItem style="text-align:center">
                                    <Button type="primary" @click="submit('loginForm')" :loading='loading' size="large">
                                        <span v-if='loading'>登录中</span>
                                        <span v-else>登录</span>
                                    </Button>   
                               </FormItem>
                            </Form>
                        </Card>
                    </Content>
                </Layout>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginData:{
                phone:"",
                password:"",
            },
            loading: false,
            loginDataValidateRules:{
                phone:[
                    {
                        required: true, message: '用户名不能为空', trigger: 'blur'
                    }
                ],
                password:[
                    {
                        required: true, message: '密码不能为空', trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods:{
        submit(hrefName){
            this.loading=true;
            this.$refs[hrefName].validate((valid)=>{
                if(valid)
                {
                    let url='http://localhost:3000/login/cellphone';
                    this.$axios.get(url,{params:{phone:this.loginData.phone,password:this.loginData.password}}).then(response=>{
                        this.$Message.success('登录成功');
                        // console.log('登录成功')
                        this.loading=false;
                        // this.$store.commit('login')
                        // localStorage.setItem("token",this.phone)
                        // localStorage.setItem("uid",response.data.account.id)
                        window.sessionStorage.setItem('uid',response.data.account.id)
                        // localStorage.setItem('cookie',response.data.cookie)
                        this.$router.push("/home")
                    }).catch(error=>{
                        this.$Message.error('登录失败');
                        this.loading=false
                        // console.log('登录失败')
                    })
                }
                else{
                    this.$Message.error("请输入有效的信息")
                    this.loading=false;
                }
            })
        },
        reset(hrefName){
            console.log("重置");
            this.$refs[hrefName].resetFields();
        }
    },
    // beforeRouteEnter: (to, from, next) => {
    //     console.log(this.$store.getters.getLogin)
    //     if(!this.$store.getters.getLogin)
    //     {
    //         next();     //如果未登录，则显示这个View
    //     }
    //     else{
    //         this.$router.push('/home'); //如果登录了，则跳到home
    //     }
    // }
}
</script>

<style scoped>
.Card{ 
    border-radius:30px;
    width: 370px;
}
.Form{
    padding: 5%;
}
</style>