function Bnbs({_id, bnbImage, bnbTitle, getDetails, remove }) {
    return (
        <div>
            <img src={bnbImage} alt={bnbTitle} />
            <br />
            <button onClick={() => getDetails(_id)}>Details</button>
            <br />
            <button onClick={() => remove(_id)}>Remove</button>
            <br />
            <br />
        </div>
    )
}

export default Bnbs