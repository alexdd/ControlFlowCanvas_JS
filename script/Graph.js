/*    
#     Graph class part of ControlFlowCanvas_JS
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

function Graph(owner,
		 ctx, 
                 num_nodes, 
		 top_offset, 
		 left_offset, 
		 node_radius, 
		 distance) {
	this.owner = owner;
	this.ctx=ctx;
	this.left_offset = left_offset;
	this.top_offset = top_offset;
	this.node_radius = node_radius;
	this.distance = distance;
	this.num_nodes = num_nodes;
        this.nodeCnt=num_nodes;  
	this.edges = new Array();
	this.display_control_lines = false;
	UNDEFINED = -1;

	this.drawNode = function(i, color, active) {
		var x=this.left_offset+this.node_radius;
		var y=this.top_offset+this.node_radius;
		var center = new Point(x,y+i*this.distance);
		new Node(i,center,this.node_radius, active).draw(this.ctx, color);
	}

	this.drawEdge = function(i,j,level) {
		var r = this.node_radius;
		var start;
		var end;
		var control1;
		var control2;
		var arrowHead = new ArrowHead(2/3*r,r);
		if (j == i+1) {
			// special case: successor node is immediate successor
			start = new Point(this.left_offset+r,
					      i*this.distance+this.top_offset+r+r);
			end = new Point(this.left_offset+r,
					      j*this.distance+this.top_offset);
			var line = new Line(start, end);
			line.draw(this.ctx, this.owner.getEdgeColor());
			arrowHead.putOn(line);
		} else {
			if (j>i || i==j) {
				// case: directed down ards or reflexive
				start = new Point(this.left_offset,
			                     i*this.distance+this.top_offset+r);					     
				if (i==j) { 
				        // special case. reflexive edge level 4
					end = start;
					control1 = start.clone();
					control1.translate(-r*4, r*4);
					control2 = end.clone();
					control2.translate(-r*4,-r*4);
				} else {
					end = new Point(this.left_offset+r-r/2*1.7,
			                   j*this.distance+this.top_offset+r/2);
					control1 = start.clone();
					control1.translate(-owner.getControl1FractionX()*r*level,
							 owner.getControl1FractionY()*r*level);
					control2 = end.clone();
					control2.translate(owner.getControl2FractionX()*-r*level,
							owner.getControl2FractionY()*-r*level);
				}
			} else if (j<i) {
				// case: edge directed upwards
				start = new Point(this.left_offset+r+r,
			                     i*this.distance+this.top_offset+r);
				end = new Point(this.left_offset+r+r/2*1.7,
			                   j*this.distance+this.top_offset+r+r/2);
				control1 = start.clone();
				control2 = end.clone();
				if (j==i-1) {
					// special case: direct predecessor node
					control1.translate(owner.getControl1FractionXDirect()*r*level,
								 owner.getControl1FractionYDirect()*level*r);
					control2.translate(owner.getControl2FractionXDirect()*r*level,
								owner.getControl2FractionYDirect()*r*level);				
				} else {
					control1.translate(owner.getControl1FractionX()*r*level,
					                         owner.getControl1FractionY()*-r*level);
					control2.translate(owner.getControl2FractionX()*r*level,
								owner.getControl2FractionY()*r*level);				
				}
			}
			// draw bezier 
			new BezierCurve(start, control1, control2, end).draw(this.ctx, this.owner.getEdgeColor());
			// draw control lines
			if (this.display_control_lines) {
				var c_line = new Line(control2, end);
				c_line.draw(this.ctx, "#999999");
				c_line = new Line(start, control1);
				c_line.draw(this.ctx, "#999999");
			}
			// adjust arrow heads dependent of node distance and level
			var point = control2.clone();
			var dir = j<=i ? 1 : -1;
			var dx = Math.abs(i-j);
			point.translate(0,dx*(r/4-level/2)*dir*owner.getArrowHeadAjust());
			var arrow_line = new Line(point, end);			
			arrowHead.putOn(arrow_line);
		} 
		// draw arrow head
		arrowHead.draw(this.ctx, this.owner.getArrowHeadColor());
	}
	
	this.getLevel = function() {
		// if less then one edge do not get lower than leverl 3
		return Math.max(Math.round(this.num_nodes/2),3);
	}
	
	this.initEdges = function() {
		// initializes edge matrix for layout algorithm
		for(var i=0;i<this.num_nodes;i++) {
			var left = new Array();
			var right= new Array();
			for(var j=0;j<this.getLevel();j++) {
				left[j]=UNDEFINED;
				right[j]=UNDEFINED;
			}
			this.edges[i] = [left,right];
		}	
	}
	
	this.drawEdges = function() {
		for(var i=0;i<this.nodeCnt;i++) {
			var data;
			try {
				data=this.owner.getInput(i);
			} catch (e) {
				alert(e.message);
				return;
			}
			if(data==null) continue;
			for(j=0;j<data.length;j++) 
				this.drawEdge(i,data[j],3);
		}
		for(var i=0;i<this.nodeCnt;i++) {
			var data;
			try {
				data=this.owner.getInput(i);
			} catch (e) {
				alert(e.message);
				return;
			}
			if(data==null) continue;
			for(j=0;j<data.length;j++) 
				this.drawEdge(i,data[j],3);
		}
	}
	
	this.layoutEdges = function() {
		
		// draws all edges and assigns levels
		
		var LEFT = 1;
		var RIGHT = 0;
		var level; 
		for(var i=this.nodeCnt-1;i>=0;i--) {
			
			// traverse bottom up and process nodes on the right side
			
			var data;
			try {
				data=this.owner.getInput(i);
			} catch (e) {
				alert(e.message);
				return;
			}
			if(data==null) continue;
			for(j=0;j<data.length;j++) {
				
				// for every input...
				
				if (data[j]>i) continue;
				for(level=this.getLevel();level>=0;level--) {
					
					// ...check if edge can be layouted on level
					
					var l = i;
					while ((this.edges[l][RIGHT][level]>=data[j] || 
						this.edges[l][RIGHT][level]==UNDEFINED)) {
						l++;
						if (l==this.num_nodes) break;
					}		  					
					if (l==this.num_nodes || level==0)  {
						
						// .. if edge can bei layouted on level or on a lowest 
						// level then draw edge an push to edge array

						this.drawEdge(i,data[j],level);
						this.edges[i][RIGHT][level]=data[j];
						break;
					}
				}
			}
		}
		
		// process in the same way for the right side
		
		for(var i=0;i<this.nodeCnt;i++) {
			var data;
			try {
				data=this.owner.getInput(i);
			} catch (e) {
				alert(e.message);
				return;
			}
			if(data==null) continue;
			for(j=0;j<data.length;j++) {
				if (data[j]<=i) continue;
				for(level=this.getLevel();level>=0;level--) {
					var l = i;
					while ((this.edges[l][LEFT][level]<=data[j] || 
						this.edges[l][LEFT][level]==UNDEFINED)) {
						l--;
						if (l<0) break;
					}					    	
					if (l<0 || level==0) {
						this.drawEdge(i,data[j],level);
						this.edges[i][LEFT][level]=data[j];
						break;
					}
				}
			}
		}	
	}
	
	this.drawGrid = function() {
		
		// draws a grid for debugging purposes
		
		var width = this.owner.getCanvasWidth();
		var height = this.owner.getCanvasHeight();
	
		for(i=0;i<=width;i+=this.node_radius/2) {
			var start = new Point(i,0);
			var end = new Point(i,height);
			var line = new Line(start, end);
			line.draw(this.ctx, "#999999");
		}
		for(i=0;i<=height;i+=this.node_radius/2) {
			var start = new Point(0,i);
			var end = new Point(width,i);
			var line = new Line(start, end);
			line.draw(this.ctx, "#999999");
		}
	}
}
