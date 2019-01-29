



const three = "///////0/////0/////0///////";
const twoMiddle = "///////0//////////0///////";
const twoLeft = "///////0/////0////////////";
const twoRight = "////////////0/////0///////";
const oneRight = "/////////////////0///////";
const oneMiddle = "////////////0////////////";
const oneleft = "///////0/////////////////";

function TernaryTree() {
  this.root = null;
}

function Node(msg) {
  this.message = msg;
  this.picture = null;
  this.left = null;
  this.middle = null;
  this.right = null;
}

TernaryTree.prototype.assignPicture = function(node, direction) {

  var left = (node.left || direction === 0) ? true : false;
  var middle = (node.middle || direction === 1) ? true : false;
  var right = (node.right || direction === 2) ? true : false;

  if (left === true && middle === true && right === true) {
    return three;
  }
  else if (left === true && middle === false && right === true) {
    return twoMiddle;
  }
  else if (left === true && middle === true && right === false) {
    return twoLeft;
  }
  else if (left === false && middle === true && right === true) {
    return twoRight;
  }
  else if (left === false && middle === false && right === true) {
    return oneRight;
  }
  else if (left === false && middle === true && right === false) {
    return oneMiddle;
  }
  else if (left === true && middle === false && right === false) {
    return oneleft;
  }
  return null;
};

TernaryTree.prototype.addNode = function() {
   var root = this.root;

   if(!root){
      this.root = new Node(null);
      return;
   }

   var currentNode = root;
   var newNode = new Node(null);   // create new instance of node

   while(currentNode){

     var direction = Math.floor(Math.random() * 3);   // choose a random direction

     if (direction === 0) {
       if(!currentNode.left){
         currentNode.picture = this.assignPicture(currentNode, direction);
         currentNode.message = null;
         newNode.message = "you lose";
         currentNode.left = newNode;
         break;
       }
       else{
          currentNode = currentNode.left;
       }
     }
     else if (direction === 1) {
       if(!currentNode.middle){
         currentNode.picture = this.assignPicture(currentNode, direction);
         currentNode.message = null;
         newNode.message = "you lose";
         currentNode.middle = newNode;
         break;
       }
       else{
          currentNode = currentNode.middle;
       }
     }
     else if (direction === 2) {
       if(!currentNode.right){
         currentNode.picture = this.assignPicture(currentNode, direction);
         currentNode.message = null;
         newNode.message = "you lose";
         currentNode.right = newNode;
         break;
       }
       else{
          currentNode = currentNode.right;
       }
     }
  }
};


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

TernaryTree.prototype.addWinningNode = function(current, currentDepth, minDepth) {

  if(current === null) {
    if(currentDepth >= minDepth) {
      current = new Node("You Win!");
      return true;
    }
    else {
      return null;
    }
  }

  var paths = shuffle([0, 1, 2]);

  for(var i=0; i<3; ++i) {
    if(paths[i] === 0) {
      if(this.addWinningNode(current.left, currentDepth+1, minDepth) === true) {
        return true;
      }
    }
    else if(paths[i] === 1) {
      if(this.addWinningNode(current.middle, currentDepth+1, minDepth) === true) {
        return true;
      }
    }
    else if(paths[i] === 2) {
      if(this.addWinningNode(current.right, currentDepth+1, minDepth) === true) {
        return true;
      }
    }
  }
  return false;
}


function displayButtons(node) {
  if (node.left !== null) {
    $("#left").show();
  }
  else {
    $("#left").hide();
  }
  if (node.middle !== null) {
    $("#middle").show();
  }
  else{
    $("#middle").hide();
  }
  if (node.right !== null) {
    $("#right").show();
  }
  else {
    $("#right").hide();
  }
  if ((node.right === null) && (node.left === null) && (node.middle === null)) {
    $("#pic").text(node.message);
    $("#reset").show();
  }
}



$(document).ready(function() {

  var tree = new TernaryTree();
  var totalNodes = 30;

  // Build the tree
  for (var i=0; i<totalNodes; ++i) {
    tree.addNode();
  }
  var success = tree.addWinningNode(tree.root, 0, 1); // add in winning node
  console.log(success);

  var current = tree.root;   // start at the root

  $("#pic").text(current.picture);
  displayButtons(current);

 console.log(tree);

  $(".btn").click(function() {
    var direction = $(this).attr("id");

    switch(direction) {
      case "left":
        current = current.left;
        break;
      case "middle":
        current = current.middle;
        break;
      case "right":
        current = current.right;
        break;
    }
    $("#pic").text(current.picture);   //display new picture
    displayButtons(current);           //display new buttons
  });

  $("#reset").click(function() {
    current = tree.root;
    $("#pic").text(current.picture);
    displayButtons(current);
    $("#reset").hide();
  });


});
