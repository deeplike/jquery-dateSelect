/*     jQuery.dateSelect    */
//     HTML:
//     <div class="birthdate">
//     <select>year</select>
//     <select>month</select>
//     <select>day</select>
//     </div>
//     $(".birthdate").dateSelect({
//        "beginYear":2000,           // 开始年份
//        "endYear":2011              // 结束年份
//     });
//
//    author     : wetyped
//    date       : 2013/03/13
//    email      : wetyped@gmail.com
//    version    : 1.0

    ;(function($){
        $.fn.extend({'dateSelect' : function(options){
            var yearNow = new Date().getFullYear();
            options = $.extend({
                beginYear: yearNow - 100,
                endYear: yearNow
            }, options);

            var monthDay = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            /*先给年赋值*/

            return this.each(function(){
                /*获取下拉框*/
                var dateSelects = $(this).find('select');
                var yearSelect = dateSelects.eq(0);
                var monthSelect = dateSelects.eq(1);
                var daySelect = dateSelects.eq(2);

                var year = _insertDate(yearSelect, options.beginYear, options.endYear - options.beginYear, true);/*插入年份*/
                var month = _insertDate(monthSelect, 1, 11, false);/*插入月份*/

                yearSelect.bind('change', _operateDay);
                monthSelect.bind('change', _operateDay);

                _operateDay();

                function _insertDate(elem, from, n, reverse){
                    var s = [], data;
                    for(var i = from; i <= from + n; i++){
                        data = i < 10 ? '0' + i : i;
                        s.push('<option value="'+ data +'">'+ data +'</option>');
                    }
                    if(reverse == true){
                        s.reverse();
                    }
                    var temp = elem.val();
                    elem.html(s.join(''));
                    elem.val(temp);
                    return temp;
                }

                function _operateDay(){
                    var count, year = yearSelect.val(), month = monthSelect.val();
                    if(year != 0 && month == 2){
                        if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
                            count =  monthDay[month-1];
                        else
                            count =  monthDay[month-1] - 1;
                    }else
                        count =  monthDay[month-1];
                    _insertDate(daySelect, 1, count - 1, false);
                }
            });
        }
    });
    })(jQuery);
