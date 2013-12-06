/*    
#     BezierCurve class part of ControlFlowCanvas_JS
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

function BezierCurve(start, control1, control2, end) {	
		
	this.draw = function(ctx, color) {
		ctx.beginPath();
		ctx.moveTo(start.x,start.y);
		ctx.strokeStyle=color;
		ctx.bezierCurveTo(control1.x,control1.y,control2.x,control2.y,end.x,end.y);
		ctx.stroke();
	}
}