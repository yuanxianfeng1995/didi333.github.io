//旋转角度
var angles;

// 园的半径
var radius = 130;
//转盘初始化
var color = ["#fde284", "#fe9103", "rgba(0,0,0,0.5)", "#000000", "#b10105", "#fbc605"];
var winnerList=[
    {
        id:'1',
        name:'白萝卜鲫鱼汤',
        logo:'./images/白萝卜鲫鱼汤.jpg',
        probability:'10%',
    },{
        id:'2',
        name:'番茄炒蛋',
        logo:'./images/番茄炒蛋.jpg',
        probability:'10%',
    },{
        id:'3',
        name:'红烧肉',
        logo:'./images/红烧肉.jpg',
        probability:'10%',
    },{
        id:'4',
        name:'红烧鱼',
        logo:'./images/红烧鱼.jpg',
        probability:'10%',
    },{
        id:'5',
        name:'肉末茄子',
        logo:'./images/肉末茄子.jpg',
        probability:'10%',
    },{
        id:'6',
        name:'素炒藕尖',
        logo:'./images/素炒藕尖.jpg',
        probability:'10%',
    },{
        id:'7',
        name:'神秘大奖',
        logo:'./images/大奖.jpg',
        probability:'60%',
    },{
        id:'8',
        name:'酸辣土豆丝',
        logo:'./images/酸辣土豆丝.jpg',
        probability:'10%',
    }
] //奖品列表
// 有几份扇形
var number = winnerList.length;
     $(document).ready(function(){
          canvasRun()
    });
    //绘制转盘
    function canvasRun() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    // canvas的实际渲染倍率
    var ratio =3.5 //清晰度
    canvas.style.width = canvas.width;
    canvas.style.height = canvas.height;
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    createCircle(ratio);
    createCirText(ratio);
    //外圆
    function createCircle(ratio) {
        var startAngle = 0;//扇形的开始弧度
        var endAngle = 0;//扇形的终止弧度
        getCircleOffset();
        //画一个8等份扇形组成的圆形
        for (var i = 0; i < number; i++) {
            if(number % 4 == 0){
                startAngle = (Math.PI * 2 * i / number) - (Math.PI / number);
            }else if(number % 4 == 1 || number== 1 ){
                startAngle = (Math.PI * 2 * i / number)+(Math.PI/number/2);
            }else if(number % 4 == 2 || number == 2){
                startAngle = (Math.PI * 2 * i / number)
            }else if(number % 4 == 3 || number == 3){
                startAngle = (Math.PI * 2 * i / number)-(Math.PI/number/2);
            }else{
                startAngle = 0
            }
            endAngle = startAngle + Math.PI * 2 / number;
            ctx.save();
            ctx.beginPath();
            ctx.arc(radius*ratio, radius*ratio, radius*ratio, startAngle, endAngle, false);
            ctx.lineWidth = 220*ratio;
            if (i % 2 == 0) {
                ctx.strokeStyle = "#f8c950";
            } else {
                ctx.strokeStyle = "#fbfbe0";
            }
            ctx.stroke();
            ctx.restore();
        }
    }
    //各奖项
    function createCirText(ratio) {
        ctx.textAlign = 'start';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = color[3];
        var step = 2 * Math.PI / number;
        for (var i = 0; i < number; i++) {
            (function (arg) {
                ctx.save();
                ctx.beginPath();
                ctx.scale(ratio,ratio);
                ctx.translate(radius, radius);
                ctx.rotate(arg * step);
                ctx.textAlign = 'center';
                ctx.font = "8px Microsoft YaHei";
                ctx.fillStyle = color[3];
                ctx.fillText(winnerList[arg].name, 0, -100, 50);
                ctx.closePath();
                ctx.restore();
            })(i)
        }
    }
    // 计算扇形的偏移量，以保证12点钟方向指向扇形区域的中间
    function getCircleOffset() {
        // 到12点钟方向的偏移量
        var offset = 0;
        // var verticalOffset = Math.PI / 2;
        if (number % 2 != 0) {
            offset = Math.PI * 2/number
        }
        if (number % 2 == 0 && number / 2 & 2 != 0) {
            offset = 0;
        } else {
        }
        return offset;
    }
}
    //转盘旋转
    function runCup(i,item) {
        var angles = i * (360 / number);
        if(angles == 90 || angles == 180 || angles == 270){
            angles = angles +1
        }
        $('#myCanvas').stopRotate();
        $('#myCanvas').rotate({
            angle:0,
            animateTo:2880 - angles,
            duration:8000,
            callback:function (){
							console.log('item', item)
						$('.mode').css({"display": "flex"});
						$('.mode img').attr("src", item.logo);
						$('.mode p').text('您可以选择吃'+(item.name==='神秘大奖'?'屎':item.name));
						$('#tupBtn').attr("disabled", false);
						$('.mode').on('click', function (){
							$('.mode').css({"display": "none"});
						})
            }
        });

    }
    //点击抽奖
    $("#tupBtn,.again").on('click',function(){
        //转盘旋转过程“开始抽奖”按钮无法点击
        $('#tupBtn').attr("disabled", true);
        // 中奖率randomRate
        var randomRate = []
        $.each(winnerList, function (i, item) {
            randomRate.push(item.probability)
        })
        var item = rnd(randomRate);
				console.log('item', item);
        runCup(item, winnerList[item]);
    })
    //概率计算
    function rnd(rate){
        var random = Math.floor(Math.random() * 100);
        var myRandom = [];
        var randomList = [];
        var randomParent = [];
        for(var i = 0; i < 100; i++){
            myRandom.push(parseInt([i]) + 1);
        }
        for(var i = 0; i < rate.length; i++){
            var temp = [];
            var start = 0;
            var end = 0;
            randomList.push(parseInt(rate[i].split('%')[0]));
            for(var j = 0; j < randomList.length; j++){
                start += randomList[j-1] || 0
                end += randomList[j]
            }
            temp = myRandom.slice(start, end);
            randomParent.push(temp)
        }
        for(var i = 0; i < randomParent.length; i++){
            if($.inArray(random, randomParent[i]) > 0){
                return(i+1)
            }
        }
    }



