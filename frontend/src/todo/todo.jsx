import React, { Component } from "react";
import axios from "axios";

import PageHeader from "../template/pageHeader";
import TodoForm from "./todoForm";
import TodoList from "./todoList";

const URL = "http://localhost:3000/api/todos";

export default class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = { description: "", list: [] };

		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
		this.handleMarkAsPending = this.handleMarkAsPending.bind(this);

		this.refresh();
	}

	refresh() {
		axios.get(`${URL}?sort=-createdAt`).then((res) =>
			this.setState({
				...this.state,
				description: "",
				list: res.data,
			})
		);
	}

	handleChange(e) {
		this.setState({ ...this.state, description: e.target.value });
	}

	handleAdd() {
		const description = this.state.description;
		axios.post(URL, { description }).then((res) => this.refresh());
	}

	handleRemove(todo) {
		axios.delete(`${URL}/${todo._id}`).then((res) => this.refresh());
	}

	handleMarkAsDone(todo) {
		axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
			.then((res) => this.refresh());
	}

	handleMarkAsPending(todo) {
		axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
			.then((res) => this.refresh());
	}

	render() {
		return (
			<div>
				<PageHeader name="Tarefas" small="Cadastro"></PageHeader>
				<TodoForm
					description={this.state.description}
					handleChange={this.handleChange}
					handleAdd={this.handleAdd}
				/>
				<TodoList
					list={this.state.list}
					handleRemove={this.handleRemove}
					handleMarkAsDone={this.handleMarkAsDone}
					handleMarkAsPending={this.handleMarkAsPending}
				/>
			</div>
		);
	}
}
