//Purpose   : To Create Custome Paging//
//Created By: Dharmendra Kumar   //
//Created Date: 01-12-2014 //
///<reference path="jquery-1.11.1.min.js" />
var TotalRecord_Temp, PageSize_Temp, NumbersPerPage_Temp, CurrentPageIndex_Temp, ContainerDivID_Temp;
var TotalPages = 0;
var prevClass, NextClass, ActiveIndex;
var Count = 0, LoopCount, StartPageNo = 0, CurrentPageNo, FirstNo = 0;

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function CreateCustomPagging(TotalRecord, PageSize, NumbersPerPage, CurrentPageIndex, ContainerDivID) {
    Count = 0;
    TotalRecord_Temp = TotalRecord;
    PageSize_Temp = PageSize;
    NumbersPerPage_Temp = NumbersPerPage;
    CurrentPageIndex_Temp = CurrentPageIndex;
    ContainerDivID_Temp = ContainerDivID;
    LoopCount = NumbersPerPage
    TotalPages = Math.ceil(TotalRecord / PageSize);

    prevClass = "enabledli";
    NextClass = "enabledli";
    ActiveIndex = "notActive";
    if (CurrentPageIndex == 1) {
        prevClass = "disabledli";
    }

    var MyPagingDiv = "<div class='PagingDiv'>";
    MyPagingDiv += "<ul>";
    MyPagingDiv += "<li class='" + prevClass + "'><a onclick='NavigatePrevPage(this)'>  Previous</a></li>";
    StartPageNo = (CurrentPageIndex - 1) * NumbersPerPage + 1;
    CurrentPageNo = StartPageNo;

    while (LoopCount >= 1) {
        if (Count == 0) {
            FirstNo = parseInt(CurrentPageNo);
        }
        Count = Count + 1;
        if (CurrentPageIndex == CurrentPageNo) {
            ActiveIndex = "active";
        }
        else {
            ActiveIndex = "notactive";
        }
        MyPagingDiv += "<li><a id='" + "liNav" + (NumbersPerPage - LoopCount + 1).toString() + "' class='" + ActiveIndex + "' onclick='PageNoClick(this," + CurrentPageNo.toString() + ")'>" + CurrentPageNo.toString() + "</a></li>";
        LoopCount = LoopCount - 1;
        CurrentPageNo = parseInt(CurrentPageNo) + 1;
        if (CurrentPageNo > TotalPages) {
            LoopCount = 0;
        }
    }

    if (CurrentPageNo >= TotalPages) {
        NextClass = "disabledli";
    }
    MyPagingDiv += "<li class='" + NextClass + "'><a onclick='NavigateNextPage(this)'>Next</a></li>";
    MyPagingDiv += "</ul></div>";
    $(ContainerDivID).html(MyPagingDiv);
    if (TotalPages <= 1) {
        $(".PagingDiv").hide();
    }
}
function NavigateNextPage(id_next) {
    if (CurrentPageNo <= TotalPages) {
        CreateCustomPagging(TotalRecord_Temp, PageSize_Temp, NumbersPerPage_Temp, parseInt(CurrentPageIndex_Temp) + 1, ContainerDivID_Temp);
    }
}
function NavigatePrevPage(id_Prev) {
    if (parseInt(CurrentPageIndex_Temp) - 1 > 0) {
        CreateCustomPagging(TotalRecord_Temp, PageSize_Temp, NumbersPerPage_Temp, parseInt(CurrentPageIndex_Temp) - 1, ContainerDivID_Temp);
    }
}

function PageNoClick(id_temp, PageNo) {
    PageNavigationClick(id_temp, PageNo);
}

var myAlertDiv = "";
function ShowAlertPopup(SuccessTitle, SuccessMessage) {
    //<i class='fa fa-times cancel' ></i> 
    myAlertDiv = "";
    myAlertDiv += "<div class='cssDivConfirm alter-message' id='divConfirmPopup'><div class='alert-icon'> <img src='/images/error-alert-icon.png'> </div><div class='divinner'>" +
    '<div class="divforcontent" style="font-size:18px; font-weight:300; color:#333; font-family:roboto; text-align:center;"> <br/>' +
    "" + SuccessTitle + " <b>" + SuccessMessage + "</b> </div><div class=divforclosethepopup><a id='btnCloseConfirmButton' style='cursor:pointer' onclick='closedivSuccessPopup()' class='btn-absolute'>Close</a></div></div></div>"
    myAlertDiv += "<div id='divProgressBarTemp'></div>";
    $("body").append(myAlertDiv);
    jQuery('#divConfirmPopup').fadeIn(1000);
    $("#divProgressBarTemp").addClass("progressAdd");
}

var myConfirmDiv = "";
function ShowConfirmPopup(SuccessTitle, SuccessMessage) {
    //<i class='fa  cancel No' ></i> 
    //<i class='fa  cancel Yes' ></i> 
    myConfirmDiv = "";
    myConfirmDiv += "<div class='cssDivConfirm areyou-sure-message' id='divConfirmPopup'><div class='alert-icon'> <img src='/images/error-alert-icon.png'> </div><div class='divinner'>" +
    '<div class="divforcontent" style="font-size:18px; font-weight:300; color:#333; font-family:roboto; text-align:center;"> <br/>' +
    "" + SuccessTitle + " <b>" + SuccessMessage + "</b> </div><div class=divforclosethepopup><a id='btnYesConfirmButton' style='cursor:pointer' onclick='YesConfirmPopup()' class='btn-yes'>Yes</a>&nbsp&nbsp<a id='btnCloseConfirmButton' style='cursor:pointer' onclick='NoConfirmPopup()' class='btn-absolute'>No</a></div></div></div>"
    myConfirmDiv += "<div id='divProgressBarTemp'></div>";
    $("body").append(myConfirmDiv);
    jQuery('#divConfirmPopup').fadeIn(1000);
    $("#divProgressBarTemp").addClass("progressAdd");
}

function closedivAlertPopup() {
    $("#divAlertPopup").remove();
    $("#divAlertPopup").hide(200);
    $("#divProgressBarTemp").removeClass("progressAdd");
}

//function ShowConfirmationPopup(ErrorTitle, ErrolMessage) {
//    myAlertDiv = "";
//    myAlertDiv += "<div style='width:50%;' id='divConfirmPopup'><table cellpadding='0' cellspacing='0' style='width:100%;border-radius:15px !important'  class='ConfirmPopupBody'>";
//    myAlertDiv += "<tr> <td class='tdConfirmHeader'><div class='confirmCss'>  &nbsp<span>" + ErrorTitle + "</span>  </div>   </td></tr>";
//    myAlertDiv += " <tr><td class='tdConfirmBody'> <span>" + ErrolMessage + " </span></td></tr>";
//    myAlertDiv += "<tr><td class='tdConfirmCloseButton'><a id='btnyesDoit' onclick='yesDoIt()' class='CssyesDoit'>Yes</a> &nbsp; &nbsp; <a id='btnNoDoIt' onclick='noDoIt()' class='closeConfirmButton'>No</a></td> </tr>";
//    myAlertDiv += "</table></div>";
//    myAlertDiv += "<div id='divProgressBarTemp'></div>";
//    $("body").append(myAlertDiv);
//    $("#divConfirmPopup").fadeIn(500);
//    $("#divProgressBarTemp").addClass("progressAdd");
//}

//function yesDoIt() {
//    $("#divConfirmPopup").remove();
//    $("#divConfirmPopup").hide(500);
//    $("#divProgressBarTemp").removeClass("progressAdd");
//    return true;
//}

//function noDoIt() {
//    $("#divConfirmPopup").remove();
//    $("#divConfirmPopup").hide(500);
//    $("#divProgressBarTemp").removeClass("progressAdd");
//    return false;
//}

function ShowSuccessPopup(SuccessTitle, SuccessMessage) {
    //<i class='fa fa-times' ></i>
    myAlertDiv = "";
    myAlertDiv += "<div class='cssDivConfirm' id='divConfirmPopup'><div class='success-icon'> <img src='/images/success-alert-icon.png' /> </div><div class='divinner'>" +
    '<div class="divforcontent">  <br/>' +
    "" + SuccessTitle + " <b >" + SuccessMessage + "</b> </div><div class=divforclosethepopup><a id='btnCloseConfirmButton' style='cursor:pointer' onclick='closedivSuccessPopup()' class='btn-absolute'>Close</a></div></div></div>"
    myAlertDiv += "<div id='divProgressBarTemp'></div>";
    $("body").append(myAlertDiv);
    jQuery('#divConfirmPopup').fadeIn(1000);
    $("#divProgressBarTemp").addClass("progressAdd");
}

function closedivSuccessPopup() {
    $("#divConfirmPopup").remove();
    $("#divConfirmPopup").hide(200);
    $("#divProgressBarTemp").removeClass("progressAdd");

}
function NoConfirmPopup() {
    $("#divConfirmPopup").remove();
    $("#divConfirmPopup").hide(200);
    $("#divProgressBarTemp").removeClass("progressAdd");
}
function ShowProgressOnBody() {
    $('body').append("<div id='divProgressCommon'></div>");
    $("#divProgressCommon").html("<div class='divImgLoader'> <img id='imgLoader' src='/images/progress.gif'></div>");
    $("#divProgressCommon").addClass("progressAddCommon");
}
function RemoveProgressFromBody() {
    $("#divProgressCommon").html("");
    $("#divProgressCommon").html("<div class='divImgLoader'> <img id='imgLoader' src='/images/progress.gif'></div>");
    $("#divProgressCommon").remove();
}

function ShowPageLoader(msg) {
    return "<div class='pageloader1'><div class='msg'>" + msg + "<div> <div class='loadingPage style-1'></div></div>";
}
$('.cssOnlyNumeric').keyup(function () {
    var value = $(this).val();
    if (isNaN(value)) {
        $(this).val($(this).val().replace(/[^\d]/g, ""));
    }
    else {
    }
    var f = value.indexOf(".");
    if (f > -1) {
        var sub2 = value.substring(0, f);
        $(this).val(sub2);
        var l = value.indexOf(".", f);
        if (l > f) {
            var sub = value.substring(0, l);
            if (f != l) {
                $(this).val(sub);
                return false;
            }
        }
    }
});
//------------------------------This Code Also Work in Mobile---------------------------//
//$('.lettersOnly').keyup(function () {
//    var value = $(this).val();
//    if (isNaN(value)) {
//        $(this).val($(this).val().replace(/[^a-zA-Z ]/, ""));
//    }
//    else {
       
//    }
//    var f = value.indexOf(".");
//    if (f > -1) {
//        var sub2 = value.substring(0, f);
//        $(this).val(sub2);
//        var l = value.indexOf(".", f);
//        if (l > f) {
//            var sub = value.substring(0, l);
//            if (f != l) {
//                $(this).val(sub);
//                return false;
//            }
//        }
//    }
//});
//--------------------------End----------------------------------------//
function validateUserName(getusername) {
    var validation = new RegExp(/^[^\s]+$/);
    var valid = validation.test(getusername);
    if (!valid) {
       ShowAlertPopup("Alert", "Space Not Allowed")
        return false;
    } else {      
        return true;
    }
}

function UserNameValidation(id)
{
    $(id).addClass('txtErroHover');
    $(id).focus();
    ShowAlertPopup("Alert", "Enter User Name Please.");
    return false;
}
function validatePhone(getNumber) {
    var numbervalidation = new RegExp(/^[0-9-+]+$/);
    var valid = numbervalidation.test(getNumber);
    if (!valid) {
        return false;
    } else {
        return true;
    }
}
function validateEmail(email) {
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var valid = emailReg.test(email);

    if (!valid) {
        return false;
    } else {
        return true;
    }
}

function validateEmailwithExist(t, email, emaillist) {
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var valid = emailReg.test(email);
    if (!valid) {
        var reducemail = $(t).val().replace(/[^a-zA-Z0-9-.@_ ]/g, ' ');
        $(t).val(reducemail.trim());
        $(t).val('').attr("placeholder", "Enter Correct Email").focus();
        return false;
    } else {
        var list = emaillist.split(',');
        for (var i = 0; i < list.length; i++) {
            if (list[i] == email) {
                var reducemail = $(t).val().replace(/[^a-zA-Z0-9-.@_ ]/g, ' ');
                $(t).val(reducemail.trim());
                $(t).val('').attr("placeholder", "Don't Enter Duplicate Email Id.").focus();
                return false;
            }
            else {
                return true;
            }
        }
    }
}

function validateMobilewithExist(t, mobile, mobilelist) {
    var mobileReg = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
    var valid = mobileReg.test(mobile);
    if (!valid) {
        var reducemobile = $(t).val().replace(/[^0-9]/g, ' ');
        $(t).val(reducemobile.trim());
        $(t).val('').attr("placeholder", "Enter Correct Mobile").focus();
        return false;
        } else {
        var list = mobilelist.split(',');
        for (var i = 0; i < list.length; i++) {
            if (list[i] == mobile) {
                var reducemobile = $(t).val().replace(/[^0-9]/g, ' ');
                $(t).val(reducemobile.trim());
                $(t).val('').attr("placeholder", "Don't Enter Duplicate Mobile.").focus();
                return false;
            }
            else {
                return true;
            }
        }
    }
}

var divTextID = " ";
function ResetTextBox(className, cssName) {
    divTextID = "." + className + " input[type='text'],input[type='password']";
    $(divTextID).each(function () {
        $(this).val("");
        $(this).removeClass(cssName);
    });
}

function ResetTextBoxCssById(idName, cssName) {
    divTextID = "#" + idName + " input[type='text'],input[type='password'],select";
    $(divTextID).each(function () {
        $(this).removeClass(cssName);
    });
}

function RemoveSpan(className, cssName) {
    $("." + className + " ." + cssName).each(function () {
        $(this).remove();
    });
    $("." + className).each(function () {
        $(this).remove();
    });
    $("." + cssName).each(function () {
        $(this).remove();
    });
}

function RemoveSpanById(IDName, cssName) {
    $("#" + IDName + " ." + cssName).each(function () {
        $(this).remove();
    });
}

function IsEmailValidate(txtemail) {
    var emailexp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (txtemail == '') {
        return false;
    }
    if (!emailexp.test(txtemail)) {
        return false;
    }
    return true;
}
function AddErrorSpan(controlId, className, message) {
    $("#" + controlId).after("<span class='" + className + "'><dt class='ErrorArrow'></dt>" + message + "</span>");
}

function AddValidSpan(controlId, className) {
    $("#" + controlId).after("<span class='" + className + "'></span>");
}
function AddSuccessSpanAfter(controlId, className, message) {
    $("#" + controlId).after("<span class='" + className + "'>" + message + "</span>");
    $("." + className).fadeIn(200);
}

function AddErrorSpanAbove(controlId, className, message) {
    $("#" + controlId).before("<span class='" + className + "'><dt class='ErrorArrow'></dt>" + message + "</span>");
    $("." + className).fadeIn(200);
    // $("#" + controlId).after("<span class='" + className + "'><dt class='ErrorArrow'></dt>" + message + "</span>");
}

function AddtxtErroHover(controlId) {
    $("#" + controlId).addClass("txtErroHover");
}
function RemovetxtErroHover(className) {
    $("." + className + " .txtErroHover").each(function () {
        $(this).removeClass("txtErroHover");
    });
}
function RemoveValidIconId(IDName, cssName) {
    $("#" + IDName + " ." + cssName).each(function () {
        $(this).remove();
    });
}

function CustomFocusBYID(controlID) {
    $('#' + controlID).focus();
    $("body, html").animate({
        scrollTop: $('#' + controlID).position().top
    }, 500);
    $('#' + controlID).focus();
}

var MySuccessLabel = " ";
function GetSuccessLabel(msg) {
    MySuccessLabel = " <div class='successLabel' >" + msg + " <div  onclick='closeSuccessLabel(this)' class='close'><a>×</a></div> </div>";
    return MySuccessLabel;
}
function GetErrorLabel(msg) {
    MySuccessLabel = " <div class='errorLabel' >" + msg + " <div  onclick='closeSuccessLabel(this)' class='close'><a>×</a></div> </div>";
    return MySuccessLabel;
}
function closeSuccessLabel(id) {
    $(id).parent('div').fadeOut(500);
    return;
}

$(".cssOnlyNumericDecimal").bind('keydown', function (event) {
    var getvals = $(this).val().trim();
    //console.log(event.keyCode);
    if (event.keyCode == 110 || event.keyCode == 190) {
        if ($(this).val().indexOf('.') > 0) {
            return false;
        }
    }

    if (event.shiftKey == true) {
        event.preventDefault();
    }
    if ((event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 ||
            event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190 || event.keyCode == 110 || event.keyCode == 109 || event.keyCode == 107 || event.keyCode == 189 || event.keyCode == 187) {
    } else {
        event.preventDefault();
    }

    if ($(this).val().indexOf('.') !== -1 && event.keyCode == 190)
        event.preventDefault();
});
//-----------------------------Same function repeated--------------------------//
//$(".cssOnlyNumeric").bind("keyup", function () {
   
//    var value = $(this).val();
//    if (isNaN(value)) {
//        $(this).val($(this).val().replace(/[^\d]/g, ""));
//    }
//    else {
//    }
//    var f = value.indexOf(".");
//    if (f > -1) {
//        var sub2 = value.substring(0, f);
//        $(this).val(sub2);
//        var l = value.indexOf(".", f);
//        if (l > f) {
//            var sub = value.substring(0, l);
//            if (f != l) {
//                $(this).val(sub);
//                return false;
//            }
//        }
//    }
//});
//====================================End========================================//

$(".cssOnlyEmail").bind("keyup", function () {
    var reducemail = $(this).val().replace(/[^a-zA-Z0-9.@_ ]/g, ' ');
    $(this).val(reducemail.trim());
    return false;
});
//$(".cssOnlyForName").bind("keyup", function () {
//    var reducemail = $(this).val().replace(/[^a-zA-Z0-9]  /g, ' ');
//    $(this).val(reducemail.trim());
//    return false;
//});
$('.cssOnlyForName').bind('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    if (event.charCode != '32' && event.charCode != '0') {
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
});
$(".cssOnlyForName").bind("paste", function (event) {
    event.preventDefault();
    return false;
});
//////////////////////                Add to Favourite  Start              /////////////////
function getpmid(t, pmid, title) {
    ShowProgressOnBody();
    $.ajax({
        type: "POST",
        url: "/BusinessDetails/SAVEFAVOURITE",
        data: "{pmid:'" + pmid + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var ret = data;
            if (ret == 1) {
                RemoveProgressFromBody();
                ShowSuccessPopup("Message  ", title.trim() + " successfully  saved as your favourite.");
                $("#anchorforsave").attr("title", "Already Saved ");
                $("#anchorforsave").attr("enable", "false");
                return false;
            }
            if (ret == 2) {
                RemoveProgressFromBody();
                ShowSuccessPopup("Message ", title.trim() + " is already saved as your favourite.");
                $("#anchorforsave").attr("title", "Already Saved ");
                $("#anchorforsave").attr("enable", "false");
                return false;
            }
            if (ret == 3) {
                RemoveProgressFromBody();
                var currentURL = window.location;
                $("#rurl").val(currentURL);
                window.location.href = "/customer-login?favoriteurl=" + currentURL;
            }
        },
    });
    return false;
}
//////////////////////                Add to Favourite  End              /////////////////

//////////////////////                Add to Copy to Cliboard Start              /////////////////
function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return "jewria.com";
}
//////////////////////                Add to Copy to Cliboard End              /////////////////
//------------------------Only onlyletter, alphanumeric , Validation start-------------------------------------//
function lettersOnly(evt) {
    if (isMobile.any()) {
        var value = $(this).val();
        if (isNaN(value)) {
            $(this).val($(this).val().replace(/[^a-zA-Z ]/, ""));
        }
        else {
        }
        var f = value.indexOf(".");
        if (f > -1) {
            var sub2 = value.substring(0, f);
            $(this).val(sub2);
            var l = value.indexOf(".", f);
            if (l > f) {
                var sub = value.substring(0, l);
                if (f != l) {
                    $(this).val(sub);
                    return false;
                }
            }
        }
    }
    else {
        evt = (evt) ? evt : event;
        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
        if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode != 46) {
            alert("Please enter alphabet only");
            return false;
        }
        else {
            return true;
        }
    }
};

$('.lettersOnly').on('keydown paste', function (e) {
    if (isMobile.any()) {
        var value = $(this).val();
        if (isNaN(value)) {
            $(this).val($(this).val().replace(/[^a-zA-Z ]/, ""));
        }
        else {
        }
        var f = value.indexOf(".");
        if (f > -1) {
            var sub2 = value.substring(0, f);
            $(this).val(sub2);
            var l = value.indexOf(".", f);
            if (l > f) {
                var sub = value.substring(0, l);
                if (f != l) {
                    $(this).val(sub);
                    return false;
                }
            }
        }
    }
    else {
        var regex = new RegExp("^[a-zA-Z][a-zA-Z\\s]+$");
        if (e.ctrlKey || e.altKey) {
            e.preventDefault();
        } else {
            var key = e.keyCode;
            //Allow Letters and whitespaces Only.
            if (!(key >= 65 && key <= 122) && (key != 32 && key != 0 && key != 8 && key != 46)) {
                event.preventDefault();
            }
        }
    }
});
//function lettersOnly(evt) {
    //if (isMobile.any()) {
    //    var value = $(this).val();
    //    if (isNaN(value)) {
    //        $(this).val($(this).val().replace(/[^a-zA-Z ]/, ""));
    //    }
    //    else {
    //    }
    //    var f = value.indexOf(".");
    //    if (f > -1) {
    //        var sub2 = value.substring(0, f);
    //        $(this).val(sub2);
    //        var l = value.indexOf(".", f);
    //        if (l > f) {
    //            var sub = value.substring(0, l);
    //            if (f != l) {
    //                $(this).val(sub);
    //                return false;
    //            }
    //        }
    //    }
    //}
    //else {
//        evt = (evt) ? evt : event;
//        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
//        if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode != 46) {
//            alert("Please enter alphabet only");
//            return false;
//        }
//        else {
//            return true;
//        }
    //}
//};

//$('.lettersOnly').on('keydown paste', function (e) {
    //if (isMobile.any()) {
    //    var value = $(this).val();
    //    if (isNaN(value)) {
    //        $(this).val($(this).val().replace(/[^a-zA-Z ]/, ""));
    //    }
    //    else {
    //    }
    //    var f = value.indexOf(".");
    //    if (f > -1) {
    //        var sub2 = value.substring(0, f);
    //        $(this).val(sub2);
    //        var l = value.indexOf(".", f);
    //        if (l > f) {
    //            var sub = value.substring(0, l);
    //            if (f != l) {
    //                $(this).val(sub);
    //                return false;
    //            }
    //        }
    //    }
    //}
    //else {
//        var regex = new RegExp("^[a-zA-Z][a-zA-Z\\s]+$");
//        if (e.ctrlKey || e.altKey) {
//            e.preventDefault();
//        } else {
//            var key = e.keyCode;
//            //allow letters and whitespaces only.
//            if (!(key >= 65 && key <= 122) && (key != 32 && key != 0 && key != 8 && key != 46)) {
//                event.preventDefault();
//            }
//            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90) )) {
//                e.preventDefault();
//            }
//        }
    //}
//});

$('.addressvarification').keypress(function (event) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    if (event.charCode != 0 && event.charCode != 32 && event.charCode != 45 && event.charCode != 44 && event.charCode != 47) {
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
});

$('.Nospace').on('paste keypress', function (e) {
    //--------------Comment  ------------------------//
    //var value = $(this).val();
    //if (isNaN(value)) {
    //    $(this).val($(this).val().replace(/[ ]/, ""));
    //}
    //else {
    //    $(this).val($(this).val().replace(/[ ]/, ""));
    //}
    //--------------Comment End------------------------//
    if (e.which == 32) {
        return false;
    }
});

$('.letterusername').bind('keypress', function (event) {
        var regex = new RegExp("^[\S]*$");
    if (event.charCode != '32' && event.charCode != '0') {
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
});
//------------------------Only Alphabet Validation End-------------------------------------//

//-------------------------Image Load Error Default Image Set Start-----------------------------//

function OnErrorImageForProduct(t) {
    $(t).attr('src', "/Product_Images/NoImage.jpg");
}
function OnErrorImageForProductDetail(t) {
    $(t).attr('src', "/Product_Images/NoImage.jpg");
}

//-------------------------Image Load Error Default Image Set End-----------------------------//
