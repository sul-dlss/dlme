// These imports are not part of the downloaded asset. They are needed to make the include in entry.js via importmap work as expected.
import Blacklight from 'blacklight-frontend'
import jQuery from 'jquery'

// blacklight-hierarchy@6.4.0 downloaded from https://ga.jspm.io/npm:blacklight-hierarchy@6.4.0/app/assets/javascripts/blacklight/hierarchy/hierarchy.js

var a=typeof globalThis!=="undefined"?globalThis:typeof self!=="undefined"?self:global;Blacklight.onLoad((function(){Blacklight.do_hierarchical_facet_expand_contract_behavior()}));(function(c){Blacklight.do_hierarchical_facet_expand_contract_behavior=function(){c(Blacklight.do_hierarchical_facet_expand_contract_behavior.selector).each(Blacklight.hierarchical_facet_expand_contract)};Blacklight.do_hierarchical_facet_expand_contract_behavior.selector='[data-controller="b-h-collapsible"]';Blacklight.do_hierarchical_facet_expand_contract_behavior.handle='[data-action="click->b-h-collapsible#toggle"]';Blacklight.do_hierarchical_facet_expand_contract_behavior.list='[data-b-h-collapsible-target="list"]';Blacklight.hierarchical_facet_expand_contract=function(){var e=c(this||a);e.addClass("twiddle");c(Blacklight.do_hierarchical_facet_expand_contract_behavior.list,this||a).each((function(){if(c("span.selected",this||a).length!=0){e.addClass("twiddle-open");e.children(".collapse").addClass("show")}}));e.children(Blacklight.do_hierarchical_facet_expand_contract_behavior.handle).click((function(a){e.toggleClass("twiddle-open")}))}})(jQuery);var c={};export{c as default};

