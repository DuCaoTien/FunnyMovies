import { forwardRef } from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const Button = forwardRef(function (props, ref) {
    const {
        children,
        onClick,
        name,
        buttonLabel,
        leftIcon,
        rightIcon,
        disabled,
        className,
        ...rest
    } = props;

    return (
        <button
            type="submit"
            className={`btn ${className ?? ""}`}
            onClick={onClick}
            name={name}
            aria-label={name}
            disabled={disabled}
            {...rest}
            ref={ref}
        >
            {leftIcon}
            {children}
            {rightIcon}
        </button>
    );
});

Button.propTypes = {
    name: PropTypes.string,
    buttonLabel: PropTypes.string,
    onClick: PropTypes.func,
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element,
    disabled: PropTypes.bool,
    className: PropTypes.string
}

Button.defaultProps = {
    onClick: function () { return void (0) },
}

export default Button;