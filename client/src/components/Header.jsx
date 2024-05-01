import React from "react";

function Header(props) {
	return (
		<header>
			<h1>Note Keeper</h1>

			<button className="clear-all-btn" onClick={() => props.onClear()}>
				CLEAR ALL NOTES
			</button>
		</header>
	);
}

export default Header;
