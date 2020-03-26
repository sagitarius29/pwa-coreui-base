<template>  
  <img :src="src_image" :width="width" />
</template>

<script>
import s3 from '@/services/aws'
export default {
  name: 'ImageComponent',
  props: ['image_url', 'width'],
  data(){
    return {
      src_image: null
    }
  },
  mounted(){

    let protocol = this.image_url.split(':')[0]
    if(protocol === 's3'){
      let img = this.image_url.split('/')
      let size = img.length
      let url = img[size - 1]
      this.src_image = s3.getSignedUrl("getObject", {
        Bucket: `${process.env.VUE_APP_AWS_BUCKET}/box`,
        Key: url,
        Expires: 60
      });
    } else {
      this.src_image = this.image_url
    }
  }
}
</script>