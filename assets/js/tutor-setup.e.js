jQuery.fn.serializeObject=function(){var t={},e=this.serializeArray();return jQuery.each(e,function(){t[this.name]?(t[this.name].push||(t[this.name]=[t[this.name]]),t[this.name].push(this.value||"")):t[this.name]=this.value||""}),t},jQuery(document).ready(function(a){"use strict";const t=window.location.href;if(0<t.indexOf("#")){a(".tutor-wizard-container > div").removeClass("active"),a(".tutor-wizard-container > div.tutor-setup-wizard-settings").addClass("active");var e=t.split("#");if(e[1]){var i=a(".tutor-setup-title li."+e[1]).index();a(".tutor-setup-title li").removeClass("current"),a(".tutor-setup-content li").removeClass("active");for(let t=0;t<=i;t++)a(".tutor-setup-title li").eq(t).addClass("active"),i==t&&(a(".tutor-setup-title li").eq(t).addClass("current"),a(".tutor-setup-content li").eq(t).addClass("active"))}e=a("input[name='enable_course_marketplace'").val();n(e||0)}function s(t){var e=t.parent().parent();t.prop("checked")?(e.find(".label-on").addClass("active"),e.find(".label-off").removeClass("active")):(e.find(".label-on").removeClass("active"),e.find(".label-off").addClass("active"))}function n(t){1==t?(a(".tutor-show-hide").addClass("active"),a(".tutor-setup-title li.instructor").removeClass("hide-this"),a(".tutor-setup-content li").eq(a(".tutor-setup-title li.instructor")).removeClass("hide-this")):(a(".tutor-show-hide").removeClass("active"),a(".tutor-setup-title li.instructor").addClass("hide-this"),a(".tutor-setup-content li").eq(a(".tutor-setup-title li.instructor")).addClass("hide-this"))}function l(){var t;a(".tutor-setup-title li.instructor").hasClass("hide-this")?(a(".tutor-steps").html(5),2<(t=a(".tutor-setup-title li.current").index())&&a(".tutor-setup-content li.active .tutor-steps-current").html(t)):(a(".tutor-steps").html(6),a(".tutor-setup-content li").each(function(){a(this).find(".tutor-steps-current").html(a(this).index()+1)}))}a(".tutor-setup-title li").on("click",function(t){t.preventDefault();var e=a(this).closest("li").index();a(".tutor-setup-title li").removeClass("active current"),a(".tutor-setup-title li").eq(e).addClass("active current"),a(".tutor-setup-content li").removeClass("active"),a(".tutor-setup-content li").eq(e).addClass("active"),window.location.hash=a("ul.tutor-setup-title li").eq(e).data("url");for(let t=0;t<=e;t++)a(".tutor-setup-title li").eq(t).addClass("active")}),a(".tutor-boarding-next, .tutor-boarding-skip").on("click",function(t){t.preventDefault(),a(".tutor-setup-wizard-boarding").removeClass("active"),a(".tutor-setup-wizard-type").addClass("active")}),a(".tutor-type-next, .tutor-type-skip").on("click",function(t){t.preventDefault(),a(".tutor-setup-wizard-type").removeClass("active"),a(".tutor-setup-wizard-settings").addClass("active"),a(".tutor-setup-title li").eq(0).addClass("active"),window.location.hash="general",n(a("input[name='enable_course_marketplace_setup']:checked").val())}),a("input[type=radio][name=enable_course_marketplace_setup]").change(function(){"0"==this.value?(a("input[name=enable_course_marketplace]").val(""),a("input[name=enable_tutor_earning]").val("")):"1"==this.value&&(a("input[name=enable_course_marketplace]").val("1"),a("input[name=enable_tutor_earning]").val("1"))}),a(".tutor-setup-previous").on("click",function(t){t.preventDefault();let e=a(this).closest("li").index();a("ul.tutor-setup-title li").eq(e).removeClass("active"),0<e&&e==a(".tutor-setup-title li.instructor").index()+1&&a(".tutor-setup-title li.instructor").hasClass("hide-this")&&(e-=1),0<e?(a("ul.tutor-setup-title li").eq(e-1).addClass("active"),a("ul.tutor-setup-content li").removeClass("active").eq(e-1).addClass("active"),a("ul.tutor-setup-title li").removeClass("current").eq(e-1).addClass("current"),window.location.hash=a("ul.tutor-setup-title li").eq(e-1).data("url")):(a(".tutor-setup-wizard-settings").removeClass("active"),a(".tutor-setup-wizard-type").addClass("active"),window.location.hash=""),l()}),a(".tutor-setup-type-previous").on("click",function(t){a(".tutor-setup-wizard-type").removeClass("active"),a(".tutor-setup-wizard-boarding").addClass("active")}),a(".tutor-setup-skip, .tutor-setup-next").on("click",function(t){t.preventDefault();let e=a(this).closest("li").index()+1;e==a(".tutor-setup-title li.instructor").index()&&a(".tutor-setup-title li.instructor").hasClass("hide-this")&&(e+=1),a("ul.tutor-setup-title li").eq(e).addClass("active"),a("ul.tutor-setup-content li").removeClass("active").eq(e).addClass("active"),a("ul.tutor-setup-title li").removeClass("current").eq(e).addClass("current"),window.location.hash=a("ul.tutor-setup-title li").eq(e).data("url"),l()}),a(".tutor-boarding-next, .tutor-boarding-skip").on("click",function(t){t.preventDefault(),a(".tutor-setup-wizard-boarding").removeClass("active"),a(".tutor-setup-wizard-type").addClass("active")}),a(".tutor-boarding").slick({speed:1e3,centerMode:!0,centerPadding:"19.5%",slidesToShow:1,arrows:!1,dots:!0,responsive:[{breakpoint:768,settings:{arrows:!1,centerMode:!0,centerPadding:"50px",slidesToShow:1}},{breakpoint:480,settings:{arrows:!1,centerMode:!0,centerPadding:"30px",slidesToShow:1}}]}),a(".tutor-redirect").on("click",function(t){const e=a(this);t.preventDefault();t=a("#tutor-setup-form").serializeObject();a.ajax({url:_tutorobject.ajaxurl,type:"POST",data:t,success:function(t){t.success&&(window.location=e.data("url"))}})}),a(".tutor-reset-section").on("click",function(t){a(this).closest("li").find("input").val(function(){switch(this.type){case"text":return this.defaultValue;case"checkbox":case"radio":this.checked=this.defaultChecked;break;case"range":const t=a(this).closest(".limit-slider");if(!t.find(".range-input").hasClass("double-range-slider"))return t.find(".range-value").html(this.defaultValue),this.defaultValue;t.find(".range-value-1").html(this.defaultValue+"%"),a(".range-value-data-1").val(this.defaultValue),t.find(".range-value-2").html(100-this.defaultValue+"%"),a(".range-value-data-2").val(100-this.defaultValue);break;case"hidden":return this.value}})}),a(".tooltip-btn").on("click",function(t){t.preventDefault(),a(this).toggleClass("active")}),a(".input-switchbox").each(function(){s(a(this))}),a(".input-switchbox").click(function(){s(a(this))}),a(".selected").on("click",function(){a(".options-container").toggleClass("active")}),a(".option").each(function(){a(this).on("click",function(){a(".selected").html(a(this).find("label").html()),a(".options-container").removeClass("active")})}),a(".range-input").on("change mousemove",function(t){var e=a(this).val();let i=a(this).parent().parent().find(".range-value");i.text(e)}),a(".double-range-slider").on("change mousemove",function(){const t=a(this).closest(".settings");t.find(".range-value-1").text(a(this).val()+"%"),t.find('input[name="earning_instructor_commission"]').val(a(this).val()),t.find(".range-value-2").text(100-a(this).val()+"%"),t.find('input[name="earning_admin_commission"]').val(100-a(this).val())}),a("#attempts-allowed-1").on("click",function(t){a("#attempts-allowed-numer").prop("disabled",!0)&&(a(this).parent().parent().parent().addClass("active"),a("#attempts-allowed-numer").prop("disabled",!1))}),a("#attempts-allowed-2").on("click",function(t){a("#attempts-allowed-2").is(":checked")&&(a(this).parent().parent().parent().removeClass("active"),a("#attempts-allowed-numer").prop("disabled",!0))}),a(".wizard-type-item").on("click",function(t){n(a(this).find("input").val())}),l(),a("input[name='attempts-allowed']").on("change",function(t){"unlimited"==a(this).filter(":checked").val()?a("input[name='quiz_attempts_allowed']").val(0):a("input[name='quiz_attempts_allowed']").val(a("input[name='attempts-allowed-number").val())}),a("input[name='attempts-allowed-number']").on("change",function(t){a("input[name='quiz_attempts_allowed']").val(a(this).val())}),a("input[name='attempts-allowed-number']").on("focus",function(t){a("input[name='attempts-allowed'][value='single']").attr("checked",!0)})});