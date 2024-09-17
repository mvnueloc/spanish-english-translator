const BulletPoint = ({className = '', color = '#ffffff'}) => {
    return (
        <svg 
        className={className}
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={color} stroke="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
    );
}

export default BulletPoint;