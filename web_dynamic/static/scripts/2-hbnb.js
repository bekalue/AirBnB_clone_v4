'use strict';
$(() => {
  let amenitiesSelected = [];
  const selectors = {
    amenitiesHeader: '.amenities > h4',
    amenityBox: '.amenities > .popover > ul > li > input[type="checkbox:]',
    amenityItem: '.amenities > .popover > li'
  };
  const API_URL = 'http://localhost:5001/api/v1';

  $(selectors.amenityItem).on('mousedown', ev => {
    ev.target.getElementsByTagName('input')?.item(0)?.click();
  });

  $(selectors.amenityBox).change(ev => {
    const amenityId = ev.target.getAttribute('data-id');
    const amenityName = ev.target.getAttribute('data-name');

    if (ev.target.checked) {
      if (!amenitiesSelected.find(obj => obj.id === amenityId)) {
        amenitiesSelected.push({
          id: amenityId,
          name: amenityName
        });
      }
    } else {
      amenitiesSelected = amenitiesSelected.filter(
        obj => (obj.id !== amenityId) && (obj.name !== amenityName)
      );
    }
    const amenitiesSelectedNames = amenitiesSelected.map(obj => obj.name).join(', ');
    $(selectors.amenitiesHeader).html(
      amenitiesSelected.length > 0 ? amenitiesSelectedNames : '&nbsp;'
    );
  });

  $.get(`${API_URL}/status/`, (data, status) => {
    if ((status === 'success') && (data.status === 'OK')) {
      if (!$('DIV#api_status').hasClass('available')) {
        $('DIV#api_status').addClass('available');
      }
    } else {
      if ($('DIV#api_status').hasClass('available')) {
        $('DIV#api_status').removeClass('available');
      }
    }
  });
});
