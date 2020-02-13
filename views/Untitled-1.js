let likes=[];
let postid;
let userid;
let flag = 0;
let count = 0;
for(let i=0;i<likes.length;i++){
  if(likes[i].postid === postid && likes[i].userid === userid){
    console.log('blue');
    flag = 1;
  }
  if(likes[i].status){
    count++
  }
}
