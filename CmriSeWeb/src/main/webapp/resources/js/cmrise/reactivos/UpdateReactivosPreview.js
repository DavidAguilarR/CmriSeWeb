/**
 * 
 */
let $goJs;
let contadorClicks = 0;
let puntoCreado = false;
let tipoReactivoID; 
let paintingCanvasID; 
let graphicImageImgSenID;
let graphicImageImgCorID;
let widthImgSenID; 
let heightImgSenID; 
let ctx; 
let perimeter = new Array();
let coordinatesID; 
let coordinatesImgCorId; 
let diagram; 
let imgCorDivID; 
let widthImgCorID; 
let heightImgCorID; 

document.addEventListener('DOMContentLoaded', () => {
  console.log('Comienza DOMContentLoaded');
  tipoReactivoID = document.getElementById('previewForm:tipoReactivo'); 
  paintingCanvasID = document.getElementById('paintingCanvas');
  graphicImageImgSenID = document.getElementById('previewForm:graphicImageImgSen');
  graphicImageImgCorID = document.getElementById('previewForm:graphicImageImgCor');
  widthImgSenID = document.getElementById('previewForm:widthImgSen');
  heightImgSenID = document.getElementById('previewForm:heightImgSen');
  
  console.log(tipoReactivoID.value); 
  if(tipoReactivoID.value!=='IMAGEN_INDICADA'&&tipoReactivoID.value!=='IMAGEN_ANOTADA'){
	  return; 
  }
  
  if('IMAGEN_INDICADA'===tipoReactivoID.value){
	  var img = new Image();
	  img.setAttribute('src', graphicImageImgSenID.src); 
	  img.addEventListener('load',(e)=>{
		  paintingCanvasID.width = img.width; 
		  paintingCanvasID.height = img.height; 
		  ctx = paintingCanvasID.getContext("2d");
		  ctx.drawImage(img, 0, 0, paintingCanvasID.width, paintingCanvasID.height);
		     
	  }); 
	  
	  
	  paintingCanvasID.addEventListener("mousemove", function(e) {
	 	 var cRect = paintingCanvasID.getBoundingClientRect(); // Gets CSS pos, and width/height
	 	 var canvasX = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas
	 	 var canvasY = Math.round(e.clientY - cRect.top); // from the X/Y positions to make
	 	 document.getElementById('previewForm:coordinatesMouseMove').value = "X: "+canvasX+", Y: "+canvasY;
	  });  
  }
  
  if('IMAGEN_ANOTADA'===tipoReactivoID.value){
	  console.log("*"); 
	  widthImgCorID = document.getElementById('previewForm:widthImgCor');
	  heightImgCorID = document.getElementById('previewForm:heightImgCor');
	  $goJs = go.GraphObject.make;
	  var img = new Image();
	  img.setAttribute('src', graphicImageImgCorID.src); 
	  img.addEventListener('load',(e)=>{
		
		  
		  
		  
		  diagram = $goJs(go.Diagram, "previewForm:imgCorDiv",
			         {  
				    	 fixedBounds: new go.Rect(0, 0, img.width, img.height),  // document is always 500x300 units
				         allowHorizontalScroll: false,  // disallow scrolling or panning
				         allowVerticalScroll: false,
				         allowZoom: false,              // disallow zooming
				         "animationManager.isEnabled": false,
				         "undoManager.isEnabled": true,
				         isReadOnly:true
			         });
	     
	     imgCorDivID = diagram.div; 
	     imgCorDivID.style.width = img.width+"px"; 
	     imgCorDivID.style.height = img.height+"px"; 
	     
	      /**
	      diagram.grid.visible = true;  
	  	   diagram.startTransaction("change Layout");
	       var lay = diagram.layout;
	       lay.alignment = go.GridLayout.Location;
	       lay.wrappingWidth = img.width; 
	       diagram.commitTransaction("change Layout");
		  ***/
		 
	     /*** Bug Alteracion de Posicionamiento **/
	     coordinatesImgCorId  = document.getElementById('previewForm:coordinatesImgCor');
	     console.log(coordinatesImgCorId.value);
	     diagram.linkTemplate =
			    $goJs(go.Link,
			      $goJs(go.Shape,
			        new go.Binding("stroke", "color"),  // shape.stroke = data.color
			        new go.Binding("strokeWidth", "thick")),  // shape.strokeWidth = data.thick
			      $goJs(go.Shape,
			        { toArrow: "OpenTriangle", fill: null },
			        new go.Binding("stroke", "color"),  // shape.stroke = data.color
			        new go.Binding("strokeWidth", "thick"))  // shape.strokeWidth = data.thick
			    );
		 
		  diagram.nodeTemplate =
			  $goJs(go.Node, "Auto"
					,{ dragComputation: stayInFixedArea }
			       ,new go.Binding("location", "loc").makeTwoWay(),
					  $goJs(go.Shape,
			        new go.Binding("figure", "fig"),
			        new go.Binding("fill", "color"),
			        new go.Binding("stroke", "color"),
			        new go.Binding("strokeWidth", "thick")
					  ),
			        $goJs(go.TextBlock,
			        { margin: 5 },new go.Binding("text", "say"))
			    );
	  	     
	  	   // the background Part showing the fixed bounds of the diagram contents
	  	   diagram.add(
	  			 $goJs(go.Part,
	  	          { layerName: "Grid", position: diagram.fixedBounds.position },
	  	          $goJs(go.Picture, e.target.src)
	  	        ));
	     
	     diagram.model = go.Model.fromJson(coordinatesImgCorId.value);
	     
	  });
  }
  
  
  
  console.log('Finaliza DOMContentLoaded'); 
}); 


function point_it(event) {
  perimeter = new Array();	
  paintingCanvasID = document.getElementById("paintingCanvas");
  ctx = paintingCanvasID.getContext("2d");
  ctx.clearRect(0, 0, paintingCanvasID.width, paintingCanvasID.height);
  
  var img = new Image();
  img.setAttribute('src', graphicImageImgSenID.src); 
  img.addEventListener('load',(e)=>{
	  paintingCanvasID.width = img.width; 
	  paintingCanvasID.height = img.height; 
	  ctx = paintingCanvasID.getContext("2d");
	  ctx.drawImage(img, 0, 0, paintingCanvasID.width, paintingCanvasID.height);
	
	  var rect, x, y;
	    
	  if(event.ctrlKey || event.which === 3 || event.button === 2){
	      event.preventDefault();
	      return; 
	  }
	  
	  rect = paintingCanvasID.getBoundingClientRect();
	  x = event.clientX - rect.left;
	  y = event.clientY - rect.top;
	  x =  x.toFixed(5);
	  y = y.toFixed(5);
	  perimeter.push({'x':x,'y':y});
	  
	  
	  var tmpX,tmpY; 

	  ctx.strokeStyle='red';
	  ctx.beginPath();
	  tmpX = parseFloat(x)+20; 
	  ctx.moveTo(tmpX,y);
	  ctx.lineTo(x,y);
	  tmpX = parseFloat(x)-20;
	  ctx.moveTo(tmpX,y);
	  ctx.lineTo(x,y);
	  tmpY = parseFloat(y)+20; 
	  ctx.moveTo(x,tmpY);
	  ctx.lineTo(x,y);
	  tmpY = parseFloat(y)-20;
	  ctx.moveTo(x,tmpY);
	  ctx.lineTo(x,y);
	  ctx.lineWidth=3;
	  ctx.stroke();	  
	  
	  coordinatesID = document.getElementById('previewForm:coordinates'); 
	  coordinatesID.value = JSON.stringify(perimeter);
	  
  }); 
  
}

function init(){
			var divArea = document.getElementById('myDiagramDiv');
			divArea.onclick = function() {
			    addShape();
			};

		}
		
		function addShape(){	
			contadorClicks = contadorClicks + 1;
			var numClicks = contadorClicks;
			
			if(!puntoCreado){
				puntoCreado = true				
		  		var $ = go.GraphObject.make;
				myDiagram = $(go.Diagram, "myDiagramDiv");
				myDiagram.add(
				    $(go.Part, "auto",
	    				$(go.Shape, "PlusLine", { width: 40, height: 40, margin: 4, fill: "red", stroke: "red", strokeWidth: 2 })
				    )
				);			
			}else{
				//alert('logica faltante');
			}
		}
		

		$(document).ready(function() {
			  console.log("Comienza ready"); 
			  console.log("Finaliza ready"); 
	      });		
		
		function handleUpdateRequest(xhr, status, args){
			 if(args.validationFailed|| !args.updateIn) {
				 argsValidationFailed(); 
		      }
		}
		
		// this function is the Node.dragComputation, to limit the movement of the parts
		// use GRIDPT instead of PT if DraggingTool.isGridSnapEnabled and movement should snap to grid
		function stayInFixedArea(part, pt, gridpt) {
		  var diagram = part.diagram;
		  if (diagram === null) return pt;
		  // compute the document area without padding
		  var v = diagram.documentBounds.copy();
		  v.subtractMargin(diagram.padding);
		  // get the bounds of the part being dragged
		  var b = part.actualBounds;
		  var loc = part.location;
		  // now limit the location appropriately
		  var x = Math.max(v.x, Math.min(pt.x, v.right - b.width)) + (loc.x - b.x);
		  var y = Math.max(v.y, Math.min(pt.y, v.bottom - b.height)) + (loc.y - b.y);
		  return new go.Point(x, y);
		}