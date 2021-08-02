$(document).ready(function () {
    var emailSubscribeStatus = 0;

    $('.cart .cart-down, .cart .none').hide();
    $('.cart').hover(function () {
        $('.cart .cart-down, .cart .none').stop(true, true).slideDown(400);
    }, function () {
        $('.cart .cart-down, .cart .none').stop(true, true).delay(400).slideUp(300);
    });

    $(".addToCart").click(function () {
        AddToCartInProduct(this);
    });
   
    $("#txtverification").blur(function () {
        $('.divnotmatch').hide();
        var OTP = $("#txtverification").val().trim();
        var matchOTP = $('.vcode').val().trim();
        var getloginid = $("#txtUserName").val().trim();
        console.log(getloginid);
        if (OTP.trim() != "" && getloginid.trim() != "" && matchOTP.trim() != "") {
            var vcode = getloginid + "_" + OTP;
            if (vcode.trim() == matchOTP.trim()) {
                $('.divpass').show();
                $('#forgatepass').css('height', '315px');
            }
            else {
                $('.notmatch').html('Enter Valid OTP Code.');
                $('.divnotmatch').show();
                $("#txtverification").val('');
                AddtxtErroHover("txtverification");
                return false;
            }
        }
    });

    $("#txtSubscribeEmail").focus(function () {
        closedivSuccessPopup();
        closedivAlertPopup();
        $("#txtSubscribeEmail").val('');
        RemoveProgressFromBody();
    });
    $("#btnSubscribeEmail").click(function () {
        closedivSuccessPopup();
        closedivAlertPopup();
        var EmailId = $("#txtSubscribeEmail").val().trim();
        if (EmailId == "") {
            ShowAlertPopup("Alert", "Enter Email ID !");
            return;
        }
        if (emailSubscribeStatus != 1) {
            if (!validateEmail($("#txtSubscribeEmail").val().trim())) {
                ShowAlertPopup("Alert", "Enter Valid Email ID !");
                return;
            }
            emailSubscribeStatus = 1;
            ShowProgressOnBody();
            $.ajax({
                url: '/common/insert_email_newsletter',
                type: 'POST',
                dataType: 'json',
                data: { emaild: EmailId },
                success: function (response) {
                    var reply = response;
                    if (reply == "ok") {
                        ShowSuccessPopup("Success", "Thank you for subscribing to our newsletter</dt> <dd>Keeping you up-to-date with our latest news.</dd>");
                        $("#txtSubscribeEmail").val("");
                        emailSubscribeStatus = 0;
                        RemoveProgressFromBody();
                    }
                    else {
                        ShowAlertPopup("Alert", response);
                        emailSubscribeStatus = 0;
                        $("#txtSubscribeEmail").val("");
                        RemoveProgressFromBody();
                    }
                },
                failure: function (response) {
                    ShowAlertPopup("Alert", "Something went wrong. Please try later");
                    emailSubscribeStatus = 0;
                },
            });
        }
    });

    $(".signup").click(function () {
        ShowProgressOnBody();
        var getref = "ref";
        $.ajax({
            url: '/Common/GetRefferal',
            type: 'POST',
            dataType: 'json',
            data: {},
            success: function (data) {
                var getdata = data;
                var getsplit = getdata.split("^");
                if (getsplit.length > 1) {
                    if (getsplit[0].trim() != "") {
                        $("#txtSponsor").val(getsplit[0].trim());
                        $("#txtspname").val(getsplit[1].trim());
                        $("#divspname").show();
                    }
                }
            },
            error: function (data) {
                //RemoveProgressFromBody();
                //ShowAlertPopup("Alert", "Some Error Occurred Please Try Later");
            }
        });
        window.location.href = "/member-signup/";
        $('.blureffect').css('display', 'block');
    });
});

function AddToCartInProduct(t) {
    var IsAllListPage = 0;
    if ($(t).attr('cust') == 'AllList') {
        IsAllListPage = 1;
    }
    var id = $(t);
    SubPrid = $(t).attr('id');
   
   ShowProgressOnBody();
    $.ajax({
        url: '/Product_Detail/insertIntoCart',
        type: 'POST',
        dataType: 'json',
        data: { PRID: SubPrid, Type: "AddToCart" },
        success: function (respounce) {
            RemoveProgressFromBody();
            if (respounce.toString().indexOf("added") > -1) {
                var CartCount = $("#spnCart").text().trim();
                CartCount = parseInt(CartCount) + 1;
                $("#spnCart").text(CartCount);
                if (IsAllListPage == 0) {
                    $(id).html('Added');
                }
                else {
                    $(id).css('background', '#aed581 url(../images/icon-cart-2.png) no-repeat center center');
                }
                //bindCart(id);
                //bindCartNewItem(id, SubPrid);
                //location.reload();
            }
            else if (respounce.toString().indexOf("no") > -1) {
                ShowAlertPopup("Alert", "Product Is already in your Cart !");
            }
        },
        error: function (respounce) {
            RemoveProgressFromBody();
            ShowAlertPopup("Alert", "Something went wrong. Please try later");
        }
    });
}

function bindCartNewItem(id, SubPrid) {

    var str = "";

    var model = $(id).parent('div.adcart').parent('div.productscols');

    var imgsrc = model.find('img.img-responsive').attr("src");
    var prodName = model.find('h5.product-name').find("a").text();
    var prodPrice = model.find('span.special-price').find('.price').text();

    str = "<div class='cart-sub-item' id=" + SubPrid + "><table width='100%' cellspacing='1' cellpadding='1' border='1' id=" + SubPrid + "><tbody><tr><td><img onerror='OnErrorImageForProduct(this);' width='60px' src=" + imgsrc + "></td><td style='width: 60%;'>" + prodName + "<input type='hidden' value=" + SubPrid + ">";
    str = str + "<br> <span> 1 </span><label> X </label><span> " + prodPrice + " </span><label> = </label><span class='lbltotalamount'>" + prodPrice + "</span>";

    //str = str + "<br><select name='ddlQuantity' id='ddlQuantity' class='ddlqty1'><option value='1' selected='selected'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option></select>";

    str = str + " </td><td class='delete-icon'><a onclick='DeleteRow(this," + SubPrid + ")'>";

    //str = str + "<img style='cursor:pointer' src='../images/popup-cross.png'>";

    str = str + "<i class='glyphicon glyphicon-trash'></i>";
    str = str + "</a></td></tr></tbody></table></div>";

    if ($(".cart-sub-item").html() != "Your cart is empty.") {
        $("#cartAppend").prepend(str);
    }
    else {
        $("#cartAppend").html("");
        $("#cartAppend").prepend(str);
        $("#cartAppend").append("<a style='cursor: pointer' class='checkout-cart-sty checkloginsession'>Checkout</a>");
    }

}

function bindCart(id) {
    var cart = $('.shopping-cart');
    var imgtodrag = $(id).closest('.productcol').find('img.img-responsive').eq(0);
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '150px',
                'width': '150px',
                'z-index': '9999'
            })
            .appendTo($('body'))
            .animate({
                'top': cart.offset().top + 10,
                'left': cart.offset().left + 10,
                'width': 75,
                'height': 75
            }, 1500);

        setTimeout(function () {
            cart.effect("shake", {
                times: 2
            }, 500);
        }, 1500);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            //$(id).detach()
        });
    }
}

//function DeleteRow(id, kid) {
//    var status = confirm('Are You sure, You want to Remove This Product From the Cart');
//    if (status != true) {
//        return false;
//    }
//    var qunty = $(id).closest("tr").find(".ddlqty1").val();
//    var cartcount = $("#spnCart").text();
//    AfterDeleteclacAmount(id, kid, qunty);
//    cartcount = parseInt(cartcount) - 1;
//    $("#spnCart").text(cartcount);
//    $("#spnCart1").text(cartcount);
//    $(".cart-heading-sty").find('h2').text("SHOPPING CART (" + cartcount + ") ");
//    if (cartcount == 0) {
//        $(id).closest('.cart-sub-div').find('.checkloginsession').hide();
//        $(id).closest('.cart-sub-div').html("Your cart is empty.");
//    }
//}

function AfterDeleteclacAmount(id, paramprid) {
    ShowProgressOnBody();
    $.ajax({
        url: '/Product_Detail/AfterDelete_updateQty',
        type: 'POST',
        dataType: 'json',
        data: { PRID: paramprid },
        success: function (data) {
            RemoveProgressFromBody();
            var splitval = data.toString().split('|');
            $(id).closest('tr').remove();
            if ($(id).attr('id') == 'btclose') {
                $("#" + paramprid + "").remove();
                $("#lblpayamount").html(splitval[0]);
            }
            var total = 0;
            $(".lblpayamount").each(function () {
                var thishtml = $(this).html();
                total = parseFloat(total) + parseFloat(thishtml);
            });
        },
        error: function (data) {
            RemoveProgressFromBody();
            ShowAlertPopup("Alert", "Some Error Occurred Please Try Later");
        }
    });
}

function SendVerificationCodeOnEmail(getloginid) {
    $('.divOTP').hide();
    if (getloginid == "") {
        return false;
    }
    $('#btnForgetPass').attr("disabled", "disabled");
    $('#btnForgetPass').text('Wait...');
    $.ajax({
        url: '/member_login/SendVerificationMail_SMS',
        type: 'POST',
        dataType: 'json',
        data: { getloginid: getloginid },
        success: function (data) {
            var getReturnData = data.trim();
            if (getReturnData != "error") {
                $('.otpmess').html('OTP has been send on your mobile no .').css('color', 'green');
                //  $('.otpmess').css('color', 'green');
                $('.vcode').val(getReturnData.trim());
                $('#btnRegistrations').removeAttr("disabled");
                $('.OTP').show();
                $('.divotpmess').show();
                $('#forgatepass').css('height', '250px');
                $('#btnRegistrations').text('Submit');
            }
            else {
                $('.vcode').val("");
                $('.otpmess').html('Enter valid user id !');
                $('.otpmess').css('color', 'red');
                $('.divotpmess').show();
                //ShowAlertPopup("Alert", "Enter valid user id !");
                $('#btnForgetPass').removeAttr("disabled");
                $('#btnForgetPass').val('Submit');
            }
            $('#btnForgetPass').removeAttr("disabled");
            $('#btnForgetPass').text('Submit');
        },
        error: function (data) {
            $('.vcode').val("");
            $('.otpmess').html('Enter valid user id !');
            $('.otpmess').css('color', 'red');
            $('.divotpmess').show();
            $('#btnForgetPass').removeAttr("disabled");
            $('#btnForgetPass').text('Submit');
        }
    });
}
function ForgetPassword(t) {
    var getloginid = $("#txtUserName").val().trim();
    if (getloginid.trim() == "") {
        $('.divotpmess').hide();
        $('.otpmess').html('');
        $('.vcode').val("");
        $("#txtUserName").val('');
        AddtxtErroHover("txtUserName");
        $('.vcode').val().trim();
        return false;
    }

    var vcode = $('.vcode').val().trim();
    if (vcode.trim() == "" || $("#txtverification").val().trim() == "") {
        SendVerificationCodeOnEmail(getloginid);
    }
    else {
        var Getpass = $("#txtpawssord").val().trim();
        if (Getpass.trim() == "") {
            $("#txtpawssord").val('');
            AddtxtErroHover("txtpawssord");
            return false;
        }
        var conformpass = $("#txtconformssord").val().trim();
        if (conformpass.trim() == "") {
            $("#txtverification").val('');
            AddtxtErroHover("txtverification");
            return false;
        }
        if (conformpass.trim() != Getpass.trim()) {
            $('.notmatch').html('confirm password is not match');
            $('.divnotmatch').show();
            $("#txtverification").val('');
            AddtxtErroHover("txtverification");
            return false;
        }
        else {
            var OTP = $("#txtverification").val().trim();
            $('#btnForgetPass').attr("disabled", "disabled");
            $('#btnForgetPass').text('Wait...');
            $.ajax({
                url: '/member_login/Change_password',
                type: 'POST',
                dataType: 'json',
                data: { getloginid: getloginid, Getpass: Getpass, OTP: OTP },
                success: function (data) {
                    RemoveProgressFromBody();
                    if (data.trim() == "ok") {
                        $("#ForgotPasspopup").hide();
                        ShowSuccessPopup("Success", "Your password has been successfully reset .");
                        $('#forgatepass').css('height', '168px');
                        $('#btnForgetPass').removeAttr("disabled");
                        $('#btnForgetPass').text('Submit');
                        $("#txtverification").val('');
                        $("#txtpawssord").val('');
                        $("#txtconformssord").val('');
                        $('.vcode').val('');
                        $('.otpmess').html("");
                        $('.otpmess').css('color', 'green');
                        $('.notmatch').html('');
                        $('.divnotmatch').hide();
                        $('.divotpmess').hide();
                        $('.divpass').hide();
                        $('.OTP').hide();
                        $("#txtUserName").val("");
                        return false;
                    }
                    else {
                        $('.otpmess').html(data.trim());
                        $('.otpmess').css('color', 'red');
                        $('.divotpmess').show();
                        $('#btnForgetPass').removeAttr("disabled");
                        $('#btnForgetPass').text('Submit');
                        return false;
                    }
                },
                error: function (data) {
                    ShowAlertPopup("Alert", "Something went wrong. Please try later");
                    $('#btnForgetPass').removeAttr("disabled");
                    $('#btnForgetPass').text('Submit');
                    return false;
                }
            });
        }
    }
    //forgatepassword()
}
function forgatepassword() {
    closedivSuccessPopup();
    closedivAlertPopup();
    Loginid = $("#txtUserName").val().trim();
    if (Loginid == "") {
        AddtxtErroHover("txtUserName");
        $('#txtUserName').focus();
        return false;
    }
    ShowProgressOnBody();
    $.ajax({
        url: '/member_login/ForgotPass',
        type: 'POST',
        dataType: 'json',
        data: { loginid: Loginid },
        success: function (respounce) {
            RemoveProgressFromBody();
            if (respounce == "s") {
                ShowSuccessPopup("Success", "Mail has been Successfully sent to your Email Id");
            }
            else {
                ShowAlertPopup("Alert", respounce);
            }
        },
        error: function (respounce) {
            ShowAlertPopup("Alert", "Something went wrong. Please try later");
        }
    });
}