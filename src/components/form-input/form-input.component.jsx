import { Group, Input, FormInputLabel } from './form-input.styles.jsx';

const FormInput = ({ label, ...otherProps }) => {
    return(
        <Group>
            <Input />
            {label && (
                <FormInputLabel 
                    shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    )
};

export default FormInput;