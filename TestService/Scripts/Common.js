var IsLocationDivActive = 0;
var focusOnLocation = 0;
var focusOnSearch = 0;
var OldCountCurentrownumnber = 1;
var OldCountCurentrownumnberLocation = 1;
var CountCurentrownumnberLocation = 1;
var scrollpossitionLocation = 0;
var GettotalchilddivsLocation = 0;
var Gettotalchilddivs = 0;
var GetChangeLocation = 0;
var GetChange = 0;
var CountCurentrownumnber = 0;
var getscrolllenthLocation = 0;
var getperscrollLocation = 0;
var backtonextLocation = 0;

$(document).ready(function () {
    $(".divSearchDiv").click(function () {
        $(".searcharea").slideToggle(300);
    });

    $("#flip").click(function () {
        $("#panel").slideToggle("slow");
    });

    $("#BLA").click(function () {
        $(this).closest("div").find(".divA").slideToggle(300);
    });

    $("#BLA1").click(function () {
        $(this).closest("div").find(".divA").slideToggle(300);
    });

    $("#Texcity").keyup(function (event) {
        var keyss = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;

        if (keyss != 40 && keyss != 38 && keyss != 13) {
            if (($("#Texcity").val()).trim() != "") {
                $("#divLoactionContainer").show();
                BindMasterLocationSearch("#divLoactionContainer", $("#Texcity").val(), "1");
            }
            else {
                $("#divLoactionContainer").hide();
            }
        }
    });
    $("#Texcity").focus(function () {
        $("#serchResult").hide();
        focusOnLocation = 1;
        if (($("#Texcity").val()).trim() != "") {
            $("#divLoactionContainer").show();
        }
        else {
            $("#divLoactionContainer").hide();
        }
    });
    $("#Texcity").blur(function () {
        focusOnLocation = 0;
    });
    $('#Texcity').keydown(function (e) {
        var keyss = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

        if (CountCurentrownumnberLocation < 1) {
            CountCurentrownumnberLocation = 1;
            cntnum = 1;
        }
        if (keyss == 13) {
            if (CountCurentrownumnberLocation > 1) {
                var getreturnvalue = CountCurentrownumnberLocation - 1;
            }
            var getAcorid = "#ancLoc" + getreturnvalue;
            var getlink = $(getAcorid).attr("onclick");
            getlink = getlink.replace("'", "");
            getlink = getlink.replace("'", "");
            getlink = getlink.replace("(", "");
            getlink = getlink.replace(")", "");
            getlink = getlink.replace("ClickOnLocationRecord", "");
            ClickOnLocationRecord(getlink, "1");
            return false;
        }
        else if (keyss == 40) {
            if (GetChangeLocation == 0) {
                getscrolllenthLocation = $('#divLoactionContainer')[0].scrollHeight
                getTotalchildDivLocation();
                GetChangeLocation = 1;
                getperscrollLocation = getscrolllenthLocation / GettotalchilddivsLocation;
            }

            if (CountCurentrownumnberLocation <= GettotalchilddivsLocation) {
                var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
                var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
                $(gedivname2).removeClass('LocationActive');
                $(".cssDivLocationData").removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                if (backtonextLocation == 1) {
                    if (CountCurentrownumnberLocation > 9) {
                        $("#divLoactionContainer").scrollTop(scrollpossitionLocation)
                        scrollpossitionLocation = scrollpossitionLocation + getperscrollLocation;
                    }
                }
                else if (CountCurentrownumnberLocation > 8) {
                    $("#divLoactionContainer").scrollTop(scrollpossitionLocation)
                    scrollpossitionLocation = scrollpossitionLocation + getperscrollLocation;
                }
                else {
                    $("#divLoactionContainer").scrollTop(0)
                }
                OldCountCurentrownumnberLocation = CountCurentrownumnberLocation;
                CountCurentrownumnberLocation = CountCurentrownumnberLocation + 1;
                return;
            }
            else {
                return;
            }
        }
        if (keyss == 38) {
            if (GetChangeLocation == 0) {
                getscrolllenthLocation = $('#divLoactionContainer')[0].scrollHeight
                getTotalchildDivLocation();
                GetChangeLocation = 1;
                getperscrollLocation = getscrolllenthLocation / GettotalchilddivsLocation;
            }
            OldCountCurentrownumnberLocation = CountCurentrownumnberLocation;
            CountCurentrownumnberLocation = CountCurentrownumnberLocation - 1;
            if (CountCurentrownumnberLocation > 0) {
                var getold = "#cssDivLocationData" + (CountCurentrownumnberLocation);
                var gedivname = "#cssDivLocationData" + (CountCurentrownumnberLocation - 1);

                if ($(gedivname).length > 0) {
                    if (scrollpossitionLocation > getperscrollLocation) {
                        scrollpossitionLocation = scrollpossitionLocation - getperscrollLocation;
                        $("#divLoactionContainer").scrollTop(scrollpossitionLocation)
                        backtonextLocation = 1;
                    }
                }

                $(".cssDivSerachDatas").removeClass('LocationActive');
                $(getold).removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                return false;
            }
            else
                if (CountCurentrownumnberLocation <= 0) {
                    $("#divLoactionContainer").scrollTop(0);
                    var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
                    var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
                    $(gedivname2).removeClass('LocationActive');
                    $(gedivname).removeClass('LocationActive');
                    GetChangeLocation = 0;
                    scrollpossitionLocation = 0;
                    OldCountCurentrownumnberLocation = 1;
                    CountCurentrownumnberLocation = 1;
                    backtonextLocation = 0;
                    $("#Texcity").focus();
                    return false;
                }
            return false;
        }
        else {
            $("#divLoactionContainer").scrollTop(0);
            var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
            var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
            $(gedivname2).removeClass('LocationActive');
            $(gedivname).removeClass('LocationActive');
            GetChangeLocation = 0;
            scrollpossitionLocation = 0;
            OldCountCurentrownumnberLocation = 1;
            CountCurentrownumnberLocation = 1;
            backtonextLocation = 0;
        }
    });
    $('#txtSearch').keydown(function (e) {
        var keyss = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (CountCurentrownumnber < 1) {
            CountCurentrownumnber = 1;
            cntnum = 1;
        }
        if (keyss == 13) {
            if (CountCurentrownumnber > 1) {
                var getreturnvalue = CountCurentrownumnber - 1;
            }
            if (CountCurentrownumnber > 1) {
                var getAcorid = "#anc" + getreturnvalue;
                var getlink = $(getAcorid).attr("onclick");
                getlink = getlink.replace("'", "");
                getlink = getlink.replace("'", "");
                getlink = getlink.replace("(", "");
                getlink = getlink.replace(")", "");
                getlink = getlink.replace("ClickOnSerachRecord", "");
                var splitLink = getlink.split(",");
                ClickOnSerachRecord(splitLink[0], splitLink[1], "1");
            }
            else {
                ClickOnSerachButton(($("#Ddlsearchtype").val()).trim(), ($("#Texcity").val()).trim(), ($("#txtSearch").val()).trim(), "0", "1");
            }
            return false;
        }
        else if (keyss == 40) {
            if (GetChange == 0) {
                getscrolllenth = $('#serchResult')[0].scrollHeight
                getTotalchildDiv();
                getperscroll = getscrolllenth / Gettotalchilddivs;
            }
            if (CountCurentrownumnber <= Gettotalchilddivs) {
                var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
                var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
                $(gedivname2).removeClass('LocationActive');
                $(".cssDivSerachData").removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                if (backtonext == 1) {
                    if (CountCurentrownumnber > 5) {
                        $("#serchResult").scrollTop(scrollpossition)
                        scrollpossition = scrollpossition + getperscroll;
                    }
                }
                else if (CountCurentrownumnber > 4) {
                    $("#serchResult").scrollTop(scrollpossition)
                    scrollpossition = scrollpossition + getperscroll;
                }
                else {
                    $("#serchResult").scrollTop(0)
                }
                OldCountCurentrownumnber = CountCurentrownumnber;
                CountCurentrownumnber = CountCurentrownumnber + 1;

                return;
            }
            else {
                return;
            }
        }
        if (keyss == 38) {
            if (GetChange == 0) {
                getscrolllenth = $('#serchResult')[0].scrollHeight
                getTotalchildDiv();
                GetChange = 1;
                getperscroll = getscrolllenth / Gettotalchilddivs;
            }
            OldCountCurentrownumnber = CountCurentrownumnber;
            CountCurentrownumnber = CountCurentrownumnber - 1;
            if (CountCurentrownumnber > 0) {
                var getold = "#cssDivSerachData" + (CountCurentrownumnber);
                var gedivname = "#cssDivSerachData" + (CountCurentrownumnber - 1);
                if ($(gedivname).length > 0) {
                    if (scrollpossition > getperscroll) {
                        scrollpossition = scrollpossition - getperscroll;
                        $("#serchResult").scrollTop(scrollpossition)
                        backtonext = 1;
                    }
                }
                $(".cssDivSerachData").removeClass('LocationActive');
                $(getold).removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                return false;
            }
            else
                if (CountCurentrownumnber <= 0) {
                    $("#serchResult").scrollTop(0);
                    var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
                    var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
                    $(gedivname2).removeClass('LocationActive');
                    $(gedivname).removeClass('LocationActive');
                    GetChange = 0;
                    scrollpossition = 0;
                    OldCountCurentrownumnber = 1;
                    CountCurentrownumnber = 1;
                    backtonext = 0;
                    $("#txtSearch").focus();
                    return false;
                }
            return false;
        }
        else {
            $("#serchResult").scrollTop(0);
            var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
            var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
            $(gedivname2).removeClass('LocationActive');
            $(gedivname).removeClass('LocationActive');
            GetChange = 0;
            scrollpossition = 0;
            OldCountCurentrownumnber = 1;
            CountCurentrownumnber = 1;
            backtonext = 0;
        }
    });
    $("#txtSearch").keyup(function (event) {
        var keyss = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
        if (keyss == 38 || keyss == 40) {
            return;
        }
        else {
            if (($("#txtSearch").val()).trim() != "") {
                $("#serchResult").show();
                BindMasterSerachData("#serchResult", $("#txtSearch").val(), $("#Ddlsearchtype").val(), "1");
            }
            else {
                $("#serchResult").hide();
            }
        }
    });
    $("#txtSearch").focus(function () {
        $("#divLoactionContainer").hide();
        focusOnSearch = 1;
        if (($("#txtSearch").val()).trim() != "") {
            $("#serchResult").show();
        }
        else {
            $("#serchResult").hide();
        }
    });
    $("#txtSearch").blur(function () {
        focusOnSearch = 0;
    });
    $("#buttonSearch").click(function () {
        //if ($("#txtSearch").val().trim() == "") {
        //    $("#txtSearch").blur();
        //    $("#txtSearch").css("border", "1px solid red");
        //}
        if (($("#txtSearch").val()).trim() != "") {
            ClickOnSerachButton(($("#Ddlsearchtype").val()).trim(), ($("#Texcity").val()).trim(), ($("#txtSearch").val()).trim(), "0", "1");
        }
        return false;
    });

    $('body').click(function () {
        if (gettype == "2") {
            $('.locationItem').css('display', 'none');
            $('.searchItem').css('display', 'none');
        }
    });

    $('.textbox').focusin(function () {
        gettype = 1;
    });
    $('.textbox').focusout(function () {
        gettype = 2;
    });
    $('.textbox').focusin(function () {
        gettype = 1;
    });
    $('.textbox').focusout(function () {
        gettype = 2;
    });
    $('#txtSearchPinCode .businesslisting-pincode-right').keyup(function () {
        var getval = $(this).val();
    });

    //Below Code Is For Deals Searching Start Here
    $("#TexcityForDeals").keyup(function (event) {
        var keyss = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
        if (keyss != 40 && keyss != 38 && keyss != 13) {
            if (($("#TexcityForDeals").val()).trim() != "") {
                $("#divLoactionContainerForDeals").show();
                BindMasterLocationSearch("#divLoactionContainerForDeals", $("#TexcityForDeals").val(), "2");
            }
            else {
                $("#divLoactionContainerForDeals").hide();
            }
        }
    });
    $("#TexcityForDeals").focus(function () {
        $("#serchResultForDeals").hide();
        focusOnLocation = 1;
        if (($("#TexcityForDeals").val()).trim() != "") {
            $("#divLoactionContainerForDeals").show();
        }
        else {
            $("#divLoactionContainerForDeals").hide();
        }
    });
    $("#TexcityForDeals").blur(function () {
        focusOnLocation = 0;
    });
    $('#TexcityForDeals').keydown(function (e) {
        var keyss = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (CountCurentrownumnberLocation < 1) {
            CountCurentrownumnberLocation = 1;
            cntnum = 1;
        }
        if (keyss == 13) {
            if (CountCurentrownumnberLocation > 1) {
                var getreturnvalue = CountCurentrownumnberLocation - 1;
            }
            var getAcorid = "#ancLoc" + getreturnvalue;
            var getlink = $(getAcorid).attr("onclick");
            getlink = getlink.replace("'", "");
            getlink = getlink.replace("'", "");
            getlink = getlink.replace("(", "");
            getlink = getlink.replace(")", "");
            getlink = getlink.replace("ClickOnLocationRecord", "");
            ClickOnLocationRecord(getlink, "2");
            return false;
        }
        else if (keyss == 40) {
            if (GetChangeLocation == 0) {
                getscrolllenthLocation = $('#divLoactionContainerForDeals')[0].scrollHeight
                getTotalchildDivLocation();
                GetChangeLocation = 1;
                getperscrollLocation = getscrolllenthLocation / GettotalchilddivsLocation;
            }

            if (CountCurentrownumnberLocation <= GettotalchilddivsLocation) {
                var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
                var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
                $(gedivname2).removeClass('LocationActive');
                $(".cssDivLocationData").removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                if (backtonextLocation == 1) {
                    if (CountCurentrownumnberLocation > 9) {
                        $("#divLoactionContainerForDeals").scrollTop(scrollpossitionLocation)
                        scrollpossitionLocation = scrollpossitionLocation + getperscrollLocation;
                    }
                }
                else if (CountCurentrownumnberLocation > 8) {
                    $("#divLoactionContainerForDeals").scrollTop(scrollpossitionLocation)
                    scrollpossitionLocation = scrollpossitionLocation + getperscrollLocation;
                }
                else {
                    $("#divLoactionContainerForDeals").scrollTop(0)
                }
                OldCountCurentrownumnberLocation = CountCurentrownumnberLocation;
                CountCurentrownumnberLocation = CountCurentrownumnberLocation + 1;
                return;
            }
            else {
                return;
            }
        }
        if (keyss == 38) {
            if (GetChangeLocation == 0) {
                getscrolllenthLocation = $('#divLoactionContainerForDeals')[0].scrollHeight
                getTotalchildDivLocation();
                GetChangeLocation = 1;
                getperscrollLocation = getscrolllenthLocation / GettotalchilddivsLocation;
            }
            OldCountCurentrownumnberLocation = CountCurentrownumnberLocation;
            CountCurentrownumnberLocation = CountCurentrownumnberLocation - 1;
            if (CountCurentrownumnberLocation > 0) {
                var getold = "#cssDivLocationData" + (CountCurentrownumnberLocation);
                var gedivname = "#cssDivLocationData" + (CountCurentrownumnberLocation - 1);

                if ($(gedivname).length > 0) {
                    if (scrollpossitionLocation > getperscrollLocation) {
                        scrollpossitionLocation = scrollpossitionLocation - getperscrollLocation;
                        $("#divLoactionContainerForDeals").scrollTop(scrollpossitionLocation)
                        backtonextLocation = 1;
                    }
                }

                $(".cssDivSerachDatas").removeClass('LocationActive');
                $(getold).removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                return false;
            }
            else
                if (CountCurentrownumnberLocation <= 0) {
                    $("#divLoactionContainerForDeals").scrollTop(0);
                    var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
                    var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
                    $(gedivname2).removeClass('LocationActive');
                    $(gedivname).removeClass('LocationActive');
                    GetChangeLocation = 0;
                    scrollpossitionLocation = 0;
                    OldCountCurentrownumnberLocation = 1;
                    CountCurentrownumnberLocation = 1;
                    backtonextLocation = 0;
                    $("#TexcityForDeals").focus();
                    return false;
                }
            return false;
        }
        else {
            $("#divLoactionContainerForDeals").scrollTop(0);
            var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
            var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
            $(gedivname2).removeClass('LocationActive');
            $(gedivname).removeClass('LocationActive');
            GetChangeLocation = 0;
            scrollpossitionLocation = 0;
            OldCountCurentrownumnberLocation = 1;
            CountCurentrownumnberLocation = 1;
            backtonextLocation = 0;
        }
    });

    $('#txtSearchForDeals').keydown(function (e) {
        var keyss = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (CountCurentrownumnber < 1) {
            CountCurentrownumnber = 1;
            cntnum = 1;
        }
        if (keyss == 13) {
            if (CountCurentrownumnber > 1) {
                var getreturnvalue = CountCurentrownumnber - 1;
            }
            if (CountCurentrownumnber > 1) {
                var getAcorid = "#anc" + getreturnvalue;
                var getlink = $(getAcorid).attr("onclick");
                getlink = getlink.replace("'", "");
                getlink = getlink.replace("'", "");
                getlink = getlink.replace("(", "");
                getlink = getlink.replace(")", "");
                getlink = getlink.replace("ClickOnSerachRecord", "");
                var splitLink = getlink.split(",");
                ClickOnSerachRecord(splitLink[0], splitLink[1], "2");
            }
            else {
                ClickOnSerachButton(("2").trim(), ($("#TexcityForDeals").val()).trim(), ($("#txtSearchForDeals").val()).trim(), "0", "2");
            }
            return false;
        }
        else if (keyss == 40) {
            if (GetChange == 0) {
                getscrolllenth = $('#serchResultForDeals')[0].scrollHeight
                getTotalchildDiv();
                getperscroll = getscrolllenth / Gettotalchilddivs;
            }
            if (CountCurentrownumnber <= Gettotalchilddivs) {
                var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
                var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
                $(gedivname2).removeClass('LocationActive');
                $(".cssDivSerachData").removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                if (backtonext == 1) {
                    if (CountCurentrownumnber > 5) {
                        $("#serchResultForDeals").scrollTop(scrollpossition)
                        scrollpossition = scrollpossition + getperscroll;
                    }
                }
                else if (CountCurentrownumnber > 4) {
                    $("#serchResultForDeals").scrollTop(scrollpossition)
                    scrollpossition = scrollpossition + getperscroll;
                }
                else {
                    $("#serchResultForDeals").scrollTop(0)
                }
                OldCountCurentrownumnber = CountCurentrownumnber;
                CountCurentrownumnber = CountCurentrownumnber + 1;

                return;
            }
            else {
                return;
            }
        }
        if (keyss == 38) {
            if (GetChange == 0) {
                getscrolllenth = $('#serchResultForDeals')[0].scrollHeight
                getTotalchildDiv();
                GetChange = 1;
                getperscroll = getscrolllenth / Gettotalchilddivs;
            }
            OldCountCurentrownumnber = CountCurentrownumnber;
            CountCurentrownumnber = CountCurentrownumnber - 1;
            if (CountCurentrownumnber > 0) {
                var getold = "#cssDivSerachData" + (CountCurentrownumnber);
                var gedivname = "#cssDivSerachData" + (CountCurentrownumnber - 1);
                if ($(gedivname).length > 0) {
                    if (scrollpossition > getperscroll) {
                        scrollpossition = scrollpossition - getperscroll;
                        $("#serchResultForDeals").scrollTop(scrollpossition)
                        backtonext = 1;
                    }
                }
                $(".cssDivSerachData").removeClass('LocationActive');
                $(getold).removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                return false;
            }
            else
                if (CountCurentrownumnber <= 0) {
                    $("#serchResultForDeals").scrollTop(0);
                    var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
                    var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
                    $(gedivname2).removeClass('LocationActive');
                    $(gedivname).removeClass('LocationActive');
                    GetChange = 0;
                    scrollpossition = 0;
                    OldCountCurentrownumnber = 1;
                    CountCurentrownumnber = 1;
                    backtonext = 0;
                    $("#txtSearchForDeals").focus();
                    return false;
                }
            return false;
        }
        else {
            $("#serchResultForDeals").scrollTop(0);
            var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
            var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
            $(gedivname2).removeClass('LocationActive');
            $(gedivname).removeClass('LocationActive');
            GetChange = 0;
            scrollpossition = 0;
            OldCountCurentrownumnber = 1;
            CountCurentrownumnber = 1;
            backtonext = 0;
        }
    });
    $("#txtSearchForDeals").keyup(function (event) {
        var keyss = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
        if (keyss == 38 || keyss == 40) {
            return;
        }
        else {
            if (($("#txtSearchForDeals").val()).trim() != "") {
                $("#serchResultForDeals").show();
                BindMasterSerachData("#serchResultForDeals", $("#txtSearchForDeals").val(), "2", "2");
            }
            else {
                $("#serchResultForDeals").hide();
            }
        }
    });
    $("#txtSearchForDeals").focus(function () {
        $("#divLoactionContainer").hide();
        focusOnSearch = 1;
        if (($("#txtSearchForDeals").val()).trim() != "") {
            $("#serchResultForDeals").show();
        }
        else {
            $("#serchResultForDeals").hide();
        }
    });
    $("#txtSearchForDeals").blur(function () {
        focusOnSearch = 0;
    });
    //$("#buttonSearchForDeals").click(function () {
    //    if (($("#txtSearchForDeals").val()).trim() != "") {
    //        ClickOnSerachButton(("2").trim(), ($("#Texcity").val()).trim(), ($("#txtSearch").val()).trim(), "0", "2");
    //    }
    //    return false;
    //});

    //Below Code Is For Deals Searching End Here

    //Below Code Is For Listing Searching Start Here
    $("#TexcityForListing").keyup(function (event) {
        var keyss = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
        if (keyss != 40 && keyss != 38 && keyss != 13) {
            if (($("#TexcityForListing").val()).trim() != "") {
                $("#divLoactionContainerForDeals").show();
                BindMasterLocationSearch("#divLoactionContainerForDeals", $("#TexcityForListing").val(), "3");
            }
            else {
                $("#divLoactionContainerForDeals").hide();
            }
        }
    });
    $("#TexcityForListing").focus(function () {
        $("#serchResultForDeals").hide();
        focusOnLocation = 1;
        if (($("#TexcityForListing").val()).trim() != "") {
            $("#divLoactionContainerForDeals").show();
        }
        else {
            $("#divLoactionContainerForDeals").hide();
        }
    });
    $("#TexcityForListing").blur(function () {
        focusOnLocation = 0;
    });
    $('#TexcityForListing').keydown(function (e) {
        var keyss = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (CountCurentrownumnberLocation < 1) {
            CountCurentrownumnberLocation = 1;
            cntnum = 1;
        }
        if (keyss == 13) {
            if (CountCurentrownumnberLocation > 1) {
                var getreturnvalue = CountCurentrownumnberLocation - 1;
            }
            var getAcorid = "#ancLoc" + getreturnvalue;
            var getlink = $(getAcorid).attr("onclick");
            getlink = getlink.replace("'", "");
            getlink = getlink.replace("'", "");
            getlink = getlink.replace("(", "");
            getlink = getlink.replace(")", "");
            getlink = getlink.replace("ClickOnLocationRecord", "");
            ClickOnLocationRecord(getlink, "2");
            return false;
        }
        else if (keyss == 40) {
            if (GetChangeLocation == 0) {
                getscrolllenthLocation = $('#divLoactionContainerForDeals')[0].scrollHeight
                getTotalchildDivLocation();
                GetChangeLocation = 1;
                getperscrollLocation = getscrolllenthLocation / GettotalchilddivsLocation;
            }

            if (CountCurentrownumnberLocation <= GettotalchilddivsLocation) {
                var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
                var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
                $(gedivname2).removeClass('LocationActive');
                $(".cssDivLocationData").removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                if (backtonextLocation == 1) {
                    if (CountCurentrownumnberLocation > 9) {
                        $("#divLoactionContainerForDeals").scrollTop(scrollpossitionLocation)
                        scrollpossitionLocation = scrollpossitionLocation + getperscrollLocation;
                    }
                }
                else if (CountCurentrownumnberLocation > 8) {
                    $("#divLoactionContainerForDeals").scrollTop(scrollpossitionLocation)
                    scrollpossitionLocation = scrollpossitionLocation + getperscrollLocation;
                }
                else {
                    $("#divLoactionContainerForDeals").scrollTop(0)
                }
                OldCountCurentrownumnberLocation = CountCurentrownumnberLocation;
                CountCurentrownumnberLocation = CountCurentrownumnberLocation + 1;
                return;
            }
            else {
                return;
            }
        }
        if (keyss == 38) {
            if (GetChangeLocation == 0) {
                getscrolllenthLocation = $('#divLoactionContainerForDeals')[0].scrollHeight
                getTotalchildDivLocation();
                GetChangeLocation = 1;
                getperscrollLocation = getscrolllenthLocation / GettotalchilddivsLocation;
            }
            OldCountCurentrownumnberLocation = CountCurentrownumnberLocation;
            CountCurentrownumnberLocation = CountCurentrownumnberLocation - 1;
            if (CountCurentrownumnberLocation > 0) {
                var getold = "#cssDivLocationData" + (CountCurentrownumnberLocation);
                var gedivname = "#cssDivLocationData" + (CountCurentrownumnberLocation - 1);

                if ($(gedivname).length > 0) {
                    if (scrollpossitionLocation > getperscrollLocation) {
                        scrollpossitionLocation = scrollpossitionLocation - getperscrollLocation;
                        $("#divLoactionContainerForDeals").scrollTop(scrollpossitionLocation)
                        backtonextLocation = 1;
                    }
                }

                $(".cssDivSerachDatas").removeClass('LocationActive');
                $(getold).removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                return false;
            }
            else
                if (CountCurentrownumnberLocation <= 0) {
                    $("#divLoactionContainerForDeals").scrollTop(0);
                    var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
                    var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
                    $(gedivname2).removeClass('LocationActive');
                    $(gedivname).removeClass('LocationActive');
                    GetChangeLocation = 0;
                    scrollpossitionLocation = 0;
                    OldCountCurentrownumnberLocation = 1;
                    CountCurentrownumnberLocation = 1;
                    backtonextLocation = 0;
                    $("#TexcityForListing").focus();
                    return false;
                }
            return false;
        }
        else {
            $("#divLoactionContainerForDeals").scrollTop(0);
            var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
            var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
            $(gedivname2).removeClass('LocationActive');
            $(gedivname).removeClass('LocationActive');
            GetChangeLocation = 0;
            scrollpossitionLocation = 0;
            OldCountCurentrownumnberLocation = 1;
            CountCurentrownumnberLocation = 1;
            backtonextLocation = 0;
        }
    });

    $('#txtSearchForListing').keydown(function (e) {
        var keyss = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (CountCurentrownumnber < 1) {
            CountCurentrownumnber = 1;
            cntnum = 1;
        }
        if (keyss == 13) {
            if (CountCurentrownumnber > 1) {
                var getreturnvalue = CountCurentrownumnber - 1;
            }
            if (CountCurentrownumnber > 1) {
                var getAcorid = "#anc" + getreturnvalue;
                var getlink = $(getAcorid).attr("onclick");
                getlink = getlink.replace("'", "");
                getlink = getlink.replace("'", "");
                getlink = getlink.replace("(", "");
                getlink = getlink.replace(")", "");
                getlink = getlink.replace("ClickOnSerachRecord", "");
                var splitLink = getlink.split(",");
                ClickOnSerachRecord(splitLink[0], splitLink[1], "3");
            }
            else {
                ClickOnSerachButton(("1").trim(), ($("#TexcityForListing").val()).trim(), ($("#txtSearchForListing").val()).trim(), "0", "3");
            }
            return false;
        }
        else if (keyss == 40) {
            if (GetChange == 0) {
                getscrolllenth = $('#serchResultForDeals')[0].scrollHeight
                getTotalchildDiv();
                getperscroll = getscrolllenth / Gettotalchilddivs;
            }
            if (CountCurentrownumnber <= Gettotalchilddivs) {
                var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
                var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
                $(gedivname2).removeClass('LocationActive');
                $(".cssDivSerachData").removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                if (backtonext == 1) {
                    if (CountCurentrownumnber > 5) {
                        $("#serchResultForDeals").scrollTop(scrollpossition)
                        scrollpossition = scrollpossition + getperscroll;
                    }
                }
                else if (CountCurentrownumnber > 4) {
                    $("#serchResultForDeals").scrollTop(scrollpossition)
                    scrollpossition = scrollpossition + getperscroll;
                }
                else {
                    $("#serchResultForDeals").scrollTop(0)
                }
                OldCountCurentrownumnber = CountCurentrownumnber;
                CountCurentrownumnber = CountCurentrownumnber + 1;

                return;
            }
            else {
                return;
            }
        }
        if (keyss == 38) {
            if (GetChange == 0) {
                getscrolllenth = $('#serchResultForDeals')[0].scrollHeight
                getTotalchildDiv();
                GetChange = 1;
                getperscroll = getscrolllenth / Gettotalchilddivs;
            }
            OldCountCurentrownumnber = CountCurentrownumnber;
            CountCurentrownumnber = CountCurentrownumnber - 1;
            if (CountCurentrownumnber > 0) {
                var getold = "#cssDivSerachData" + (CountCurentrownumnber);
                var gedivname = "#cssDivSerachData" + (CountCurentrownumnber - 1);
                if ($(gedivname).length > 0) {
                    if (scrollpossition > getperscroll) {
                        scrollpossition = scrollpossition - getperscroll;
                        $("#serchResultForDeals").scrollTop(scrollpossition)
                        backtonext = 1;
                    }
                }
                $(".cssDivSerachData").removeClass('LocationActive');
                $(getold).removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                return false;
            }
            else
                if (CountCurentrownumnber <= 0) {
                    $("#serchResultForDeals").scrollTop(0);
                    var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
                    var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
                    $(gedivname2).removeClass('LocationActive');
                    $(gedivname).removeClass('LocationActive');
                    GetChange = 0;
                    scrollpossition = 0;
                    OldCountCurentrownumnber = 1;
                    CountCurentrownumnber = 1;
                    backtonext = 0;
                    $("#txtSearchForListing").focus();
                    return false;
                }
            return false;
        }
        else {
            $("#serchResultForDeals").scrollTop(0);
            var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
            var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
            $(gedivname2).removeClass('LocationActive');
            $(gedivname).removeClass('LocationActive');
            GetChange = 0;
            scrollpossition = 0;
            OldCountCurentrownumnber = 1;
            CountCurentrownumnber = 1;
            backtonext = 0;
        }
    });
    $("#txtSearchForListing").keyup(function (event) {
        var keyss = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
        if (keyss == 38 || keyss == 40) {
            return;
        }
        else {
            if (($("#txtSearchForListing").val()).trim() != "") {
                $("#serchResultForDeals").show();
                BindMasterSerachData("#serchResultForDeals", $("#txtSearchForListing").val(), "1", "3");
            }
            else {
                $("#serchResultForDeals").hide();
            }
        }
    });
    $("#txtSearchForListing").focus(function () {
        $("#divLoactionContainer").hide();
        focusOnSearch = 1;
        if (($("#txtSearchForListing").val()).trim() != "") {
            $("#serchResultForDeals").show();
        }
        else {
            $("#serchResultForDeals").hide();
        }
    });
    $("#txtSearchForListing").blur(function () {
        focusOnSearch = 0;
    });
    //$("#buttonSearchForListing").click(function () {
    //    if (($("#txtSearchForListing").val()).trim() != "") {
    //        ClickOnSerachButton(("2").trim(), ($("#Texcity").val()).trim(), ($("#txtSearch").val()).trim(), "0", "2");
    //    }
    //    return false;
    //});

    //Below Code Is For Deals Searching End Here

    //Below Code Is For New Searching On Home Page Start Here//
    $('.main-box-categories-box').click(function () {
        $('.main-box-categories-box').removeClass('ActiveAnchor');
        $('#Ddlsearchtype').val($(this).find('input[type="hidden"][name="HfForSearchType"]').val());
        $(this).addClass('ActiveAnchor');
    });
    //Below Code Is For New Searching On Home Page End Here//

    $("#TexcityEcommerce").keyup(function (event) {
        var keyss = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
        if (keyss != 40 && keyss != 38 && keyss != 13) {
            if (($("#TexcityEcommerce").val()).trim() != "") {
                $("#divLoactionContainerEcommerce").show();
                BindMasterLocationSearchEcommerce("#divLoactionContainerEcommerce", $("#TexcityEcommerce").val(), "1");
            }
            else {
                $("#divLoactionContainerEcommerce").hide();
            }
        }
    });
    $("#TexcityEcommerce").focus(function () {
        $("#serchResult").hide();
        focusOnLocation = 1;
        if (($("#TexcityEcommerce").val()).trim() != "") {
            $("#divLoactionContainerEcommerce").show();
        }
        else {
            $("#divLoactionContainerEcommerce").hide();
        }
    });
    $("#TexcityEcommerce").blur(function () {
        focusOnLocation = 0;
    });
    $('#TexcityEcommerce').keydown(function (e) {
        var keyss = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

        if (CountCurentrownumnberLocation < 1) {
            CountCurentrownumnberLocation = 1;
            cntnum = 1;
        }
        if (keyss == 13) {
            if (CountCurentrownumnberLocation > 1) {
                var getreturnvalue = CountCurentrownumnberLocation - 1;
            }
            var getAcorid = "#ancLoc" + getreturnvalue;
            var getlink = $(getAcorid).attr("onclick");
            getlink = getlink.replace("'", "");
            getlink = getlink.replace("'", "");
            getlink = getlink.replace("(", "");
            getlink = getlink.replace(")", "");
            getlink = getlink.replace("ClickOnLocationRecordEcommerce", "");
            ClickOnLocationRecord(getlink, "1");
            return false;
        }
        else if (keyss == 40) {
            if (GetChangeLocation == 0) {
                getscrolllenthLocation = $('#divLoactionContainerEcommerce')[0].scrollHeight
                getTotalchildDivLocation();
                GetChangeLocation = 1;
                getperscrollLocation = getscrolllenthLocation / GettotalchilddivsLocation;
            }

            if (CountCurentrownumnberLocation <= GettotalchilddivsLocation) {
                var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
                var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
                $(gedivname2).removeClass('LocationActive');
                $(".cssDivLocationData").removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                if (backtonextLocation == 1) {
                    if (CountCurentrownumnberLocation > 9) {
                        $("#divLoactionContainerEcommerce").scrollTop(scrollpossitionLocation)
                        scrollpossitionLocation = scrollpossitionLocation + getperscrollLocation;
                    }
                }
                else if (CountCurentrownumnberLocation > 8) {
                    $("#divLoactionContainerEcommerce").scrollTop(scrollpossitionLocation)
                    scrollpossitionLocation = scrollpossitionLocation + getperscrollLocation;
                }
                else {
                    $("#divLoactionContainerEcommerce").scrollTop(0)
                }
                OldCountCurentrownumnberLocation = CountCurentrownumnberLocation;
                CountCurentrownumnberLocation = CountCurentrownumnberLocation + 1;
                return;
            }
            else {
                return;
            }
        }
        if (keyss == 38) {
            if (GetChangeLocation == 0) {
                getscrolllenthLocation = $('#divLoactionContainerEcommerce')[0].scrollHeight
                getTotalchildDivLocation();
                GetChangeLocation = 1;
                getperscrollLocation = getscrolllenthLocation / GettotalchilddivsLocation;
            }
            OldCountCurentrownumnberLocation = CountCurentrownumnberLocation;
            CountCurentrownumnberLocation = CountCurentrownumnberLocation - 1;
            if (CountCurentrownumnberLocation > 0) {
                var getold = "#cssDivLocationDataEcommerce" + (CountCurentrownumnberLocation);
                var gedivname = "#cssDivLocationDataEcommerce" + (CountCurentrownumnberLocation - 1);

                if ($(gedivname).length > 0) {
                    if (scrollpossitionLocation > getperscrollLocation) {
                        scrollpossitionLocation = scrollpossitionLocation - getperscrollLocation;
                        $("#divLoactionContainerEcommerce").scrollTop(scrollpossitionLocation)
                        backtonextLocation = 1;
                    }
                }

                $(".cssDivSerachDatas").removeClass('LocationActive');
                $(getold).removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');
                return false;
            }
            else
                if (CountCurentrownumnberLocation <= 0) {
                    $("#divLoactionContainerEcommerce").scrollTop(0);
                    var gedivname = "#cssDivLocationData" + CountCurentrownumnberLocation;
                    var gedivname2 = "#cssDivLocationData" + OldCountCurentrownumnberLocation;
                    $(gedivname2).removeClass('LocationActive');
                    $(gedivname).removeClass('LocationActive');
                    GetChangeLocation = 0;
                    scrollpossitionLocation = 0;
                    OldCountCurentrownumnberLocation = 1;
                    CountCurentrownumnberLocation = 1;
                    backtonextLocation = 0;
                    $("#TexcityEcommerce").focus();
                    return false;
                }
            return false;
        }
        else {
            $("#divLoactionContainerEcommerce").scrollTop(0);
            var gedivname = "#cssDivLocationDataEcommerce" + CountCurentrownumnberLocation;
            var gedivname2 = "#cssDivLocationDataEcommerce" + OldCountCurentrownumnberLocation;
            $(gedivname2).removeClass('LocationActive');
            $(gedivname).removeClass('LocationActive');
            GetChangeLocation = 0;
            scrollpossitionLocation = 0;
            OldCountCurentrownumnberLocation = 1;
            CountCurentrownumnberLocation = 1;
            backtonextLocation = 0;
        }
    });



    $("#buttonSearchEcommerce").click(function () {
        if (($("#txtSearchEcommerce").val()).trim() != "") {
            var categorycode = $("#txtSearchEcommerce").val().trim();
            window.location.href = "/shop/" + GenerateSub_Cat_Code(categorycode);
            //ClickOnSerachButton(($("#txtSearch").val()).trim());
        }
        else {
            $("#txtSearchEcommerce").addClass("txtErroHover");
        }
    });

    $("#txtSearchEcommerce").keyup(function (event) {
        var keyss = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
        if (keyss == 38 || keyss == 40) {
            return;
        }
        else {
            if (($("#txtSearchEcommerce").val()).trim() != "") {
                $("#serchResultEcommerce").show();
                BindMasterSerachDataEcommerce("#serchResultEcommerce", $("#txtSearchEcommerce").val());
            }
            else {
                $("#serchResultEcommerce").hide();
            }
        }
    });

    $('#txtSearchEcommerce').keydown(function (e) {
        var keyss = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

        if (CountCurentrownumnber < 1) {
            CountCurentrownumnber = 1;
            cntnum = 1;
        }
        if (keyss == 13) {
            if (CountCurentrownumnber > 1) {
                var getreturnvalue = CountCurentrownumnber - 1;
            }
            if (CountCurentrownumnber > 1) {
                var getAcorid = "#anc" + getreturnvalue;
                var getlink = $(getAcorid).attr("onclick");
                getlink = getlink.replace("'", "");
                getlink = getlink.replace("'", "");
                getlink = getlink.replace("(", "");
                getlink = getlink.replace(")", "");
                getlink = getlink.replace("ClickOnSerachRecordEcommerce", "");
                var splitLink = getlink.split(",");
                //alert(splitLink[0]);
                ClickOnSerachRecordEcommerce(splitLink[0]);
            }
            return;
        }
        if (keyss == 40) {
            if (GetChange == 0) {
                getscrolllenth = $('#serchResultEcommerce')[0].scrollHeight
                getTotalchildDiv();
                getperscroll = getscrolllenth / Gettotalchilddivs;
            }
            if (CountCurentrownumnber <= Gettotalchilddivs) {
                var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
                var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
                $(gedivname2).removeClass('LocationActive');
                $(".cssDivSerachData").removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');

                if (backtonext == 1) {
                    if (CountCurentrownumnber > 5) {
                        $("#serchResultEcommerce").scrollTop(scrollpossition)
                        scrollpossition = scrollpossition + getperscroll;
                    }
                }
                else if (CountCurentrownumnber > 4) {
                    $("#serchResultEcommerce").scrollTop(scrollpossition)
                    scrollpossition = scrollpossition + getperscroll;
                }
                else {
                    $("#serchResultEcommerce").scrollTop(0)
                }
                OldCountCurentrownumnber = CountCurentrownumnber;
                CountCurentrownumnber = CountCurentrownumnber + 1;

                return;
            }
            else {
                return;
            }
        }
        if (keyss == 38) {
            if (GetChange == 0) {
                getscrolllenth = $('#serchResultEcommerce')[0].scrollHeight
                getTotalchildDiv();
                GetChange = 1;
                getperscroll = getscrolllenth / Gettotalchilddivs;
            }
            OldCountCurentrownumnber = CountCurentrownumnber;
            CountCurentrownumnber = CountCurentrownumnber - 1;
            if (CountCurentrownumnber > 0) {
                var getold = "#cssDivSerachData" + (CountCurentrownumnber);
                var gedivname = "#cssDivSerachData" + (CountCurentrownumnber - 1);

                if ($(gedivname).length > 0) {
                    if (scrollpossition > getperscroll) {
                        scrollpossition = scrollpossition - getperscroll;
                        $("#serchResultEcommerce").scrollTop(scrollpossition)
                        backtonext = 1;
                    }
                }

                $(".cssDivSerachData").removeClass('LocationActive');
                $(getold).removeClass('LocationActive');
                $(gedivname).addClass('LocationActive');

                return false;
            }
            else
                if (CountCurentrownumnber <= 0) {
                    $("#serchResultEcommerce").scrollTop(0);
                    var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
                    var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
                    $(gedivname2).removeClass('LocationActive');
                    $(gedivname).removeClass('LocationActive');

                    GetChange = 0;
                    scrollpossition = 0;
                    OldCountCurentrownumnber = 1;
                    CountCurentrownumnber = 1;
                    backtonext = 0;
                    $("#txtSearchEcommerce").focus();
                    return false;
                }
            return false;
        }
        else {
            $("#serchResultEcommerce").scrollTop(0);
            var gedivname = "#cssDivSerachData" + CountCurentrownumnber;
            var gedivname2 = "#cssDivSerachData" + OldCountCurentrownumnber;
            $(gedivname2).removeClass('LocationActive');
            $(gedivname).removeClass('LocationActive');

            GetChange = 0;
            scrollpossition = 0;
            OldCountCurentrownumnber = 1;
            CountCurentrownumnber = 1;
            backtonext = 0;
        }
    });

});

function BindMasterSerachDataEcommerce(TargetDivID, textsearchvalue) {
    textsearchvalue = textsearchvalue.replace("'", "+apostopis");
    $.ajax({
        url: '/Common/DataSearchEcommerce',
        type: 'POST',
        dataType: 'json',
        data: { SearchText: textsearchvalue },
        success: function (data) {
            OnSUcessBindMasterSerachDataEcommerce(data, textsearchvalue);
        },
        error: function (result) {
        }
    });
}

var Cssstar1 = "notrated", Cssstar2 = "notrated", Cssstar3 = "notrated", Cssstar4 = "notrated", Cssstar5 = "notrated", currentRating = 0, ratingText,
RecordCountTemp = 0, PlusText = "", RealSearchText = " ", mySearchRecordTabel = "";
var xmlDocData = " ", currentRowData = "", TableData = "", fomatedResult = "", searchtype = "";

function OnSUcessBindMasterSerachDataEcommerce(data, textsearchvalue) {
    $("#serchResultEcommerce").empty();
    if (parseInt(data.length) == 0) {
    }
    else {
        $("#serchResultEcommerce").show();
    }
    mySearchRecordTabel = " ";
    var SearchValue = " ";
    if (data.length == 0) {
        mySearchRecordTabel = "<div class='cssNoRecordFoundEcommerce'>No Record Found</div>";
    }
    var rownumbers = 1;
    xmlDocData = $.parseXML(data);
    currentRowData = "";
    TableData = $(xmlDocData).find("dsData");
    TableData.each(function () {
        currentRowData = $(this);
        SearchValue = currentRowData.find("searchResultEcommerce").text();
        fomatedResult = currentRowData.find("fomatedResult").text();
        searchtype = currentRowData.find("serachTextEcommerce").text();
        SearchValue = (SearchValue.split(' ')).join('^|');
        SearchValue = (SearchValue.split("'")).join('+apostopis');

        var divids = 'cssDivSerachData' + rownumbers;
        var lblget = 'lblget' + rownumbers;
        var ancorname = 'anc' + rownumbers;
        var urlpart = currentRowData.find("forurl").text().split(" ").join("^|");
        var sprid = currentRowData.find("Mprid").text();
        if (searchtype.trim() == "Product") {
            mySearchRecordTabel += "<div id='" + divids + "' class='cssDivSerachData'>";
            mySearchRecordTabel += "<a id='" + ancorname + "' onclick=ClickOnSerachEcommerce('" + urlpart.split("'s").join("-sss-") + "','" + sprid + "')>" + fomatedResult;
        }
        else {
            mySearchRecordTabel += "<div id='" + divids + "' class='cssDivSerachData'>";
            mySearchRecordTabel += "<a id='" + ancorname + "' onclick=ClickOnSerachEcommerce('" + urlpart.split("'s").join("-sss-") + "','" + sprid + "')>" + fomatedResult;
        }
        rownumbers = rownumbers + 1;
        mySearchRecordTabel = mySearchRecordTabel + "</a></div>";
    });

    $("#serchResultEcommerce").html(mySearchRecordTabel);
}

function ClickOnSerachEcommerce(url, sprid) {
    if (sprid == '0' || sprid == 'undefined') {
        window.location.href = url.split("-sss-").join("'s");
        return false;
    }
    $.ajax({
        type: "POST",
        url: '/Common/GetEncryptedSPRID',
        data: { SearchText: sprid },
        dataType: "json",
        success: function (data) {
            window.location.href = url.split("-sss-").join("'s") + "/" + data;
            return false;
        },
        error: function () {
            alert('Error occured');
        }
    });
}

function ClickOnSerachButtonEcommerce(searchval) {
    //alert(searchval);
    if (searchval.indexOf("Prcode") > -1) {
        var newUrl = "";
        searchval = searchval.replace("/Prcode", "");
        console.log(searchval);
        $.ajax({
            url: '/Common/GetEncryptedSPRID',
            type: 'POST',
            dataType: 'json',
            data: { SearchText: searchval },
            success: function (data) {
                newUrl = data;
                console.log("/p/" + newUrl);
                //window.location.href = "/p/" + newUrl;
            },
            error: function (result) {
            }
        });
        setTimeout(function () {
            console.log("/p/" + newUrl);
            // window.location.href = "/p/" + newUrl;
        }, 1000);
    }
    else {
        window.location.href = "/product/" + searchval;
    }
    //$("#buttonSearch").removeClass("buttonsearch");
    //$("#buttonSearch").addClass("buttonsearchOnSearch");
    searchval = searchval.split("'").join('+apostopis');
    //$("#buttonSearch").val("");
    ShowProgressOnBody();
    if (searchval != '') {
        $.ajax({
            url: '/Common/GetSearchUrl',
            type: 'POST',
            dataType: 'json',
            data: { searchval: searchval, pmidSearch: pmid },
            success: function (data) {
                RemoveProgressFromBody();
                var MainUrl = window.location.href;
                var FullUrl = window.location.href;
                var PahtName = window.location.pathname;
                var qyerypart = window.location.search.toString().trim();
                if (PahtName == "/") {
                    window.location.href = MainUrl + data;
                }
                else {
                    MainUrl = FullUrl.replace(PahtName + qyerypart, "");
                    window.location.href = MainUrl + "/" + data;
                }
            },
            error: function () {
                RemoveProgressFromBody();
                //$("#buttonSearch").addClass("buttonsearch");
                //$("#buttonSearch").val("Search");
            }
        });
    }
}

function ClickOnSerachRecordEcommerce(urlpart, pmid) {
    urlpart = (urlpart.split('^|')).join(' ');
    //alert(urlpart);
    ClickOnSerachButtonEcommerce(urlpart);
    $("#serchResultEcommerce").hide();
    $("#txtSearchEcommerce").blur();
}

function ClickOnSerachRecordForBindDataEcommerce(fomatedResult, id) {
    urlpart = ($(id).text().split('^|')).join(' ');
    $("#serchResultEcommerce").hide();
    $("#txtSearchEcommerce").val($(id).text());
}

function GenerateSub_Cat_Code(subcatname) {
    subcatname = (subcatname.split("/")).join("-");
    subcatname = (subcatname.split(" ")).join("-");
    subcatname = (subcatname.split("&")).join("and");
    subcatname = (subcatname.split(",")).join("-");
    subcatname = (subcatname.split("'")).join("-");
    subcatname = (subcatname.split("--")).join("-");
    subcatname = (subcatname.split("''")).join("-");
    subcatname = (subcatname.split("--")).join("-");
    return subcatname.toLowerCase();
}

function getTotalchildDivLocation() {
    var hlocation = 1;
    GettotalchilddivsLocation = 0;
    while (hlocation > 0) {
        var gedivname = "#cssDivLocationData" + hlocation;
        if ($(gedivname).length > 0) {
            GettotalchilddivsLocation = hlocation;
            hlocation = hlocation + 1;
        }
        else {
            hlocation = 0;
            return;
        }
    }
}

function getTotalchildDiv() {
    var h = 1;
    Gettotalchilddivs = 0;
    while (h > 0) {
        var gedivname = "#cssDivSerachData" + h;
        if ($(gedivname).length > 0) {
            Gettotalchilddivs = h;
            h = h + 1;
        }
        else {
            h = 0;
            return;
        }
    }
}

function Logout() {
    $.ajax({
        url: '/visitor_signup/Logout',
        type: 'POST',
        dataType: 'json',
        data: "",
        success: function (data) {
            if (data == "Logout") {
                window.location.href = "/merchant-login";
            }
        }
    });
}

function ReferralLogout() {
    $.ajax({
        url: '/visitor_signup/Logout',
        type: 'POST',
        dataType: 'json',
        data: "",
        success: function (data) {
            if (data == "Logout") {
                window.location.href = "/referral-login";
            }
        }
    });
}

function CustomerLogout() {
    $.ajax({
        url: '/visitor_signup/Logout',
        type: 'POST',
        dataType: 'json',
        data: "",
        success: function (data) {
            if (data == "Logout") {
                window.location.href = "/customer-login";
            }
        }
    });
}

function BindMasterLocationSearch(TargetDivID, texttsearchvalue, Type) {
    $.ajax({
        url: '/Common/LocationSearch',
        type: 'POST',
        dataType: 'json',
        data: { Location: texttsearchvalue, 'CountryID': "96" },
        success: function (data) {
            OnSUcessBindMasterLocationData(data, texttsearchvalue, Type);
        }
    });
}

function BindMasterLocationSearchEcommerce(TargetDivID, texttsearchvalue, Type) {
    $.ajax({
        url: '/Common/LocationSearch',
        type: 'POST',
        dataType: 'json',
        data: { Location: texttsearchvalue, 'CountryID': "96" },
        success: function (data) {
            OnSUcessBindMasterLocationDataEcommerce(data, texttsearchvalue, Type);
        }
    });
}

var SearchLocationValue = " ", serachLocationStateAndCity = "", serachLocationSplitValue = "", serachLocationLength, AreaName = "", fomatedLocation = "", AreaIndex = 0;
var OldLocationDiv = "", CurrentLocationDiv = "", OldAreaData = "", CurrentAreaData = "", CountSameRow = 0, SameRowFunParameter = "", mySearchLocationTabel = "";
var xmlDocLocations = " ", currentRowLocations = "", TableLocations = "", fomatedLocation = "";

function OnSUcessBindMasterLocationDataEcommerce(data, LocationTextSearch, Type) {
    OldLocationDiv = "";
    CurrentLocationDiv = "";
    OldAreaData = "";
    CurrentAreaData = "";
    CountSameRow = 0;
    mySearchLocationTabel = " ";
    var GetcurentrowNumer = 1;
    if (Type == '1')
        $("#divLoactionContainerEcommerce").empty();    
    if (data == '') {
        mySearchLocationTabel = "<div class='cssNoRecordFound'>No Record Found</div>";
    }
    xmlDocLocations = $.parseXML(data);
    var xml = $(xmlDocLocations);
    TableLocations = xml.find("Row");
    TableLocations.each(function () {
        currentRowLocations = $(this);
        SearchLocationValue = currentRowLocations.find("LocationText").text();
        fomatedLocation = currentRowLocations.find("FOMATEDLOCATION").text();
        serachLocationSplitValue = SearchLocationValue.split(',');
        serachLocationLength = serachLocationSplitValue.length;
        CurrentAreaData = SearchLocationValue.substr(SearchLocationValue.indexOf(",") + 1);
        CurrentAreaData = CurrentAreaData.split(',').join(', ');
        if ((CurrentAreaData.trim()) == (OldAreaData.trim()) && (CurrentAreaData.split(",").length - 1) == 2) {
            CountSameRow = CountSameRow + 1;
            if (CountSameRow == 1) {
                SameRowFunParameter = CurrentAreaData.split(', ').join(',');
                SameRowFunParameter = (SameRowFunParameter.split(' ')).join('^|');
                SameRowFunParameter = SameRowFunParameter.split("'").join("+opose");
                mySearchLocationTabel += "<div class='cssDivLocationData'><a style='' onclick=ClickOnLocationRecord('" + SameRowFunParameter + "','" + Type + "')>" + CurrentAreaData + "</a></div>" + CurrentLocationDiv;
            }
            else {
                mySearchLocationTabel += CurrentLocationDiv;
            }
        }
        else {
            CountSameRow = 0;
            mySearchLocationTabel += CurrentLocationDiv;
        }
        CurrentLocationDiv = "";
        SearchLocationValue = (SearchLocationValue.split(' ')).join('^|');
        SearchLocationValue = SearchLocationValue.split("'").join("+opose");
        var GetcurentDivName = "cssDivLocationData" + GetcurentrowNumer;
        var ancorname = 'ancLoc' + GetcurentrowNumer;
        CurrentLocationDiv += "<div id='" + GetcurentDivName + "' class='cssDivLocationDataEcommerce'><a  id='" + ancorname + "'  onclick=ClickOnLocationRecord('" + SearchLocationValue + "','" + Type + "')>" + fomatedLocation + " </a></div>";
        GetcurentrowNumer = GetcurentrowNumer + 1;
        OldAreaData = CurrentAreaData;
        OldLocationDiv = CurrentLocationDiv;
    });
    mySearchLocationTabel += CurrentLocationDiv;
    if (Type == '1')
        $("#divLoactionContainerEcommerce").html(mySearchLocationTabel);
}


function OnSUcessBindMasterLocationData(data, LocationTextSearch, Type) {
    OldLocationDiv = "";
    CurrentLocationDiv = "";
    OldAreaData = "";
    CurrentAreaData = "";
    CountSameRow = 0;
    mySearchLocationTabel = " ";
    var GetcurentrowNumer = 1;
    if (Type == '1')
        $("#divLoactionContainer").empty();
    else if (Type == '2' || Type == '3')
        $("#divLoactionContainerForDeals").empty();
    if (data == '') {
        mySearchLocationTabel = "<div class='cssNoRecordFound'>No Record Found</div>";
    }
    xmlDocLocations = $.parseXML(data);
    var xml = $(xmlDocLocations);
    TableLocations = xml.find("Row");
    TableLocations.each(function () {
        currentRowLocations = $(this);
        SearchLocationValue = currentRowLocations.find("LocationText").text();
        fomatedLocation = currentRowLocations.find("FOMATEDLOCATION").text();
        serachLocationSplitValue = SearchLocationValue.split(',');
        serachLocationLength = serachLocationSplitValue.length;
        CurrentAreaData = SearchLocationValue.substr(SearchLocationValue.indexOf(",") + 1);
        CurrentAreaData = CurrentAreaData.split(',').join(', ');
        if ((CurrentAreaData.trim()) == (OldAreaData.trim()) && (CurrentAreaData.split(",").length - 1) == 2) {
            CountSameRow = CountSameRow + 1;
            if (CountSameRow == 1) {
                SameRowFunParameter = CurrentAreaData.split(', ').join(',');
                SameRowFunParameter = (SameRowFunParameter.split(' ')).join('^|');
                SameRowFunParameter = SameRowFunParameter.split("'").join("+opose");
                mySearchLocationTabel += "<div class='cssDivLocationData'><a style='' onclick=ClickOnLocationRecord('" + SameRowFunParameter + "','" + Type + "')>" + CurrentAreaData + "</a></div>" + CurrentLocationDiv;
            }
            else {
                mySearchLocationTabel += CurrentLocationDiv;
            }
        }
        else {
            CountSameRow = 0;
            mySearchLocationTabel += CurrentLocationDiv;
        }
        CurrentLocationDiv = "";
        SearchLocationValue = (SearchLocationValue.split(' ')).join('^|');
        SearchLocationValue = SearchLocationValue.split("'").join("+opose");
        var GetcurentDivName = "cssDivLocationData" + GetcurentrowNumer;
        var ancorname = 'ancLoc' + GetcurentrowNumer;
        CurrentLocationDiv += "<div id='" + GetcurentDivName + "' class='cssDivLocationData'><a  id='" + ancorname + "'  onclick=ClickOnLocationRecord('" + SearchLocationValue + "','" + Type + "')>" + fomatedLocation + " </a></div>";
        GetcurentrowNumer = GetcurentrowNumer + 1;
        OldAreaData = CurrentAreaData;
        OldLocationDiv = CurrentLocationDiv;
    });
    mySearchLocationTabel += CurrentLocationDiv;
    if (Type == '1')
        $("#divLoactionContainer").html(mySearchLocationTabel);
    else if (Type == '2' || Type == '3')
        $("#divLoactionContainerForDeals").html(mySearchLocationTabel);
}

function ClickOnLocationRecord(SelectedLocationValue, Type) {
    SelectedLocationValue = (SelectedLocationValue.split('^|')).join(' ');
    if (Type == '1') {
        $("#Texcity").val(SelectedLocationValue);
        $("#divLoactionContainer").hide();
        $("#TexcityEcommerce").val(SelectedLocationValue);
        $("#divLoactionContainerEcommerce").hide(); 
    }
    else if (Type == '2') {
        $("#TexcityForDeals").val(SelectedLocationValue);
        $("#divLoactionContainerForDeals").hide();
        $("#TexcityEcommerce").val(SelectedLocationValue);
        $("#divLoactionContainerEcommerce").hide();
    }
    else if (Type == '3') {
        $("#TexcityForListing").val(SelectedLocationValue);
        $("#divLoactionContainerForDeals").hide();
        $("#TexcityEcommerce").val(SelectedLocationValue);
        $("#divLoactionContainerEcommerce").hide();
    }
}

function BindMasterSerachData(TargetDivID, textsearchvalue, SearchType, Type) {
    textsearchvalue = textsearchvalue.replace("'", "+apostopis");
    SearchType = SearchType.replace("'", "+apostopis");
    $.ajax({
        url: '/Common/DataSearch',
        type: 'POST',
        dataType: 'json',
        data: { SearchText: textsearchvalue, 'CountryID': "96", SearchType: SearchType },
        success: function (data) {
            OnSUcessBindMasterSerachData(data, textsearchvalue, Type);
        },
        error: function (result) {
        }
    });
}

var Cssstar1 = "notrated", Cssstar2 = "notrated", Cssstar3 = "notrated", Cssstar4 = "notrated", Cssstar5 = "notrated", currentRating = 0, ratingText,
RecordCountTemp = 0, PlusText = "", RealSearchText = " ", mySearchRecordTabel = "";
var xmlDocData = " ", currentRowData = "", TableData = "", fomatedData = "";

function OnSUcessBindMasterSerachData(data, textsearchvalue, Type) {
    if (Type == "1")
        $("#serchResult").empty();
    else if (Type == "2" || Type == "3")
        $("#serchResultForDeals").empty();
    if (parseInt(data.length) > 0) {
        if (Type == "1")
            $("#serchResult").show();
        else if (Type == "2" || Type == "3")
            $("#serchResultForDeals").show();
    }
    mySearchRecordTabel = " ";
    var SearchValue = " ";
    if (data.length == 0) {
        mySearchRecordTabel = "<div class='cssNoRecordFound'>No Record Found</div>";
    }
    var rownumbers = 1;
    xmlDocData = $.parseXML(data);
    currentRowData = "";
    var xml = $(xmlDocData);
    TableData = xml.find("Row");
    TableData.each(function () {
        currentRowData = $(this);
        SearchValue = currentRowData.find("SEARCHRESULT").text();
        fomatedData = currentRowData.find("FOMATEDDATA").text();
        SearchValue = (SearchValue.split(' ')).join('^|');
        SearchValue = (SearchValue.split("'")).join('+apostopis');
        RealSearchText = currentRowData.find("SEARCHRESULT").text();
        fomatedLocation = "";
        AreaIndex = 0;
        if ((RealSearchText.toLowerCase()).indexOf(textsearchvalue.toLowerCase()) >= 0) {
            AreaIndex = ((RealSearchText.toLowerCase()).indexOf(textsearchvalue.toLowerCase()));
            fomatedLocation = RealSearchText.substring(AreaIndex, AreaIndex + (textsearchvalue).length);
            RealSearchText = (RealSearchText).replace(fomatedLocation, ("<span class='cssHighLightedSearch'>" + fomatedLocation + "</span>"));
        }
        var divids = 'cssDivSerachData' + rownumbers;
        var lblget = 'lblget' + rownumbers;
        var ancorname = 'anc' + rownumbers;
        mySearchRecordTabel += "<div id='" + divids + "' class='cssDivSerachData'><a id='" + ancorname + "' onclick=ClickOnSerachRecord(" + "'" + "" + SearchValue + "" + "'" + "," + currentRowData.find("PMID").text() + ",'" + Type + "') >" + fomatedData;
        rownumbers = rownumbers + 1;
        mySearchRecordTabel = mySearchRecordTabel + "</a></div>";
    });
    if (mySearchRecordTabel.trim() == "") {
        if (Type == "1")
            mySearchRecordTabel = '<div id="cssDivSerachData1" class="cssDivSerachData"><a id="anc1" onclick="ClickOnSerachRecord("",0,"1")">No Record Found</a></div>';
        else if (Type == "2")
            mySearchRecordTabel = '<div id="cssDivSerachData1" class="cssDivSerachData"><a id="anc1" onclick="ClickOnSerachRecord("",0,"2")">No Record Found</a></div>';
    }
    if (Type == "1")
        $("#serchResult").html(mySearchRecordTabel);
    else if (Type == "2" || Type == "3")
        $("#serchResultForDeals").html(mySearchRecordTabel);
}

var cnt2 = 0;

function ClickOnSerachRecord(SelectedSerachValue, pmid, Type) {
    SelectedSerachValue = (SelectedSerachValue.split('^|')).join(' ');
    SelectedSerachValue = (SelectedSerachValue.split('+apostopis')).join("'");
    if (Type == "1") {
        $("#txtSearch").val(SelectedSerachValue);
        ClickOnSerachButton(($("#Ddlsearchtype").val()).trim(), ($("#Texcity").val()).trim(), ($("#txtSearch").val()).trim(), pmid, Type);
        $("#serchResult").hide();
    }
    else if (Type == "2") {
        $("#txtSearchForDeals").val(SelectedSerachValue);
        ClickOnSerachButton(("2").trim(), ($("#TexcityForDeals").val()).trim(), ($("#txtSearchForDeals").val()).trim(), pmid, Type);
        $("#serchResultForDeals").hide();
    }
    else if (Type == "3") {
        $("#txtSearchForListing").val(SelectedSerachValue);
        ClickOnSerachButton(("1").trim(), ($("#TexcityForListing").val()).trim(), ($("#TexcityForListing").val()).trim(), pmid, Type);
        $("#serchResultForDeals").hide();
    }
}

var gettype = 0;

function ClickOnSerachButton(SearchType, cityname, searchval, pmid, Type) {
    cityname = cityname.split("'").join('+apostopis');
    searchval = searchval.split("'").join('+apostopis');
    SearchType = SearchType.split("'").join('+apostopis');
    if (Type == "1") {
        if (searchval != '') {
            $.ajax({
                url: '/Common/GetSearchUrl',
                type: 'POST',
                dataType: 'json',
                data: { SearchType: SearchType, cityname: cityname, searchval: searchval, pmidSearch: pmid },
                success: function (data) {
                    if (data != "") {
                        var MainUrl = window.location.href;
                        var FullUrl = window.location.href;
                        var PahtName = window.location.pathname;
                        if (PahtName == "/") {
                            if (Type == "1") {
                                window.location.href = PahtName + data;
                            }
                        }
                        else {
                            MainUrl = FullUrl.replace(PahtName, "");
                            if (Type == "1") {
                                window.location.href = "/" + data;
                            }
                        }
                    }
                },
                error: function () {
                    if (Type == "1") {
                        $("#buttonSearch").val("Search");
                    }
                }
            });
        }
    }
}

function AddToFavaourite(pmid) {
    if (isNaN(pmid)) {
        alert("Some error occured !");
        return;
    }
    ShowProgressOnBody();
    $.ajax({
        url: '/Common/AddToFavourate',
        type: 'POST',
        dataType: 'json',
        data: { pmid: pmid },
        success: function (data) {
            var ret = data;
            RemoveProgressFromBody();
            if (ret == 1) {
                $("#msgTemp").html(GetSuccessLabel("Successfully added in favorite."));
                return false;
            }
            if (ret == 2) {
                $("#msgTemp").html(GetErrorLabel("Already Exists in favorite list."));
                return false;
            }
            if (ret == 3) {
                var MainUrl = window.location.href;
                if (MainUrl.indexOf("/listing/") >= 0) {
                    MainUrl = MainUrl.substr(0, parseInt(MainUrl.lastIndexOf("/listing/")) + 1);
                }
                else if (MainUrl.indexOf("/business-details/") >= 0) {
                    MainUrl = MainUrl.substr(0, parseInt(MainUrl.lastIndexOf("/business-details/")) + 1);
                }
                else {
                    MainUrl = "";
                }
                window.location.href = MainUrl + "merchant-signup";
            }
        },
        error: function (data) {
        },
    });

    return false;
}

function NavigateListing(type, pmid, IsLast) {
    if (isNaN(IsLast)) {
        alert("Some error occured !");
        return;
    }
    if (isNaN(pmid)) {
        ("Some error occured !");
        return;
    }
    if (parseInt(pmid) <= 0) {
        alert("Some error occured !");
        return;
    }
    $.ajax({
        url: '/Common/NavigateListing',
        type: 'POST',
        dataType: 'json',
        data: { type: type, pmid: pmid, isLast: IsLast },
        success: function (data) {
            var MainUrl = window.location.href;
            var FullUrl = window.location.href;
            var PahtName = window.location.pathname;
            if (PahtName == "/") {
                window.location.href = MainUrl + data;
            }
            else {
                MainUrl = FullUrl.replace(PahtName, "");
                window.location.href = MainUrl + "/" + data;
            }
        },
        error: function (data) {
        },
    });

    return false;
}