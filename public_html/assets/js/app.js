(_ => {
    const $spinnerInDeCrementors = $('[data-zamel-input-spinner-decrement-target], [data-zamel-input-spinner-increment-target]')

    $spinnerInDeCrementors.click(function(e) {
        e.preventDefault()

        const $self = $(this)
        const isIncrementing = !$self.data('zamelInputSpinnerDecrementTarget')
        const target = $self.data('zamelInputSpinnerDecrementTarget') || $self.data('zamelInputSpinnerIncrementTarget')
        const $spinnerTarget = $(`[data-zamel-input-spinner="${target}"]`)

        if ($spinnerTarget.length) {
            const min = $spinnerTarget.attr('min')
            const max = $spinnerTarget.attr('max')
            const step = +($spinnerTarget.attr('step') || 1)

            $spinnerTarget.val(function(i, value) {
                const oldValue = +value

                let newValue = oldValue

                if (isIncrementing) {
                    newValue += step;

                    if (typeof max !== 'undefined' && newValue > (+max)) {
                        return oldValue;
                    }
                } else {
                    newValue -= step;

                    if (typeof min !== 'undefined' && newValue < (+min)) {
                        return oldValue;
                    }
                }

                return newValue;
            })
        }
    })
})();

(_ => {
    const $checkboxesAll = $('[data-zamel-checkbox-group-all]')

    $checkboxesAll.change(function (e) {
        e.preventDefault()

        const $self = $(this)
        const groupName = $self.data('zamelCheckboxGroupAll')
        const $checkboxesGroupAll = $(`[data-zamel-checkbox-group-all="${groupName}"]`)
        const $checkboxesAll = $(`[data-zamel-checkbox-group="${groupName}"]`)

        $checkboxesGroupAll.each(function () {
            $(this).prop('checked', $self.prop('checked'))
        })

        $checkboxesAll.each(function () {
            $(this).prop('checked', $self.prop('checked'))
        })
    })

    const $checkboxes = $('[data-zamel-checkbox-group]')

    $checkboxes.change(function (e) {
        e.preventDefault()

        const $self = $(this)
        const groupName = $self.data('zamelCheckboxGroup')
        const isCheckDisabled = $self.data('zamelCheckboxGroupParent') === 'off'

        if (isCheckDisabled) {
            return;
        }

        const $checkboxesAll = $(`[data-zamel-checkbox-group="${groupName}"]`)
        const $checkboxesChecked = $checkboxesAll.filter(function () {
            return $(this).prop('checked')
        })

        const $checkboxesGroupAll = $(`[data-zamel-checkbox-group-all="${groupName}"]`)
        const isAllCheckboxesChecked = $checkboxesAll.length === $checkboxesChecked.length

        $checkboxesGroupAll.each(function () {
            $(this).prop('checked', isAllCheckboxesChecked)
        })
    })
})();

(_ => {
    const $popoverClosers = $('[popover-close]')

    $popoverClosers.click(function (e) {
        e.preventDefault()

        const $self = $(this)
        const target = $self.attr('popover-close')
        const $popover = $(`#${target}`)

        if ($popover.length) {
            $popover[0].hidePopover()
        }
    })
})();

(_ => {
    const $labels = $('label[for]')

    $labels.keyup(function (e) {
        e.preventDefault()

        if ('enter' === e.key.toLowerCase()) {
            const target = $(this).attr('for')
            const $target = $(`#${target}`)

            if ($target.length) {
                $target.click()
            }
        }
    })
})();

(_ => {
    const isVisibleOnScreen = (element, container) => {
        const { bottom, height, left, right, top, width } = element.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        return (
            top <= containerRect.top ? containerRect.top - top <= height : bottom - containerRect.bottom <= height
        ) && (
            left <= containerRect.left ? containerRect.left - left <= width : right - containerRect.right <= width
        )
    }

    const $slideListContainers = $('[data-zamel-slides]')

    $slideListContainers.each(function () {
        $(this).addClass('zamel-scrollbar-hidden')
    })

    const $sliderPrevNextControls = $('[data-zamel-slider-prev], [data-zamel-slider-next]')

    $sliderPrevNextControls.click(function (e) {
        e.preventDefault()

        const $self = $(this)
        const isPrev = $self.data('zamelSliderPrev')
        const isNext = $self.data('zamelSliderNext')
        const sliderName = isPrev || isNext
        const $slider = $(`[data-zamel-slider="${sliderName}"]`)

        if (!$slider.length) {
            return
        }

        const $slidesList = $slider.find(`[data-zamel-slides]`)

        if (!$slidesList.length) {
            return
        }

        const $slideList = $slidesList.find(`[data-zamel-slide]`)
        const $slides = isPrev ? $($slideList.get().reverse()) : $slideList

        let targetSlide = null
        let lastVisibleSlide = null

        $slides.each(function(i, slide) {
            if (targetSlide) {
                return
            }

            const isCurrentSlideVisible = isVisibleOnScreen(slide, $slidesList.get(0))

            if (lastVisibleSlide && !isCurrentSlideVisible) {
                targetSlide = slide
            }

            if (isCurrentSlideVisible) {
                lastVisibleSlide = slide
            }
        })

        if (!targetSlide && (isPrev || isNext)) {
            targetSlide = $slides.last().get(0)
        }

        if (targetSlide) {
            targetSlide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    })
})();
