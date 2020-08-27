<template>
    <div>
        <Row type='flex' justify='center'>
            <Col span="8" >        
                <img :src="song.picUrl">
                <audio style="width:100%" :src="song.url" controls autoplay/>
            </Col>
        </Row>
        <Row type='flex' justify='center'>
            <Col span="12">
                <h2 >{{song.name}}</h2>
                <p ref="curLyric" id="curLyric"></p>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    created(){
    //     let eaudio=document.getElementsByTagName('audio')[0]
    //     eaudio.ontimeupdate=function(event){
    // //       console.log(eaudio.currentTime)
    //         let currentTime=eaudio.currentTime
    //         if(this.lyric[this.curIndex].t<currentTime&&currentTime<this.lyric[this.curIndex+1].t){
    //             return
    //         }
    //         this.curIndex=selectLyricLine(0,this.lyric.length-1,currentTime)
    // //      console.log(lyrics[curIndex])
    //         setCurLyric()
    //     }
    },
    mounted(){
        let eaudio=document.getElementsByTagName('audio')[0]
        eaudio.ontimeupdate=this.ontimeupdateHandler
    },
    methods:{
        playSong(song){
            // console.log("日志从子组件current_song "+songUrl)
            if(song.url==null){
                console.log("歌曲的url无效")
            }else{
                //获取lyrics
                this.$axios.get("http://localhost:3000/lyric",{params:{id:song.id}}).then(res=>{
                    // console.log(res.data)
                    song.songLyric=res.data.lrc.lyric
                    this.parseSongLyric(song.songLyric)
                    this.curIndex=0
                    this.song=song





                }).catch(error=>{
                    console.log('获取歌词失败')
                })
            }
        },
        //在这里遇到了很多坑：
        //1.当你需要用this里的东西时，要注意this是不是指的这个component了
        //2.settimeout这个函数，有三种用法：
        //①setTimeout("",ms)
        //②setTimeout(function(){},ms)
        //③setTimeout(fun,ms)
        //toFixed()这个函数返回string
        parseSongLyric(lyric){
            //解析歌词，得到时间段，歌词，以数组的形式储存
            // console.log(lyric)
            // this.$refs.curLyric.textContent=lyric
            let lyrics=lyric.split("\n")
            this.lyric=[]
            lyrics.pop()
            // console.log(lyrics)
            lyrics.forEach(item => {
                let interval=item.substring(item.indexOf('[')+1,item.indexOf(']'))
                let t=interval.split(":")[0]*60+parseFloat(interval.split(":")[1])
                let c=item.substring(item.indexOf("]")+1,item.length)
                // console.log(t+" "+c)
                this.lyric.push({
                    t,
                    c
                })
            })
            // console.log(this.lyric)                
            // this.rollLyric(this.lyric[0].t)
            // var setLyric=function(){
            //     console.log(this.lyric[0].c)
            //     this.$refs.curLyric.textContent=this.lyric[0].c
            // }
            // this.setLyric()
            // console.log("setLyric() executed")
            // var rollLyric=function(){
            //     if(this.lyric.length=1){
            //         return
            //     }
            //     setTimeout(() => {
            //         this.lyric.shift()
            //         setLyric()
            //         rollLyric()
            //     }, (this.lyric[0].t)*1000);
            // }
            // this.rollLyric(this.lyric[0].t)
        },
        rollLyric(time){
            setTimeout(this.timeOutCallback,time*1000)
        },
        timeOutCallback(){
                this.setLyric()
                if(this.lyric.length==1){
                    return
                }
                let time=this.lyric[1].t-this.lyric[0].t
                this.lyric.shift()
                this.rollLyric(time)
        },
        setLyric(){
            this.$refs.curLyric.textContent=this.lyric[this.curIndex].c
        },
        selectLyricLine(range_left_i,range_right_i,curTime){
            if(range_right_i-1==range_left_i){
                return range_left_i
            }
            //取中间的index
            let middle_index=parseInt((range_left_i+range_right_i)/2)
            if(this.lyric[middle_index].t>curTime){
                return this.selectLyricLine(range_left_i,middle_index,curTime)
            }else{
                return this.selectLyricLine(middle_index,range_right_i,curTime)
            }
        },
        ontimeupdateHandler(event){
    //       console.log(eaudio.currentTime)
            let eaudio=document.getElementsByTagName('audio')[0]
            let currentTime=eaudio.currentTime
            if(this.lyric[this.curIndex].t<currentTime&&currentTime<this.lyric[this.curIndex+1].t){
                return
            }
            this.curIndex=this.selectLyricLine(0,this.lyric.length-1,currentTime)
    //      console.log(lyrics[curIndex])
            this.setLyric()
        }
        // rollLyric(time){
        //     if(this.lyric.length==1){
        //         return
        //     }
        //     setTimeout(this.timeOutCallback, time*1000);
        // },
        // timeOutCallback(){
        //         let time=this.lyric[1].t-this.lyric[0].t
        //         console.log(time)
        //         this.lyric.shift()
        //         this.setLyric()
        //         this.rollLyric(time)
        // }
    },
    data:function(){
        return{
            song:{},
            lyric:[],
            curIndex:0
        }
    },
    // computed:function(){
    //     return{
    //         // currentLyric:""
    //     }
    // }
}
</script>

<style scoped>
    /* audio{
        width: 500px;
        height: 500px;
        position:fixed;
        left: 0;
        right: 0;
        margin: 0 auto;
    } */
    h2{
        text-align: center;
        font-size: 50px;
    }
    img{
        width:100%;
    }
    #curLyric{
        text-align: center;
        font-size:30px;
        color:greenyellow;
    }
</style>