import API from '@aws-amplify/api';
import { graphqlOperation } from 'aws-amplify';
import * as moment from 'moment';

import awsconfig from './aws-exports';

import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';

// Configure the GraphjQL API
API.configure(awsconfig);

$(document).ready(() => {
    $('#save-btn').click(saveButtonClick);
    $('#search-btn').click(searchBtnClick);
});

const SaveButton = document.getElementById('save-btn');
const SearchButton = document.getElementById('search-btn');

const buttonLoading = (btn_id) => {
    btn_id = '#' + btn_id;
    $(btn_id).html('Loading');
    $(btn_id).addClass('disabled');
}

const buttonReset = (btn_id, btn_text) => {
    btn_id = '#' + btn_id;
    $(btn_id).html(btn_text);
    $(btn_id).removeClass('disabled');
}

const saveButtonClick = (event) => {
    buttonLoading('save-btn');

    let title = $.trim($('#title').val());  // required
    let description = $.trim($('#description').val());  // required
    let time = $.trim($('#time').val());  // required
    let duration = $.trim($('#duration').val());  // required
    let contains = $.trim($('#contains').val());
    let category = $.trim($('#category').val());
    let folder = $.trim($('#folder').val());
    let has_sound = $('#has-sound').prop('checked');
    let framesize_width = $.trim($('#framesize-width').val());  // required
    let framesize_height = $.trim($('#framesize-height').val());  // required
    let framerate = $.trim($('#framerate').val());  // required
    let format = $.trim($('#format').val());  // required
    let lat = $.trim($('#latitude').val());
    let lon = $.trim($('#longitude').val());

    if (title.length <= 0) {
        alert('Title is required');
        buttonReset('save-btn', 'Save');
        return;
    }
    if (description.length <= 0) {
        alert('Description is required');
        buttonReset('save-btn', 'Save');
        return;
    }
    if (time.length <= 0) {
        alert('Time is required');
        buttonReset('save-btn', 'Save');
        return;
    }
    if (duration.length <= 0) {
        alert('Duration is required');
        buttonReset('save-btn', 'Save');
        return;
    }
    if (framesize_width.length <= 0) {
        alert('Framesize width is required');
        buttonReset('save-btn', 'Save');
        return;
    }
    if (framesize_height.length <= 0) {
        alert('Framesize height is required');
        buttonReset('save-btn', 'Save');
        return;
    }
    if (framerate.length <= 0) {
        alert('Framerate is required');
        buttonReset('save-btn', 'Save');
        return;
    }
    if (format.length <= 0) {
        alert('Format is required');
        buttonReset('save-btn', 'Save');
        return;
    }

    const videoMetadata = {
        title: title,
        description: description,
        time: moment.utc(time).toDate().toISOString(),
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        accessed: new Date().toISOString(),
        duration: parseInt(duration),
        framesize: {
            width: parseInt(framesize_width),
            height: parseInt(framesize_height),
        },
        framerate: parseFloat(framerate),
        format: format,
        hasSound: has_sound,
    };
    if (contains.length > 0) {
        videoMetadata.contains = contains.split(',').map(item => item.trim());
    }
    if (category.length > 0) {
        videoMetadata.category = category.split(',').map(item => item.trim());
    }
    if (folder.length > 0) {
        videoMetadata.folder = folder.split(',').map(item => item.trim());
    }
    if (lat.length > 0 && lon.length > 0) {
        lat = parseFloat(lat);
        lon = parseFloat(lon);
        videoMetadata.geolocation = {
            lat: lat,
            lon: lon,
        };
    }
    console.log(videoMetadata);

    ;(async () => {
        const videoMetadataObj = await API.graphql(graphqlOperation(mutations.createVideoMetadata, {input: videoMetadata}));
        console.log(videoMetadataObj);
        alert('Video Metadata created with ID: ' + videoMetadataObj.data.createVideoMetadata.id);
        buttonReset('save-btn', 'Save');
    })();
};

const toString = (data) => {
    return data;
}
const toDate = (data) => {
    return moment.utc(data).toDate();
}
const toInt = (data) => {
    return parseInt(data);
}
const toBool = (data) => {
    if (data === 'true') {
        return true;
    }
    if (data === 'false') {
        return false;
    }
}
const toFloat = (data) => {
    return parseFloat(data);
}
const toList = (data) => {
    return data.split(',').map(item => toString(item.trim()));
}
const toPoints = (data) => {
    let points = data.split('),').map(item => item.trim());
    let pointsArray = [];
    points.forEach(point => {
        if (point.length > 0) {
            if (point[0] === '(') {
                point = point.substring(1);
            }
            if (point[point.length - 1] == ')') {
                point = point.substring(0, point.length - 1);
            }
            point = point.split(',').map(p => p.trim());
            pointsArray.push({
                lat: toFloat(point[0]),
                lon: toFloat(point[1]),
            })
        }
    });
    return {
        polygon_points: pointsArray
    }
}

const searchBtnClick = (event) => {
    buttonLoading('search-btn');

    let query = $.trim($('#search-query').val());
    if (query.length <= 0) {
        return;
    }

    const keywordsVsTypeMap = {
        id: toString,
        intitle: toString,
        indescription: toString,
        time_lt: toDate,
        time_gte: toDate,
        created_lt: toDate,
        created_gte: toDate,
        modified_lt: toDate,
        modified_gte: toDate,
        accessed_lt: toDate,
        accessed_gte: toDate,
        duration_lt: toInt,
        duration_gte: toInt,
        has_sound: toBool,
        framerate_lt: toFloat,
        framerate_gte: toFloat,
        framerate: toFloat,
        format: toString,
        contains: toList,
        category: toList,
        folder: toList,
        width_lt: toInt,
        width_gte: toInt,
        height_lt: toInt,
        height_gte: toInt,
        within: toPoints,
    }

    const searchParams = {};
    const items = query.split('&').map(item => item.trim());
    items.forEach(item => {
        const val = item.split(':').map(v => v.trim());
        const searchKey = val[0];
        let searchVal = val[1];
        
        if (searchKey in keywordsVsTypeMap) {
            searchParams[searchKey] = keywordsVsTypeMap[searchKey](searchVal);
        }
    });

    console.log(searchParams);

    ;(async () => {
        const videos = await API.graphql(graphqlOperation(queries.search, {params: searchParams}));
        console.log(videos);
        let res = '<strong>' + videos.data.search.total + ' videos found</strong>\n\n';
        videos.data.search.items.forEach(v => {
            const trimmedData = {
                title: v.title,
                description: v.description
            }
            res += '<pre>' + JSON.stringify(trimmedData) + '</pre>\n';
        });
        $('#video-search-results').html(res);
        buttonReset('search-btn', 'Search');
    })();
};
