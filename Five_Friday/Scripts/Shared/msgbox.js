(function () {
    "use strict";
    var $, Msgbox,
        __bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        };

    $ = jQuery;

    Msgbox = (function () {
        Msgbox.settings = {
            title: 'Title',
            message: "Message",
            buttons: "OK"
        };

        Msgbox.mbox = function (settings) {
            if (settings == null) {
                settings = {};
            }
            this.initialize();
            return new Msgbox(settings);
        };

        Msgbox.initialize = function () {
            return $("body:not(:has(#mbox-container))").append(
                    '<div id="mbox-container" class="msgbox hidden">' +
                    '<div id="msgbox-content">' +
                    '<h3><i class=""></i>  <span id="mbox-title"></span></h3>' +
                    '<div><span id="mbox-message"></span></div>' +
                    '<div id="mbox-controls"></div>' +
                    '<div id="mbox-footer" class="pull-right"></div>' +
                    '</div>' +
                    '</div>');
        };

        function Msgbox(settings) {
            if (settings == null) {
                settings = {};
            }
            this.animate = __bind(this.animate, this);
            this.showMsg = __bind(this.showMsg, this);

            this.settings = $.extend({}, Msgbox.settings, settings);

            this.showMsg();
        }

        Msgbox.prototype.showMsg = function () {

            $("#mbox-container").removeClass("hidden");
            $("#mbox-title").html(this.settings["title"]);
            $("#mbox-message").html(this.settings["message"]);

            $("#mbox-controls").html("");

            var icon = this.settings["icon"];
            if (typeof icon != 'undefined' &&
                icon.length > 0) {
                $("#msgbox-content i").addClass(icon);
            }

            // Add buttons
            var buttons = this.settings["buttons"];
            if (typeof buttons != 'undefined' && buttons.length > 0) {
                var btnArray = buttons.split('|');

                var btnHtml = '';
                for (var btn in btnArray) {
                    btnHtml += '<button class="btn btn-default btn-sm">' + btnArray[btn] + '</button>';
                }

                if (btnHtml.length > 5) {
                    $("#mbox-footer").html(btnHtml);
                }
                this.attachButton(this);
            }

            // Add input boxes
            var inputboxHtml = '';
            var inputbox = this.settings["inputbox"];
            if (typeof inputbox != 'undefined') {

                inputboxHtml = '<input id="mbox-input" type="text" class="form-control" value="' + inputbox + '"/>';

                if (inputboxHtml.length > 5) {
                    $("#mbox-controls").html(inputboxHtml);
                    $("#mbox-input").focus();
                }
            }

            // Add checkboxes
            var checkboxHtml = '';
            var checkbox = this.settings["checkbox"];
            if (typeof checkbox != 'undefined') {

                var chkArray = checkbox.split('|');

                for (var chk in chkArray) {

                    // check if checkbox must be ticked
                    var chkStatus = "";
                    if (chkArray[chk].lastIndexOf("*") == chkArray[chk].length - 1) {
                        chkStatus = 'checked="checked"';
                        chkArray[chk] = chkArray[chk].slice(0, -1);
                    }
                    checkboxHtml += '<label class="checkbox"> <input type="checkbox" value="0" ' + chkStatus + ' data-text="' + chkArray[chk] + '"/> ' + chkArray[chk] + ' </label>';
                }

                if (checkboxHtml.length > 5) {
                    $("#mbox-controls").html(checkboxHtml);
                }
            }

            // Add selectbox
            var selectboxOptions = '';
            var selectBox = this.settings["selectbox"];
            if (typeof selectBox != 'undefined') {

                var optionsArray = selectBox.split('|');
                for (var opt in optionsArray) {

                    // check if option must be selected
                    var selStatus = "";
                    if (optionsArray[opt].lastIndexOf("*") == optionsArray[opt].length - 1) {
                        selStatus = 'selected="selected"';
                        optionsArray[opt] = optionsArray[opt].slice(0, -1);
                    }
                    selectboxOptions += '<option ' + selStatus + ' value="' + optionsArray[opt] + '">' + optionsArray[opt] + ' </option>';
                }

                if (selectboxOptions.length > 5) {
                    var selBox = "<select class='form-control' id='mbox-select'>" + selectboxOptions + "</select>";
                    $("#mbox-controls").html(selBox);
                }
            }
        };

        Msgbox.prototype.attachButton = function ($mbox) {

            $("#mbox-container").find("button").each(function () {

                $(this).click(function () {

                    $("#mbox-container").addClass("hidden");
                    if (typeof $mbox.settings.callback != 'undefined' &&
                        $mbox.settings.callback.length > 0) {

                        var result = '';
                        var inputbox = $mbox.settings["inputbox"];
                        if (typeof inputbox != 'undefined') {

                            result = $("#mbox-input").val();

                        }

                        var checkbox = $mbox.settings["checkbox"];
                        if (typeof checkbox != 'undefined') {

                            $("#mbox-container").find(".checkbox input").each(function (e) {
                                var seperator = "|";
                                if ($(this).is(":checked")) {
                                    result += $(this).attr("data-text") + seperator;
                                }
                            });

                            // remove the last |
                            if (result.indexOf("|") > 0) {
                                result = result.slice(0, -1);
                            }
                        }

                        var selectBox = $mbox.settings["selectbox"];
                        if (typeof selectBox != 'undefined') {
                            result += $("#mbox-select").val();
                        }

                        $mbox.settings.callback.call(this, this, result);
                    }

                    // remove buttons?
                    //$(this).parent().find("button").each(function(){this.remove();});
                });
            });

        };

        return Msgbox;

    })();

    $.mbox = function (options) {
        if (options == null) {
            options = {};
        }
        return Msgbox.mbox(options);
    };

    $.mbox.show = function (options) {
        var settings;
        if (options == null) {
            options = {};
        }
        settings = {
            buttons: "OK"
        };
        return $.mbox($.extend(settings, options));
    };

}).call(this);
