import React from "react";
import Grid from "../template/grid";
import IconButton from "../template/iconButton";

export default (props) => {
    console.log(props.handleAdd)
	return (
		<div role="form" className="todoForm">
			<Grid cols="12 9 10">
				<imput
					id="description"
					className="form-control"
					placeholder="Adicione uma tarefa">
                </imput>
			</Grid>

			<Grid cols="12 3 2">
				<IconButton style="primary" icon="plus" onClick={props.handleAdd}></IconButton>
			</Grid>
		</div>
	);
};
