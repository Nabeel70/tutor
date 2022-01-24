(()=>{var t={};jQuery.fn.serializeObject=function(){var t=jQuery;var e={};var i=this.serializeArray();jQuery.each(i,function(){if(e[this.name]){if(!e[this.name].push){e[this.name]=[e[this.name]]}e[this.name].push(this.value||"")}else{e[this.name]=this.value||""}});t(this).find("input:checkbox").each(function(){e[t(this).attr("name")]=t(this).prop("checked")?t(this).attr("data-on")!==undefined?t(this).attr("data-on"):"on":t(this).attr("data-off")!==undefined?t(this).attr("data-off"):"off"});return e};jQuery(document).ready(function(a){"use strict";var t=window.location.href;if(t.indexOf("#")>0){a(".tutor-wizard-container > div").removeClass("active");a(".tutor-wizard-container > div.tutor-setup-wizard-settings").addClass("active");var e=t.split("#");if(e[1]){var i=a(".tutor-setup-title li."+e[1]).index();a(".tutor-setup-title li").removeClass("current");a(".tutor-setup-content li").removeClass("active");for(var s=0;s<=i;s++){a(".tutor-setup-title li").eq(s).addClass("active");if(i==s){a(".tutor-setup-title li").eq(s).addClass("current");a(".tutor-setup-content li").eq(s).addClass("active")}}}var n=a("input[name='enable_course_marketplace'").val();r(n?n:0)}a(".tutor-setup-title li").on("click",function(t){t.preventDefault();var e=a(this).closest("li").index();a(".tutor-setup-title li").removeClass("active current");a(".tutor-setup-title li").eq(e).addClass("active current");a(".tutor-setup-content li").removeClass("active");a(".tutor-setup-content li").eq(e).addClass("active");window.location.hash=a("ul.tutor-setup-title li").eq(e).data("url");for(var i=0;i<=e;i++){a(".tutor-setup-title li").eq(i).addClass("active")}});a(".tutor-type-next, .tutor-type-skip").on("click",function(t){t.preventDefault();a(".tutor-setup-wizard-type").removeClass("active");a(".tutor-setup-wizard-settings").addClass("active");a(".tutor-setup-title li").eq(0).addClass("active");window.location.hash="general";r(a("input[name='enable_course_marketplace']:checked").val())});a("input[type=radio][name=enable_course_marketplace]").change(function(){if(this.value=="0"){a("input[name=enable_course_marketplace]").val("");a("input[name=enable_tutor_earning]").val("")}else if(this.value=="1"){a("input[name=enable_course_marketplace]").val("1");a("input[name=enable_tutor_earning]").val("1")}});a(".tutor-setup-previous").on("click",function(t){t.preventDefault();var e=a(this).closest("li").index();a("ul.tutor-setup-title li").eq(e).removeClass("active");if(e>0&&e==a(".tutor-setup-title li.instructor").index()+1&&a(".tutor-setup-title li.instructor").hasClass("hide-this")){e=e-1}if(e>0){a("ul.tutor-setup-title li").eq(e-1).addClass("active");a("ul.tutor-setup-content li").removeClass("active").eq(e-1).addClass("active");a("ul.tutor-setup-title li").removeClass("current").eq(e-1).addClass("current");window.location.hash=a("ul.tutor-setup-title li").eq(e-1).data("url")}else{a(".tutor-setup-wizard-settings").removeClass("active");a(".tutor-setup-wizard-type").addClass("active");window.location.hash=""}o()});a(".tutor-setup-type-previous").on("click",function(t){a(".tutor-setup-wizard-type").removeClass("active");a(".tutor-setup-wizard-boarding").addClass("active")});a(".tutor-setup-skip, .tutor-setup-next").on("click",function(t){t.preventDefault();var e=a(this).closest("li").index()+1;if(e==a(".tutor-setup-title li.instructor").index()&&a(".tutor-setup-title li.instructor").hasClass("hide-this")){e=e+1}a("ul.tutor-setup-title li").eq(e).addClass("active");a("ul.tutor-setup-content li").removeClass("active").eq(e).addClass("active");a("ul.tutor-setup-title li").removeClass("current").eq(e).addClass("current");window.location.hash=a("ul.tutor-setup-title li").eq(e).data("url");o()});a(".tutor-boarding-next, .tutor-boarding-skip").on("click",function(t){t.preventDefault();a(".tutor-setup-wizard-boarding").removeClass("active");a(".tutor-setup-wizard-type").addClass("active")});a(".tutor-boarding").slick({speed:1e3,centerMode:true,centerPadding:"19.5%",slidesToShow:1,arrows:false,dots:true,responsive:[{breakpoint:768,settings:{arrows:false,centerMode:true,centerPadding:"50px",slidesToShow:1}},{breakpoint:480,settings:{arrows:false,centerMode:true,centerPadding:"30px",slidesToShow:1}}]});a(".tutor-redirect").on("click",function(t){var i=a(this);t.preventDefault();var e=a("#tutor-setup-form").serializeObject();a.ajax({url:_tutorobject.ajaxurl,type:"POST",data:e,success:function t(e){if(e.success){window.location=i.data("url")}}})});a(".tutor-reset-section").on("click",function(t){a(this).closest("li").find("input").val(function(){switch(this.type){case"text":return this.defaultValue;break;case"checkbox":case"radio":this.checked=this.defaultChecked;break;case"range":var t=a(this).closest(".limit-slider");if(t.find(".range-input").hasClass("double-range-slider")){t.find(".range-value-1").html(this.defaultValue+"%");a(".range-value-data-1").val(this.defaultValue);t.find(".range-value-2").html(100-this.defaultValue+"%");a(".range-value-data-2").val(100-this.defaultValue)}else{t.find(".range-value").html(this.defaultValue);return this.defaultValue}break;case"hidden":return this.value;break}})});a(".tooltip-btn").on("click",function(t){t.preventDefault();a(this).toggleClass("active")});a(".input-switchbox").each(function(){l(a(this))});function l(t){var e=t.parent().parent();if(t.prop("checked")){e.find(".label-on").addClass("active");e.find(".label-off").removeClass("active")}else{e.find(".label-on").removeClass("active");e.find(".label-off").addClass("active")}}a(".input-switchbox").click(function(){l(a(this))});a(document).on("click",function(t){if(!t.target.closest(".grade-calculation")){if(a(".grade-calculation .options-container")&&a(".grade-calculation .options-container").hasClass("active")){a(".grade-calculation .options-container").removeClass("active")}}});a(".selected").on("click",function(){a(".options-container").toggleClass("active")});a(".option").each(function(){a(this).on("click",function(){a(".selected").html(a(this).find("label").html());a(".options-container").removeClass("active")})});a(".range-input").on("change mousemove",function(t){var e=a(this).val();var i=a(this).parent().parent().find(".range-value");i.text(e)});a(".double-range-slider").on("change mousemove",function(){var t=a(this).closest(".settings");t.find(".range-value-1").text(a(this).val()+"%");t.find('input[name="earning_instructor_commission"]').val(a(this).val());t.find(".range-value-2").text(100-a(this).val()+"%");t.find('input[name="earning_admin_commission"]').val(100-a(this).val())});a("#attempts-allowed-1").on("click",function(t){if(a("#attempts-allowed-numer").prop("disabled",true)){a(this).parent().parent().parent().addClass("active");a("#attempts-allowed-numer").prop("disabled",false)}});a("#attempts-allowed-2").on("click",function(t){if(a("#attempts-allowed-2").is(":checked")){a(this).parent().parent().parent().removeClass("active");a("#attempts-allowed-numer").prop("disabled",true)}});a(".wizard-type-item").on("click",function(t){r(a(this).find("input").val())});function r(t){if(t==1){a(".tutor-show-hide").addClass("active");a(".tutor-setup-title li.instructor").removeClass("hide-this");a(".tutor-setup-content li").eq(a(".tutor-setup-title li.instructor")).removeClass("hide-this")}else{a(".tutor-show-hide").removeClass("active");a(".tutor-setup-title li.instructor").addClass("hide-this");a(".tutor-setup-content li").eq(a(".tutor-setup-title li.instructor")).addClass("hide-this")}}o();function o(){if(a(".tutor-setup-title li.instructor").hasClass("hide-this")){a(".tutor-steps").html(5);var t=a(".tutor-setup-title li.current").index();if(t>2){a(".tutor-setup-content li.active .tutor-steps-current").html(t)}}else{a(".tutor-steps").html(6);a(".tutor-setup-content li").each(function(){a(this).find(".tutor-steps-current").html(a(this).index()+1)})}}a("input[name='attempts-allowed']").on("change",function(t){var e=a(this).filter(":checked").val();if(e=="unlimited"){a("input[name='quiz_attempts_allowed']").val(0)}else{a("input[name='quiz_attempts_allowed']").val(a("input[name='attempts-allowed-number").val())}});a(document).on("input",'input.tutor-form-number-verify[type="number"]',function(){if(a(this).val()==""){a(this).val("");return}var t=a(this).attr("min");var e=a(this).attr("max");var i=a(this).val().toString();/\D/.test(i)?i="":0;i=parseInt(i||0);a(this).val(Math.abs(a(this).val()));if(!(t===undefined)){i<parseInt(t)?a(this).val(t):0}if(!(e===undefined)){i>e?a(this).val(e):0}})})})();