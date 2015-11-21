var fs = require('fs');
var rl = require('readline');

var config = {
	debug:true,

	parsing:{
		chantrait:{
			base: '|CHANTRAIT|',
			first_line:true,
			chantrait_names: [],
			lines_read: 0,
			raz : function(){
				this.first_line = true;
				this.chantrait_names = [];
			},
			treat_line : function(line){
				var t = line.split(config.parsing.chantrait.base);
				if(config.debug) console.log("t_splitted: ", t);

				if(config.parsing.chantrait.first_line){
					if(config.debug) console.log("Entered first line: ");
					config.parsing.chantrait.chantrait_names.extend(t);
					console.log("Chantrait names is : ", config.parsing.chantrait.chantrait_names);
					config.parsing.chantrait.first_line = false;
					return;
				}

				if (t.length > config.parsing.chantrait.chantrait_names.length){
					if(config.debug) console.log(config.parsing.chantrait.chantrait_names);
					throw new Error("Line "+lines_read+" is bigger than names");
					return;
				}

				var o = {};
				for(var i = 0; i < config.parsing.chantrait.chantrait_names.length; i++){
					o[config.parsing.chantrait.chantrait_names[i]] = ( !t[i] || t[i] == '') ? null : t[i];
				}
				if(config.debug) console.log("o:", o);

				return o;
			}
		},

	},
};

module.exports = {
	config:{
		debug: function(switch_b){
			if(switch_b == "on" || switch_b == "ON" || switch_b == true || typeof switch_b == 'undefined'){
				config.debug = true;
			}else{
				config.debug = false;
			}
		},
	},

	parse:{
		chantrait: {
			fromFile : function(file, string){
				var results = [];
				var lines_read = 0;
				if(!string) string = false;

				rl = rl.createInterface({
					input: fs.createReadStream(file),
				});

				rl.on('line', function (line){
					console.log("Reading line");
					
					var o = config.parsing.chantrait.treat_line(line);

					results.push(o);

				});

				rl.on('close', function(){
					config.parsing.chantrait.raz();
					if(config.debug) console.log("Return: ", results);
					if(string) return JSON.stringify(results);
					return results;
				});
			},

			normal: function(string){
				var lines = string.split("\n");
				var results = [];
				
				for(var i = 0; i < lines.length; i++){
					results.push(config.parsing.chantrait.treat_line(lines[i]));
				}

				config.parsing.chantrait.raz();
				return results.splice(1);
			}

		}

	},


}

Array.prototype.extend = function _extendArray(array){
	if(typeof array == "undefined") throw new Error("Argument 1 (and only) must be an array");
	this.push.apply(this, array);
};

