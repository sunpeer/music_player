<template>
    <!-- <Row type='flex' justify='start'> 
        <Col span="8">
            <Menu active-name="1">
                <MenuItem name="1">
                    <Icon type="md-document" />
                    文章管理
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="md-chatbubbles" />
                    评论管理
                </MenuItem>
                <MenuItem name="3">
                    <Icon type="md-heart" />
                    用户留存
                </MenuItem>
                <MenuItem name="4">
                    <Icon type="md-leaf" />
                    流失用户
                </MenuItem>
            </Menu>
        </Col>
        <Col span="16">
            hello World
            <br/>
            <div style="border:1px solid red;width:300px;height:300px"/>
        </Col>
    </Row> -->

    <!-- <Layout style="backgroud-color:white"> -->
    <Layout>
        <Sider style="overflow:hidden" >
            <div align="center">
                <br/>
                <Avatar style="left" src="http://p1.music.126.net/N_kVhQJvq-TDpyySeZGD7g==/3433774828897279.jpg" size="80"/>
                <br/>
                <br/>
            </div>
            <Menu active-name="1" theme="dark">
                <MenuItem name="1">
                    <Icon type="md-document" />
                    <router-link to="/home/profile" append>个人资料</router-link>
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="md-heart" />
                    <router-link to="/home/favorite" append>我的收藏</router-link>
                </MenuItem>
                <MenuItem name="3">
                    <Icon type="md-chatbubbles" />
                    <router-link to="/home/playlists" append>我的歌单</router-link>
                </MenuItem>
            </Menu>
        </Sider>
        <!-- <Layout style="backgroud-color:#ffffff"> -->
        <Layout style="margin-left:10px">
            <!-- <Content style="backgroud-color:#ffffff"> -->
            <Content>
                <!-- <div style="border:1px solid red;width:300px;height:300px"/> -->
                <router-view></router-view>
            </Content>
        </Layout>
    </Layout>
</template>


<script>


export default {
    
}
</script>

<style scoped>
    /* Layout,Sider,Content{
        background-color: white;
    } */
</style>