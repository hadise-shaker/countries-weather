import React from 'react'

const Header = ({action}) => {
    return (
        <div className="my-header">
            <button onClick={action}>change mode </button>
        </div>
    )
}

export default Header
