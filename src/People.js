function People({ _id, name, age, details, remove }) {
    return (
        <div>
            <h4>name: {name}</h4>
            <h4>age: {age}</h4>
            <div>
                <button onClick={() => details(_id)}>Details</button>
                <button onClick={() => remove(_id)}>Delete</button>
            </div>
            <br />
        </div>
    )
}

export default People