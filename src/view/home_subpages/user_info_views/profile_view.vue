<template>
  <div align='center'>
      <br/>
      <br/>
      level {{level}}
      <br/>
      累积听歌{{listenSongs}}首
      <br/>
      关注 {{followeds}} | 粉丝 {{follows}}
  </div>
</template>

<script>
export default {    
    created(){
        let uid=window.sessionStorage.getItem('uid')
        this.$axios.get("http://localhost:3000/user/detail",{params:{uid}}).then(res=>{
            // console.log(res.data)
            this.level=res.data.level
            this.listenSongs=res.data.listenSongs
            this.followeds=res.data.profile.followeds
            this.follows=res.data.profile.follows
        }).catch(e=>{
            // console.log("something wrong")
            this.$Message.error("获取用户基本信息失败")
        })
    },
    data(){
        return{
            level:Number,
            listenSongs:Number,
            followeds:Number,
            follows:Number
        }
    }
}
</script>

<style>

</style>