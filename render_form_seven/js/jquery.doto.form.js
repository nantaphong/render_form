/*jQuery Doto fom  1.0.2*/
(function($){

	// Support IE8+ Firefox Chome Safari
	
	var is_mobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4))) is_mobile = true;
	
	// todo if is_mobile set click selectbox with default selectbox
	
	$.fn.dotoform = function(opt)
	{
		var defaults = {
			
		};
		
		opt = $.extend(defaults, opt);
		
		this.each(function(){
			var obj = $(this);
			var wrapper  = obj.parent();
			
			// one time only
			if(!obj.hasClass('dotoform-bulid'))
			{
				// if input radio
				if(obj.is('input') && obj.attr('type').toLowerCase() == 'radio')
				{
					obj.hide();
					var obj_name = obj.attr('name') ? obj.attr('name').replace(/\[|\]/g, "_") : '';					
					var element = '<span class="dotoform-radio ' + obj.attr('class') + (obj.attr('name') ? ' ' + obj_name : '') + (obj.is(':checked') ? ' active' : '') + (obj.attr('disabled') ? ' disabled' : '') + '" tabindex="' + (obj.attr('tabindex') ? obj.attr('tabindex') : '0') + '"></span>';
					obj.after(element);
					var element_radio = obj.next();
					if(!element_radio.hasClass('disabled'))
					{
						element_radio.click(function(){
						
							obj.attr('checked',true);
							obj.trigger('change');
							$('.dotoform-radio.' + obj_name).removeClass('active');
							element_radio.addClass('active');
						});
						
						element_radio.keydown(function(e){
							if(e.which == 32)
							{
								element_radio.click();
							}
						});
						
						$('label[for="' + obj.attr('id') + '"]').click(function(e){
							element_radio.click();
							return false;
						});
					}
					
					// feature 
						// set tabindex
						// set disabled
						// press spacebar checked unchecked element
				}
				// if input checkbox
				else if(obj.is('input') && obj.attr('type').toLowerCase() == 'checkbox')
				{
					obj.hide();
					var element = '<span class="dotoform-checkbox ' + obj.attr('class') + (obj.is(':checked') ? ' active' : '') + (obj.attr('disabled') ? ' disabled' : '') + '" tabindex="' + (obj.attr('tabindex') ? obj.attr('tabindex') : '0') + '"></span>';
					obj.after(element);					
					var element_checkbox = obj.next();
					
					if(!element_checkbox.hasClass('disabled'))
					{
						element_checkbox.click(function(){
							obj.attr('checked',obj.attr('checked') ? false : true);
							obj.trigger('change');
							element_checkbox.toggleClass('active');
						});
						
						element_checkbox.keydown(function(e){
							if(e.which == 32)
							{
								element_checkbox.click();
							}
						});
						
						$('label[for="' + obj.attr('id') + '"]').click(function(e){
							element_checkbox.click();
							return false;
						});
					}
					
					// feature 
						// set tabindex
						// set disabled
						// press spacebar checked unchecked element
				}
				// if input select
				else if(obj.is('select'))
				{
					obj.hide();
					
					var element = '<div class="dotoform-select-wrapper" tabindex="' + (obj.attr('tabindex') ? obj.attr('tabindex') : '0') + '" style="position:relative">';
					element += '<div class="dotoform-select-value ' + obj.attr('class') + '"><div class="dotoform-select-value-value">' + obj.find('option:selected').html() + '</div><div class="dotoform-select-value-arrow"></div><div style="clear:both"></div></div>';
					element += '<div class="dotoform-select-option" style="display:none">';
					obj.find('option').each(function(){
						element += '<div class="dotoform-select-item" rel="' + $(this).attr('value') + '">' + $(this).html() + '</div>';
					});
					element += '</div>';
					element += '</div>';
					obj.after(element);
					
					var element_select_wrapper = obj.next();
					var element_select_value = element_select_wrapper.find('.dotoform-select-value');
					var element_select_option = element_select_wrapper.find('.dotoform-select-option');
					var element_select_item = element_select_wrapper.find('.dotoform-select-item');
					var option_show = false;
					
					element_select_value.click(function(){
					
						if(!option_show)
						{
							//set dotoform-select-option width
							element_select_option.css('width',element_width(element_select_value) - 2 + 'px'); // 2 is dotoform-select-option border
							
							// display dotoform-select-option in top or bottom position now auto(default)
							if(($(document).height() - element_select_value.offset().top - element_height(element_select_value) < element_height(element_select_option))
								&& (element_select_value.offset().top > element_height(element_select_option)))
							{
								element_select_option.css('bottom', (element_height(element_select_value) - 1) + 'px');
								element_select_option.css('top','');
							}
							else
							{
								element_select_option.css('top', (element_height(element_select_value) - 1) + 'px');
								element_select_option.css('bottom','');
							}
							
							element_select_option.show();
							option_show = true;
						}
						else
						{
							element_select_option.hide();
							option_show = false;
						}
					});
					
					var option_click = false;
					element_select_item.click(function(){
						option_click = true;
						update($(this));
					});
					
					element_select_value.click(function(){
						option_click = true;
					});
					
					element_select_wrapper.focusout(function(e) {
						option_click = false;
						setTimeout(function(){
							if(!option_click)
							{
								element_select_option.hide();
								option_show = false;
							}
						},100);
					});
					
					function update(item)
					{
						obj.val(item.attr('rel'));
						obj.trigger('change');
						item.parent().hide();
						element_select_wrapper.find('.dotoform-select-value-value').html(item.html());
						option_show = false;
					}
					
					// TODO feature can search item with first character and move item with arrow-key and select item with enter-key
					
					// TODO bug (low) IE and Firefox option positon display incorrect when element before wrapper set css height
						// work around
						// element_select_option.css('bottom', (element_height(element_select_value) - 1) + 'px'); add - 1
						// element_select_option.css('top', (element_height(element_select_value) - 1) + 'px'); add -1
						
					// feature 
						// set tabindex
				}
				
				obj.addClass('dotoform-bulid');
			}
			
		});	
	}
	
	function element_width(element)
	{
		return parseInt(element.width()) + parseInt(element.css('padding-left')) + parseInt(element.css('padding-right')) + parseInt(element.css('border-left-width')) + parseInt(element.css('border-right-width'));
	}
	
	function element_height(element)
	{
		return parseInt(element.height()) + parseInt(element.css('padding-top')) + parseInt(element.css('padding-bottom')) + parseInt(element.css('border-top-width')) + parseInt(element.css('border-bottom-width'));
	}
	
	//$.dotoform.show();
	$.dotoform = {
		'show' : function(){
			alert('show');
		}
	}
	
})(jQuery);