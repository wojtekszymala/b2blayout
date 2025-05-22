(_ => {
    const spinnerDecrementors = document.querySelectorAll('[data-zamel-input-spinner-decrement-target]');

    spinnerDecrementors.forEach(decrementor => {
        decrementor.addEventListener('click', e => {
            e.preventDefault()

            const spinnerTarget = document.querySelector(`[data-zamel-input-spinner="${decrementor.dataset.zamelInputSpinnerDecrementTarget}"]`)

            if (spinnerTarget) {
                spinnerTarget.value = +spinnerTarget.value - 1
            }
        })
    })

    const spinnerIncrementors = document.querySelectorAll('[data-zamel-input-spinner-increment-target]');

    spinnerIncrementors.forEach(incrementor => {
        incrementor.addEventListener('click', e => {
            e.preventDefault()

            const spinnerTarget = document.querySelector(`[data-zamel-input-spinner="${incrementor.dataset.zamelInputSpinnerIncrementTarget}"]`)

            if (spinnerTarget) {
                spinnerTarget.value = +spinnerTarget.value + 1
            }
        })
    })
})();


(_ => {
    const checkboxesGroupAll = document.querySelectorAll('[data-zamel-checkbox-group-all]');

    checkboxesGroupAll.forEach(checkbox => {
        checkbox.addEventListener('change', e => {
            e.preventDefault()

            const checkboxesGroup = document.querySelectorAll(`[data-zamel-checkbox-group="${checkbox.dataset.zamelCheckboxGroupAll}"]`)
            const spinnerTarget = document.querySelector(`[data-zamel-input-spinner="${decrementor.dataset.zamelInputSpinnerDecrementTarget}"]`)
        })
    })
})();
