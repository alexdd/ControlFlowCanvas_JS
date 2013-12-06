/*    
#     Polygon class part of ControlFlowCanvas_JS
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


function Polygon(points) {
	this.points = points;
	this.filled = false;
	
	this.rotate = function(angle) {
		for (var i = 0; i < this.points.length; i++) {
			this.points[i].rotate(angle);
		}
	}

	this.draw = function(ctx, color) {
		ctx.beginPath();
		ctx.moveTo(this.points[0].x,this.points[0].y);
		for (var i = 1; i < this.points.length; i++) {
			ctx.lineTo(this.points[i].x,this.points[i].y);
		}
		ctx.lineTo(this.points[0].x,this.points[0].y);
		if (this.filled) {
			ctx.fillStyle=color;
			ctx.fill();
		} else {
			ctx.strokeStyle=color;
			ctx.stroke();
		}
	}
	
	this.translate = function(dx,dy) {
		for (var i = 0; i < this.points.length; i++) {
			this.points[i].translate(dx,dy);
		}		
	}
}