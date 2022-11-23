const AddEntry = ({nameValue, 
    numberValue,
    handleSubmit,
    handleNameChange,
    handleNumberChange
   }) => (
<>
<h2>Add a new entry</h2>
<form onSubmit={handleSubmit}>
<div>
name: <input value={nameValue} onChange={handleNameChange}/>
</div>
<div>
number: <input value={numberValue} onChange={handleNumberChange}/>
</div>
<div>
<button type="submit">add</button>
</div>
</form>
     </>
)

export default AddEntry