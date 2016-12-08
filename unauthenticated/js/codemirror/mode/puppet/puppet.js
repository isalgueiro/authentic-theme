(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("puppet",function(){var e={};var b=/({)?([a-z][a-z0-9_]*)?((::[a-z][a-z0-9_]*)*::)?[a-zA-Z0-9_]+(})?/;function f(k,g){var j=g.split(" ");for(var h=0;h<j.length;h++){e[j[h]]=k}}f("keyword","class define site node include import inherits");f("keyword","case if else in and elsif default or");f("atom","false true running present absent file directory undef");f("builtin","action augeas burst chain computer cron destination dport exec file filebucket group host icmp iniface interface jump k5login limit log_level log_prefix macauthorization mailalias maillist mcx mount nagios_command nagios_contact nagios_contactgroup nagios_host nagios_hostdependency nagios_hostescalation nagios_hostextinfo nagios_hostgroup nagios_service nagios_servicedependency nagios_serviceescalation nagios_serviceextinfo nagios_servicegroup nagios_timeperiod name notify outiface package proto reject resources router schedule scheduled_task selboolean selmodule service source sport ssh_authorized_key sshkey stage state table tidy todest toports tosource user vlan yumrepo zfs zone zpool");function c(k,i){var j,h,g=false;while(!k.eol()&&(j=k.next())!=i.pending){if(j==="$"&&h!="\\"&&i.pending=='"'){g=true;break}h=j}if(g){k.backUp(1)}if(j==i.pending){i.continueString=false}else{i.continueString=true}return"string"}function d(m,j){var l=m.match(/[\w]+/,false);var h=m.match(/(\s+)?\w+\s+=>.*/,false);var i=m.match(/(\s+)?[\w:_]+(\s+)?{/,false);var k=m.match(/(\s+)?[@]{1,2}[\w:_]+(\s+)?{/,false);var g=m.next();if(g==="$"){if(m.match(b)){return j.continueString?"variable-2":"variable"}return"error"}if(j.continueString){m.backUp(1);return c(m,j)}if(j.inDefinition){if(m.match(/(\s+)?[\w:_]+(\s+)?/)){return"def"}m.match(/\s+{/);j.inDefinition=false}if(j.inInclude){m.match(/(\s+)?\S+(\s+)?/);j.inInclude=false;return"def"}if(m.match(/(\s+)?\w+\(/)){m.backUp(1);return"def"}if(h){m.match(/(\s+)?\w+/);return"tag"}if(l&&e.hasOwnProperty(l)){m.backUp(1);m.match(/[\w]+/);if(m.match(/\s+\S+\s+{/,false)){j.inDefinition=true}if(l=="include"){j.inInclude=true}return e[l]}if(/(^|\s+)[A-Z][\w:_]+/.test(l)){m.backUp(1);m.match(/(^|\s+)[A-Z][\w:_]+/);return"def"}if(i){m.match(/(\s+)?[\w:_]+/);return"def"}if(k){m.match(/(\s+)?[@]{1,2}/);return"special"}if(g=="#"){m.skipToEnd();return"comment"}if(g=="'"||g=='"'){j.pending=g;return c(m,j)}if(g=="{"||g=="}"){return"bracket"}if(g=="/"){m.match(/.*?\//);return"variable-3"}if(g.match(/[0-9]/)){m.eatWhile(/[0-9]+/);return"number"}if(g=="="){if(m.peek()==">"){m.next()}return"operator"}m.eatWhile(/[\w-]/);return null}return{startState:function(){var g={};g.inDefinition=false;g.inInclude=false;g.continueString=false;g.pending=false;return g},token:function(h,g){if(h.eatSpace()){return null}return d(h,g)}}});a.defineMIME("text/x-puppet","puppet")});