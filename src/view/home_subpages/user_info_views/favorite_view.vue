<template>
    <div align='center'>
        <br/>
        <br/>
        <br/>
        喜欢的音乐人：{{favorite.artistCount}}个
        <br/>
        自己创建的歌单：{{favorite.createdPlaylistCount}}个
        <br/>
        订阅的歌单：{{favorite.subPlaylistCount}}个
        <br/>
    </div>
</template>

<script>
export default {
    created(){
        this.$axios.get("http://localhost:3000/user/subcount").then(res=>{
            this.favorite=res.data
        }).catch(e=>{
            this.$Message.error('获取用户收藏数据失败')
        })
    },
    data(){
        return {
            favorite:{}
        }
    }
}
</script>

<style>

</style>