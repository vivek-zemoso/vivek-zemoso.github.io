const submitForm = (feilds) => {
    const invalidFeilds = feilds.filter(feild => {
        if (!feild.validity.valid) {
            showError(feild);
            return feild;
        }
    });

    if (invalidFeilds.length === 0) {
        return true;
    }
}


export const checkFormValidation = (feilds) => {
    feilds.forEach((feild) => {
        feild.addEventListener('input', (e) => {
            showError(feild);
        });
    });
}

const showError = (feild) => {
    const errorFeildId = `${feild.id}-error`;
    const errorFeild = document.getElementById(errorFeildId);
    const errorMsg = getErrorMsg(feild, feild.id);
    errorFeild.innerHTML = errorMsg;
}

const getErrorMsg = (feild, feild_name) => {
    if (feild.validity.typeMismatch) {
        return `Not a valid ${feild_name} !`;

    } else if (feild.validity.valueMissing) {
        return `${feild_name} can not be Empty !`;

    } else if (feild.validity.rangeOverflow) {
        return `${feild_name} can not be More than Today !`;
    }
    else {
        return "";
    }
}

export default submitForm;