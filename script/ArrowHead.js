/*    
#     ArrowHead class part of ControlFlowCanvas_JS
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

function ArrowHead(head_width, head_length) {
	var p1 = new Point(-head_length,-head_width/2);
	var p2 = new Point(-head_length,head_width/2);
	var p3 = new Point(0,0);
	this.superclass = Polygon;
	this.superclass([p3,p1,p2]);
	
	if (navigator.userAgent.indexOf('Opera') != -1)
		this.filled = false;
	else
		this.filled=true;
	
	this.putOn = function(line) {
		this.rotate(line.getAngle());
		this.translate(line.end.x, line.end.y);
	}	
}