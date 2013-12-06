/*    
#     Node class part of ControlFlowCanvas_JS
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

// Nummer Bilder laden
var num_imgs_black = new Array();
var num_imgs_gray = new Array();
for(var i=0;i<12;i++) {
	num_imgs_black[i]=new Image();
	num_imgs_black[i].src="imgs/b"+(i+1)+".gif";
	num_imgs_gray[i]=new Image();
	num_imgs_gray[i].src="imgs/g"+(i+1)+".gif";
}
	
function Node(num, center, radius, active) {
	this.center = center;
	this.radius = radius;
	this.active = active; 
	this.num = num;
	
	this.draw = function(ctx, color) {
		ctx.beginPath();
		ctx.moveTo(center.x+radius,center.y); 
		ctx.strokeStyle = color;
		ctx.lineWidth=1;
		ctx.arc(center.x,center.y,radius,0,Math.PI*2,true); 
		ctx.stroke();
		var img;
		if (this.active)
			img = num_imgs_black[this.num];
		else
			img = num_imgs_gray[this.num];
 		if(!img.complete) return;
		ctx.moveTo(center.x,center.y); 
 		ctx.drawImage(img,center.x-15, center.y-15); 
	}
}