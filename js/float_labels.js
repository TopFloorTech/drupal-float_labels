(function ($) {
  'use strict';

  function processFloatLabels(context) {
    $('.float-labels-include', context).not('.float-labels-processed').each(function () {
      var $element = $(this);
      var id = $(this).attr('id');
      var $label = $('label[for=' + id + ']');
      var labelText = $label.text();
      var required = $element.attr('required');

      $label.remove();

      var $wrapper = $('<div class="float-labels-wrapper">').css({'font-size': $element.css('font-size')});

      if (required) {
        $wrapper.addClass('float-labels-required');
      }

      $element.wrap($wrapper);

      $('<label class="float-labels-label">').attr('for', id).text(labelText).insertBefore($element);

      $element.addClass('float-labels-processed');
    });

    $('.float-labels-processed').on('focus blur', function (e) {
      $(this).parents('.float-labels-wrapper').toggleClass('float-labels-focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  }

  Drupal.behaviors.floatLabels = {
    attach: function (context, settings) {
      processFloatLabels(context);
    }
  };
}(jQuery));
