import { useState, useEffect } from 'react'
import personService from './services/persons'

// Filter component
const Filter = ({ filter, handleFilterChange }) => (
  <div>
    Filter shown with: <input value={filter} onChange={handleFilterChange} />
  </div>
)

// PersonForm component
const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

// Persons component
const Persons = ({ persons, handleDelete }) => (
  <ul>
    {persons.map(person => (
      <li key={person.id}>
        {person.name} — {person.number}
        <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
      </li>
    ))}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Load data from server on mount
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    const newPerson = { name: newName, number: newNumber }

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        personService
          .update(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === existingPerson.id ? updatedPerson : p))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`Error updating ${newName}. It may have already been removed.`)
            console.error('Error updating person:', error)
            // Optionally remove the stale person from list
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error adding person:', error)
        })
    }
  }

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`Error deleting ${name}. It may have already been removed.`)
          console.error('Error deleting person:', error)
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
