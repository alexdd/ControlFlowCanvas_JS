/*    
#     Line class part of ControlFlowCanvas_JS
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

function Line(start, end) {
	this.start = start;
	this.end = end;

	this.getAngle=function() {
		return Math.atan2(this.end.y-this.start.y, this.end.x-this.start.x);
	}

	this.draw = function(ctx, color) {
		ctx.beginPath();
		ctx.strokeStyle=color;
		ctx.moveTo(this.start.x,this.start.y);
		ctx.lineTo(this.end.x,this.end.y);
		ctx.stroke();
	}	
}