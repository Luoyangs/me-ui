## ImgLazy 图片懒加载

<div class="demo-block">
  <img v-lazy="imgx" style="display:block;width:400px;"> 

  <div id="container"  v-for="(img,index) in imgs" :key="index">
    <img v-lazy="img" src="../assets/logo.png" style="display:block;width:400px;">    
  </div>
</div>
<script>
  import Logo from '../assets/logo.png';
  export default {
    data() {
      return {
        imgx: Logo,
        imgs: [
          'http://img3.imgtn.bdimg.com/it/u=587594385,569409564&fm=27&gp=0.jpg',
          'http://img5.imgtn.bdimg.com/it/u=2676601484,1554144465&fm=27&gp=0.jpg',
          'http://img4.imgtn.bdimg.com/it/u=1907373815,2409497337&fm=27&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=2079669524,3979372508&fm=27&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=3514440002,2298517346&fm=200&gp=0.jpg',
          'http://img2.imgtn.bdimg.com/it/u=1564910785,2814362381&fm=200&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=3514440002,2298517346&fm=200&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=587594385,569409564&fm=27&gp=0.jpg',
          'http://img5.imgtn.bdimg.com/it/u=2676601484,1554144465&fm=27&gp=0.jpg',
          'http://img4.imgtn.bdimg.com/it/u=1907373815,2409497337&fm=27&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=2079669524,3979372508&fm=27&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=3514440002,2298517346&fm=200&gp=0.jpg',
          'http://img2.imgtn.bdimg.com/it/u=1564910785,2814362381&fm=200&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=3514440002,2298517346&fm=200&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=587594385,569409564&fm=27&gp=0.jpg',
          'http://img5.imgtn.bdimg.com/it/u=2676601484,1554144465&fm=27&gp=0.jpg',
          'http://img4.imgtn.bdimg.com/it/u=1907373815,2409497337&fm=27&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=2079669524,3979372508&fm=27&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=3514440002,2298517346&fm=200&gp=0.jpg',
          'http://img2.imgtn.bdimg.com/it/u=1564910785,2814362381&fm=200&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=3514440002,2298517346&fm=200&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=587594385,569409564&fm=27&gp=0.jpg',
          'http://img5.imgtn.bdimg.com/it/u=2676601484,1554144465&fm=27&gp=0.jpg',
          'http://img4.imgtn.bdimg.com/it/u=1907373815,2409497337&fm=27&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=2079669524,3979372508&fm=27&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=3514440002,2298517346&fm=200&gp=0.jpg',
          'http://img2.imgtn.bdimg.com/it/u=1564910785,2814362381&fm=200&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=3514440002,2298517346&fm=200&gp=0.jpg'
        ]
      }
    }
  };
</script>