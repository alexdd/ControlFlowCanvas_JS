/*    
#     Point class part of ControlFlowCanvas_JS
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

function Point(x,y) {
	this.x = x;
	this.y = y;
	
	this.rotate = function(radian) {
		var tmp_x = this.x;
		var tmp_y = this.y;
		this.x = tmp_x*Math.cos(radian)-tmp_y*Math.sin(radian);
		this.y = tmp_x*Math.sin(radian)+tmp_y*Math.cos(radian);
	}
	
	this.draw = function(ctx, color) {
		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.arc(x,y,2,0,Math.PI*2,true); 
		ctx.fill();
	}
	
	this.translate = function(dx,dy) {
		this.x+=dx;
		this.y+=dy;
	}
	
	this.clone = function() {
		return new Point(this.x, this.y);
	}
}