import React from 'react';
import './styles.scss';


//functional component and handle is for when the user types in their credentials //

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className="formRow">
            {label && (
                <label>
                    {label}
                </label>
            )}
            <input className="formInput" onChange={handleChange} {...otherProps} />
        </div>
    );
}

export default FormInput;