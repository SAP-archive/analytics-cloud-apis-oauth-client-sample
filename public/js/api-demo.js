$(function () {
    $('input[type=radio]').click(function () {
        $('#actionBtn')[0].firstChild.data = 'Generate URL';
        $('#demoBtn')[0].removeAttribute('disabled');

        disableAllParamFields();

        const paramType = document.querySelector('input[name = "paramType"]:checked').value;
        if (paramType === 'Display') {
            enableDisplayParamField();
        }
        if (paramType === 'Filter') {
            enableFilterParamFields();
        }
        if (paramType === 'Variable') {
            enableVariableParamFields();
        }
    });

    displayDefaultTextForEmptyIframe();
});


function disableAllParamFields() {
    $('#modeParam')[0].disabled = true;
    $('#pageParam')[0].disabled = true;
    $('#pageBarParam')[0].disabled = true;
    $('#modelParam')[0].disabled = true;
    $('#dimensionParam')[0].disabled = true;
    $('#variableParam')[0].disabled = true;
    $('#valueParam')[0].disabled = true;
    $('#opParam')[0].disabled = true;
}

function enableDisplayParamField() {
    $('#modeParam')[0].disabled = false;
    $('#pageParam')[0].disabled = false;
    $('#pageBarParam')[0].disabled = false;
}

function enableFilterParamFields() {
    $('#modelParam')[0].disabled = false;
    $('#dimensionParam')[0].disabled = false;
    $('#valueParam')[0].disabled = false;
    $('#opParam')[0].disabled = false;
}

function enableVariableParamFields() {
    $('#modelParam')[0].disabled = false;
    $('#variableParam')[0].disabled = false;
    $('#valueParam')[0].disabled = false;
}

function displayDefaultTextForEmptyIframe() {
    $('iframe').not(':has([src])').each(function () {
        let iframe = this;
        iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
        iframe.document.open();
        iframe.document.write($(this).attr("alt"));
        iframe.document.close();
    });
}

function toggleBtn() {
    const text = $('#actionBtn')[0].firstChild;

    if (text.data.startsWith('Generate')) {
        composeUrl();
        text.data = 'Load Story';
        $('#demoBtn')[0].disabled = 'true';
    } else {
        displayIFrame();
        text.data = 'Generate URL';
        $('#demoBtn')[0].removeAttribute('disabled');
    }
}

function composeUrl() {
    const story = $('#story')[0].value;
    let url = tenantConfig.tenantUrl.concat('/sap/fpa/ui/tenants/').concat(tenantConfig.tenantId).concat('/bo/story/').concat(story);

    const paramType = document.querySelector('input[name = "paramType"]:checked').value;
    if (paramType === 'Display') {
        url = url.concat(getDisplayParams());
    } else if (paramType === 'Filter') {
        url = url.concat(getFilterParams());
    } else if (paramType === 'Variable') {
        url = url.concat(getVariableParams());
    }

    $('#generatedUrl')[0].value = url;
    return url;
}

function getDisplayParams() {
    const modeParam = encodeURIComponent($('#modeParam')[0].value);
    const pageParam = encodeURIComponent($('#pageParam')[0].value);
    const pageBarParam = encodeURIComponent($('#pageBarParam')[0].value);

    let url = String();
    url = url.concat('?');
    url = url.concat('mode=').concat(modeParam);
    url = url.concat('&page=').concat(pageParam);
    url = url.concat('&pageBar=').concat(pageBarParam);
    return url;
}

function getFilterParams() {
    const modelParam = encodeURIComponent($('#modelParam')[0].value);
    const dimensionParam = encodeURIComponent($('#dimensionParam')[0].value);
    const valueParam = encodeURIComponent($('#valueParam')[0].value);
    const opParam = encodeURIComponent($('#opParam')[0].value);

    let url = String();
    url = url.concat('?');
    url = url.concat('f01Model=').concat(modelParam);
    url = url.concat('&f01Dim=').concat(dimensionParam);
    url = url.concat('&f01Val=').concat(valueParam);
    url = url.concat('&f01Op=').concat(opParam);
    return url;
}

function getVariableParams() {
    const modelParam = encodeURIComponent($('#modelParam')[0].value);
    const variableParam = encodeURIComponent($('#variableParam')[0].value);
    const valueParam = encodeURIComponent($('#valueParam')[0].value);

    let url = String();
    url = url.concat('?');
    url = url.concat('v01Model=').concat(modelParam);
    url = url.concat('&v01Par=').concat(variableParam);
    url = url.concat('&v01Val=').concat(valueParam);
    return url;
}

function displayIFrame() {
    const data = {};
    data.title = 'title';
    data.message = 'message';

    $.ajax({
        type: 'GET',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/getToken',
        success: function (data) {
            console.log(JSON.stringify(data));

            const odata = JSON.parse(data);

            const postheaders = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + odata.access_token,
                'x-csrf-token': 'fetch'
            };

            const url = $('#generatedUrl')[0].value;

            $.ajax({
                type: 'GET',
                url: url,
                headers: postheaders,
                xhrFields: {
                    withCredentials: true
                },
                success: function () {
                    $('iFrame').attr('src', url);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }

    });
}

function demoParams() {
    const paramType = document.querySelector('input[name = "paramType"]:checked').value;
    if (paramType === 'Display') {
        demoDisplayParams();
    }
    if (paramType === 'Filter') {
        demoFilterParams();
    }
    if (paramType === 'Variable') {
        demoVariableParams();
    }
}

function demoDisplayParams() {
    if (displayDemoParams.storyId === '' || displayDemoParams.displayMode === '' || displayDemoParams.page === '' || displayDemoParams.pageBar === '') {
        alert('No demo available');
    } else {
        $('#story')[0].value = displayDemoParams.storyId;
        $('#modeParam')[0].value = displayDemoParams.displayMode;
        $('#pageParam')[0].value = displayDemoParams.page;
        $('#pageBarParam')[0].value = displayDemoParams.pageBar;
    }
}

function demoFilterParams() {
    if (filterDemoParams.storyId === '' || filterDemoParams.modelId === '' || filterDemoParams.dimensionId === '' || filterDemoParams.value === '' || filterDemoParams.op === '') {
        alert('No demo available');
    } else {
        $('#story')[0].value = filterDemoParams.storyId;
        $('#modelParam')[0].value = filterDemoParams.modelId;
        $('#dimensionParam')[0].value = filterDemoParams.dimensionId;
        $('#valueParam')[0].value = filterDemoParams.value;
        $('#opParam')[0].value = filterDemoParams.op;
    }
}

function demoVariableParams() {
    if (variableDemoParams.storyId === '' || variableDemoParams.modelId === '' || variableDemoParams.variableId === '' || variableDemoParams.value === '') {
        alert('No demo available');
    } else {
        $('#story')[0].value = variableDemoParams.storyId;
        $('#modelParam')[0].value = variableDemoParams.modelId;
        $('#variableParam')[0].value = variableDemoParams.variableId;
        $('#valueParam')[0].value = variableDemoParams.value;
    }
}

function hide() {
    $('#myFooter').hide();
}
