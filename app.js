const express=require("express");

const bodyParser=require("body-parser");



const app=express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));




var ply1={
  name:"",
  score:0
}
var ply2={
  name:"",
  score:0
};

var start=0;;

// app.post("/start",function(req,res){
//   ply1=req.body.Player1;
//   ply2=req.body.Player2;
//   start=1;
//   res.redirect("/");
// });
//
// app.get("/",function(req,res){
//   if(1){
//     if(qcount=!5){
//       qcount=qcount+1;
//       res.redirect("/",ques:quiz[qcount].name, opt1:quiz[qcount].op1, opt2:quiz[qcount].op2, opt3:quiz[qcount].op3, opt4:quiz[qcount].op4, name:name});
//
//   }
// }
// })

var q1={
  name:"What is a shark?",
  op1:"Aftrukgjnjhdhtrfyjkhjkcfrfjjh",
  op2:"B",
  op3:"C",
  op4:"D"
}
var q2={
  name:"What is A?",
  op1:"a",
  op2:"b",
  op3:"c",
  op4:"d"
};

var q3={
  name:"What is O?",
  op1:"a1",
  op2:"b1",
  op3:"c1",
  op4:"d1"
};

var q4={
  name:"What is A3?",
  op1:"a2",
  op2:"b3",
  op3:"c56",
  op4:"d66"
};

var q5={
  name:"What is Adas?",
  op1:"au",
  op2:"bi",
  op3:"cp",
  op4:"dl"
};


var quiz=[q1,q2,q3,q4,q5];

var name="";
var head="";

var qcount=-1;

var userpoint=0;

var currentPlayer=1;


// app.get("/",function(req,res){
//   if(qcount==5){
//     if(userpoint<10)
//       var shark = "You are a Hammer Head Shark ! ";
//     else if(userpoint<15)
//       var shark="You are a Great White Shark ! ";
//     else if(userpoint<18)
//       var shark="You are a tiger shark !" ;
//     else
//       var shark = "You are a plankton! xD ";
//     if(name=="" && userpoint==0){
//       res.redirect("/");
//     }
//     else{
//       var nm=name;
//       var sc=userpoint;
//       qcount=0;
//       name="";
//       userpoint=0;
//      res.render("result",{name:nm,score:sc, shark:shark});
//    }
//   }
//   else{
//     res.render("index",{ques:quiz[qcount].name, opt1:quiz[qcount].op1, opt2:quiz[qcount].op2, opt3:quiz[qcount].op3, opt4:quiz[qcount].op4, name:name});
//   }
// });

app.get("/",function(req,res){

  if(qcount<=4 && qcount>-1){
            if(start && currentPlayer===1){
              var head=ply1.name;
              currentPlayer=2;
              console.log(currentPlayer);
              res.render("index",{ques:quiz[qcount].name, opt1:quiz[qcount].op1, opt2:quiz[qcount].op2, opt3:quiz[qcount].op3, opt4:quiz[qcount].op4, head:head,start:1});
            }

            // if(start && currentPlayer===2){
            else {
              var head=ply2.name;
              currentPlayer=1;
              console.log("in 2");
              qcount=qcount+1;
              var c=qcount-1;
              res.render("index",{ques:quiz[c].name, opt1:quiz[c].op1, opt2:quiz[c].op2, opt3:quiz[c].op3, opt4:quiz[c].op4, head:head,start:1});
            }

          }

  else if(qcount==-1 && ply1.name=="" && ply2.name=="")
{
       res.render("index",{ques:quiz[qcount+1].name, opt1:quiz[qcount+1].op1, opt2:quiz[qcount+1].op2, opt3:quiz[qcount+1].op3, opt4:quiz[qcount+1].op4, head:head,start:0});
}
else{
  if(ply1.score>ply2.score){
      var win=ply1.name;
      var wins=ply1.score;
      var los=ply2.name;
      var loss=ply2.score;
      ply1.score=0;
      ply2.score=0;
      ply1.name="";
      ply2.name="";
      res.render("result",{win:win,wins:wins,los:los,loss:loss});
    }
  else {
    var win=ply2.name;
    var wins=ply2.score;
    var los=ply1.name;
    var loss=ply1.score;
    ply1.score=0;
    ply2.score=0
    ply1.name="";
    ply2.name="";
    qcount=-1;
    res.render("result",{win:win,wins:wins,los:los,loss:loss});

  }
}

  // else{
  //   if(plysc>ply2sc){
  //     res.redirect("result");
  //   }
  //   else if(plysc<ply2sc){
  //     res.redirect("result");
  //   }
  //   else{
  //     res.redirect("/");
  //   }
  // }
});

app.post("/start", function(req,res){
  ply1.name=req.body.name1;
  ply2.name=req.body.name2;
  qcount=0;
  start=1;
  res.redirect("/");
});
// app.post("/",function)

app.post("/checkans", function (req,res){

 var qno=qcount;
 console.log(req.body.name);
 var username=req.body.name;
  userans=req.body.option;
  if(req.body.name==ply2.name)
    qno=qcount-1;

  if(qno==0){
    if(userans=="opA"){
      userpoint=2;
    }

    else if(userans=="opB"){
      userpoint=4;
    }

    else if(userans=="opC"){
      userpoint=1;
    }

    else{
      userpoint=3;
    }
  }
//QUES 2

if(qno==1){
  if(userans=="opA"){
    userpoint=1;
  }

  else if(userans=="opB"){
    userpoint=3;
  }

  else if(userans=="opC"){
    userpoint=2;
  }

  else{
    userpoint=4;
  }
}

//QUES 3

if(qno==2){
  if(userans=="opA"){
    userpoint=0;
  }

  else if(userans=="opB"){
    userpoint=1;
  }

  else if(userans=="opC"){
    userpoint=1;
  }

  else{
    userpoint=4;
  }
}

//QUES 4

if(qno==3){
  if(userans=="opA"){
    userpoint=4;
  }

  else if(userans=="opB"){
    userpoint=4;
  }

  else if(userans=="opC"){
    userpoint=2;
  }

  else{
    userpoint=1;
  }

//QUES 5
}

if(qno==4){
  if(userans=="opA"){
    userpoint=1;
  }

  else if(userans=="opB"){
    userpoint=3;
  }

  else if(userans=="opC"){
    userpoint=2;
  }

  else{
    userpoint=4;
  }
}

console.log(currentPlayer);
  if(req.body.name==ply1.name)
    ply1.score=ply1.score+userpoint;
  else
    ply2.score=ply2.score+userpoint;

    console.log("A:"+ply1.score);
    console.log("B:"+ply2.score);


res.redirect("/");

});




































app.listen(process.env.PORT || 3000,function(){
  console.log("Running on 3000");
});
