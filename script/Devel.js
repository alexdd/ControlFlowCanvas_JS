/*    
#     Devel class part of ControlFlowCanvas_JS
#
#     Copyright (C) 2007  by Alex Duesel <alex@alex-duesel.de>
#     homepage: http://www.mandarine.tv
#     See file license.txt for licensing issues
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as published by
#    the Free Software Foundation, either version 3 of the License.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Lesser General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
#*/

function Devel(ctx) {
	
//////////////////////////////////////////////////////////////////////////////////////////////////////
//  
//   CONFIGURATION
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

	this.top_offset = 90;    // top offset of nodes to the upper end of the canvas area
	this.left_offset = 150;  // left offset of nodes to the left end of the canvas area
	this.node_radius = 20;  
	this.distance = 80;       // distance between nodes
	this.canvas_width= 340; // width of the canvas area
	this.canvas_height= 1010; // height of the canvas area

	this.control2X = 1;
	this.control2Y = 1;
	this.control1X = 1;
	this.control1Y = 1;
	this.control1Xdirect = 1;
	this.control1Ydirect = 1;
	this.control2Xdirect = 1;
	this.control2Ydirect = 1;
	this.arrowHeadAdjust = 1;
		
	this.getNodeColor = function() {
		// color of nodes
		return "#999999";
	}
	
	this.getActiveNodeColor = function() {
		// color of all active (used) nodes
		return "#000000";
	}
	
	this.getEdgeColor = function() {
		// color of edges
		return "#000000";
	}
	
	this.getArrowHeadColor = function() {
		// color of arrow heads
		return "#BB2F24";
	}
	
	
	this.getControl2FractionX = function() {
		return this.control2X;
	}

	this.getControl2FractionY = function() {
		return this.control2Y;
	}

	this.getControl1FractionX = function() {
		return this.control1X;
	}

	this.getControl1FractionY = function() {
		return this.control1Y;
	}
	
	this.getControl1FractionXDirect = function() {
		return this.control1Xdirect;	

	}
	
	this.getControl1FractionYDirect = function() {
		return this.control1Ydirect;	
	}

	this.getControl2FractionXDirect = function() {
		return this.control2Xdirect;	

	}
	
	this.getControl2FractionYDirect = function() {
		return this.control2Ydirect;	
	}
	
	this.getArrowHeadAjust = function() {
		return this.arrowHeadAdjust;		
	}
	
/////////////////////////////////////////////////////////////////////////////////////////////////////

	this.getCanvasHeight = function() {
		return this.canvas_height;
	}
	
	this.getCanvasWidth = function() {
		return this.canvas_width;
	}

	this.num_nodes = 12;   // number of all   nodes

	// form fields
	
	this.forms = Array();
	for(var i=0; i<this.num_nodes;i++)
		this.forms[i] = new FormField(this, i);
	
	
	this.getInput = function(num) {
		// returns input field value
		return this.forms[num].getInput();
	}
	
	this.update = function() {
			
		var x = document.getElementById("DISTANCE").value;
		this.graph.distance=parseInt(x);
		document.getElementById("DISTANCE_DISPLAY").innerHTML=x;

		x = document.getElementById("RADIUS").value;
		this.graph.node_radius=parseInt(x);
		document.getElementById("RADIUS_DISPLAY").innerHTML=x;

		x = document.getElementById("CONTROL2X").value;
		this.control2X=parseInt(x)/10;
		document.getElementById("CONTROL2X_DISPLAY").innerHTML=x/10;

		x = document.getElementById("CONTROL2Y").value;
		this.control2Y=parseInt(x)/10;
		document.getElementById("CONTROL2Y_DISPLAY").innerHTML=x/10;

		x = document.getElementById("CONTROL1X").value;
		this.control1X=parseInt(x)/10;
		document.getElementById("CONTROL1X_DISPLAY").innerHTML=x/10;

		x = document.getElementById("CONTROL1Y").value;
		this.control1Y=parseInt(x)/10;
		document.getElementById("CONTROL1Y_DISPLAY").innerHTML=x/10;

		x = document.getElementById("CONTROL1XDIRECT").value;
		this.control1Xdirect=parseInt(x)/10;
		document.getElementById("CONTROL1XDIRECT_DISPLAY").innerHTML=x/10;

		x = document.getElementById("CONTROL1YDIRECT").value;
		this.control1Ydirect=parseInt(x)/10;
		document.getElementById("CONTROL1YDIRECT_DISPLAY").innerHTML=x/10;

		x = document.getElementById("CONTROL2XDIRECT").value;
		this.control2Xdirect=parseInt(x)/10;
		document.getElementById("CONTROL2XDIRECT_DISPLAY").innerHTML=x/10;

		x = document.getElementById("CONTROL2YDIRECT").value;
		this.control2Ydirect=parseInt(x)/10;
		document.getElementById("CONTROL2YDIRECT_DISPLAY").innerHTML=x/10;

		x = document.getElementById("ARROWHEAD").value;
		this.arrowHeadAdjust = parseInt(x)/10;
		document.getElementById("ARROWHEAD_DISPLAY").innerHTML=x/10;
		// clear canvas area
		ctx.clearRect(0,0,this.canvas_width,this.canvas_height);
		// draw nodes
		for (var i = 0; i <this.num_nodes;i++) 
			this.graph.drawNode(i, "#000000",true);
			
		if(document.getElementById("LAYOUT").checked) {
			// initialize edges
			this.graph.initEdges();
			// sort and draw edges
			this.graph.layoutEdges();
		} else {
			this.graph.drawEdges();
		}
	}
	
	// create graph
	this.graph = new Graph(this,
				   ctx,     
	                           this.num_nodes,  
			           this.top_offset,  
			           this.left_offset,         
				   this.node_radius,         
			           this.distance); 

}