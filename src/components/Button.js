import classNames from "classnames";
function Button({className, onClick, children}) {
return ( <button className= {classNames('btn', className)}onClick={onClick}>
        {children}
    </button> );
}

export default Button;