<template>
    <div>
        <Carousel v-model="index" loop>
            <CarouselItem v-for="i in albums">
                <!-- 现在是固定图片大小 -->
                <Row type="flex" justify="center">
                    <Col span="8">
                        <img :src='i.blurPicUrl' @click="playAlbum" ></img>
                    </Col>
                </Row>
            </CarouselItem>
        </Carousel>
        <!-- <button @click="print">debug button</button> -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            index : 0,
            albums:[],
        }
    },
    methods:{
        // print(){
        //     console.log(this.index);
        // }
        playAlbum(){
            //获取歌曲的id
            let songId=this.albums[this.index].id
            let url='http://localhost:3000/song/url'
            //获取音乐url
            this.$axios.get(url,{params:{id:songId}}).then(res=>{
                // console.log(res)
                let songurl=res.data.data[0].url
                // ===null?"empty":res.data.data[0].url
                // let songurl="empty"
                //传出url给父组件
                this.$emit('playAlbumEvent',songurl)
            }).catch(error=>{
                console.log('获取音乐url失败')
            })
        }
    },
    created:function(){
        let url='http://localhost:3000/album/newest'
        this.$axios.get(url).then(res=>{
            // console.log(res)
            //把获取来的最新专辑放到data下
            this.albums=res.data.albums
        }).catch(error=>{
            console.log("最新专辑加载失败")
        })
    }
}
</script>

<style scoped>
    img{
        width:100%;
        /* height:100% */
    }
</style>