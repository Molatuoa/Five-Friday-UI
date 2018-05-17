

$('#btn-group-search-by>ul>li>a').on('click', function () {

    $('[name="termby"]').val($(this).data('id'))
    $('#btn-group-search-by>button>span').html($(this).data('id'))

});

$('[name="CustomerName"]').keyup(function (event) {
    loadtbl(1);
});

$(document).on('click', '#bottomPager a', function () {
    location.href = "#div-res-content";

    var href = $(this).attr('href');
    if (typeof href != 'undefined') {
        if (href.indexOf('#') == 0) {

            $('#bottomPager li').removeClass('active');
            $(this).parent().addClass('active');

            loadtbl()
        }
    }


});

$('.btn-page-size').on('click', function () {
    if (!$(this).parent().hasClass('active')) {

        $(".btn-page-size").parent().removeClass('active')
        $(this).parent().addClass('active')
        loadtbl(1);
    }
});

function loadtbl(page) {
    var term = encodeURIComponent($('[name="CustomerName"]').val());
    var page_size = $(".btn-page-size").parent().parent().find('.active>a').data('val');

    if (page == null) {
        page = $('#bottomPager li.active a').html();
    }

    var page_href = $('#bottomPager li.active a').attr('href');

    if (typeof page_href != 'undefined') {
        if (page_href.indexOf('#') == 0) {
            page = page_href.substring(1, page_href.length)
        }
    }



    var scrollval = $('.table-responsive').scrollLeft();


    $(".box").append('<div class="overlay"><span class="fa fa-refresh fa-spin"></span></div>');

    $("#div-res-content").load("/Home/_index?Page=" + page + "&page_size=" + page_size + "&sSearchValue=" + term,
        function (response, status, xhr) {
            if (status == "error") {
                var msg = "Sorry but there was an error: ";
                $("#div-res-content").html(msg + xhr.status + " " + xhr.statusText);
            }
            else {
                $('.table-responsive').scrollLeft(scrollval);
            }

            $(".box .overlay").remove();
        });
}

$(document).on("click", "#btnAddProduct", function (e) {
    OpenModal("AddCustomer", "Add New Customer");
});
$(document).on("click", ".btn-link-contact", function (e) {
    OpenModal("AddCustomerContacts", "Add New Contact");
    $("#CustomerID").val($(this).data("id"));
});
function OpenModal(ModalID, ModalTitle) {
    $("#" + ModalID + " .modal-title").html(ModalTitle);
    $('#' + ModalID).modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
}

$(document).on("click", "#btnSaveCustomer", function (p) {
    $.ajax({
        type: "POST",
        url: '/Home/_addNewCustomer',
        data: SerializeData("AddCustomerForm"),
        beforeSend: function (data) {

            $("#AddCustomer").append('<div class="overlay"><span class="fa fa-refresh fa-spin"></span></div>');
        },
        success: function (data) {
            $("#AddCustomer  .overlay").remove();
            $("#AddCustomer").modal("hide");
            loadtbl();
        },
        error: function (xhr, status, error) {

            $("#AddCustomer  .overlay").remove();
            alert(error)

        },
        completed: function (data) {
            $("#AddCustomer .overlay").remove();
        }
    });
});
$(document).on("click", "#btnSaveContact", function (p) {
    $.ajax({
        type: "POST",
        url: '/Home/_addNewContact',
        data: SerializeData("AddContactForm"),
        beforeSend: function (data) {

            $("#AddCustomerContacts").append('<div class="overlay"><span class="fa fa-refresh fa-spin"></span></div>');
        },
        success: function (data) {
            $("#AddCustomerContacts  .overlay").remove();
            $("#AddCustomerContacts").modal("hide");
            loadtbl();
        },
        error: function (xhr, status, error) {

            $("#AddCustomerContacts  .overlay").remove();
            alert(error)

        },
        completed: function (data) {
            $("#AddCustomerContacts .overlay").remove();
        }
    });
});

function SerializeData(id) {
    return $("#" + id).serialize();
}

$(document).on("click", ".btn-link-View", function (p) {
    $.ajax({
        type: "POST",
        url: '/Home/_GetContactsByID',
        data: { id: $(this).data("id") },
        //contentType: "application/json; charset=utf-8",
        dataType: "html",
        beforeSend: function (jsReturnArgs) {

            $("#div-res-content").append('<div class="overlay"><span class="fa fa-refresh fa-spin"></span></div>');
        },
        success: function (jsReturnArgs) {
            debugger;
            $("#div-res-content  .overlay").remove();
            $("#div-res-content").addClass("hidden");
            $("#div-res").html(jsReturnArgs);
        },
        error: function (xhr, status, error) {
            
            $("#div-res-content  .overlay").remove();
            alert(error)

        },
        completed: function (data) {
            $("#div-res-content .overlay").remove();
        }
    });
});

$(document).on("keyup", "#CustomerAddress", function () {
    $("#CustomerAddress").geocomplete({
        appendToParent: true,
        geolocate: true,
        types: ["geocode"],
        map: null
    });
})
$(document).on("change", "#CustomerAddress", function () {
    setTimeout(function () {
        GPSResolution();
    }, 100);
});
$(document).on("click", "#btnBack", function () {

})
function GPSResolution() {

    var address = $("#CustomerAddress").val();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            $("#Latitude").val(results[0].geometry.location.lat())
            $("#Longitude").val(results[0].geometry.location.lng())
        } else {
            bootbox.alert("Request failed.")
        }
    });
}