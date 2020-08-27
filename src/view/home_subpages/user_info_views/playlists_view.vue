<template>
    <List item-layout="vertical">
        <ListItem v-for='item in playlists'>
            <ListItemMeta :title="item.name" :description="item.description"/>
            {{item.trackCount}}首歌 
            <br/>
            由{{item.creator.nickname}}创建
            <template slot='extra'>
                <img :src='item.coverImgUrl' style="width:100px">
            </template>
        </ListItem>
    </List>
</template>

<script>
export default {
    created(){
        let uid=window.sessionStorage.getItem('uid')
        this.$axios.get("http://localhost:3000/user/playlist",{params:{uid}}).then(res=>{
            // console.log(res.data)
            this.playlists=res.data.playlist
        }).catch(e=>{
            this.$Message.error("获取用户歌单失败")
        })
    },
    data(){
        return {
            playlists:[]
        }
    }
}
</script>

<style>

</style>