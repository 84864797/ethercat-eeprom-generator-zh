var formMock = {};
var _dc = [];

function buildMockFormHelper(formValues = null) {
    const defaultFormValues = getFormDefaultValues().form;
    
    if (!formValues) {
        formValues = defaultFormValues;
    }
    
    formMock = { }

    Object.keys(defaultFormValues).forEach(formControlName => {
        const formControl = { 
            name: formControlName, 
        };
        if (typeof defaultFormValues[formControlName] === 'boolean') {
            formControl.type = 'checkbox';
            formControl.defaultChecked = defaultFormValues[formControlName];
        }
        setFormControlValue(formControl, formValues[formControlName]);
        formMock[formControlName] = formControl;
    });

    return formMock;
}

function getForm() {
    return formMock;
}
