"use strict"

class Calendar {
  

    constructor(el, options) {
        this.el = el;
     
        Object.assign(this.options, options);
        this.init();
    }
    options = {
        mode: "month",
        weekMode: ["一", "二", "三", "四", "五", "六", "日"],
        newDate: new Date(),
        width: null,
        height: null,

        showModeBtn: true,
        showEvent: true,
        maxEvent: null
    }
    init() {
        let opts = this.options;

        if (!this.el.classList.contains("calendar")) {
            this.el.className += " calendar"
        }
        typeof (opts.newDate) === "string" ? opts.newDate = this._getDateByString(opts.newDate) : opts.newDate;

        this._createCalendar();

    }
    _createCalendar(){
        this._createView()
    }
    _createView(){
        let  html =new String();
         html += this._createToolbar();
        html += '<div class="calendar-body">';
        html += '<table class="calendar-table" cellspacing="0">'
        if (this.options.mode === "month") {
            html += this._createHeader();
        }
         html += this._createBody();
        html += '</table>'
        html += '</div>'
        this.el.innerHTML=html;


        if (this.options.mode == "month") {
            this._refreshCalendar(this.options.newDate);
        }
        else {
            this._refreshYearCalendar(this.options.newDate);
        }
    }
    _createBody() {
        var me = this;
        var s = ' <tbody class="calendar-tbody">';
        s += '</tbody>';
        return s;
    }
    _createToolbar(){
        var me = this,
        newDate = me.options.newDate,
        mode = me.options.mode,
        showModeBtn = me.options.showModeBtn,
        s = '';

    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;

    s += '<div class="calendar-header">'
    s += '<div class="calendar-select calendar-year-select" >'
    s += '<span class="calendar-year-text"> ' + year + '年</span >'
    s += '<span class="calendar-icon"><i class="fa fa-angle-down"></i></span>'
    s += '<ul id="dropdown-year" class="dropdown-year">'
    s += '</ul>'
    s += '</div > '

    if (mode == "month") {

        s += '<div class="calendar-select  calendar-month-select">'
        s += '<span class="calendar-month-text"> ' + month + '月</span >'
        s += '<span class="calendar-icon"><i class="fa fa-angle-down"></i></span>'

        //创建月份下拉(写死)
        s += '<ul class="dropdown-month">'
        for (var i = 1; i <= 12; i++) {
            s += '<li class="month-item">'
            s += '<span class="month-check">' + i + '</span>'
            s += '<span >月</span>'
            s += '</li>'
        }
        s += '</ul>'
        s += '</div > '
    }

    if (showModeBtn) {
        s += '<div class="calendar-select  calendar-mode-select">'
        s += '<div class="btn-group">'

        if (mode == "month") {
            s += '<span  class="btn calendar-select-active">月</span>'
            s += '<span class="btn">年</span>'
        }
        else {
            s += '<span  class="btn">月</span>'
            s += '<span class="btn calendar-select-active">年</span>'
        }
        s += '</div>'
        s += '</div>'
    }

    s += '</div >'
    return s;
    }
    _createHeader() {
        var me = this,
            opts = me.options,
            weekMode = opts.weekMode;
        var s = '<thead><tr>';
        weekMode.forEach(function (item) {
            s += ' <th class="calendar-column-header" title="周' + item + '"><span class="calendar-column-header-inner">' + item + '</span></th>';
        });
        s += '</thead></tr>';
        return s;
    }
    _refreshCalendar(newDate){
          var me = this,
            showEvent = me.options.showEvent,
            maxEvent = me.options.maxEvent,
            s = '';

        // me.viewData = viewData = me.getViewDate(newDate);

        var _newDate = me._cloneDate(newDate);
        //当前date
        var nowNum = _newDate.getDate();

        //第一天周几
        _newDate.setDate(1);
        var weekDay = _newDate.getDay() == 0 ? 7 : _newDate.getDay();


        //视图第一天
        var viewDate = me._cloneDate(_newDate);
        viewDate.setDate(viewDate.getDate() - weekDay + 1);

        //当前第几周/行 (暂不处理)
        var spileDate = (newDate.getTime() - viewDate.getTime()) / (1000 * 60 * 60 * 24);

       let renderDate = me._cloneDate(viewDate);


        //固定六行
        for (var i = 0; i < 6; i++) {
            s += '<tr>'
            for (var l = 0; l < 7; l++) {

                var year = renderDate.getFullYear();
                var month = renderDate.getMonth() + 1;
                var date = renderDate.getDate();

                if (renderDate.getMonth() < newDate.getMonth()) {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell calendar-last-month-cell">';
                }
                else if (renderDate.getMonth() > newDate.getMonth()) {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell calendar-next-month-cell">';
                }
                else if (date == nowNum) {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell calendar-today">';
                }
                else {
                    s += '<td title="' + year + '年' + month + '月' + date + '日" class="calendar-cell">';
                }
                s += '<div class="calendar-date">';
                s += '<div class="calendar-value">' + date + '</div>';
                s += '<div class="calendar-content"><ul class="events">';
                // if (showEvent && viewData[date] && renderDate.getMonth() == newDate.getMonth()) {
                //     if (maxEvent && viewData[date].length > maxEvent) {
                //         s += '<span class="total">' + viewData[date].length + '个事件..</span>';
                //     }
                //     else {
                //         viewData[date].forEach(function (item) {
                //             s += '<li><span>' + item.name + '</span></li>';
                //         });
                //     }
                // }
                s += '</ul ></div > ';
                s += '</div></td>';

                renderDate.setDate(renderDate.getDate() + 1);

            }
            s += '</tr>';
        }
        me.el.getElementsByClassName("calendar-tbody")[0].innerHTML=s;
    }
    _cloneDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
}