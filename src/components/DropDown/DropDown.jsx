import React, { Component, createRef } from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./DropDown.module.scss";
import PropTypes from "prop-types";

/**
 * Renders a <DropDown /> component
 * @component
 *	<DropDown
 *		data={data}
 *		displayKey="firstName"
 *		searchKeys={["firstName", "lastName", "university"]}
 *		result={this.showResult}
 *	/>
 */

class DropDown extends Component {
	constructor(props) {
		super(props);
		this.div = createRef();
	}

	state = {
		showDropDown: false,
		selectedValue: null,
		resultArray: [],
	};

	toggle = () => {
		const { showDropDown } = this.state;
		this.setState({
			showDropDown: !showDropDown,
		});
	};

	/**
	 * @function resultList
	 * @param resultArray
	 * Sets resultArray inside state.
	 */
	resultList = (resultArray) => {
		this.setState({
			resultArray: [...resultArray],
		});
	};

	/**
	 * @function onClickHandler
	 * @param value
	 * Sets selectedValue inside state and the selectedValue value is passed to result().
	 */
	OnClickHandler = (value) => {
		const { result, data } = this.props;
		this.setState({
			selectedValue: value,
			resultArray: data,
		});
		result(value);
	};

	/**
	 * @function closeDropDown
	 * @param {Event} event
	 * Sets selectedValue inside state and the selectedValue value is passed to result().
	 */
	closeDropDown = (event) => {
		if (event.target.parentElement === this.div.current) {
			return;
		} else if (event.target.id === "root") {
			this.setState({
				showDropDown: false,
			});
		}
	};

	componentDidMount = () => {
		document.addEventListener("click", this.closeDropDown);

		return () => {
			document.removeEventListener("click", this.closeDropDown);
		};
	};

	render() {
		const { showDropDown, selectedValue, resultArray } = this.state;
		const { data, searchKeys, prompt, displayKey, result } = this.props;
		const listData = resultArray.length ? resultArray : data;
		return (
			<>
				<div className={styles.dropdown}>
					<div className={styles.control}>
						<div className={styles.selectedValue}>
							<p>{selectedValue ? selectedValue[displayKey] : prompt}</p>
						</div>
						<div
							className={styles.arrow}
							onClick={this.toggle}
							ref={this.div}
						>
							<i
								className={`fas fa-sort-${
									showDropDown ? `up ${styles.up}` : "down"
								}`}
							></i>
						</div>
					</div>
					{showDropDown && (
						<div className={styles.options} tabIndex={0}>
							<SearchBar
								searchData={data}
								displayKey={displayKey}
								searchKeys={searchKeys}
								resultList={this.resultList}
								alignIcon="left"
								result={result}
							/>
							{listData.map((data) => {
								return (
									<div
										tabIndex={0}
										key={data.id}
										className={styles.option}
										onKeyPress={(e) => {
											if (e.key === "Enter") {
												this.OnClickHandler(data);
												this.toggle();
											}
										}}
										onClick={() => {
											this.OnClickHandler(data);
											this.toggle();
										}}
									>
										{data[displayKey]}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</>
		);
	}
}

DropDown.propTypes = {
	/**
	 * The data type must be an array of objects ( Required ).
	 */
	data: PropTypes.array.isRequired,
	/**
	 * The searchKeys type must be array of object keys.
	 */
	searchKeys: PropTypes.arrayOf(PropTypes.string),
	/**
	 * The promt type must be a string. It is like a placeholder for the dropdwon.
	 */
	promt: PropTypes.string,
	/**
	 * The alignIcon type must be a string ( left or right )
	 * By default is "right"
	 */
	alignIcon: PropTypes.oneOf(["left", "right"]),
	/**
	 * The type of the displayKey must be a string. This prop is used when
	 * SearchBar component is used with the DropDown component.
	 */
	displayKey: PropTypes.string,
	/**
	 * The result type must funciton. It shows the result for the query.
	 */
	result: PropTypes.func.isRequired,
};

DropDown.defaultProps = {
	prompt: "Select",
};

export default DropDown;
