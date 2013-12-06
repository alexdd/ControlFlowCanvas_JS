/*    
#     FormField class part of ControlFlowCanvas_JS
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

FORM_ERROR_MSG = "Script Error: Number of form fields"+
		              " does not fit number of nodes";

function FormField(owner, num) {
	this.num=num;
	this.owner = owner;

	this.mark = function() {
		// error marks failed input
		document.getElementById("cell"+this.num).style.background="url(imgs/alert.gif) 6px 30px no-repeat";
	}
	
	this.clearMark = function() {
		// deletes error marker
		document.getElementById("cell"+this.num).style.background="white";
	}
	
	this.drawActive = function() {
		// set style for active form field
		document.getElementById("node"+this.num).style.border="#BB2F24 1px solid";
		document.getElementById("name"+this.num).style.border="#BB2F24 1px solid";
		document.getElementById("from"+this.num).style.border="#BB2F24 1px solid";
		document.getElementById("to"+this.num).style.border="#BB2F24 1px solid";
	}
	
	this.drawInActive = function() {
		// set style for inactive form field
		document.getElementById("node"+this.num).style.border="#DFB2AE 1px solid";
		document.getElementById("name"+this.num).style.border="#DFB2AE 1px solid";
		document.getElementById("from"+this.num).style.border="#DFB2AE 1px solid";
		document.getElementById("to"+this.num).style.border="#DFB2AE 1px solid";
	}

	this.getInput = function() {
		// returns input of all form fields
		var form = document.getElementById("node"+this.num);
		if (!form) {
			throw new Error(FORM_ERROR_MSG);
			return;
		}
		strg=form.value;
		if (strg!=null) {
			var input=strg.split(",");
			var j = 0;
			var result = new Array();
			var mistakes = 0;
			for (var i=0;i<input.length;i++) {
				var x= input[i]-1;
				if (x>=0 && x<this.owner.num_nodes) {
					result[j]=x;
					j++;
				}
				else if (x != -1){
					mistakes++;
				}
			}
			// print error message if input failed
			if (mistakes>0) {
				this.mark()
			} else 
				this.clearMark();
			return result;
			}
		return null;
	}
	
	this.nameNotEmpty = function() {
		// returns true if name is set
		var form = document.getElementById("name"+this.num);
		if (!form) {
			throw new Error(FORM_ERROR_MSG);
			return;
		}
		if (form.value!="") return true;
		return false;
	}

	this.toNotEmpty = function() {
		// returns tro if form field "to" is not empty
		var form = document.getElementById("to"+this.num);
		if (!form) {
			throw new Error(FORM_ERROR_MSG);
			return;
		}
		if (form.value!="") return true;
		return false;
	}

	this.fromNotEmpty = function() {
		// returns true if form field "from" is not empty
		var form = document.getElementById("from"+this.num);
		if (!form) {
			throw new Error(FORM_ERROR_MSG);
			return;
		}
		if (form.value!="") return true;
		return false;
	}

}
