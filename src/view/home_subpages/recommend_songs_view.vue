<template>
    <div>
        <!-- <ul>
            <li @click="playSong" v-for="i in likelist_songs">
                {{i.url}}
            </li>
        </ul> -->
        <List >
            <ListItem v-for="(song,key,i) in likelist_songs" :title="song.name">
                <ListItemMeta :description="song.artists" :title='song.name' :avatar="song.picUrl"/>
                <template>
                    <li>
                        <Icon type='ios-play' size="24" @click="playSong(song)"/>
                    </li>
                </template>
            </ListItem>
        </List>
    </div>
</template>

<script>
export default {
    created:function(){
        //主页一加载，就会调用此函数
        //获取用户的likelist
        let uid=sessionStorage.getItem('uid')
        let url='http://localhost:3000/likelist'
        // let date=new Date("2020-7-13")
        // let timestamp=date.getTime()
        // console.log('uid= ',uid)
        // this.$axios({url,params:{uid},headers:{cookie:"MUSIC_U=26abb34b9f35c88a49385a549a96d529e1316bdf34de094b260fececd508a56633a649814e309366; Expires=Sun, 06-Sep-2020 03:10:53 GMT; Path=/;__remember_me=true; Expires=Sun, 06-Sep-2020 03:10:53 GMT; Path=/;__csrf=d29f4df3f59a928c36de0b1dbe20c3bc; Expires=Sun, 06-Sep-2020 03:11:03 GMT; Path=/"},withCredentials:true}).then(res=>{
        // console.log(document.cookie)
        this.$axios(url,{params:{uid}}).then(res=>{
            // console.log("I'm gotten likelist ids")
            for(let i=0,songs=res.data.ids;i<songs.length;i++){
                this.likelist_songs[songs[i]]={}
            }
            let ids=res.data.ids.join(',')
            // console.log(ids)
            //获取歌曲详情
            this.$axios.get("http://localhost:3000/song/detail",{params:{ids}}).then(res=>{
                // console.log('获取用户喜欢音乐的歌曲名成功')
                for(let i=0,songs=res.data.songs;i<songs.length;i++){
                    // console.log(songs[i].id)
                    // console.log(this.likelist_songs)
                    // console.log(this.likelist_songs[songs[i].id])
                    // console.log(songs[i].name)
                    this.likelist_songs[songs[i].id].name=songs[i].name
                    this.likelist_songs[songs[i].id].picUrl=songs[i].al.picUrl
                    this.likelist_songs[songs[i].id].id=songs[i].id
                    // let artists=songs[i].artists.join(',')
                    let artist=[]
                    for(let j=0,artists=songs[i].ar;j<artists.length;j++){
                        artist.push(artists[j].name)
                    }
                    this.likelist_songs[songs[i].id].artists=artist.join(',')
                }
                // console.log(this.likelist_songs)
                this.$forceUpdate()
            }).catch(error=>{
                console.log('获取用户喜欢音乐的歌曲名失败')
            })
            this.$axios.get("http://localhost:3000/song/url",{params:{id:ids}}).then(res=>{
                // console.log('获取用户喜欢的音乐列表成功')
                for(let i=0 ,songs=res.data.data;i<songs.length;i++)
                    {
                        // console.log(songs[i].url)
                        this.likelist_songs[songs[i].id].url=songs[i].url
                    }
                this.$forceUpdate()
            }).catch(error=>{
                console.log("获取用户喜欢音乐的url失败")
            })
        }).catch(error=>{
            console.log("获取用户喜欢音乐列表失败")
        })
        // console.log("I'm after axios")
    },
    methods:{
        playSong(song){
            console.log("你选择播放 "+song.name+", 歌手："+song.artists+", url:"+song.url)
            this.$emit('playSong',song)
        }
    },
    data(){
        return {
            likelist_songs:{}
        }
    },
    updated:function(){
        // console.log(this.likelist_songs)
    }
}
</script>

<style scoped>

</style>