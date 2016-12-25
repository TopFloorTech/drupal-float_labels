(function ($) {
  'use strict';

  function getFloatLabelElements(context, settings) {
    var $forms = $('.float-labels-include-children', context);

    var $elements = $('.float-labels-include', context)
      .not('.float-labels-processed')
      .add($forms.find(':input').not('.float-labels-processed, :button, :hidden'));

    if (settings.includes && settings.includes.length > 0) {
      $elements = $elements.is(settings.includes.join(', '));
    }

    if (settings.excludes && settings.excludes.length > 0) {
      $elements = $elements.not(settings.excludes.join(', '));
    }

    return $elements;
  }

  function getLabel(element) {
    var id = element.attr('id');
    var $label = $('label[for=' + id + ']');
    var text = '';

    if ($label.length > 0) {
      text = $label.text();

      $label.remove();
    }
    else if (element.hasAttribute('title')) {
      text = element.attr('title');
    }
    else if (element.hasAttribute('placeholder')) {
      text = element.attr('placeholder');
    }

    return text;
  }

  function processFloatLabels($elements) {
    $elements.each(function () {
      var $element = $(this).addClass('float-labels-item');
      var id = $(this).attr('id');
      var labelText = getLabel($element);
      var required = $element.attr('required');

      $element
        .wrap($('<div class="float-labels-wrapper">').toggleClass('float-labels-required', required))
        .before($('<label class="float-labels-label">').attr('for', id).text(labelText))
        .addClass('float-labels-processed');
    });

    $('.float-labels-processed').on('focus blur', function (e) {
      $(this).parents('.float-labels-wrapper').toggleClass('float-labels-focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  }

  Drupal.behaviors.floatLabels = {
    attach: function (context, settings) {
      if (settings.hasOwnProperty('float_labels')) {
        settings = settings.float_labels;
      } else {
        settings = Drupal.settings.float_labels;
      }

      var $elements = getFloatLabelElements(context, settings);

      processFloatLabels($elements);
    }
  };
}(jQuery));
