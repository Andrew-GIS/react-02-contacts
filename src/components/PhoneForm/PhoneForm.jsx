import {PhoneForm, NameLable, PhoneInput, AddButton } from './PhoneForm.styled';
import { Component } from 'react';
import { nanoid } from "nanoid";

export class PhoneSection extends Component{
	state = {
		name: '',
		number: '',
	};

	inputId = nanoid();
	
	handleInputChange = event => {
		const { name, value } = event.target;
    	this.setState({ [name]: value });
	}

	handleSubmit = event => {
		event.preventDefault();
		// console.log('States :>> ', this.state);
		this.props.onSubmit(this.state);
		this.reset();
	}

	reset = () => {
		this.setState({ name: "", number: "" });
		// this.setState{ ...INIT_STATE };
	}

	render() {
		const { name, number } = this.state;
		return(
		(
			<PhoneForm onSubmit={this.handleSubmit} autoComplete="off">
					<NameLable htmlFor={name} >
						Name
						<PhoneInput
							type="text"
							name="name"
  							pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  							title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
							required
							id={this.inputId}
							value={name}
							onChange={this.handleInputChange}>
						</PhoneInput>
					</NameLable>
					<NameLable htmlFor={number} >
						Phone
						<PhoneInput
							type="tel"
							name="number"
  							 pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  							title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
							required
							id={this.inputId}
							value={number}
							onChange={this.handleInputChange}>
						</PhoneInput>
					</NameLable>
				<AddButton type='submit'>Add Contact</AddButton>
			</PhoneForm>
			)
		)
	}
}