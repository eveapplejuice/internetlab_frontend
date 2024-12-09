$(document).ready(function () {

    $('.header-burger').on('click', function ()
    {
        openMenu('.header-burger__menu');
    });

    $('.header-icon__close').on('click', function ()
    {
        closeMenu('.header-burger__menu');
    });

    $('.header-burger__menu .menu-item').on('click', function () {
        closeMenu('.header-burger__menu');
    });


    var slider = new Splide( '.reviews__slider.splide', {
        type: 'slide',
        perPage: 3,
        arrow: true,
        arrowPath: 'M1.39143 29.724C1.26408 29.847 1.1625 29.9941 1.09262 30.1568C1.02275 30.3194 0.985964 30.4944 0.984425 30.6714C0.982887 30.8485 1.01662 31.024 1.08366 31.1879C1.1507 31.3518 1.24971 31.5006 1.3749 31.6258C1.50009 31.751 1.64896 31.85 1.81282 31.9171C1.97668 31.9841 2.15226 32.0178 2.32929 32.0163C2.50633 32.0148 2.68129 31.978 2.84397 31.9081C3.00664 31.8382 3.15376 31.7367 3.27676 31.6093L14.1728 20.7133C15.4209 19.4623 16.1219 17.7672 16.1219 16C16.1219 14.2328 15.4209 12.5377 14.1728 11.2866L3.27676 0.39064C3.02529 0.147762 2.68849 0.0133699 2.33889 0.0164078C1.9893 0.0194457 1.65488 0.159671 1.40767 0.406882C1.16046 0.654093 1.02023 0.988509 1.01719 1.3381C1.01416 1.6877 1.14855 2.0245 1.39143 2.27597L12.2874 13.172C13.0373 13.9221 13.4586 14.9393 13.4586 16C13.4586 17.0606 13.0373 18.0779 12.2874 18.828L1.39143 29.724Z',
        pagination: true,
        gap: 32,
        padding: 15,
        breakpoints: {
            960: {
                perPage: 2,
                arrows: false,
            },
            768: {
                perPage: 1,
            }
        }
    });
    slider.mount();

    // скрывание и раскрытие ответа на вопрос [блок с ответами на вопросы]

    $('.qa__row').on('click', function () {
        let $this = $(this);

        let $button = $this.find('.expand-button');

        $button.toggleClass('open');

        if (($button).hasClass('open')) {
            $this.find('.row-subcontent').fadeIn('fast');
        } else {
            $this.find('.row-subcontent').fadeOut('fast');
        }
    });

    // переключение фокуса на инпут на нажатии на внутренний label [блок с формой]

    $('.input-inner-label').on('click', function ()
    {
        $(this).siblings('.form-item__input').focus();
    });

    $('.form-item__input').on({

        focus: function (e) {
            $('label[for="' + e.target['name'] + '"]').addClass('focus');
        },

        blur, input: function (e) {
            $(this).removeClass('wrong');
            $(this).siblings('.correct-icon').removeClass('active');
            $(this).siblings('.warning').detach();

            if (e.target.value === '') {
                $(this).addClass('wrong');
                $(this).next('.input-inner-label').after('<span class="warning">Поле не может быть пустым</span>');
            } else {
                if (!!isValid($(this).val(), $(this).prop('name'))) {
                    $(this).addClass('wrong');
                    $(this).next('.input-inner-label').after('<span class="warning">' + isValid($(this).val(), $(this).prop('name')) + '</span>');
                } else {
                    $(this).siblings('.correct-icon').addClass('active');
                }
            }
        },

        blur: function (e) {
            if (e.target.value === '') {
                $('label[for="' + e.target['name'] + '"]').removeClass('focus');
            }
        }
    });



    $('#form_send_button').on('click', function ()
    {
        let $inputName = $('input[name="name"]');
        let $inputTel = $('input[name="tel"]');

        $inputName.siblings('.warning').detach();
        $inputTel.siblings('.warning').detach();


        if ($inputName.val() !== '' && $inputTel.val() !== '') {
            if (!!!isValid($inputName.val(), $inputName.prop('name')) && !!!isValid($inputTel.val(), $inputTel.prop('name'))) {
                if ($('input[name="agreement"]').prop('checked')) {
                    $.ajax({
                        url: 'ajax/ajax.php',
                        type: 'post',
                        data: $('#user_form').serialize(),
                        success: function (response) {
                            console.log(response);
                            location.reload();
                        }
                    });
                } else {
                    $('.input-design').addClass('wrong');
                }
            }
        } else {
            if ($inputName.val() === '') {
                $inputName.addClass('wrong');
                $inputName.next('.input-inner-label').after('<span class="warning">Поле не может быть пустым</span>');
            }
            if ($inputTel.val() === '') {
                $inputTel.addClass('wrong');
                $inputTel.next('.input-inner-label').after('<span class="warning">Поле не может быть пустым</span>');
            }
        }
    });
});

function isValid(value, inputName) {
    let validation = {
        'name' : {
            'pattern' : /^[a-zа-яё]+$/iu,
            'value' : value,
            'error' : 'Поле может содержать только буквы'
        },
        'tel' : {
            'pattern' : /^((\+7|7|8)+([0-9]){10})$/,
            'value' : value,
            'error' : 'Используйте формат: +7777777777777'
        }
    }

    if (!validation[inputName]['pattern'].test(validation[inputName]['value'])) {
        return validation[inputName]['error'];
    }
}

function openMenu(selector) {
    $('html').addClass('overflow-hidden');
    $(selector).addClass('active');
}

function closeMenu(selector) {
    $('html').removeClass('overflow-hidden');
    $(selector).removeClass('active');
}
