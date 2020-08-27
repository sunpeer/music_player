<template>
    <div>
        <!-- <Menu mode='horizontal' theme="light" active-name="album_newest">
            <MenuItem name="1" @on-select="changeMenuItem(name)">
            <MenuItem name="album_newest">
                最新专辑
            </MenuItem>
            <MenuItem name="recommend_songs">
                歌单推荐
            </MenuItem>
            <MenuItem name="user_home">
                我的主页
            </MenuItem>
        </Menu> -->
        <Tabs v-model="tabName" ref='nav'>
            <TabPane icon="ios-albums" label='最新专辑' name="album_newest">
                <albumNewest @playAlbumEvent="playMusic"></albumNewest>
            </TabPane>
            <TabPane icon="ios-microphone" label='歌单推荐' name="recommend_songs">
                <recommendSongs @playSong="playMusic"></recommendSongs>
            </TabPane>
            <TabPane icon="ios-contact" label='我的主页' name="user_home">
                <userHome></userHome>
            </TabPane>
            <TabPane icon="ios-musical-notes" label="播放歌曲" name="current_song">
                <curSong ref="curSong"></curSong>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import albumNewest from './home_subpages/album_newest_view'
import userHome from './home_subpages/user_home_view'
import recommendSongs from './home_subpages/recommend_songs_view'
import curSong from './home_subpages/current_song_view'

export default {
    data(){
        return {
            tabName :'album_newest'
        }
    },
    methods:
    {
        playMusic(song){
            // console.log("日志从父组件home_view "+songUrl)
            //改变导航选择项
            // this.$refs.nav.value="current_song"
            this.tabName="current_song"
            //让组件curSong播放音乐
            this.$refs.curSong.playSong(song)
        }
    },
    components:{
        albumNewest,
        userHome,
        recommendSongs,
        curSong
    },
    // beforeRouteEnter (to, from, next) {
    //     if(this.$store.getters.getLogin)
    //     {
    //         next()
    //     }
    //     else{
    //         this.$router.push('/login')
    //     }
    // }
}
</script>

<style scoped>

</style>