import { Component } from 'react';
import { PhoneSection } from './PhoneForm/PhoneForm';
import { ContactForm } from './Contacts/ContactSection';
import { FilterSection } from './Filter/Filter';
import { nanoid } from "nanoid";

export class App extends Component{
  state = {
      contacts: [
      // {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      // {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      // {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      // {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
      filter: '',
  }

  componentDidMount = () => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({contacts: parsedContacts});
    }   
  }

  componentDidUpdate = (prevState) => {
    if (prevState !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onChangeFilter = event => {
    this.setState({ filter: event.target.value});
  }

  addContact = ({ name, number }) => {
    this.setState(prevState => {
      if (prevState.contacts.find(contact => contact.name.toLowerCase()=== name.toLowerCase())) {
        return alert(`${name} is already in contacts.`);
      }
      else {
        const id = nanoid();
        return { contacts: [{ id: id, name, number }, ...prevState.contacts] };
        }
    });
  };

  deleteContact = (id) => {
      this.setState(prevState => {
      const stateAfterRemove = prevState.contacts.filter(contact => contact.id !== id);
      return { contacts: [...stateAfterRemove] };
    })
  }

  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    const normalisedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toString().toLowerCase().includes(normalisedFilter));
  }

  render() {
    return (
      <>
        <h1 className='primaryTitle'>Phonebook</h1>
        <PhoneSection onSubmit={this.addContact} />
        <FilterSection title={"Find contacts by name"} value={this.filter} onChange={this.onChangeFilter}></FilterSection>
        <h2 className='secondaryTitle'>Contacts</h2>
        {(this.state.contacts.length === 0)
          ? (<h3 className='warningText'>No Contects in your PhoneBook</h3>)
          : (<ContactForm contacts={this.getFilteredContact()} onDeleteContact={this.deleteContact} />)}
      </>
    );
  };
}