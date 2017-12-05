
var log = function(){
    console.log.apply(console, arguments);
};
/**使用 navigator.mediaDevices.getUserMedia 获得用户摄像头的视频流，并将视频流传递给 video 标签**/

var front = false;
var constraints = { video: { facingMode: (front? "user" : "environment") } };
/**有没有下面这一行代码都可以，因为这个就像注册事件的 event 一样***/
var mediaStream = null;
const video = document.querySelector('#video');
navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
        video.srcObject = mediaStream;
        log('#video.srcObject', video.srcObject);
        video.onloadedmetadata = function(e) {
            log('参数 e', e);
            video.play();
        };
    })
    .catch(function(err) {
       log("err", err);
    });

/**为切换前后置摄像头按钮添加事件*****/
const change = document.querySelector('#id-button-change');
var content = change.innerHTML;
change.addEventListener('click', function(){
    front = !front;
    change.innerHTML = (content === '后置') ? (content = '前置') : (content = '后置');
    var constraints = { video: { facingMode: (front? "user" : "environment") } };
    log('click 事件中的 constraints', constraints);
    /**有没有下面这一行代码都可以，因为这个就像注册事件的 event 一样***/
    var mediaStream = null;
    const video = document.querySelector('#video');
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
            video.srcObject = mediaStream;
            log('#video.srcObject', video.srcObject);
            video.onloadedmetadata = function(e) {
                log('参数 e', e);
                video.play();
            };
        })
        .catch(function(err) {
            log("err", err);
        });
})

/**拍照功能实现（使用 canvas 的 drawImage 方法将 video 画到画布上，即实现了拍照功能）*/
/**将画布保存成图片格式***/
   const picture = document.querySelector('#id-button-picture');
   picture.addEventListener('click', function(){
       const canvas = document.querySelector('#canvas');
       const context = canvas.getContext('2d');
       context.drawImage(video, 0, 0, 300, 300);
       const dataUrl = canvas.toDataURL();
       log('dataUrl', dataUrl);
       var image = new Image();
       image.src = dataUrl;
       document.body.appendChild(image);
   });

/**利用 ajax 将图片上传（因为 canvas 的 toDataURL 方法默认转成的是 image/png 格式，图片比较大，先转为 jpg 格式，再上传）**/

var r = new XMLHttpRequest();
r.onreadystatechange = function() {
    if(r.status === 200 && r.readystate === 4) {
        log('上传成功')
    } else {
        log('失败，啊哈哈')
    }
}
var base64Data = document.getElementsByTagName('img')[0].src;
base64Data = base64Data.substr(22);
 //对参数中的+号编码，防止丢失
base64Data = base64Data.replace(/\+/g, "%2B");
var url = "UploadPic.aspx";
var data = '&img=' + base64Data;
r.open('POST', url, true);
r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
r.send(data);